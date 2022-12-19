import React, { useMemo, useState } from "react";
import { Column, useTable, usePagination } from "react-table";
import { IUserData } from "../../interfaces/UserDataType";
import styles from "../../styles/Table.module.css";
import CopyToClipboardButton from "../copyToClipboardButton";

type Props = {
  data: IUserData[];
};

const FootprintTokenCell = ({ value }) => {
  return <CopyToClipboardButton text={value} />;
};

const StatusCell = ({ value }) => {
  let statusStyle;
  if (value === "verified") {
    statusStyle = styles.verified;
  } else {
    statusStyle = styles.failed;
  }
  return <div className={statusStyle}>{value}</div>;
};

const columns: Column<IUserData>[] = [
  {
    Header: "full name",
    accessor: "name",
  },
  {
    Header: "footprint token",
    accessor: "footprintToken",
    Cell: FootprintTokenCell,
  },
  {
    Header: "status",
    accessor: "status",
    Cell: StatusCell,
  },
  {
    Header: "email",
    accessor: "email",
  },
  {
    Header: "ssn",
    accessor: "ssn",
  },
  {
    Header: "phone number",
    accessor: "phone",
  },
  {
    Header: "date",
    accessor: "createdAt",
  },
];

const Table = (props: Props) => {
  const data = useMemo(() => props.data, [props.data]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state,
    prepareRow,
  } = useTable<IUserData>(
    { columns, data, initialState: { pageSize: 5, pageIndex: currentIndex } },
    usePagination
  );
  const { pageIndex, pageSize } = state;

  return (
    <div>
      <table className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps} scope="col">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <div>
          {data.length > 0
            ? `Showing ${pageIndex * pageSize + 1} to ${
                canNextPage ? pageIndex * pageSize + pageSize : data.length
              } of ${data.length} results`
            : "There are no results to show! Try another search please."}
        </div>
        <div>
          <button
            className={styles.button}
            onClick={() => {
              previousPage();
              setCurrentIndex(currentIndex - 1);
            }}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <button
            className={styles.button}
            onClick={() => {
              nextPage();
              setCurrentIndex(currentIndex + 1);
            }}
            disabled={!canNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
