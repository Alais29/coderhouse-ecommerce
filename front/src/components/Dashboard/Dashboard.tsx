import ProductForm from 'components/ProductForm/ProductForm';
import SignupForm from 'components/SignupForm/SignupForm';
import { Tab, Tabs } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <>
      <h3 className="text-center mt-5">Dashboard</h3>
      <Tabs
        defaultActiveKey="productos"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="productos" title="Agregar producto">
          <ProductForm />
        </Tab>
        <Tab eventKey="usuarios" title="Agregar usuario">
          <SignupForm location="dashboard" />
        </Tab>
      </Tabs>
    </>
  );
};

export default Dashboard;
