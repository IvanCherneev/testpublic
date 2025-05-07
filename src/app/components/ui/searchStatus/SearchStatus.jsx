import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    const value = number % 10;

    if (number === 0) {
      return "Таблица пуста";
    }

    if (number > 11 && number < 15) {
      return number + " человек";
    }

    if (value > 1 && value < 5) {
      return number + " человека";
    }

    return number + " человек";
  };

  return (
    <h2>
      <span
        className={`bg-${length > 0 ? "primary" : "danger"} px-3 text-white rounded-1 fw-bold`}
      >
        {renderPhrase(length)}
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
};

export default SearchStatus;
