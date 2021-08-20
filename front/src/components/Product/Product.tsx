import { Button, Card } from "react-bootstrap"
import { IItemAPI } from "commons/interfaces"

interface IProps {
  product: IItemAPI
  handleToggleShowModal: (producto?: IItemAPI, action?: 'edit' | 'delete') => void
}

const Product = ({ product, handleToggleShowModal }: IProps) => {
  return (
    <Card>
      <Card.Img variant="top" src={`${product.foto}`} />
      <Card.Body>
        <div>
          <Card.Title>{product.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">${product.precio}</Card.Subtitle>
          <Card.Text>{product.descripcion}</Card.Text>
        </div>
        <div className="text-end mt-2">
          <Card.Text><small>{product.codigo}</small></Card.Text>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <Button variant="danger" onClick={() => handleToggleShowModal(product, 'delete')}>Eliminar</Button>
          <Button variant="primary" onClick={() => handleToggleShowModal(product, 'edit')}>Editar</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Product
