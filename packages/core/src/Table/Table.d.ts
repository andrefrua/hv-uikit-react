import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { ListValueProp } from "../List";

export interface TableLabel {
  /**
   * The title that identifies the title, rendered outside of the table.
   */
  titleText?: string;
  /**
   * The subtitle that identifies the title, rendered outside of the table.
   */
  subtitleText?: string;
}

export interface TableColumn {
  /**
   * The title of the column.
   */
  headerText?: string;
  /**
   * Accessors are functions that return the value to populate the row's value for the column.
   */
  accessor?: string | Function;
  /**
   * Receives each cell value and it should return with any desired modification.
   * @param value - the cell value.
   */
  format?: (value: any) => any;
  /**
   * Sets the column type
   */
  cellType?: "numeric" | "alpha-numeric";
  /**
   * Styles to apply to the column.
   */
  style?: any;
  /**
   * Specifies if the column should always be visible and where it should be rendered.
   */
  fixed?: "left" | "right";
  /**
   *  Used to render a standard cell, defaults to the accessed value.
   */
  Cell?: React.ReactNode | String | Function;
  /**
   * If `true` the column may be sorted.
   */
  sortable?: boolean;
}

export interface SecondaryAction extends ListValueProp {
  /**
   * Value when the action is clicked, it receives the row representation.
   */
  action?: (event: React.FormEvent<HTMLDivElement>, row: object) => void;
}

export interface HvTableProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvTableClassKey> {
  /**
   * Unique class name used to identify the fixed table
   */
  uniqClassName?: string;

  /**
   * The labels inside the table.
   */
  labels?: TableLabel;
  /**
   * The column definition to apply to the table. Please check https://react-table.js.org/#/story/readme for more info
   * Use the property "cellType" to define the different types of cell. Available values: "number" , "alpha-numeric" and "link.
   * If the type is "link", in data use the structure {displayText: {text to display} ,url: {url} }.
   */
  columns: TableColumn[];
  /**
   * Array with the data elements to show.
   * It can also define the checkBoxProps property to pass extra props to the row checkbox selector.
   */
  data: object[];

  /**
   * Boolean to show or hide the pagination controls
   */
  showPagination?: boolean;

  /**
   * Callback to notify when the page changes
   */
  onPageChange?: (...args: any[]) => any;

  /**
   * Boolean to show or hide the page size control
   */
  showPageSize?: boolean;

  /**
   * Numeric value to control the page size selected
   */
  pageSize?: number;

  /**
   * Callback to notify when the page size changes
   */
  onPageSizeChange?: (...args: any[]) => any;

  /**
   * Boolean to enable or disable the server side pagination mechanism
   */
  paginationServerSide?: boolean;

  /**
   * Numeric value to control the number of pages. Useful when Server side pagination data is enabled
   */
  pages?: number;

  /**
   * Callback with receives the page info and should fetch the data to show on the table
   */
  onFetchData?: (...args: any[]) => any;

  /**
   * Boolean to enable or disable the sort mechanism
   */
  sortable?: boolean;

  /**
   * An object describing what column is sorted by default on the table
   */
  defaultSorted?: any[];

  /**
   * Element to be shown in the expander.
   */
  subElementTemplate?: (row: object) => React.ReactNode;

  /**
   * Property to be uses as unique row identifier. One of the fields of the data.
   */
  idForCheckbox?: string;

  /**
   * Function to overwrite the existed getTrProps. Returns props to be applied to the tr.
   */
  getTrProps?: (state: object, rowInfo: object, column: object, instance: object) => any;

  /**
   * Boolean to bind config back to function or not
   */
  useRouter?: boolean;

  /**
   * Callback which receives the checked state of all items in the list
   */
  onSelection?: (event: React.FormEvent<HTMLDivElement>, selection: string[]) => void;

  /**
   * Ids of preselected items in the list
   */
  selections?: any[];

  /**
   *  Secondary actions listed in menu dropdown. Label is displayed and action is executed on click.
   */
  secondaryActions?: SecondaryAction[];

  /**
   *  Extra properties passed to the select all checkbox props.
   */
  allCheckBoxProps: Object;

  /**
   *  Extra properties passed to the dropdown menu.
   */
  dropdownMenuProps: Object;
}

export type HvTableClassKey =
  | "root"
  | "table"
  | "theadGroup"
  | "theadGroupTr"
  | "theadGroupTh"
  | "thead"
  | "theadTh"
  | "theadFilter"
  | "theadFilterTr"
  | "theadFilterTh"
  | "tbody"
  | "tBodyEmpty"
  | "trGroups"
  | "tr"
  | "textContainer"
  | "td"
  | "tfoot"
  | "tfootTr"
  | "tfootTh"
  | "pagination"
  | "loading"
  | "noDate"
  | "resizer"
  | "rtSortIcon"
  | "sortedIconShown"
  | "sortedIconHidden"
  | "pointer"
  | "tableContainer"
  | "subtitle"
  | "title"
  | "checkBoxBorder"
  | "checkBoxRow"
  | "centered"
  | "alphaNumeric"
  | "numeric"
  | "link"
  | "subComponentContainer"
  | "iconContainer"
  | "firstWithNumeric"
  | "lockIcon"
  | "lockIconSelected"
  | "trashIcon"
  | "trashIconSelected"
  | "checkBoxText"
  | "menuItem"
  | "expand"
  | "separatorContainer";

export default function HvBadge(props: HvTableProps): JSX.Element | null;