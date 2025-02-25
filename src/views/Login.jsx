import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const Login = () => {
  const navigate = useNavigate();
   //設定預設input會顯示的狀態
   const [account, setAccount] = useState({
    username: "example@test.com",
    password: "example"
  });
  
//修改input欄位的數值變更
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setAccount({
      ...account,
      [name]: value
    });
  };
  
//執行登入API，並儲存至cookie
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, account);
      const { token, expired } = res.data;
     // 將Token存到Cookie，並設定過期時間
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      // 所有axios的header加入token(這樣可以不用每個都輸入)
      axios.defaults.headers.common["Authorization"] = token;
      navigate("/admin/products");
      // setIsAuth(true);

    } catch (error) {
      
      // alert("登入失敗: " + error.response.data.message);
    }
  };
  //驗證登入API
  // const checkUserLogin = async () => {
  //   try {
  //     await axios.post(`${BASE_URL}/v2/api/user/check`);
  //     // setIsAuth(true); //轉換狀態已登入
  //     navigate("/admin/products");
  //   } catch (error) {
  //     alert(error.response.data.message);
  //     // navigate("/");
  //     // setIsAuth(false);
  //   }
  // };
  
  //初始執行checkUserLogin函式一次
  // useEffect(() => {
  //   //從cookie取得token變數
  //   const token = document.cookie.replace(
  //     /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
  //     "$1"
  //   );
  //   axios.defaults.headers.common["Authorization"] = token;
  //   checkUserLogin();
  // }, []);
  
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5">請先登入</h1>
      <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
        <div className="form-floating mb-3">
          <input
            name="username"
            value={account.username || ""}
            onChange={handleInputChange}
            type="email"
            className="form-control"
            id="username"
            placeholder="name@example.com"
          />
          <label htmlFor="username">Email address</label>
        </div>
        <div className="form-floating">
          <input
            name="password"
            value={account.password}
            onChange={handleInputChange}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <button className="btn btn-primary">登入</button>
      </form>
    </div>
    )
};

export default Login;