import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorage.service";
import { randomInt } from "../utils/randomInt";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const signIn = async ({ email, password }) => {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        switch (message) {
          case "INVALID_LOGIN_CREDENTIALS":
          case "INVALID_EMAIL":
            throw new Error("Email или пароль введены некорректно");
          default:
            throw new Error("Слишком много попыток входа. Попробуйте позднее");
        }
      }
    }
  };

  const logOut = () => {
    localStorageService.removeAuthData();
    setCurrentUser(null);
    history.push("/");
  };

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatar.iran.liara.run/public/boy?username=${(
          Math.random() + 1
        )
          .toString(36)
          .substring(7)}`,
        ...rest,
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует",
          };
          throw errorObject;
        }
      }
    }
  };

  const createUser = async (data) => {
    try {
      const { content } = await userService.create(data);
      console.log(content);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  const getUserData = async () => {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser, logOut }}>
      {!isLoading ? children : "Loading..."}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AuthProvider;
