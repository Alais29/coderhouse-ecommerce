import { useState } from 'react';
import { Row, useAsyncDebounce } from 'react-table';
import { IObject } from 'commons/interfaces';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface IGlobalFilter {
  preGlobalFilteredRows: Row<IObject>[];
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
  searchPlaceholderItem: string;
}

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  searchPlaceholderItem,
}: IGlobalFilter) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="d-flex align-items-center gap-1">
      Buscar:{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} ${searchPlaceholderItem}...`}
        className={cx(styles['search-box'])}
      />
    </span>
  );
};

export default GlobalFilter;
