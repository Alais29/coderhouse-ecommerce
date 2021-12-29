import { Table } from 'react-bootstrap';
import { Column, useTable, useGlobalFilter } from 'react-table';
import { IObject } from 'commons/interfaces';
import GlobalFilter from './GlobalFilter/GlobalFilter';

interface ITable {
  data: IObject[];
  columns: Column<IObject>[];
  searchPlaceholderItem: string;
}

const CustomTable = ({ data, columns, searchPlaceholderItem }: ITable) => {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
  );

  return (
    <Table responsive striped bordered {...getTableProps()}>
      <thead>
        <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: 'left',
            }}
          >
            <GlobalFilter
              searchPlaceholderItem={searchPlaceholderItem}
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()} valign="middle">
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default CustomTable;
