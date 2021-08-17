import React, { Dispatch, SetStateAction, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { IItemAPI, IAlert } from '../../commons/interfaces';
import { saveProduct } from '../../services/Productos';

interface IProductForm {
  setProductos: Dispatch<SetStateAction<IItemAPI[]>>
  productos: IItemAPI[]
}

const ProductForm = ({ productos, setProductos }: IProductForm) => {
  const [alert, setAlert] = useState<IAlert>({show: false, text: ''})
  const [formValues, setFormValues] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    foto: ''
  });
  const {codigo, nombre, descripcion, precio, stock, foto} = formValues

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    saveProduct(formValues)
      .then((newProduct) => {
        setProductos([
          ...productos,
          newProduct
        ])
        setFormValues({
          codigo: '',
          nombre: '',
          descripcion: '',
          precio: '',
          stock: '',
          foto: ''
        })
        setAlert({ show: false, text: '' })
      })
      .catch((e) => {
        setAlert({ show: true, text: e.message })
      })
  }

  return (
    <>
      <h1 className="text-center">Agrega un producto</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="codigo">
          <Form.Label>Código</Form.Label>
          <Form.Control type="text" value={codigo} name="codigo" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={nombre} name="nombre" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="textarea" value={descripcion} name="descripcion" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="precio">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="text" value={precio} name="precio" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="text" value={stock} name="stock" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="foto">
          <Form.Label>URL de imagen</Form.Label>
          <Form.Control type="url" value={foto} name="foto" onChange={handleChange} />
        </Form.Group>
        {alert.show && <Alert variant="danger">{alert.text}</Alert>}
        <Button type="submit" className="mb-2">
          Guardar
        </Button>
      </Form>
    </>
  )
}

export default ProductForm
