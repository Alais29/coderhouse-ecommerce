import AllOrders from 'components/AllOrders/AllOrders';
import ProductForm from 'components/ProductForm/ProductForm';
import SignupForm from 'components/SignupForm/SignupForm';
import { Tab, Tabs } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <>
      <h3 className="text-center mt-5">Dashboard</h3>
      <Tabs defaultActiveKey="productos" id="uncontrolled-tab-example">
        <Tab eventKey="productos" title="Agregar producto">
          <div className="bg-light p-3 border">
            <ProductForm />
          </div>
        </Tab>
        <Tab eventKey="usuarios" title="Agregar usuario">
          <div className="bg-light p-3 border">
            <SignupForm location="dashboard" />
          </div>
        </Tab>
        <Tab eventKey="ordenes" title="Ordenes">
          <div className="bg-light p-3 border">
            <AllOrders />
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default Dashboard;
