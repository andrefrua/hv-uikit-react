/*
 * Copyright 2019 Hitachi Vantara Corporation
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

import React, { memo } from "react";
import PropTypes from "prop-types";
import MultiButton from "../../MultiButton";

/**
 * AssetMultiButton component.
 *
 * @param views
 * @param changeView
 * @returns {*}
 * @constructor
 */
const AssetMultiButton = ({ id, views, changeView, onViewChange }) => {
  const options = [];

  views.map(view =>
    options.push({
      id: view.id,
      icon: view.icon,
      selected: view.selected ? true : undefined
    })
  );

  const onChangeViewHandler = buttonId => {
    changeView(buttonId);
    onViewChange(buttonId);
  };

  return (
    <MultiButton
      id={`multi_button_${id}`}
      buttons={options}
      type="icon"
      onChange={onChangeViewHandler}
      minSelection={1}
    />
  );
};

AssetMultiButton.propTypes = {
  id: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.node
    })
  ).isRequired,
  changeView: PropTypes.func.isRequired,
  onViewChange: PropTypes.func
};

AssetMultiButton.defaultProps = {
  onViewChange: null
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.views === nextProps.views;

export default memo(AssetMultiButton, arePropsEqual);