import React from "react";
import { Link } from "react-router-dom"; //Link tag will prevent from refreashing the entire page
import styles from "./Navigation.module.css"; //default export from the style module
import { logout } from "../../../Https/http-service";
import { useStateValue } from "../../../GlobalState/context";

const Navigation = () => {
  const [{ isAuth }, dispatch] = useStateValue();
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeigth: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };
  const logoText = {
    marginLeft: "10px",
  };

  const logOutUser = async () => {
    try {
      const { data } = await logout();
      dispatch({
        type: "SET_AUTH_USER",
        isAuth: data.auth,
        user: data.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link to="/" style={brandStyle}>
        <img src="/images/Emoji-1.png" alt="Hand Logo" />
        <span style={logoText}>ConnectSepiens</span>
      </Link>
      {isAuth && <button onClick={logOutUser}>Logout</button>}
    </nav>
  );
};

export default Navigation;

//As MODULED CSS dosen't effect the child component, we have used INLINE CSS to style the LINK component
