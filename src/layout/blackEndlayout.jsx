
import { Outlet,Link } from "react-router-dom";
import CheckLoin from "../compoments/Checkogin";
import {useState} from "react";
import '../Navbar.css'

const BackEndlayout = () => {
  const [isOpen, setIsOpen] = useState(false);
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
              <Link className="nav-link active" href="order">訂單頁面</Link>
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