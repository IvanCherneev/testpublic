import React from "react";
import Qualitie from "../qualitie/Qualitie";
import PropTypes from "prop-types";
import { useQualities } from "../../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQualities();

  if (isLoading) return "Loading...";

  return (
    <>
      {qualities.map(quality => (
        <Qualitie key={quality} id={quality} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired,
};

export default QualitiesList;
