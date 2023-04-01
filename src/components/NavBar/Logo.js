import React from "react";
import { Link } from "react-router-dom";
import undCon from './undCon.png'


export default function Logo (props) {
    return(
      <div className="Navbar-logo">   <Link to="/"><div className="Navbar-log"> <img src={undCon} alt="Logo"/></div></Link> </div>
    )
}

