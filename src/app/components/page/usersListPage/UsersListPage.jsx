import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination/Pagination";
import GroupList from "../../common/groupList/GroupList";
import SearchStatus from "../../ui/searchStatus/SearchStatus";
import UsersTable from "../../ui/usersTable/UsersTable";
import API from "../../../api";
import { useUser } from "../../../hooks/useUsers";
import { paginate } from "../../../utils/paginate";
import _ from "lodash";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;
  const { users } = useUser();

  const handleDelete = (userId) => {
    // setUsers(users.filter((user) => user._id !== useId));
    console.log(userId);
  };

  const handleToggleBookMark = (userId) => {
    const newArray = users.map((user) => {
      return user._id === userId
        ? { ...user, bookmark: !user.bookmark }
        : user;
    });
    // setUsers(newArray);
    console.log(newArray);
  };

  useEffect(() => {
    API.professions.fetchAll().then(data => setProfessions(data));
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery, setCurrentPage]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleProfessionSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedProf(item);
  };

  const handleSeachQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  if (users) {
    const filterUsers = searchQuery
      ? users.filter(
        user =>
          user.name
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) !== -1
      )
      : selectedProf
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
          <input
            type="text"
            name="seatchQuery"
            placeholder="Search..."
            onChange={handleSeachQuery}
            value={searchQuery}
          />
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

export default UsersListPage;
