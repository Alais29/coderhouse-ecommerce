import { useState } from 'react'
import ProductForm from 'components/ProductForm/ProductForm'
import Notification from 'components/Notification/Notification';
import { IItem, IToastInfo } from 'commons/interfaces';
import { saveProduct } from 'services/Productos';

const AddProduct = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })

  const handleToggleShowToast = (info: IToastInfo = { text: '', type: '' }) => {
    if (info.text) {
      setToastInfo(info)
    }
    setShowToast(!showToast)
  }

  const handleSaveProduct = (formValues: IItem, callback: () => void) => {
    saveProduct(formValues)
      .then(() => {
        callback()
        handleToggleShowToast({ text: 'El producto fue agregado con éxito', type: 'success' })
      })
      .catch((e) => {
        handleToggleShowToast({ text: e.message, type: 'danger' })
      })
  }

  return (
    <>
      <h1 className="text-center mt-5 pt-3">Agrega un producto</h1>
      <Notification
        show={showToast}
        handleToggleShowToast={handleToggleShowToast}
        toastInfo={toastInfo} />
      <ProductForm
        handleSaveProduct={handleSaveProduct}
      />
    </>
  )
}

export default AddProduct
