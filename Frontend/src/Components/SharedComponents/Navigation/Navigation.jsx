import React from "react";
import { Link } from "react-router-dom"; //Link tag will prevent from refreashing the entire page
import styles from "./Navigation.module.css"; //default export from the style module
import { logout } from "../../../Https/http-service";
import { useStateValue } from "../../../GlobalState/context";

const Navigation = () => {
  const [{ isAuth, user }, dispatch] = useStateValue();
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
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>
          {user.avatar && (
            <Link to="/">
              <img
                className={styles.avatar}
                src={user.avatar}
                width="40"
                heoght="40"
                alt="avatar"
              />
            </Link>
          )}

          <button className={styles.logoutButton} onClick={logOutUser}>
            <img src="/images/logout.png" alt="logout-icon" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

//As MODULED CSS dosen't effect the child component, we have used INLINE CSS to style the LINK component
