// Home.js
import React from "react";
import { NavLink } from "react-router-dom";


const Homeemp = () => {
    return (
        <nav className="navbar-container">
              <NavLink to="/homeemp" className="navbar-link">
            Home
          </NavLink>
          <NavLink to="/epreclamation" className="navbar-link">
            Reclamations
          </NavLink>
        
          <NavLink to="/" className="navbar-link">
            Logout
          </NavLink>
        </nav>
      );
    };

export default Homeemp;
