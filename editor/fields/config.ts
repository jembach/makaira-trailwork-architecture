import { TextFieldStore, TextFieldType } from "./TextField/TextField.store";

export const FIELDS_TYPE: Record<string, unknown> = {
  [TextFieldType]: TextFieldStore,
};
