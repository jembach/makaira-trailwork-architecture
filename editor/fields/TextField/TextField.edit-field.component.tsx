import React from "react";
import { TextFieldStore } from "./TextField.store";

export type TextFieldEditFieldProps = { store: TextFieldStore };

export const TextFieldEditField: React.FC<TextFieldEditFieldProps> = React.memo(
  () => {
    return null;
  }
);

TextFieldEditField.displayName = "TextFieldEditField";
