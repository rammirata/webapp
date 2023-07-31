import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const { accessToken } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
      if (!accessToken) {
        navigate("/");
      }
    }, [accessToken, navigate]);

    return <WrappedComponent {...props} />;
  };
}
