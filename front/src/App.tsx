import { useEffect, useState } from 'react';
import { socket } from 'services/Socket'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IMessage } from 'commons/interfaces';
import Navigation from 'components/Navigation/Navigation';
import AddProduct from 'pages/AddProduct';
import Cart from 'pages/Cart';
import Productos from 'pages/Productos';
import Chat from 'pages/Chat';

const App = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  useEffect(() => {
    socket.on('messages', (data) => {
      setMessages(data)
    })
  }, [])
  return (
    <Router>
      <Navigation />
      <Container>
        <Switch>
          <Route path="/add-product">
            <AddProduct />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/chat">
            <Chat messages={messages} setMessages={setMessages} />
          </Route>
          <Route path="/">
            <Productos />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;