import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../../hooks/useQualities";

const Qualitie = ({ id }) => {
  const { getQuality } = useQualities();
  const { _id, color, name } = getQuality(id);

  return (
    <span className={`badge bg-${color} m-1`} key={_id}>{name}</span>
  );
};

Qualitie.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Qualitie;
