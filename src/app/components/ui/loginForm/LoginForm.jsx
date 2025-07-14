import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField/TextField";
import CheckBoxField from "../../common/form/checkBoxField/checkBoxField";
import * as yup from "yup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, logIn } from "../../../store/users";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });
  const loginError = useSelector(getAuthErrors());
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (target) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const redirect = history.location.state ? history.location.state.from.pathname : "/";

    dispatch(logIn({ payload: data, redirect }));
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
      {loginError && <p className="text-danger">{loginError}</p>}
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
