import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { socket } from 'services/Socket';
import { isEmpty } from 'utilities/others';
import { Button, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { setMessages } from 'features/messages/messagesSlice';
import cx from 'classnames/bind';
import styles from './styles.module.scss';

const ChatChannel = () => {
  const { data: dataUser } = useAppSelector(state => state.user);
  const { data: messages } = useAppSelector(state => state.messages);

  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState({
    email: dataUser ? dataUser.email : '',
    text: '',
  });

  const { email, text } = formValues;
  const emailRef = useRef<HTMLInputElement>(null);
  const chatBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dataUser) {
      socket.emit('get messages', dataUser.email);
      socket.on('messages', data => {
        dispatch(setMessages(data));
      });
      socket.on('messages error', data => {
        toast.warning(data.message);
      });
    }
  }, [dataUser, dispatch]);

  useEffect(() => {
    if (chatBoxRef.current && !isEmpty(messages)) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmpty(email) || isEmpty(text)) {
      toast.warning('Ambos campos son obligatorios');
    } else {
      socket.emit('new message', formValues);
      socket.on('new message saved', data => {
        dispatch(setMessages(data));
        setFormValues({
          ...formValues,
          text: '',
        });
      });
      socket.on('messages error', data => {
        toast.warning(data.message);
      });
    }
  };

  return (
    <div className={cx(styles['chat-channel'])}>
      <div ref={chatBoxRef} className={cx(styles['chat-channel__messages'])}>
        {messages.map(msg => (
          <div key={msg.id} className={cx(styles['chat-channel__message'])}>
            <p>
              <span className={cx(styles['chat-channel__message-email'])}>
                {msg.user.email}:{' '}
              </span>
              <span className={cx(styles['chat-channel__message-text'])}>
                {msg.text}
              </span>
            </p>
            <small className={cx(styles['chat-channel__message-date'])}>
              {msg.date}
            </small>
          </div>
        ))}
      </div>
      <Form onSubmit={handleSubmit}>
        <div className={cx(styles['chat-channel__form'])}>
          <Form.Control
            value={email}
            onChange={handleChange}
            disabled={true}
            name="email"
            type="text"
            placeholder="Email"
            ref={emailRef}
          />
          <Form.Control
            value={text}
            onChange={handleChange}
            name="text"
            type="text"
            placeholder="Ingresa un mensaje"
          />
          <Button className="w-100" variant="primary" type="submit">
            Enviar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChatChannel;
