import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Spinner } from 'react-bootstrap';
import moment from 'moment';
import { socket } from 'services/Socket';
import { isEmpty } from 'utilities/others';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { setMessages, addMessage } from 'features/messages/messagesSlice';
import LoadingData from 'components/LoadingData/LoadingData';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

const ChatChannel = () => {
  const [savingMessage, setSavingMessage] = useState(false);
  const { data: dataUser } = useAppSelector(state => state.user);
  const { data: messages, status } = useAppSelector(state => state.messages);

  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState({
    email: dataUser ? dataUser.email : '',
    text: '',
  });

  const { email, text } = formValues;
  const emailRef = useRef<HTMLInputElement>(null);
  const chatBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dataUser && status === 'idle') {
      socket.emit('get messages', dataUser.email);
      socket.on('messages', data => {
        dispatch(setMessages({ data }));
      });
      socket.on('messages error', data => {
        toast.warning(data.message);
      });
    }
  }, [dataUser, dispatch, status]);

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
      setSavingMessage(true);
      dispatch(
        addMessage({ user: dataUser, text: formValues.text, type: 'usuario' }),
      );
      setFormValues({
        ...formValues,
        text: '',
      });

      socket.on('new message saved', data => {
        dispatch(setMessages({ data }));
        setSavingMessage(false);
      });

      socket.on('messages error', data => {
        setSavingMessage(false);
        toast.warning(data.message);
      });
    }
  };

  return (
    <div className={cx(styles['chat-channel'])}>
      <div
        ref={chatBoxRef}
        className={cx(styles['chat-channel__messages'], {
          [styles['chat-channel__messages--loading']]: status === 'idle',
          [styles['chat-channel__messages--no-messages']]:
            status === 'succeeded' && messages.length === 0,
        })}
      >
        {status === 'idle' && (
          <LoadingData style={{ height: '100%' }} mode="partial" />
        )}
        {status === 'succeeded' && messages.length === 0 ? (
          <h3 className="text-center">No tienes mensajes</h3>
        ) : (
          messages.map(msg => (
            <div
              key={msg.id}
              className={cx(styles['chat-channel__message'], {
                [styles['chat-channel__message--bot']]: msg.type === 'sistema',
              })}
            >
              <p>
                <span
                  className={cx(styles['chat-channel__message-email'], {
                    [styles['chat-channel__message-email--bot']]:
                      msg.type === 'sistema',
                  })}
                >
                  {msg.type === 'sistema' ? 'Chatbot' : msg.user.email}
                </span>
                <span className={cx(styles['chat-channel__message-text'])}>
                  {msg.type === 'sistema'
                    ? msg.text.split('$nl').map((item, index) => (
                        <span className="d-block" key={index}>
                          {item}
                        </span>
                      ))
                    : msg.text}
                </span>
              </p>
              <small className={cx(styles['chat-channel__message-date'])}>
                {moment(msg.date).format('DD/MM/YYYY hh:mm:ss')}
              </small>
            </div>
          ))
        )}
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
          <Button
            className="w-100"
            variant="primary"
            type="submit"
            disabled={savingMessage}
          >
            <span className="d-flex align-items-center justify-content-center gap-2">
              Enviar
              {savingMessage && (
                <Spinner
                  animation="border"
                  role="status"
                  variant="light"
                  size="sm"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </span>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChatChannel;
