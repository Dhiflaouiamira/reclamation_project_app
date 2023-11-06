// Home.js
import React from "react";
import { NavLink } from "react-router-dom";


const Homeemp = () => {
    return (
     < div>
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
         <h2>Welcome to the Employee Page</h2>
         </div>
      );
    };

export default Homeemp;
