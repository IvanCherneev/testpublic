import React, { useState } from "react";
import LoginForm from "../../components/ui/loginForm/LoginForm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import RegisterForm from "../../components/ui/registerForm/RegisterForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === "register" ? type : "login");

  const toogleFormType = () => {
    setFormType(prevState => prevState === "register" ? "login" : "register");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "register"
            ? <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm />
              <p>Already have account? <a role="button" onClick={toogleFormType}>Sign In</a></p>
            </>
            : <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p>Dont have account? <a role="button" onClick={toogleFormType}>Sign Up</a></p>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
