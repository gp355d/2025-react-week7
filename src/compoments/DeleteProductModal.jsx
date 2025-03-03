import { useEffect,useRef, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch } from 'react-redux';
import { pushMessage } from '../slices/messageSlice';
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DeleteProductModal({
  getProducts,
  isDelProductModalOpen,
  setIsDelProductModalOpen,
  tempProduct,
}) {
  const [screenLoading, setScreenLoading] = useState(false);
  const delProductModalRef = useRef(null);
  const dispatch = useDispatch();
  const handleDeleteProduct = async (id) => {
    deleteProduct(id);
  }
  const handleCloseDelProductModal = () => {
  const modalInstance = Modal.getInstance(delProductModalRef.current);
    modalInstance.hide();
  }
  //設定modal不能被點擊空白處關閉
  useEffect(() => {
    new Modal(delProductModalRef.current, {
      backdrop: false
    });
  }, []);

  //開啟刪除Modal
  useEffect(() => {
    if (isDelProductModalOpen) {
      const modalInstance = Modal.getInstance(delProductModalRef.current);
      modalInstance.show();
    }
    setIsDelProductModalOpen(false); // 開啟Modal後重置開啟狀態(避免反覆觸發)
  }, [isDelProductModalOpen]);

  //刪除產品API
  const deleteProduct = async (id) => {
    setScreenLoading(true);
    try {
      let res = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${id}`);
      handleCloseDelProductModal();
      getProducts();
      // alert(res.data.message);
      dispatch(
        pushMessage({
          text: `刪除產品成功`,
          status: 'success',
        })
      );
    } catch (error) {
      // alert("刪除失敗", error.response.data.message);;
      dispatch(
        pushMessage({
          text: `刪除產品失敗`,
          status: 'error',
        })
      );
    }
    finally{
      setScreenLoading(false);
    }
  }
  return (
    
    <div
    ref={delProductModalRef}
    className="modal fade"
    id="delProductModal"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    {screenLoading && (<div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(255,255,255,0.3)",
              zIndex: 999,
            }}
          >
            <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
          </div>)}
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5">刪除產品</h1>
          <button
            onClick={handleCloseDelProductModal}
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          你是否要刪除
          <span className="text-danger fw-bold">{tempProduct.title}</span>
        </div>
        <div className="modal-footer">
          <button
            onClick={handleCloseDelProductModal}
            type="button"
            className="btn btn-secondary"
          >
            取消
          </button>
          <button onClick={() => handleDeleteProduct(tempProduct.id)} type="button" className="btn btn-danger">
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
export default DeleteProductModal;