import React from "react";
import styles from "./Home.module.css";
import { Link,useHistory } from "react-router-dom";
import Card from "../../Components/SharedComponents/Card/Card";
import Button from "../../Components/SharedComponents/Button/Button";


const HomePage = () => {
  const history = useHistory();//This hook is provided by react-router-dom.This is used to redirect
  const signInLink = {
    color: "0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft:"10px"
  }

  const startRegistration = () => { 
    history.push('/authenticate');
    console.log("button clicked");
  }


  return (
    <div className={styles.cardWrapper}>
      <Card title={"Welcome to ConnectSapiens!"} icon={"/images/Emoji-1.png"}>
        <div className={styles.card}>
        <p className={styles.text}>
          Hello Sapien! Let’s get connect with other sapiens around the world to
          create a better World.
        </p>
        <div>
            <Button onClick={ startRegistration} text={"Let's Go"}/>
        </div>
          <div className={ styles.signinWrapper}>
            <span className={ styles.hasInvite}>Have an invite text?</span>
        </div>
      </div>
      </Card>
    </div>
  );
};

export default HomePage;
