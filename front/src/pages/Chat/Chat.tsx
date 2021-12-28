import { Container } from 'react-bootstrap';
import ChatChannel from 'components/ChatChannel/ChatChannel';

const Chat = () => {
  return (
    <Container className="page-container">
      <h1 className="text-center mt-5 pt-4">Centro de Mensajes</h1>
      <ChatChannel />
    </Container>
  );
};

export default Chat;
