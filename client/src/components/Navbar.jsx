import React, { useEffect,useContext } from "react";
import { Link, useHistory,useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo1.jpg";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
          {/* <span>{currentUser?.username}</span> */}
          {/* {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )} */}
        <div className="link1">
          {currentUser && (
            <>
              <Link to="/update">
                <span>{currentUser?.username}</span>
              </Link>
              <span onClick={logout}>Logout</span>
            </>
          )}
          {!currentUser && (
            <Link  to="/login">
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;