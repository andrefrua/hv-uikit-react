import React from "react";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import compressor from "../card/resources/compressor.png";
import leaf from "../card/resources/leaf.png";
import AddIcon from "@hv/uikit-react-icons/dist/Add.S";
import UploadIcon from "@hv/uikit-react-icons/dist/Upload.S";
import DeleteIcon from "@hv/uikit-react-icons/dist/Delete.S";
import PreviewIcon from "@hv/uikit-react-icons/dist/Preview.S";

const styles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

const data = {
  firstTitle: "ID",
  firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
  secondTitle: "Last connected",
  secondContent: "Aug 30, 2017 12:27:53 PM"
};

const InnerContent = ({ classes }) => (
  <>
    <div>
      <div>
        <HvTypography variant="labelText">{data.firstTitle}</HvTypography>
      </div>
      <div>
        <HvTypography variant="normalText" className={classes.text}>
          {data.firstContent}
        </HvTypography>
      </div>
    </div>
    <div style={{ marginTop: "15px" }}>
      <div>
        <HvTypography variant="labelText">{data.secondTitle}</HvTypography>
      </div>
      <div>
        <HvTypography variant="normalText" className={classes.text}>
          {data.secondContent}
        </HvTypography>
      </div>
    </div>
  </>
);

const compressorData = id => {
  return {
    headerTitle: "Asset Avatar " + (id + 1),
    subheader: "Compressor",
    id: "id_" + id,
    innerCardContent: <InnerContent classes={styles} />,
    mediaPath: compressor,
    mediaHeight: 186,
    semantic: "sema2",
    checkboxValue: "id_" + id
  };
};

const machineData = id => {
  return {
    headerTitle: "Asset Avatar " + (id + 1),
    subheader: "Machine",
    id: "id_" + id,
    innerCardContent: <InnerContent classes={styles} />,
    mediaPath: leaf,
    mediaHeight: 186,
    semantic: "sema3",
    checkboxValue: "id_" + id
  };
};

const values = () => {
  let cards = [];
  for (let i = 0; i < 10; ++i)
    cards.push(i % 2 === 0 ? compressorData(i) : machineData(i));
  return cards;
};

const myActions = [
  { id: "post", label: "Add", icon: AddIcon, disabled: false },
  { id: "get", label: "Preview", icon: PreviewIcon, disabled: true },
  { id: "put", label: "Upload", icon: UploadIcon, disabled: true },
  { id: "delete", label: "Delete", icon: DeleteIcon, disabled: false }
];

const viewConfiguration = {
  onSelection: event => console.log(event.target.value),
  breakpoints: {
    xs: "false",
    sm: "false",
    md: 4,
    lg: 3,
    xl: 3
  },
  isSelectable: true,
  actions: myActions,
  maxVisibleActions: 3,
  actionsCallback: (id, action) =>
    alert("You have pressed card " + id + " with action " + action.label)
};

export default (
  <div>
    <CardView values={values()} viewConfiguration={viewConfiguration} />
  </div>
);