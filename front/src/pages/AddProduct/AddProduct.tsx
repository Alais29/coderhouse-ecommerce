import { IItem } from 'commons/interfaces';
import { addNewProduct } from 'features/products/productsSlice'
import { useAppDispatch } from 'hooks/redux'
import { ToastContainer, toast } from 'react-toastify';
import ProductForm from 'components/ProductForm/ProductForm'

const AddProduct = () => {
  const dispatch = useAppDispatch();

  const handleSaveProduct = async (formValues: IItem, callback: () => void) => {
    try {
      await dispatch(addNewProduct(formValues)).unwrap()
      callback()
      toast.success('El producto fue agregado con éxito')
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <>
      <h1 className="text-center mt-5 pt-3">Agrega un producto</h1>
      <ToastContainer />
      <ProductForm
        handleSaveProduct={handleSaveProduct}
      />
    </>
  )
}

export default AddProduct
