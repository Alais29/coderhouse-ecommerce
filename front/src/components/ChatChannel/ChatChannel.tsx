import { useEffect, useRef, useState } from 'react';
import { socket } from 'services/Socket'
import { isEmpty } from 'utilities/others';
import { Button, Form } from 'react-bootstrap'
import { IMessage, IToastInfo } from 'commons/interfaces';
import Notification from 'components/Notification/Notification';
import defaultAvatar from 'images/default-avatar.jpg';
import cx from 'classnames/bind'
import styles from './styles.module.scss'
import moment from 'moment';
import { denormalize, schema } from 'normalizr';

interface IChatChannel {
  messages: IMessage[]
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
}

const ChatChannel = ({messages, setMessages}: IChatChannel) => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    alias: '',
    avatar: '',
    email: '',
    text: ''
  });
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })
  
  const { nombre, apellido, edad, alias, avatar, email, text } = formValues
  // const emailRef = useRef<HTMLInputElement>(null)
  const chatBoxRef = useRef<HTMLInputElement>(null)

  const handleToggleShowToast = (info?: IToastInfo) => {
    setShowToast(!showToast)
    info && setToastInfo(info)
  }

  useEffect(() => {
    if (chatBoxRef.current && !isEmpty(messages)) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isEmpty(email) || isEmpty(text)) {
      handleToggleShowToast({type: 'warning', text: 'El email y el mensaje son obligatorios'})
    } else {
      const message = {
        author: {
          id: email,
          nombre,
          apellido,
          edad: Number(edad),
          alias,
          avatar
        },
        text
      }
      socket.emit('new message', message)
      socket.on('save message success', (newMessage) => {
        setFormValues({
          ...formValues,
          text: ''
        })
      })
      socket.on('messages', (data) => {
        const authorSchema = new schema.Entity('authors');
        const messageSchema = new schema.Entity(
          'mensaje',
          {
            author: authorSchema,
          }
        );
        const messagesSchema = new schema.Array(messageSchema);
        const denormalizedData = denormalize(
          data.result,
          messagesSchema,
          data.entities
        );
        setMessages(denormalizedData)
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
      })
      socket.on('messages error', (data) => {
        handleToggleShowToast({type: 'warning', text:  data.message})
      })
      socket.on('save message error', (data) => {
        handleToggleShowToast({type: 'warning', text:  data.message})
      })
    }
  }

  return (
    <div className={cx(styles['chat-channel'])}>
      <Notification show={showToast} handleToggleShowToast={handleToggleShowToast} toastInfo={toastInfo} />
      <div ref={chatBoxRef} className={cx(styles['chat-channel__messages'])}>
        {messages && messages.map((msg) => {
          return (
            <div key={msg.id} className={cx(styles['chat-channel__message'])}>
              <div>
                <div className={cx('d-flex', 'align-items-center')}>
                  <img
                    className={cx(styles['chat-channel__message-avatar'])}
                    src={msg.author.avatar || defaultAvatar}
                    alt={`Avatar ${msg.author.alias}`}
                  />
                  <span className={cx(styles['chat-channel__message-email'], 'mx-2')}>{msg.author.alias}</span>
                  <span>{msg.author.id}: </span>
                </div>
                <p className={cx(styles['chat-channel__message-text'])}>
                  {msg.text}
                </p>
              </div>
              <small className={cx(styles['chat-channel__message-date'])}>{moment(msg.timestamp).format('DD/MM/YYYY HH:mm:ss')}</small>
            </div>
          )
        })}
      </div>
      <Form onSubmit={handleSubmit}>
        <div className={cx(styles['chat-channel__form'])}>
          <div className={cx('d-flex')}>
            <Form.Control value={nombre} onChange={handleChange} name="nombre" type="text" placeholder="Nombre" />
            <Form.Control value={apellido} onChange={handleChange} name="apellido" type="text" placeholder="Apellido" />
            <Form.Control value={edad} onChange={handleChange} name="edad" type="number" placeholder="Edad" />
            <Form.Control value={alias} onChange={handleChange} name="alias" type="text" placeholder="Alias" />
            <Form.Control value={avatar} onChange={handleChange} name="avatar" type="url" placeholder="Avatar" />
            <Form.Control value={email} onChange={handleChange} name="email" type="text" placeholder="Email" />
          </div>
          <Form.Control value={text} onChange={handleChange} name="text" type="text" placeholder="Ingresa un mensaje" />
          <Button className="w-100" variant="primary" type="submit">Enviar</Button>
        </div>
      </Form>
    </div>
  )
}

export default ChatChannel;
