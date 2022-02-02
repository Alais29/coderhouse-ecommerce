import { useState, useEffect } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { isEmpty } from 'utilities/others';
import { IItemAPI } from 'commons/interfaces';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  fetchProducts,
  removeProductApi,
  removeProduct,
} from 'features/products/productsSlice';
import {
  addProductToCart,
  fetchProductsCart,
  removeProductCart,
} from 'features/cart/cartSlice';
import ConfirmationModal from 'components/Modals/ConfirmationModal/ConfirmationModal';
import ProductList from 'components/ProductList/ProductList';
import EditModal from 'components/Modals/EditModal/EditModal';
import Filter from 'components/Filter/Filter';
import LoadingData from 'components/LoadingData/LoadingData';

const Productos = () => {
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<IItemAPI | null>(null);
  const [productToEdit, setProductToEdit] = useState<IItemAPI | null>(null);
  const [deleteRequestStatus, setDeleteRequestStatus] = useState<
    'idle' | 'loading'
  >('idle');
  const [addToCartRequestStatus, setAddToCartRequestStatus] = useState<
    'idle' | 'loading'
  >('idle');

  const { data, status, error } = useAppSelector(state => state.products);
  const { status: statusCart, error: errorCart } = useAppSelector(
    state => state.cart,
  );
  const dispatch = useAppDispatch();

  const handleToggleShowModal = (
    producto?: IItemAPI,
    action?: 'edit' | 'delete',
  ) => {
    if (producto && action === 'delete') {
      setProductToDelete(producto);
      setProductToEdit(null);
    }
    if (producto && action === 'edit') {
      setProductToEdit(producto);
      setProductToDelete(null);
    }
    setShowModal(prevState => !prevState);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        setDeleteRequestStatus('loading');
        await dispatch(removeProductApi(productToDelete.id)).unwrap();
        dispatch(removeProduct(productToDelete.id));
        dispatch(removeProductCart(productToDelete.id));
        handleToggleShowModal();
        toast.success(`${productToDelete.nombre} eliminado con éxito`);
        setTimeout(() => {
          // since the modal only shows if there's a product to edit in productToDelete state, this setTimeout is to wait for the modal to do the closing animation before setting the productToDelete state to null, otherwise the modal will dissappear abruptly
          setProductToDelete(null);
        }, 1000);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setDeleteRequestStatus('idle');
      }
    }
  };

  const handleAddToCart = async (producto: IItemAPI) => {
    try {
      setAddToCartRequestStatus('loading');
      disableBodyScroll(document.body);
      await dispatch(addProductToCart(producto.id)).unwrap();
      toast.success(`${producto.nombre} agregado al carrito`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setAddToCartRequestStatus('idle');
      enableBodyScroll(document.body);
    }
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    } else if (status === 'failed') {
      toast.error(error);
    }
  }, [status, dispatch, error]);

  useEffect(() => {
    if (statusCart === 'idle') {
      dispatch(fetchProductsCart());
    } else if (statusCart === 'failed') {
      toast.error(errorCart);
    }
  }, [statusCart, dispatch, errorCart]);

  return (
    <Container className="page-container">
      <h1 className="text-center pt-3">Productos</h1>
      <Filter />
      {(isEmpty(data) || status === 'loading') && (
        <LoadingData
          mode={'partial'}
          style={{ height: 'calc(100vh - 368px)' }}
        />
      )}
      {isEmpty(data) && status === 'succeeded' && (
        <div className="text-center pt-4">
          <h2>
            No se encontraron productos, intenta con otros parámetros de
            búsqueda
          </h2>
        </div>
      )}
      {!isEmpty(data) && status === 'succeeded' && (
        <ProductList
          location="home"
          productos={data}
          handleToggleShowModal={handleToggleShowModal}
          handleAddToCart={handleAddToCart}
        />
      )}
      <Modal show={showModal} onHide={() => handleToggleShowModal()}>
        {productToDelete && (
          <ConfirmationModal
            productToDelete={productToDelete}
            handleConfirmDelete={handleConfirmDelete}
            handleToggleShowModal={handleToggleShowModal}
            deleteRequestStatus={deleteRequestStatus}
          />
        )}
        {productToEdit && (
          <EditModal
            setProductToEdit={setProductToEdit}
            productToEdit={productToEdit}
            handleToggleShowModal={handleToggleShowModal}
          />
        )}
      </Modal>
      {addToCartRequestStatus === 'loading' && (
        <LoadingData
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 2000 }}
          mode="fullscreen"
        />
      )}
    </Container>
  );
};

export default Productos;
