import { useEffect, useRef, useState } from 'react';
import { socket } from 'services/Socket'
import { isEmpty } from 'utilities/others';
import { Button, Form } from 'react-bootstrap'
import { IMessage, IToastInfo } from 'commons/interfaces';
import Notification from 'components/Notification/Notification';
import cx from 'classnames/bind'
import styles from './styles.module.scss'

// interface IMessage {
//   id: number
//   email: string
//   text: string
//   date: string
// }

interface IChatChannel {
  messages: IMessage[]
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
}

const ChatChannel = ({messages, setMessages}: IChatChannel) => {
  const [formValues, setFormValues] = useState({
    email: '',
    text: ''
  });
  // const [messages, setMessages] = useState<IMessage[]>([])
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })
  
  const { email, text } = formValues
  const emailRef = useRef<HTMLInputElement>(null)
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
      handleToggleShowToast({type: 'warning', text: 'Ambos campos son obligatorios'})
    } else {
      socket.emit('new message', formValues)
      socket.on('save message success', (newMessage) => {
        setFormValues({
          ...formValues,
          text: ''
        })
      })
      socket.on('messages', (data) => {
        setMessages(data)
        if (emailRef.current) {
          emailRef.current.disabled = true;
        }
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
        {messages.map((msg) => (
          <div key={msg.id} className={cx(styles['chat-channel__message'])}>
            <p>
              <span className={cx(styles['chat-channel__message-email'])}>{msg.email}: </span>
              <span className={cx(styles['chat-channel__message-text'])}>{msg.text}</span>
            </p>
            <small className={cx(styles['chat-channel__message-date'])}>{msg.date}</small>
          </div>
        ))}
      </div>
      <Form onSubmit={handleSubmit}>
        <div className={cx(styles['chat-channel__form'])}>
          <Form.Control value={email} onChange={handleChange} name="email" type="text" placeholder="Email" ref={emailRef} />
          <Form.Control value={text} onChange={handleChange} name="text" type="text" placeholder="Ingresa un mensaje" />
          <Button className="w-100" variant="primary" type="submit">Enviar</Button>
        </div>
      </Form>
    </div>
  )
}

export default ChatChannel;
