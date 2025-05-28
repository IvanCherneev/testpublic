import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField/TextField";
import SelectField from "../../common/form/selectField/SelectField";
import RadioField from "../../common/form/radioField/RadioField";
import MultiSelectField from "../../common/form/multiSelectField/MultiSelectField";
import CheckBoxField from "../../common/form/checkBoxField/checkBoxField";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    name: "",
    qualities: [],
    license: false,
  });
  const { signUp } = useAuth();
  const [errors, setErrors] = useState({});
  const { qualities } = useQualities();
  const qualitiesList = qualities.map(quality => ({
    label: quality.name,
    value: quality._id,
  }));
  const { professions } = useProfessions();
  const professionsList = professions.map(profession => ({
    label: profession.name,
    value: profession._id,
  }));

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
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      min: {
        message: "Имя должно состоять минимум из 3 символов",
        value: 3,
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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
      qualities: data.qualities.map(quality => quality.value),
    };

    try {
      await signUp(newData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
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
          label="Имя"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
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
          name="profession"
          defaultOption="Choose..."
          options={professionsList}
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
          options={qualitiesList}
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
