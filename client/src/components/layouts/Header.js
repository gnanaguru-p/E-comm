import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { DropdownButton, Dropdown, Image } from "react-bootstrap";
import { logout } from "../../actions/userActions";
import { BiCart, BiLogIn } from "react-icons/bi";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout);
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img width="150px" alt="Guru E-comm Logo" src="/images/logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle
              variant="default text-white pr-5"
              id="dropdown-basic"
            >
              <figure className="avatar avatar-nav">
                <Image
                  width="50px"
                  src={user.avatar ?? "./images/default_avatar.png"}
                />
              </figure>
              <span>{user.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {user.role === "admin" && (
                <Dropdown.Item
                  onClick={() => {
                    navigate("admin/dashboard");
                  }}
                  className="text-dark"
                >
                  Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item
                onClick={() => {
                  navigate("/myprofile");
                }}
                className="text-dark"
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate("/orders");
                }}
                className="text-dark"
              >
                Orders
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler} className="text-danger">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/login">
            <BiLogIn
              className="icon"
              style={{ fontSize: "35px", color: "white" }}
            />
          </Link>
        )}

        <Link to="/cart" style={{ marginLeft: "20px" }}>
          <BiCart
            className="icon"
            style={{ fontSize: "35px", color: "white" }}
          />
        </Link>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
          {cartItems.length}
        </span>
      </div>
    </nav>
  );
}
