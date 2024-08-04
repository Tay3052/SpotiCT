import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token =
        hash
          .substring(1)
          .split("&")
          .find((elem) => elem.startsWith("access_token"))
          ?.split("=")[1] ?? "";
      const expiresIn =
        hash
          .substring(1)
          .split("&")
          .find((elem) => elem.startsWith("expires_in"))
          ?.split("=")[1] ?? "";
      const expiryTime = new Date().getTime() + Number(expiresIn) * 1000;
      localStorage.setItem("token", token);
      localStorage.setItem("expiryTime", expiryTime.toString());
      navigate("/search"); // 検索ページにリダイレクト
    }
  }, [navigate]);

  return <div>Loading...</div>;
};
