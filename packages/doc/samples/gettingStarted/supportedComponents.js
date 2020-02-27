import React from "react";
import "./supportedComponents.css";
import ReactMarkdown from "react-markdown";
import input from "../../pages/gettingStarted/SUPPORTED_COMPONENTS.md";

const SupportedComponents = classes => <ReactMarkdown source={input} />;

export default SupportedComponents;
