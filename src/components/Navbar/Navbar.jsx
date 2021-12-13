import React from "react";
import cl from './Navbar.module.css';
import { NavLink } from "react-router-dom";

export const Navbar = () => (
   <nav className={cl.navbar}>
      <div className={cl.navbarBrand}>
         To Do App
      </div>
      <ul className={cl.navbarNav}>
         <li className={cl.navbarItem}>
            <NavLink
               className={cl.navLink}
               to="/"
               exact
            >
               HOME
            </NavLink>
         </li>
         <li className={cl.navbarItem}>
            <NavLink
               className={cl.navLink}
               to="/about"
            >
               ABOUT
            </NavLink>
         </li>
      </ul>
   </nav>
)
