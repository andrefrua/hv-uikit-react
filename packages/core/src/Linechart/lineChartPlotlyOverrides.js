import clone from "lodash/cloneDeep";

/**
 * Set the property if it is null.
 * @param object
 * @param property
 * @param value
 */
const setterIfNil = (object, property, value) => {
  // eslint-disable-next-line no-param-reassign
  object[property] = object[property] || value;
};

/**
 * Auxiliary functions to set the data in order to follow the DS guideline.
 *
 */
export const setData = (inputData, type) => {
  const data = inputData;

  data.forEach(trace => {
    setterIfNil(trace, "hoverinfo", "none");
    setterIfNil(trace, "mode", "lines");

    switch (type) {
      case "area":
        setterIfNil(trace, "fill", "tonexty");
        setterIfNil(trace, "type", "scatter");
        break;
      case "line":
        setterIfNil(trace, "type", "line");
        break;
      case "stack":
        setterIfNil(trace, "fill", "tonexty");
        setterIfNil(trace, "type", "scatter");
        setterIfNil(trace, "stackgroup", "one");
        break;
      default:
        setterIfNil(trace, "type", "line");
    }
  });

  return data;
};

export const setLayout = (inputLayout, rangeSlider) => {
  const layout = inputLayout === undefined ? {} : clone(inputLayout);

  if (rangeSlider) {
    setterIfNil(layout, "xaxis", {});

    setterIfNil(layout.xaxis, "rangeslider", {
      visible: true
    });
  }

  return layout;
};
