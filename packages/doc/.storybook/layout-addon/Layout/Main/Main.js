import React, { useState } from "react";
import HvLink from "@hv/uikit-react-core/dist/Link";
import Examples from "../Examples";
import Tabs from "../Tabs";
import withConfig from "@hv/uikit-react-core/dist/config/withConfig";
import Button from "@hv/uikit-react-core/dist/Button";
import HvBanner from "@hv/uikit-react-core/dist/Banner";
import find from "lodash/find";

import corePackage from "../../../../../core/package";
import labPackage from "../../../../../lab/package";
import iconsPackage from "../../../../../icons/package";

const getDocgenInfo = node => {
  const mockProps = { classes: {} };

  if (node && node.type && node.type.Naked && node.type.Naked.__docgenInfo) {
    return node.type.Naked.__docgenInfo;
  } else if (node && node.type && node.type.__docgenInfo) {
    return node.type.__docgenInfo;
  } else if (node && node.type && node.type.Naked instanceof Function) {
    const internalNode = node.type.Naked(mockProps);
    return getDocgenInfo(internalNode);
  } else if (node && node.type instanceof Function) {
    const internalNode = node.type(mockProps);
    return getDocgenInfo(internalNode);
  }
  return undefined;
};

const getComponentsMetadata = children => {
  const nodes = React.Children.map(children, element => {
    if (!React.isValidElement(element)) return;
    return element;
  });

  const docgenInfo = getDocgenInfo(nodes[0]);

  if (docgenInfo) {
    return {
      propsMetaData: docgenInfo.props,
      descriptionMetadata: docgenInfo.description
    };
  }

  return {
    propsMetaData: undefined,
    descriptionMetadata: ""
  };
};

const shouldShowHeader = kind => {
  const list = ["Lab", "Components", "Foundation", "Templates"];
  return find(list, elem => kind.startsWith(elem));
};

const SimpleBanner = ({ compNameToUse }) => {
  const [open, setState] = useState(true);

  return (
    <div>
      <HvBanner
        open={open}
        label={`This component is deprecated. Please use the ${compNameToUse} in the Core package`}
        onClose={() => setState(false)}
        variant="default"
      />
    </div>
  );
};

const Main = ({ classes, children, context, config }) => {
  const { kind, story, parameters } = context;
  const { examples, title, description, designSystemLink, deprecated, componentToUse } = parameters;

  if (parameters.options.noAddon) return children;

  const isComponent = shouldShowHeader(kind);

  let processedKind = kind.startsWith("Components") ? kind.replace("Components", "Core") : kind;
  processedKind = (story === "Icons" && "Icons") || processedKind;
  processedKind = (story === "Typography" && "Core") || processedKind;

  const metadata = getComponentsMetadata(children);

  return (
    <>
      <div className={classes.header}>
        <div>
          {processedKind}
          {` ${(kind.startsWith("Components") && `v${corePackage.version}`) ||
            (kind === "Lab" && `v${labPackage.version}`) ||
            (story === "Icons" && `v${iconsPackage.version}`) ||
            (story === "Typography" && `v${corePackage.version}`) ||
            ""}`}
          <span className={classes.name}>{story === "Icons" ? "" : ` - ${story}`}</span>
        </div>
        {isComponent && <Button onClick={config.changeTheme}>Toggle theme</Button>}
      </div>
      <div className={classes.contentWithHeader}>
        {title ? (
          <>
            {deprecated ? <SimpleBanner compNameToUse={componentToUse} /> : ""}
            <div className={classes.title}>
              {title}
              <span className={classes.link}>
                {designSystemLink && (
                  <HvLink route={designSystemLink}>&nbsp;&nbsp;[DS Pattern]</HvLink>
                )}
              </span>
            </div>
            <div
              className={classes.description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <Tabs
              parameters={parameters}
              propsMetaData={metadata.propsMetaData}
              descriptionMetadata={metadata.descriptionMetadata}
            />
            {examples && <Examples examples={examples} />}
          </>
        ) : (
          children
        )}
      </div>
    </>
  );
};

export default withConfig(Main);
