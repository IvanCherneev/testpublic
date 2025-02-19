import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField/TextField";
import CheckBoxField from "../../common/form/checkBoxField/checkBoxField";
import * as yup from "yup";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validateScheme = yup.object().shape({
    password: yup.string().required("Пароль обязателен для заполнения")
      .matches(/^(?=.*[A-Z])/, "Пароль должен содержать хотя бы одну заглавную букву")
      .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одно число")
      .matches(/(?=.*[!@#$%^&*])/, "Пароль должен содержать один из специальных символов !@#$%^&*")
      .matches(/(?=.{8,})/, "Пароль должен состоять минимум из 8 символов"),
    email: yup.string().required("Электронная почта обязательна для заполнения").email("Email введен некорректно"),
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
    console.log(data);
    console.log(errors);
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
