import { useMemo } from "react";
import {
  useTable,
  usePagination,
  useExpanded,
  useSortBy,
  useResizeColumns,
  Cell,
  CellPropGetter,
  CellProps,
  ColumnInstance,
  ColumnInterface,
  FooterPropGetter,
  HeaderPropGetter,
  HeaderProps,
  Hooks,
  PluginHook,
  Renderer,
  Row,
  RowPropGetter,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableInstance,
  TableOptions,
  TablePropGetter,
  TableProps,
  TableRowProps,
  TableState,
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByHooks,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from "react-table";
import useHvTableStyles, {
  UseHvTableStylesTableOptions,
  UseHvTableStylesColumnOptions,
  UseHvTableStylesTableCellProps,
  UseHvTableStylesTableRowProps,
} from "./useTableStyles";
import {
  UseHvTableStickyCellProps,
  UseHvTableStickyColumnProps,
  UseHvTableStickyHooks,
  UseHvTableStickyTableInstance,
  UseHvTableStickyTableOptions,
  UseHvTableStickyTableProps,
} from "./useSticky";
import { UseHvSortByColumnProps, UseHvSortByTableCellProps } from "./useSortBy";
import {
  UseHvRowSelectionHooks,
  UseHvRowSelectionRowInstance,
  UseHvRowSelectionState,
  UseHvRowSelectionTableInstance,
  UseHvRowSelectionTableOptions,
  UseHvRowSelectionTableRowProps,
} from "./useRowSelection";
import {
  UseHvPaginationHooks,
  UseHvPaginationTableInstance,
} from "./usePagination";
import {
  UseHvBulkActionsHooks,
  UseHvBulkActionsTableInstanceProps,
  UseHvBulkActionsTableOptions,
} from "./useBulkActions";
import {
  UseHvRowExpandTableOptions,
  UseHvRowExpandRowInstance,
  UseHvRowExpandTableRowProps,
} from "./useRowExpand";
import {
  UseHvHeaderGroupsColumnProps,
  UseHvHeaderGroupsCellProps,
  UseHvHeaderGroupsInstance,
} from "./useHeaderGroups";
import {
  UseHvResizeColumnProps,
  UseHvResizeTableCellProps,
} from "./useResizeColumns";
import { HvExtraProps } from "../../../types";

// #region ##### TYPES #####

type Accessor<D extends object> = (
  originalRow: D,
  index: number,
  sub: {
    subRows: D[];
    depth: number;
    data: D[];
  }
) => CellValue;

type StringKey<D> = Extract<keyof D, string>;
type IdType<D> = StringKey<D> | string;
type CellValue<V = any> = V;

interface HvColumnInterfaceBasedOnValue<
  D extends object = Record<string, unknown>,
  V = any
> {
  Cell?: Renderer<HvCellProps<D, V>>;
}

interface HvColumnGroupInterface<D extends object> {
  columns: Array<HvTableColumnConfig<D>>;
}

type HvColumnGroup<D extends object = Record<string, unknown>> =
  HvTableColumnOptions<D> &
    HvColumnGroupInterface<D> &
    (
      | { Header: string }
      | ({ id: IdType<D> } & {
          Header: Renderer<HeaderProps<D>>;
        })
    ) & { accessor?: Accessor<D> }; // Not used, but needed for backwards compatibility

type ValueOf<T> = T[keyof T];

// The accessors like `foo.bar` are not supported, use functions instead
type HvColumnWithStrictAccessor<D extends object = Record<string, unknown>> =
  HvTableColumnOptions<D> &
    ValueOf<{
      [K in keyof D]: {
        accessor: K;
      } & HvColumnInterfaceBasedOnValue<D, D[K]>;
    }>;

type HvColumnWithLooseAccessor<D extends object = Record<string, unknown>> =
  HvTableColumnOptions<D> &
    HvColumnInterfaceBasedOnValue<D> &
    (
      | { Header: string }
      | { id: IdType<D> }
      | { accessor: keyof D extends never ? IdType<D> : never }
    ) & {
      accessor?: keyof D extends never ? IdType<D> | Accessor<D> : Accessor<D>;
    };

export type HvCellProps<D extends object, V = any> = CellProps<D, V> & {
  column: HvColumnInstance<D>;
  row: HvRowInstance<D>;
  cell: HvCellInstance<D, V>;
};

export type HvTableDefinitionConfig<
  D extends object = Record<string, unknown>
> = HvTableOptions<D>;

export type HvTableColumnConfig<D extends object = Record<string, unknown>> =
  | HvColumnGroup<D>
  | HvColumnWithLooseAccessor<D>
  | HvColumnWithStrictAccessor<D>;

// #region HOOKS
export interface HvHooks<D extends object = Record<string, unknown>>
  extends Omit<
      Hooks<D>,
      | "getToggleRowSelectedProps"
      | "getToggleAllRowsSelectedProps"
      | "getToggleAllPageRowsSelectedProps"
    >,
    UseExpandedHooks<D>,
    UseGroupByHooks<D>,
    UseSortByHooks<D>,
    UseHvRowSelectionHooks<D>,
    UseHvTableStickyHooks<D>,
    UseHvPaginationHooks<D>,
    UseHvBulkActionsHooks<D> {}
// #endregion

// #region STATE
export interface HvTableState<D extends object = Record<string, unknown>>
  extends TableState<D>,
    UseColumnOrderState<D>,
    UseExpandedState<D>,
    UseFiltersState<D>,
    UseGlobalFiltersState<D>,
    UseGroupByState<D>,
    UsePaginationState<D>,
    UseResizeColumnsState<D>,
    UseSortByState<D>,
    UseHvRowSelectionState<D> {
  rowCount: number;
}
// #endregion

// #region OPTIONS
export interface HvTableOptions<D extends object>
  extends Omit<TableOptions<D>, "columns" | "data">,
    UseExpandedOptions<D>,
    UseFiltersOptions<D>,
    UseFiltersOptions<D>,
    UseGlobalFiltersOptions<D>,
    UseGroupByOptions<D>,
    UsePaginationOptions<D>,
    UseResizeColumnsOptions<D>,
    UseSortByOptions<D>,
    UseHvTableStylesTableOptions,
    UseHvRowSelectionTableOptions,
    UseHvTableStickyTableOptions,
    UseHvBulkActionsTableOptions,
    UseHvRowExpandTableOptions {
  columns?: Array<HvTableColumnConfig<D>>;
  data?: D[];
  initialState?: Partial<HvTableState<D>>;
  labels?: Record<string, string>;
}

export interface HvTableColumnOptions<
  D extends object = Record<string, unknown>
> extends ColumnInterface<D>,
    UseFiltersColumnOptions<D>,
    UseGroupByColumnOptions<D>,
    UseResizeColumnsColumnOptions<D>,
    UseSortByColumnOptions<D>,
    UseHvTableStylesColumnOptions {}
// #endregion

// #region INSTANCE
export interface HvTableInstance<D extends object = Record<string, unknown>>
  extends Omit<
      TableInstance<D>,
      "getToggleAllRowsSelectedProps" | "getToggleAllPageRowsSelectedProps"
    >,
    Omit<HvTableOptions<D>, "columns" | "pageCount" | "initialState" | "data">,
    UseColumnOrderInstanceProps<D>,
    Omit<UseExpandedInstanceProps<D>, "rows">,
    Omit<UseFiltersInstanceProps<D>, "rows" | "rowsById" | "flatRows">,
    Omit<UseGlobalFiltersInstanceProps<D>, "rows" | "rowsById" | "flatRows">,
    Omit<UseGroupByInstanceProps<D>, "rows" | "rowsById" | "flatRows">,
    Omit<UsePaginationInstanceProps<D>, "page">,
    Omit<UseSortByInstanceProps<D>, "rows">,
    Omit<UseHvRowSelectionTableInstance<D>, "selectedFlatRows">,
    UseHvTableStickyTableInstance<D>,
    UseHvHeaderGroupsInstance,
    UseHvPaginationTableInstance<D>,
    UseHvBulkActionsTableInstanceProps<D> {
  initialState: Partial<HvTableState<D>>;
  state: HvTableState<D>;
  columns: Array<HvColumnInstance<D>>;
  allColumns: Array<HvColumnInstance<D>>;
  visibleColumns: Array<HvColumnInstance<D>>;
  headers: Array<HvColumnInstance<D>>;
  flatHeaders: Array<HvColumnInstance<D>>;
  rows: Array<HvRowInstance<D>>;
  page: Array<HvRowInstance<D>>;
  rowsById: Record<string, HvRowInstance<D>>;
  flatRows: Array<HvRowInstance<D>>;
  getHooks: () => HvHooks<D>;
  getTableProps: (
    propGetter?: TablePropGetter<D> & HvExtraProps
  ) => HvUseTableProps;
  selectedFlatRows: Array<HvRowInstance<D>>;
  initialRows: Array<HvRowInstance<D>>;
  initialRowsById: Record<string, HvRowInstance<D>>;
  labels: Record<string, string>;
}

export interface HvColumnInstance<D extends object = Record<string, unknown>>
  extends Omit<
      ColumnInstance<D>,
      "Cell" | "columns" | "parent" | "placeholderOf"
    >,
    Omit<HvTableColumnOptions<D>, "id">,
    UseFiltersColumnProps<D>,
    UseGroupByColumnProps<D>,
    UseResizeColumnsColumnProps<D>,
    UseSortByColumnProps<D> {
  Cell?: Renderer<HvCellProps<D>>;
  columns: Array<HvColumnInstance<D>>;
  parent: HvColumnInstance<D>; // not documented
  placeholderOf?: HvColumnInstance;
  getHeaderProps: (propGetter?: HeaderPropGetter<D>) => HvUseTableHeaderProps;
  getFooterProps: (propGetter?: FooterPropGetter<D>) => HvUseTableFooterProps;
}

export interface HvRowInstance<D extends object = Record<string, unknown>>
  extends Omit<
      Row<D>,
      | "getToggleRowExpandedProps"
      | "getToggleRowSelectedProps"
      | "cells"
      | "allCells"
      | "subRows"
    >,
    Omit<UseGroupByRowProps<D>, "subRows">,
    Omit<UseHvRowSelectionRowInstance, "subRows">,
    Omit<UseHvRowExpandRowInstance<D>, "subRows"> {
  cells: Array<HvCellInstance<D>>;
  allCells: Array<HvCellInstance<D>>;
  getRowProps: (propGetter?: RowPropGetter<D>) => HvUseTableRowProps;
  index: number;
  original: D;
  id: string;
  subRows: Array<HvRowInstance<D>>;
}

export interface HvCellInstance<
  D extends object = Record<string, unknown>,
  V = any
> extends Omit<Cell<D, V>, "column" | "row">,
    UseGroupByCellProps<D> {
  column: HvColumnInstance<D>;
  row: HvRowInstance<D>;
  getCellProps: (
    propGetter?: CellPropGetter<D> & HvExtraProps
  ) => HvUseTableCellProps;
}
// #endregion

// #region PROPS
export interface HvUseTableProps
  extends TableProps,
    UseHvTableStickyTableProps {}

export interface HvUseTableHeaderProps
  extends TableHeaderProps,
    UseHvTableStylesTableCellProps,
    UseHvTableStickyColumnProps,
    UseHvHeaderGroupsColumnProps,
    UseHvResizeColumnProps,
    UseHvSortByColumnProps {}
export interface HvUseTableFooterProps
  extends TableFooterProps,
    UseHvTableStylesTableCellProps {}

export interface HvUseTableRowProps
  extends TableRowProps,
    UseHvTableStylesTableRowProps,
    UseHvRowSelectionTableRowProps,
    UseHvRowExpandTableRowProps {}

export interface HvUseTableCellProps
  extends TableCellProps,
    UseHvTableStylesTableCellProps,
    UseHvTableStickyCellProps,
    UseHvHeaderGroupsCellProps,
    UseHvResizeTableCellProps,
    UseHvSortByTableCellProps {}

// #endregion

export type UseHvTableProps = <D extends object = Record<string, unknown>>(
  options: HvTableOptions<D>,
  ...plugins: Array<PluginHook<D>>
) => HvTableInstance<D>;

export { PluginHook as HvTablePluginHook };

// #endregion ##### TYPES #####

const toTitleCase = (str) => {
  return str
    .replace(/([^A-Z])([A-Z])/g, "$1 $2") // split cameCase
    .replace(/[_-]+/g, " ") // split snake_case and lisp-case
    .toLowerCase()
    .replace(/(^\w|\b\w)/g, (m) => m.toUpperCase()) // title case words
    .replace(/\s+/g, " ") // collapse repeated whitespace
    .trim(); // remove leading/trailing whitespace
};

const useDefaultData = (data) =>
  useMemo(() => {
    return data || [];
  }, [data]);

const useDefaultColumns = (columns, data) =>
  useMemo(() => {
    if (columns != null) {
      return columns;
    }

    const uniqueKeys = Object.keys(Object.assign({}, ...data));
    return uniqueKeys
      .filter((key) => !["subRows", "subComponent"].includes(key))
      .map((key) => ({
        accessor: key,
        Header: toTitleCase(key),
      }));
  }, [columns, data]);

const ensureCorePluginInstallation = (
  plugins,
  hvPluginName,
  corePluginToInstall
) => {
  const indexOfCorePlugin = plugins.findIndex(
    (plugin) => plugin.pluginName === corePluginToInstall.pluginName
  );
  const indexOfHvPlugin = plugins.findIndex(
    (plugin) => plugin.pluginName === hvPluginName
  );

  if (
    indexOfHvPlugin !== -1 &&
    (indexOfCorePlugin === -1 || indexOfCorePlugin > indexOfHvPlugin)
  ) {
    if (indexOfCorePlugin > -1) {
      plugins.splice(indexOfCorePlugin, 1);
    }

    plugins.splice(indexOfHvPlugin, 0, corePluginToInstall);
  }
};

const useInstanceHook = (instance) => {
  const { rowsById } = instance;

  Object.assign(instance, {
    initialRowsById: rowsById,
  });
};

const useHvTableSetup = (hooks) => {
  hooks.useInstance.push(useInstanceHook);
};

useHvTableSetup.pluginName = "useHvTableSetup";

function useHvTable<D extends object = Record<string, unknown>>(
  options: HvTableOptions<D>,
  ...plugins: Array<PluginHook<D>>
): HvTableInstance<D> {
  const { data: dataProp, columns: columnsProp, ...others } = options;

  const data = useDefaultData(dataProp);
  const columns = useDefaultColumns(columnsProp, data);

  ensureCorePluginInstallation(plugins, "useHvPagination", usePagination);
  ensureCorePluginInstallation(plugins, "useHvRowExpand", useExpanded);
  ensureCorePluginInstallation(plugins, "useHvSortBy", useSortBy);
  ensureCorePluginInstallation(plugins, "useHvResizeColumns", useResizeColumns);

  const indexOfHvTableStylesPlugin = plugins.findIndex(
    (plugin) => plugin.pluginName === "useHvTableStyles"
  );
  if (indexOfHvTableStylesPlugin === -1) {
    plugins.push(useHvTableStyles);
  }

  // Main hook call
  return useTable<D>(
    {
      data,
      columns,
      ...others,
    },
    useHvTableSetup,
    ...plugins
  ) as any;
}

export default useHvTable;
