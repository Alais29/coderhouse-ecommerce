import {
  UseGlobalFiltersColumnOptions,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
} from 'react-table';

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseExpandedOptions<D>,
      UseGlobalFiltersOptions<D>,
      Record<string, any> {}

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseColumnOrderInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D> {}

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseColumnOrderState<D>,
      UseGlobalFiltersState<D> {}

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseFiltersColumnOptions<D>,
      UseGlobalFiltersColumnOptions<D> {}
}
