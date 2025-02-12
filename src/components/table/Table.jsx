import React from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableBody from "../tableBody/TableBody";
import PropTypes from "prop-types";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader onSort={onSort} selectedSort={selectedSort} columns={columns} />
          <TableBody data={data} columns={columns} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  children: PropTypes.array,
};

export default Table;
