import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormComponent, { SelectField, TextField, RadioField, MultiSelectField } from "../../common/form";
import BackHistoryButton from "../../common/backHistoryButton/backHistoryButton";
import { useAuth } from "../../../hooks/useAuth";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfession";

const EditUserPage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { currentUser, updateUserData } = useAuth();
  const { qualities, isLoading: qualitiesLoading } = useQualities();
  const { professions, isLoading: professionLoading } = useProfessions();
  const qualitiesList = qualities.map(quality => ({
    label: quality.name,
    value: quality._id,
  }));
  const professionsList = professions.map(profession => ({
    label: profession.name,
    value: profession._id,
  }));

  const handleSubmit = async (data) => {
    await updateUserData({
      ...data,
      qualities: data.qualities.map(quality => quality.value),
    });

    history.push(`/users/${currentUser._id}`);
  };

  const getQualitiesListByIds = (qualitiesIds) => {
    const qualitiesArray = [];
    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality);
        }
      }
    }
    return qualitiesArray;
  };

  const transformData = (data) => {
    return getQualitiesListByIds(data).map(qual => ({
      label: qual.name,
      value: qual._id,
    }));
  };

  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities),
      });
    }
  }, [professionLoading, qualitiesLoading, currentUser, data]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
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
      <BackHistoryButton />
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
                autoFocus
              />
              <TextField
                label="Электронная почта"
                name="email"
              />
              <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professionsList}
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
                options={qualitiesList}
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
