
import { Outlet,Link } from "react-router-dom";
import CheckLoin from "../compoments/Checkogin";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../Navbar.css'
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const BackEndlayout = () => {
const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => {
    try {
        await axios.post(`${BASE_URL}/v2/logout`);
        navigate("/login")
        alert("登出成功");
    } catch (error) {
        alert("登出失敗");
    }
  };
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Tea</a>
        <button 
          className="navbar-toggler" 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse collapse1 ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active"to="/admin">後台首頁</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="products">產品頁面</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="order">訂單頁面</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" onClick={handleLogout}>登出</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Outlet/>
    <CheckLoin/>
    </>
  )}
export default BackEndlayout;