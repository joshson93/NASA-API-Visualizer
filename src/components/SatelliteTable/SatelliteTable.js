import { useTable } from 'react-table';
import React, { useMemo } from 'react';

export default function SatelliteTable() {
  const data = useMemo(
    () => [
      {
        col1: 'ISS (ZARYA)',
        col2: '25544',
      },
      {
        col1: 'CENTAURI-1',
        col2: '43809',
      },
      {
        col1: 'CENTAURI-2',
        col2: '43722',
      },
      {
        col1: 'STARLINK-1346',
        col2: '45560',
      },
      {
        col1: 'STARLINK-3055',
        col2: '49137',
      },
      {
        col1: 'STARLINK-3088',
        col2: '49163',
      },
      {
        col1: 'NOAA 18',
        col2: '28654',
      },
      {
        col1: 'ITASAT 1',
        col2: '43786',
      },
      {
        col1: 'PROXIMA I',
        col2: '43694',
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Satellite Name',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Satellite ID',
        accessor: 'col2',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
