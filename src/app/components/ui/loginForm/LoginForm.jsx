import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField/TextField";
import CheckBoxField from "../../common/form/checkBoxField/checkBoxField";
import * as yup from "yup";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });
  const { signIn } = useAuth();
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);
  const history = useHistory();

  const handleChange = (target) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setEnterError(null);
  };

  const validateScheme = yup.object().shape({
    password: yup.string().required("Пароль обязателен для заполнения"),
    email: yup.string().required("Электронная почта обязательна для заполнения"),
  });

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
      await signIn(data);
      history.push(
        history.location.state
          ? history.location.state.from.pathname
          : "/"
      );
    } catch (error) {
      setEnterError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        id="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        id="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
        autocomplete="off"
      />
      <CheckBoxField
        value={data.stayOn}
        name="stayOn"
        onChange={handleChange}
      >
        Оставаться в системе
      </CheckBoxField>
      {enterError && <p className="text-danger">{enterError}</p>}
      <button
        type="submit"
        disabled={!isValid || enterError}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
