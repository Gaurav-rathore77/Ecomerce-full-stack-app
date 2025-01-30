import React from "react";
import { NavLink } from "react-router-dom";
import {AiFillShopping} from "react-icons/ai"
import { useAuth } from "../../context/auth";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
<nav>
      <div class='w-full py-3 border-b'>

        <div class='flex justify-between px-20 items-center font-semibold'>
          <div>
            <h1 class="text-2xl flex items-center">  <AiFillShopping/>LOGO</h1>
          </div>
          <div class='flex xl:gap-10 md:gap-8  gap-2'>
            <NavLink to="/" >Home</NavLink>
           {
            !auth.user ? (
              <>
               <NavLink to="/Register">Resgister</NavLink>
            <NavLink to="/Login">Login</NavLink>
              </>
            ) : (
              <>
              <li className="nav-item dropdown">
                    <NavLink
                      // className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink to="/dashboard" className="dropdown-item">
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
              
              </>
            )
           }
            <NavLink to="/About">About</NavLink>
            <NavLink to="/Services">Services</NavLink>
          </div>
          <div>
            <button class='py-2 px-6 bg-black text-white rounded-3xl font-semibold'>Contact</button>
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default Header;
