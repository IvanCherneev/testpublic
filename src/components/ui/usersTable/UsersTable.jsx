import React from "react";
import Bookmark from "../../common/bookmark/Bookmark";
import Table /*, {TableBody, TableHeader} */ from "../../common/table";
import PropTypes from "prop-types";
import Qualities from "../qualities";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Profession from "../profession/Profession";

const UsersTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete }) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => (
        <Link to={`/users/${user._id}`}>{user.name}</Link>
      ),
    },
    qualities: {
      name: "Качества",
      component: (user) => (
        <Qualities qualities={user.qualities} />
      ),
    },
    professions: { name: "Профессия", component: (user) => <Profession id={user.profession} /> },
    completedMeetings: { path: "completedMeetings", name: "Встретимся, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => onToggleBookMark(user._id)}
        />
      ),
    },
    delete: {
      component: (user) => (
        <button
          onClick={() => onDelete(user._id)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  };

  return (
    // <Table>
    //   <TableHeader onSort={onSort} selectedSort={selectedSort} columns={columns} />
    //   <TableBody data={users} columns={columns} />
    // </Table>
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UsersTable;
