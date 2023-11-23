import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authStatus) {
      navigate("/");
    }
    setLoader(false);
  }, [authentication, authStatus, navigate]);
  return loader ? <Loader /> : <>{children}</>;
};

export default AuthLayout;
