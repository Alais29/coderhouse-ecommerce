import ProductForm from 'components/ProductForm/ProductForm';
import SignupForm from 'components/SignupForm/SignupForm';
import { Col, Nav, Row, Tab } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <>
      <h3 className="text-center mt-5 pt-4">Dashboard</h3>
      <Tab.Container id="left-tabs-example" defaultActiveKey="productos">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="productos">Administrar productos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="usuarios">Agregar usuario</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="productos">
                <ProductForm />
              </Tab.Pane>
              <Tab.Pane eventKey="usuarios">
                <SignupForm location="dashboard" />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default Dashboard;
