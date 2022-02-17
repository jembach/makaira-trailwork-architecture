import React, { useCallback, useContext } from "react";
import { TextField } from "@mui/material";
import { TextFieldValueStore } from "./TextFieldValue.store";
import { ConfigContext } from "../../../pages";

export type TextFieldEditValueProps = { store: TextFieldValueStore };

export const TextFieldEditValue: React.FC<TextFieldEditValueProps> = React.memo(
  ({ store }) => {
    const { config } = useContext(ConfigContext);
    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        store.setValue(config.language, e.target.value);
      },
      [store.setValue, config.language]
    );

    return (
      <TextField
        id="outlined-basic"
        label={store.field.label}
        helperText={store.field.description}
        variant="outlined"
        defaultValue={store.value[config.language]}
        onChange={onChange}
      />
    );
  }
);

TextFieldEditValue.displayName = "TextFieldEditValueValue";
