import { FieldStoreInterface } from "./field.store.interface";

export type FieldValueStoreInterfaceI18nValue<Value> = Record<
  string,
  Value | undefined
>;

export interface FieldValueStoreInterface<
  Field extends FieldStoreInterface,
  Value
> {
  //#region properties
  field: Field;
  value: Value;
  //#endregion

  //#region getters
  //#endregion
}
