import { useEffect, useState } from 'react'
import { IToastInfo } from 'commons/interfaces'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { fetchProductsCart, removeProductCart } from 'features/cart/cartSlice'
import { isEmpty } from 'utilities/others'
import { Link } from 'react-router-dom'
import ProductList from 'components/ProductList/ProductList'
import Notification from 'components/Notification/Notification'

const Cart = () => {
  const [total, setTotal] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })

  const { data, status, error } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleToggleShowToast = (info?: IToastInfo) => {
    setShowToast((prevState) => !prevState)
    info && setToastInfo(info)
  }

  const handleRemove = async (id: string) => {
    try {
      await dispatch(removeProductCart(id)).unwrap()
    } catch (e) {
      handleToggleShowToast({ text: e.message, type: 'warning'})
    }
  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsCart())
    }
    if (status === 'failed') {
      setToastInfo({ text: error || 'Ocurrió un error', type: 'danger' })
    }
  }, [dispatch, status, error])

  useEffect(() => {
    const totalCost = data.reduce((total, product) => {
      return total += Number(product.precio)
    }, 0)
    setTotal(totalCost)
  }, [data])


  return (
    <>
      <h1 className="text-center mt-5 pt-3 mb-">Carrito</h1>
      <Notification show={showToast} handleToggleShowToast={handleToggleShowToast} toastInfo={toastInfo} />
      <ProductList productos={data} location="cart" handleRemove={handleRemove} />
      {isEmpty(data) ?
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
