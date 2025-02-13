import React from "react";
import Bookmark from "../bookmark/Bookmark";
// import TableHeader from "../tableHeader/TableHeader";
// import TableBody from "../tableBody/TableBody";
import Table from "../table/Table";
import PropTypes from "prop-types";
import QualitiesList from "../qualitiesList/QualitiesList";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
        <QualitiesList qualities={user.qualities} />
      ),
    },
    professions: { path: "profession.name", name: "Профессия" },
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
