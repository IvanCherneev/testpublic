import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ _id, color, name }) => {
  return (
    <span className={`badge bg-${color} m-1`} key={_id}>{name}</span>
  );
};

Qualitie.propTypes = {
  _id: PropTypes.string.isRequired,
  color: PropTypes.string,
  name: PropTypes.string,
};

export default Qualitie;
