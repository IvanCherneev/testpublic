import React from "react";
import Qualitie from "../qualitie/Qualitie";
import Bookmark from "../bookmark/Bookmark";
import PropTypes from "prop-types";

const User = ({ user, onDelete, onToggleBookMark }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality) => (
          <Qualitie key={quality._id} quality={quality} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <Bookmark
          status={user.bookmark}
          onClick={() => onToggleBookMark(user._id)}
        />
      </td>
      <td>
        <button
          onClick={() => onDelete(user._id)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
};

export default User;
