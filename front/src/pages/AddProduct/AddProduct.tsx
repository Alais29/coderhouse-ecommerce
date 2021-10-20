import { useState } from 'react';
import { IItem } from 'commons/interfaces';
import { addNewProduct } from 'features/products/productsSlice'
import { useAppDispatch } from 'hooks/redux'
import { ToastContainer, toast } from 'react-toastify';
import ProductForm from 'components/ProductForm/ProductForm'

const AddProduct = () => {
  const [addRequestStatus, setAddRequestStatus] = useState<"idle" | "loading">('idle')

  const dispatch = useAppDispatch();

  const handleSaveProduct = async (formValues: IItem, callback: () => void) => {
    try {
      setAddRequestStatus('loading')
      await dispatch(addNewProduct(formValues)).unwrap()
      callback()
      toast.success('El producto fue agregado con éxito')
    } catch (e) {
      toast.error(e.message)
    } finally {
      setAddRequestStatus('idle')
    }
  }

  return (
    <>
      <h1 className="text-center mt-5 pt-3">Agrega un producto</h1>
      <ToastContainer />
      <ProductForm
        handleSaveProduct={handleSaveProduct}
        addRequestStatus={addRequestStatus}
      />
    </>
  )
}

export default AddProduct
