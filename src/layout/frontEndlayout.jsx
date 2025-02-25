import { Outlet, Link } from "react-router-dom";
import {useState} from "react";
const FrontEndLayout = () => {
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
              <Link className="nav-link active"to="/admin">首頁</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="product">產品頁面</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="cart">購物車頁面</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="login">登入頁面</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Outlet />
    </>  
  )
}
export default FrontEndLayout;