import { useAppSelector } from 'hooks/redux';
import cx from 'classnames/bind';
import styles from './styles.module.scss';
import { Col, Row, Table } from 'react-bootstrap';
import moment from 'moment';

const OrderInfo = () => {
  const { lastOrder } = useAppSelector(state => state.orders);

  const total = lastOrder?.productos.reduce((total, item) => {
    return (total += Number(item.producto.precio) * item.quantity);
  }, 0);

  const estado = lastOrder
    ? lastOrder?.estado.charAt(0).toUpperCase() + lastOrder?.estado.slice(1)
    : '';

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
              {lastOrder &&
                lastOrder.productos.map(product => (
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
              <span className="fw-bold">Entregar a:</span>{' '}
              {lastOrder?.user.nombre}
            </li>
            <li>
              <span className="fw-bold">Email:</span> {lastOrder?.user.email}
            </li>
            <li>
              <span className="fw-bold">Orden creada:</span>{' '}
              {moment(lastOrder?.timestamp).format('DD/MM/YYYY, LT')}
            </li>
            <li>
              <span className="fw-bold">Estado:</span> {estado}
            </li>
            <li>
              <span className="fw-bold">Dirección de entrega:</span>{' '}
              {lastOrder?.direccionEntrega}
            </li>
            <li>
              <span className="fw-bold">Código Postal:</span>{' '}
              {lastOrder?.codigoPostal}
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default OrderInfo;
