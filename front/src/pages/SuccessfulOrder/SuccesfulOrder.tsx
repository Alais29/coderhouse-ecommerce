import OrderInfo from 'components/OrderInfo/OrderInfo';

const SuccesfulOrder = () => {
  return (
    <div>
      <h1 className="text-center mt-5 pt-3 mb-">
        ¡Tu orden está siendo procesada!
      </h1>
      <OrderInfo />
    </div>
  );
};

export default SuccesfulOrder;
