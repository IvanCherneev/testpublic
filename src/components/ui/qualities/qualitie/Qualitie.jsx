import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ quality }) => {
  return (
    <span className={`badge bg-${quality.color} m-1`}>{quality.name}</span>
  );
};

Qualitie.propTypes = {
  quality: PropTypes.object.isRequired,
};

export default Qualitie;
