import { useState, useEffect } from "react";
import axios from "axios";
import api from "../Https/http-service";
import { useStateValue } from "../GlobalState/context";
export const useLoadingWithRefresh = () => {
  const [loading, setLoading] = useState(true);
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/refresh`,
          {
            withCredentials: true,
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        );
        dispatch({
          type: "SET_USER",
          user: data.user,
        });
        dispatch({
          type: "SET_Auth",
          isAuth: data.auth,
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);
  return { loading };
};
