import { IMessage } from 'commons/interfaces';
import ChatChannel from 'components/ChatChannel/ChatChannel';

interface IChat {
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

const Chat = ({ messages, setMessages }: IChat) => {
  return (
    <>
      <h1 className="text-center mt-5 pt-4">Centro de Mensajes</h1>
      <ChatChannel messages={messages} setMessages={setMessages} />
    </>
  );
};

export default Chat;
