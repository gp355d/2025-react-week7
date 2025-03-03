import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { pushMessage } from "../slices/messageSlice"
import ReactLoading from 'react-loading';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductModal({
  modalMode,
  tempProduct,
  isProductModalOpen,
  setIsProductModalOpen,
  getProducts,
}) {
  const [screenLoading, setScreenLoading] = useState(false);
  const productModalRef = useRef(null);
  const fileInputRef = useRef(null);
  //防止直接修改外部傳入的tempProduct設定一個內部的modalData狀態
  const [modalData, setModalData] = useState({...tempProduct});
  //開啟產品modal
  useEffect(() => {
    if (isProductModalOpen) {
      const modalInstance = Modal.getInstance(productModalRef.current);
      modalInstance.show();
    }
  }, [isProductModalOpen]);

  const dispatch = useDispatch()
  //關閉產品modal
  const handleCloseProductModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.hide();
    setIsProductModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 清空圖片上傳的欄位
    }
    
  };

  // tempProduct更新時，更新modalData
  useEffect(() => {
    setModalData({
      ...tempProduct,
    });
    
  }, [tempProduct]);

  //判斷執行行為的為新增或更新的API
  const updateProduct = async (id) => {
    let product;
    if (modalMode === "edit") {
      product = `product/${id}`;
    } else {
      product = `product`;
    }
    setScreenLoading(true);
    const url = `${BASE_URL}/v2/api/${API_PATH}/admin/${product}`;
    const productData = {
      data: {
        ...modalData,
        origin_price: Number(modalData.origin_price),
        price: Number(modalData.price),
        is_enabled: modalData.is_enabled ? 1 : 0
      }
    }
  try {
    let res;
    if(modalMode === 'edit'){
      res = await axios.put(url,productData);
      // alert(res.data.message);
    }
    else{
      res = await axios.post(url, productData);
      // alert(res.data.message);
    };
    dispatch(
      pushMessage({
        text: `${modalMode === 'create' ? '新增' : '更新'}產品成功`,
        status: 'success',
      })
    );
    handleCloseProductModal();
    getProducts()
  } catch (error) {
    // alert(error.response.data.message);
    dispatch(
      pushMessage({
        text: `${error.response.data.message}`,
        status: 'error',
      })
    );
  }
  finally{
    setScreenLoading(false);
  }
}



  useEffect(() => {
    new Modal(productModalRef.current, {
      backdrop: false,
    });
  }, []);
