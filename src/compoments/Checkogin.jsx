import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
  const BASE_URL = import.meta.env.VITE_BASE_URL;
const CheckLoin  = () =>{
  const navigate = useNavigate()
    const checkUserLogin = async () => {
      try {
        await axios.post(`${BASE_URL}/v2/api/user/check`);
        // setIsAuth(true); //轉換狀態已登入
        navigate("/admin/products");
      } catch (error) {
        alert(error.response.data.message);
        // setIsAuth(false);
      }
    };
    useEffect(() => {
        //從cookie取得token變數
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        );
        axios.defaults.headers.common["Authorization"] = token;
        if(token){
          checkUserLogin()
        }else{
          navigate("/login");
        }
      }, []);
}
export default CheckLoin;