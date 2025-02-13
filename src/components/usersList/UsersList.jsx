import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import GroupList from "../groupList/GroupList";
import SearchStatus from "../searchStatus/SearchStatus";
import UsersTable from "../usersTable/UsersTable";
import API from "../../api";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

const UsersList = () => {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;

  useEffect(() => {
    API.users.fetchAll().then(data => setUsers(data));
  }, []);

  const handleDelete = (useId) => {
    setUsers(users.filter((user) => user._id !== useId));
  };

  const handleToggleBookMark = (useId) => {
    setUsers(
      users.map((user) => {
        return user._id === useId
          ? { ...user, bookmark: !user.bookmark }
          : user;
      })
    );
  };

  useEffect(() => {
    API.professions.fetchAll().then(data => setProfessions(data));
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, setCurrentPage]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  if (users) {
    const filterUsers = selectedProf
      ? users.filter(
        (user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
      : users;

    const count = filterUsers.length;

    const sortedUsers = _.orderBy(filterUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => setSelectedProf();

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button
              className="btn btn-secondary mt-2"
              onClick={clearFilter}
            >
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          {users.length > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onToggleBookMark={handleToggleBookMark}
              onDelete={handleDelete}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return "Loading...";
};

export default UsersList;