//上傳圖片
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('fieldName', file);
    try {
      const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/upload`,  formData);
  
      const uploadImageUrl = res.data.imageUrl;
      // console.log(uploadImageUrl);
  
      setModalData({...modalData,
      imageUrl: uploadImageUrl
      })
      dispatch(
        pushMessage({
          text: `新增圖片成功`,
          status: 'success',
        })
      );
  } catch (error) {
    // alert(error.response.data.message);
    dispatch(
      pushMessage({
        text: `${error.response.data.message}`,
        status: 'error',
      })
    );
  }
  }
  //Modal表單內部input值的變更
  const handleModalInputChange = (e) => {
    const { value, name, checked, type } = e.target;

    setModalData({
      ...modalData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  //副圖網址的input欄位，輸入網址可替換圖片
  const handleImageChange = (e, index) => {
    const { value } = e.target;

    const newImages = [...modalData.imagesUrl];
    newImages[index] = value;

    setModalData({
      ...modalData,
      imagesUrl: newImages
    });
  };
  //新增附圖
  const handleAddImage = () => {
    const newImages = [...modalData.imagesUrl, ''];

    setModalData({
      ...modalData,
      imagesUrl: newImages,
    });
  };
  //移除附圖
  const handleRemoveImage = () => {
    const newImages = [...modalData.imagesUrl];

    newImages.pop();

    setModalData({
      ...modalData,
      imagesUrl: newImages,
    });
  };
  const handleUpdateProduct = async(id) => {
    updateProduct(id);
   }
  return (
<>
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
      <div ref={productModalRef} id="productModal" className="modal" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              <h5 className="modal-title fs-4">{modalMode!== 'edit' ? '新增產品' : '編輯產品'}</h5>
              <button onClick={handleCloseProductModal} type="button" className="btn-close" aria-label="Close"></button>
            </div>

            <div className="modal-body p-4">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="mb-4">
                  <div className="mb-5">
                      <label htmlFor="fileInput" className="form-label"> 圖片上傳 </label>
                      <input
                        onChange={handleFileChange}
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="form-control"
                        id="fileInput"
                        ref={fileInputRef}
                      />
                    </div>
                    <label htmlFor="primary-image" className="form-label">
                      主圖
                    </label>
                    <div className="input-group">
                      <input
                        value={modalData.imageUrl}
                        onChange={handleModalInputChange}
                        name="imageUrl"
                        type="url"
                        id="primary-image"
                        className="form-control"
                        placeholder="請輸入圖片連結"
                      />
                    </div>
                    <img
                      src={modalData.imageUrl}
                      alt={modalData.title}
                      className="img-fluid"
                    />
                  </div>

                  {/* 副圖 */}
                  <div className="border border-2 border-dashed rounded-3 p-3">
                    {modalData.imagesUrl?.map((image, index) => (
                      <div key={index} className="mb-2">
                        <label
                          htmlFor={`imagesUrl-${index + 1}`}
                          className="form-label"
                        >
                          副圖 {index + 1}
                        </label>
                        <input
                          value={image}
                          onChange={(e) => handleImageChange(e, index)}
                          id={`imagesUrl-${index + 1}`}
                          type="url"
                          placeholder={`圖片網址 ${index + 1}`}
                          className="form-control mb-2"
                        />
                        {image && (
                          <img
                            src={image}
                            alt={`副圖 ${index + 1}`}
                            className="img-fluid mb-2"
                          />
                        )}
                      </div>
                    ))}

                    <div className="btn-group w-100">
                      {/* 當附圖圖片張數小於5 && 最後一張有值時 */}
                      {modalData.imagesUrl.length < 5 && modalData.imagesUrl[modalData.imagesUrl.length - 1] !== '' && (
                        <button onClick={handleAddImage} className="btn btn-outline-primary btn-sm w-100">新增圖片</button>
                      )}
                      {/* {若有至少一張圖片} */}
                      {modalData.imagesUrl.length > 1 && (
                        <button onClick={handleRemoveImage} className="btn btn-outline-danger btn-sm w-100">取消圖片</button>
                      )}

                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      標題
                    </label>
                    <input
                      value={modalData.title}
                      onChange={handleModalInputChange}
                      name="title"
                      id="title"
                      type="text"
                      className="form-control"
                      placeholder="請輸入標題"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      分類
                    </label>
                    <input
                      value={modalData.category}
                      onChange={handleModalInputChange}
                      name="category"
                      id="category"
                      type="text"
                      className="form-control"
                      placeholder="請輸入分類"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="unit" className="form-label">
                      單位
                    </label>
                    <input
                      value={modalData.unit}
                      onChange={handleModalInputChange}
                      name="unit"
                      id="unit"
                      type="text"
                      className="form-control"
                      placeholder="請輸入單位"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                      產地
                    </label>
                    <input
                      value={modalData.country}
                      onChange={handleModalInputChange}
                      name="country"
                      id="country"
                      type="text"
                      className="form-control"
                      placeholder="請輸入產地"
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label htmlFor="origin_price" className="form-label">
                        原價
                      </label>
                      <input
                        value={modalData.origin_price}
                        onChange={handleModalInputChange}
                        name="origin_price"
                        id="origin_price"
                        type="number"
                        className="form-control"
                        placeholder="請輸入原價"
                        min="0"
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="price" className="form-label">
                        售價
                      </label>
                      <input
                        value={modalData.price}
                        onChange={handleModalInputChange}
                        name="price"
                        id="price"
                        type="number"
                        className="form-control"
                        placeholder="請輸入售價"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      產品描述
                    </label>
                    <textarea
                      value={modalData.description}
                      onChange={handleModalInputChange}
                      name="description"
                      id="description"
                      className="form-control"
                      rows={4}
                      placeholder="請輸入產品描述"
                    >
                    </textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      說明內容
                    </label>
                    <textarea
                      value={modalData.content}
                      onChange={handleModalInputChange}
                      name="content"
                      id="content"
                      className="form-control"
                      rows={4}
                      placeholder="請輸入說明內容"
                    ></textarea>
                  </div>

                  <div className="form-check">
                    <input
                      checked={modalData.is_enabled}
                      onChange={handleModalInputChange}
                      name="is_enabled"
                      type="checkbox"
                      className="form-check-input"
                      id="isEnabled"
                    />
                    <label className="form-check-label" htmlFor="isEnabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top bg-light">
              <button onClick={handleCloseProductModal} type="button" className="btn btn-secondary">
                取消
              </button>
              <button onClick={() => handleUpdateProduct(modalData.id)} type="button" className="btn btn-primary">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
      </>  )}
export default ProductModal;
