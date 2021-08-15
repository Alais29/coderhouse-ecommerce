import { useEffect, useRef, useState } from 'react';
import { socket } from '../../services/socket'
import { isEmpty } from '../../utilities/others';
import { IAlert } from '../../commons/interfaces';
import { Alert, Button, Form } from 'react-bootstrap'
import cx from 'classnames/bind'
import styles from './styles.module.scss'

interface IMessage {
  email: string
  text: string
  date: string
}

//TODO agregar validación al mail
const ChatChannel = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    text: ''
  });
  const [messages, setMessages] = useState<IMessage[]>([])
  const [alert, setAlert] = useState<IAlert>({ show: false, text: '' })
  const {email, text} = formValues
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    socket.on('messages', (data) => {
      setMessages(data)
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isEmpty(email) || isEmpty(text)) {
      setAlert({show: true, text: 'Ambos campos son obligatorios'})
    } else {
      setAlert({show: false, text: ''})
      socket.emit('new message', formValues)
      socket.on('save message success', () => {
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
      })
      socket.on('messages error', (data) => {
        setAlert({show: true, text: data.message})
      })
      socket.on('save message error', (data) => {
        setAlert({show: true, text: data.message})
      })
    }
  }

  return (
    <div className={cx(styles['chat-channel'])}>
      <h1>Centro de Mensajes</h1>
      <div className={cx(styles['chat-channel__messages'])}>
        {messages.map((msg, index) => (
          <div key={index} className={cx(styles['chat-channel__message'])}>
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
      {alert.show &&
        <Alert variant="warning" className="mt-3">{alert.text}</Alert>
      }
    </div>
  )
}

export default ChatChannel
