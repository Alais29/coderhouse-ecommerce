import { Col, Row, Table } from 'react-bootstrap';
import moment from 'moment';
import { useAppSelector } from 'hooks/redux';
import { IOrder } from 'commons/interfaces';
import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface IOrderInfo {
  order: IOrder;
}

const OrderInfo = ({ order }: IOrderInfo) => {
  const { data: userData } = useAppSelector(state => state.user);

  const total = order.productos.reduce((total, item) => {
    return (total += Number(item.producto.precio) * item.quantity);
  }, 0);

  const estado = order.estado.charAt(0).toUpperCase() + order.estado.slice(1);

  return (
    <div
      className={cx(styles['last-order'], 'border', 'p-3', 'rounded', 'mt-4')}
    >
      <Row>
        <Col md="12" lg="6">
          <h5>Información de tu pedido</h5>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Producto</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.productos.map(product => (
                  <tr>
                    <td>{product.quantity}</td>
                    <td>{product.producto.nombre}</td>
                    <td className="fw-bold">
                      ${Number(product.producto.precio) * product.quantity}
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan={2} className="text-end">
                  Total:
                </td>
                <td className="fw-bold">${total}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md="12" lg="6">
          <h5>Datos de la entrega:</h5>
          <ul>
            <li>
              <span className="fw-bold">Estado:</span> {estado}
            </li>
            <li>
              <span className="fw-bold">Entregar a:</span> {userData?.nombre}
            </li>
            <li>
              <span className="fw-bold">Email:</span> {userData?.email}
            </li>
            <li>
              <span className="fw-bold">Orden creada:</span>{' '}
              {moment(order.timestamp).format('DD/MM/YYYY, LT')}
            </li>
            <li>
              <span className="fw-bold">Dirección de entrega:</span>{' '}
              {order.direccionEntrega}
            </li>
            <li>
              <span className="fw-bold">Código Postal:</span>{' '}
              {order.codigoPostal}
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default OrderInfo;