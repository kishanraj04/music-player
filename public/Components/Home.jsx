import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SiderBar from "./SiderBar";
import "../../src/index.css";
import Auth from "../../auth/Auth";
import setClientToken from "../../spotify";

function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = ""
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      localStorage.setItem("token", _token);
      setToken(_token)
      setClientToken(_token)
    }
    else
    {
      setToken(token)
      setClientToken(token)
    }
  }, []);

  return (
    token ? (
      <div className="main-body">
        <SiderBar />
        <div className="routing">
          <Outlet /> {/* Use Outlet as a component */}
        </div>
      </div>
    ) : (
      <Auth />
    )
  );
}  

export default Home;
