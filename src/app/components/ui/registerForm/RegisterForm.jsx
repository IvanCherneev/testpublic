import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField/TextField";
import API from "../../../api";
import SelectField from "../../common/form/selectField/SelectField";
import RadioField from "../../common/form/radioField/RadioField";
import MultiSelectField from "../../common/form/multiSelectField/MultiSelectField";
import CheckBoxField from "../../common/form/checkBoxField/checkBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false,
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      const professionsList = data.map((item) => ({
        label: item.name,
        value: item._id,
      }));
      setProfessions(professionsList);
    });

    API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color,
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const handleChange = (target) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число",
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите вашу профессию",
      },
    },
    license: {
      isRequired: {
        message: "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
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

  if (professions && Object.keys(qualities).length > 0) {
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
        <SelectField
          label="Выберите вашу профессию"
          name="professions"
          defaultOption="Choose..."
          options={professions}
          onChange={handleChange}
          value={data.profession}
          error={errors.profession}
        />
        <RadioField
          options={[
            { name: "Male", value: "male" },
            { name: "Female", value: "female" },
            { name: "Other", value: "other" },
          ]}
          value={data.sex}
          name="sex"
          onChange={handleChange}
          label="Выберите ваш пол"
        />
        <MultiSelectField
          options={qualities}
          onChange={handleChange}
          name="qualities"
          defaultValue={data.qualities}
          label="Выберите ваши качества"
        />
        <CheckBoxField
          value={data.license}
          name="license"
          onChange={handleChange}
          error={errors.license}
        >
          Подтвердить <a>лицензионное соглашение</a>
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
  } else {
    return <p>Loading...</p>;
  }
};

export default RegisterForm;
