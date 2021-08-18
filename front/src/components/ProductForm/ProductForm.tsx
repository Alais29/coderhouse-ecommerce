import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { IToastInfo } from '../../commons/interfaces';
import { saveProduct } from '../../services/Productos';
import Notification from '../Notification/Notification';

const ProductForm = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })
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

  const handleToggleShow = () => setShowToast(!showToast)

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    saveProduct(formValues)
      .then(() => {
        setFormValues({
          codigo: '',
          nombre: '',
          descripcion: '',
          precio: '',
          stock: '',
          foto: ''
        })
        setToastInfo({ text: 'El producto fue agregado con éxito', type: 'success' })
        handleToggleShow()
      })
      .catch((e) => {
        setToastInfo({ text: e.message, type: 'danger' })
        handleToggleShow()
      })
  }

  return (
    <>
      <Notification show={showToast} toggleShow={handleToggleShow} toastInfo={toastInfo} />
      <h1 className="text-center mt-5 pt-3">Agrega un producto</h1>
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
        <Button type="submit" className="mb-2">
          Guardar
        </Button>
      </Form>
    </>
  )
}

export default ProductForm
