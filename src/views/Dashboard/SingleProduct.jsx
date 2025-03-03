// import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from 'react-loading';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const SingleProduct = () => {
  const [screenLoading, setScreenLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(1);
  const [cart, setCart] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const {id:product_id} = useParams();
  
  useEffect(()=>{
    const getProduct = async () => {
      setScreenLoading(true)
      try {
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${product_id}`);
        setProduct(res.data.product);
        // console.log(res.data.products);
        
        // setPageInfo(res.data.pagination)
      } catch (error) {
        alert(error.response.data);
      }
      finally{
        setScreenLoading(false)
      }
    };
    getProduct();
  },[])
  const addCartItem = async(product_id, qty) => {
    setIsLoading(true)
    try {
      const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`,{
        data:{
          product_id,
          qty: Number(qty)
        }
      })
      
      getCart();
      alert(res.data.message)
    } catch (error) {
      alert(error.response.data)
    }
    finally{
      setIsLoading(false)
    }
  }
  const getCart = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
    // console.log(res.data.data);
    
    setCart(res.data.data)
  } catch (error) {
    alert(error.response.data)
  }
}
  // const location = useLocation();
  // const product = location.state?.productData.product;
  // if (!product) {
  //   return <div>沒有可用的產品資料。</div>;
  // }

  return (
    <div className="container mt-5">
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
        <div className="col-6">
          <img className="img-fluid" src={product.imageUrl} alt={product.title} />
        </div>
        <div className="col-6">
          <div className="d-flex align-items-center gap-2">
            <h2>{product.title}</h2>
            <span className="badge text-bg-success">{product.category}</span>
          </div>
          <p className="mb-3">{product.description}</p>
          <p className="mb-3">{product.content}</p>
          <h5 className="mb-3">NT$ {product.price}元</h5>
          <div className="input-group align-items-center w-75">
            <select
              value={qtySelect}
              onChange={(e) => setQtySelect(e.target.value)}
              id="qtySelect"
              className="form-select"
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <button type="button" disabled={isLoading} onClick={()=> addCartItem(product.id, qtySelect)} className="btn btn-primary d-flex align-items-center">
              <div>加入購物車</div>{isLoading && <ReactLoading
                  type={"spin"}
                  color={"#000"}
                  height={"1.5rem"}
                  width={"1.5rem"}
                  />}
            </button>
          </div>
        </div>
      </div>
    </div>

    // <div className="container mt-4">
    //   <div className="card" style={{ width: "18rem" }}>
    //     <img
    //       src={product.imageUrl}
    //       className="card-img-top"
    //       alt={product.title}
    //     />
    //     <div className="card-body">
    //       <h5 className="card-title">{product.title}</h5>
    //       <p className="card-text">
    //         {product.description}
    //       </p>
    //       <p className="card-text">
    //         <strong>分類:</strong> {product.category}
    //       </p>
    //       <p className="card-text">
    //         <strong>單位:</strong> {product.unit}
    //       </p>
    //       <p className="card-text">
    //         <strong>原價:</strong> {product.origin_price} 元
    //       </p>
    //       <p className="card-text">
    //         <strong>現價:</strong> {product.price} 元
    //       </p>
    //       <button className="btn btn-primary">立即購買</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SingleProduct;