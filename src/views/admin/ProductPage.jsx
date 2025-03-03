import { useEffect, useState, useRef} from "react";
import axios from "axios";
import ProductModal from "../../compoments/ProductModal";
import Pagination from "../../compoments/Pagination";
import DeleteProductModal from "../../compoments/DeleteProductModal";
import Toast from "../../compoments/Toast";
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckLoin from "../../compoments/Checkogin";
import ReactLoading from 'react-loading';
// import { Modal } from "bootstrap";
import { cookie as cookieData } from '../../slices/accountSlice';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
//設定預設初始資料狀狀態
const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""],
  country: "",
};

function ProductPage() {
  // const navigate = useNavigate();
  const [products, setProducts] = useState([]); //設定陣列初始狀態
  const [modalMode, setModalMode] = useState(null); //設定執行動作的狀態
  const [tempProduct, setTempProduct] = useState(defaultModalState);//將初始預設資料狀態賦予到tempProduct的狀態
  const [isProductModalOpen, setIsProductModalOpen] = useState(false); //產品Moda預設狀態
  const [isDelProductModalOpen, setIsDelProductModalOpen] = useState(false); //設定刪除Modal預設狀態
  // const modalRef = useRef(null);
  // const deleteRef = useRef(null);
  const [searchParams] = useSearchParams();
  const cookie = useSelector(cookieData);
  const [screenLoading, setScreenLoading] = useState(false);
  //取得後台產品資料(含分頁的資料)
  const getProducts = async (page = 1) => {
    setScreenLoading(true)
    try {
      const response = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      setProducts(response.data.products);   // 更新商品列表
      setPageInfo(response.data.pagination); //儲存頁數
    } catch (error) {
      setScreenLoading(false)
      alert(error.response.data.message);
    }
    finally{
      setScreenLoading(false)
    }
  };
  //判斷是編輯還是新增商品的動作，並傳入input的值
  const handleOpenProductModal = (mode, product) => {
    // const modalInstance = Modal.getInstance(modalRef.current);
    // console.log({...defaultModalState});
    
    // console.log(product);
    
    setModalMode(mode);
    if (mode === 'edit') {
      setTempProduct({...product});
    } else {
      setTempProduct({...defaultModalState});//偵測到tempProduct的變動
    }
    setIsProductModalOpen(true);
    // modalInstance.show();
  };
  
  const handleOpenDelProductModal = (product) => {
    setTempProduct(product); //為了顯示產品名稱，帶入data
    setIsDelProductModalOpen(true);
    // const modalInstance = Modal.getInstance(deleteRef.current);
    // modalInstance.show();
  };
  
  //分頁
  const [pageInfo, setPageInfo] = useState({}); // 設定儲存分頁資料的狀態
  useEffect(() => {
    getProducts()
  //   // new Modal(modalRef.current);
  //   // new Modal(deleteRef.current);
  },[]);
  // useEffect(() => {
  //   if (!cookie) {
  //     return;
  //   }
  //   axios.defaults.headers.common['Authorization'] = cookie;
  //   getProducts(searchParams.get('page') || 1);
  // }, [searchParams, cookie]);
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
    <div className="container py-5">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between">
              <h2>產品列表{}</h2>
              <button
                onClick={() => handleOpenProductModal("create")}
                type="button"
                className="btn btn-primary"
              >
                建立新的產品
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}元</td>
                    <td>{product.price}元</td>
                    <td>
                      {product.is_enabled ? (
                        <span className="text-success">啟用</span>
                      ) : (
                        <span>未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          onClick={() =>
                            handleOpenProductModal("edit", product)
                          }
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => {
                            handleOpenDelProductModal(product);
                          }}
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 分頁元件 */}
          <Pagination pageInfo={pageInfo} onPageChange={getProducts} />
        </div>
    {/* 產品Modal元件 */}
      <ProductModal
        modalMode={modalMode}
        tempProduct={tempProduct}
        isProductModalOpen={isProductModalOpen}
        setIsProductModalOpen={setIsProductModalOpen}
        getProducts={getProducts}
        // modalRef={modalRef}
      />
    {/* 刪除Modal元件 */}
      <DeleteProductModal
        getProducts={getProducts}
        // deleteRef={deleteRef}
        isDelProductModalOpen={isDelProductModalOpen}
        setIsDelProductModalOpen={setIsDelProductModalOpen}
        tempProduct={tempProduct}
      />
      </div>
      <Toast></Toast>
      <CheckLoin/>
    </>
  )
}
export default ProductPage;
