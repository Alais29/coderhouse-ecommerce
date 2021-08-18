import { Dispatch, SetStateAction } from "react"
import { Button, Card } from "react-bootstrap"
import { IItemAPI, IToastInfo } from "../../commons/interfaces"
import { deleteProduct } from "../../services/Productos"

interface IProps {
  product: IItemAPI
  setProductos: Dispatch<SetStateAction<IItemAPI[]>>
  handleToggleShowToast: () => void
  setToastInfo: Dispatch<SetStateAction<IToastInfo>>
  handleToggleShowModal: () => void
}

const Product = ({ product, setProductos, handleToggleShowToast, setToastInfo, handleToggleShowModal }: IProps) => {

  const handleDelete = () => {
    // handleToggleShowModal()
    deleteProduct(product.id)
      .then((res) => {
        setProductos(res)
        handleToggleShowToast()
        setToastInfo({text: 'Producto eliminado con éxito', type: 'success'})
      })
  }

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
          <Button variant="danger" onClick={handleDelete}>Borrar</Button>
          <Button variant="primary">Editar</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Product
