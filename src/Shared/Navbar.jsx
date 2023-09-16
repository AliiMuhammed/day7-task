import React from "react";
import { Link } from "react-router-dom";
import "../Style/navbar.css"
function Navbar() {
  return (
    <>
      <nav>
        <div className="container">
          <Link className="logo" to={"/"}>
            MovieHub
          </Link>
          <div className="links">
            <ul>
              <li>
                <Link to={"/login"}>login</Link>
              </li>
              <li>
                <Link to={"/register"}>register</Link>
              </li>
              {/* <li>
                <Link to={"/logout"}>logout</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
