/*
 * Copyright 2020 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import useUniqueId from "../useUniqueId";
import VerticalContainer from "./VerticalContainer";

const VerticalNavigation = props => {
  const {
    id,
    classes,
    isOpen: isOpenProp,
    toggleOpenCallback,
    isCollapsable,
    children,
    position,
    closeOnExit
  } = props;

  const internalId = useUniqueId(id, "hv-verticalnavigation");

  const isOpen = isOpenProp != null ? isOpenProp : !isCollapsable;

  return (
    <VerticalContainer
      id={`${internalId}-container`}
      isOpen={isOpen}
      toggleOpenCallback={toggleOpenCallback}
      position={position}
      isAnchorBarVisible={isCollapsable}
      closeOnExit={closeOnExit}
    >
      <div
        id={internalId}
        className={classNames(classes.root, {
          [classes.noCollapsable]: !isCollapsable
        })}
      >
        {children}
      </div>
    </VerticalContainer>
  );
};

VerticalNavigation.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * Sets if the navigation should have a button to hide itself.
   */
  isCollapsable: PropTypes.bool,
  /**
   * The content inside the actions container.
   */
  children: PropTypes.node,
  /**
   * Is the navigation open.
   */
  isOpen: PropTypes.bool,
  /**
   * Callback when the navigation toggles between open and close.
   */
  toggleOpenCallback: PropTypes.func,
  /**
   * Position of the component.
   */
  position: PropTypes.oneOf(["static", "relative", "fixed", "absolute"]),
  /**
   * Defines if the navigation should close when losing focus / clicking outside.
   */
  closeOnExit: PropTypes.bool
};

VerticalNavigation.defaultProps = {
  id: undefined,
  children: undefined,
  isCollapsable: false,
  isOpen: undefined,
  toggleOpenCallback: () => {},
  position: "static",
  closeOnExit: false
};

export default VerticalNavigation;