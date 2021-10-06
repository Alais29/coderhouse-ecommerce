import { useState } from 'react'
import { IItem, IToastInfo } from 'commons/interfaces';
import { addNewProduct } from 'features/products/productsSlice'
import { useAppDispatch } from 'hooks/redux'
import ProductForm from 'components/ProductForm/ProductForm'
import Notification from 'components/Notification/Notification';

const AddProduct = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })

  const dispatch = useAppDispatch();

  const handleToggleShowToast = (info: IToastInfo = { text: '', type: '' }) => {
    if (info.text) {
      setToastInfo(info)
    }
    setShowToast(!showToast)
  }

  const handleSaveProduct = async (formValues: IItem, callback: () => void) => {
    try {
      await dispatch(addNewProduct(formValues)).unwrap()
      callback()
      handleToggleShowToast({ text: 'El producto fue agregado con éxito', type: 'success' })
    } catch (e) {
      handleToggleShowToast({ text: e.message, type: 'danger' })
    }
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
