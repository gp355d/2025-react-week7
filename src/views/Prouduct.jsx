import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';
// import { Modal } from "bootstrap";



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


  
const Prouduct = () => {
  // useEffect(() => {
  //   new Modal(productModalRef.current, { backdrop: false });
  // }, []);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // const [pageInfo, setPageInfo] = useState({});
  // const [tempProduct, setTempProduct] = useState([]);
  const [screenLoading, setScreenLoading] = useState(false);//全螢幕讀取畫面效果，預設為false
  const [isLoading, setIsLoading] = useState(false)//讀取效果，預設為false
  // const productModalRef = useRef(null);
  // const [qtySelect, setQtySelect] = useState(1);

  const getProducts = async () => {
    setScreenLoading(true)
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
      setProducts(res.data.products);
      // console.log(res.data.products);
      
      // setPageInfo(res.data.pagination)
    } catch (error) {
      alert('fff'+error.res.data);
    }
    finally{
      setScreenLoading(false)
    }
  };
  const handleViewMore = async(id) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/product/${id}`);
      navigate(`/product/${id}`, { state: { productData: res.data } });
      console.log(res.data);
    } catch (error) {
      console.error("取得產品資料失敗", error);
    }
  };
  // const handleSeeMore = (product) => {
  //   setTempProduct(product);
  //   openModal();
  // };
  // const openModal = () => {
  //   const modalInstance = Modal.getInstance(productModalRef.current);
  //   modalInstance.show();
  // };

  // const closeModal = () => {
  //   const modalInstance = Modal.getInstance(productModalRef.current);
  //   modalInstance.hide();
  // };
  // const handlePageChange = (page,event) => {
  //   event.preventDefault();
  //   getProducts(page); //將頁數資料傳入
  // };




  useEffect(() => {
    getProducts();
    // getCart();
  }, []);
  return (
  <div className="container mt-4">
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
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-3" key={product.id}>
              <div className="card">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    {product.description}
                  </p>
                  <p className="card-text">
                    <strong>價格:</strong> {product.price} 元
                  </p>
                  <p className="card-text">
                    <small className="text-muted">單位: {product.unit}</small>
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewMore(product.id)}
                  >
                    查看更多
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
  </div>
  
  )}
export default Prouduct;