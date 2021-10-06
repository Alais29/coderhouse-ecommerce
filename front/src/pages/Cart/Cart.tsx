import { useEffect, useState } from 'react'
import { IItemAPI, IToastInfo } from 'commons/interfaces'
import { deleteCarritoProduct, getCarritoProducts } from 'services/Carrito'
import { isEmpty } from 'utilities/others'
import { Link } from 'react-router-dom'
import ProductList from 'components/ProductList/ProductList'
import Notification from 'components/Notification/Notification'

const Cart = () => {
  const [productos, setProductos] = useState<IItemAPI[]>([])
  const [total, setTotal] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })

  const handleToggleShowToast = (info?: IToastInfo) => {
    setShowToast(!showToast)
    info && setToastInfo(info)
  }

  const handleRemove = (id: string) => {
    deleteCarritoProduct(id)
      .then((products) => {
        setProductos(products)
      })
      .catch((e) => {
        handleToggleShowToast({ text: e.message, type: 'warning'})
      })
  }

  useEffect(() => {
    getCarritoProducts()
      .then(products => {
        setProductos(products)
      })
      .catch((e) => {
        setToastInfo({ text: e.message, type: 'danger' })
      })
  }, [])

  useEffect(() => {
    const totalCost = productos.reduce((total, product) => {
      return total += Number(product.precio)
    }, 0)
    setTotal(totalCost)
  }, [productos])


  return (
    <>
      <h1 className="text-center mt-5 pt-3 mb-">Carrito</h1>
      <Notification show={showToast} handleToggleShowToast={handleToggleShowToast} toastInfo={toastInfo} />
      <ProductList productos={productos} location="cart" handleRemove={handleRemove} />
      {isEmpty(productos) ?
        <div className="text-center">
          <h2>El carrito está vacío</h2>
          <p className="display-6">Agrega algunos productos</p>
          <Link to='/' className="btn btn-primary">Ir a inicio</Link>
        </div>
        : <div className="d-flex justify-content-end">
          <p className="border rounded p-4">
            <span className="fw-bold">Total:</span> ${total}
          </p>
        </div>
      }
    </>
  )
}

export default Cart
