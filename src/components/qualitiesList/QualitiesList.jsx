import React from "react";
import Qualitie from "../qualitie/Qualitie";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map(quality => (
        <Qualitie key={quality._id} quality={quality} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired,
};

export default QualitiesList;
