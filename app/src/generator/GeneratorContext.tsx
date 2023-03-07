import { createTheme, HvTheme } from "@hitachivantara/uikit-react-core";
import { HvThemeStructure } from "@hitachivantara/uikit-styles";
import { createContext, useState } from "react";

type GeneratorContextProp = {
  customTheme: HvTheme | HvThemeStructure;
  updateCustomTheme: (newTheme: any) => void;

  changedValues?: Partial<HvTheme | HvThemeStructure>;
  updateChangedValues?: (path: any, key: any) => void;
};

export const GeneratorContext = createContext<GeneratorContextProp>({
  customTheme: createTheme({ name: "", base: "ds5" }),
  updateCustomTheme: () => {},
});

const GeneratorProvider = ({ children }) => {
  const [changedValues, setChangedValues] = useState({});

  const [customTheme, setCustomTheme] = useState(
    createTheme({ name: "", base: "ds5" })
  );

  const updateCustomTheme = (newTheme) => {
    setCustomTheme(newTheme);
  };

  const updateChangedValues = (path, value) => {
    setChangedValues((prevState) => {
      const newState = { ...prevState };
      let node = newState;
      path.forEach((key, index) => {
        if (!node[key]) {
          node[key] = {};
        }
        if (index === path.length - 1) {
          node[key] = value;
        } else {
          node = node[key];
        }
      });
      return newState;
    });
  };

  return (
    <GeneratorContext.Provider
      value={{
        customTheme,
        updateCustomTheme,
        changedValues,
        updateChangedValues,
      }}
    >
      {children}
    </GeneratorContext.Provider>
  );
};

export default GeneratorProvider;
