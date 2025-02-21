import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import API from "../../../api";
import FormComponent, { SelectField, TextField, RadioField, MultiSelectField } from "../../common/form";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: [],
  });
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];

    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color,
          });
        }
      }
    }

    return qualitiesArray;
  };

  const handleSubmit = (data) => {
    const { profession, qualities } = data;

    API.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then((data) => history.push(`/users/${data._id}`));

    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities),
    });
  };

  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }));
  };

  useEffect(() => {
    setIsLoading(true);
    API.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: transformData(qualities),
        profession: profession._id,
      }))
    );

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

  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

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
        message: "Введите ваше имя",
      },
    },
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && professions.length > 0
            ? <FormComponent
              onSubmit={handleSubmit}
              validatorConfig={validatorConfig}
              defaultData={data}
            >
              <TextField
                label="Имя"
                name="name"
              />
              <TextField
                label="Электронная почта"
                name="email"
              />
              <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professions}
                name="profession"
              />
              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" },
                ]}
                name="sex"
                label="Выберите ваш пол"
              />
              <MultiSelectField
                defaultValue={data.qualities}
                options={qualities}
                name="qualities"
                label="Выберите ваши качества"
              />
              <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </FormComponent>
            : "Loading..."
          }
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
