import React from "react";
import { Outlet } from "react-router-dom";
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = ()=>{
    return(
        <div className="mx-[10vw]">
           <Header/>
           <Outlet/>
           <Footer/>
        </div>
    )
}

export default Layout;
