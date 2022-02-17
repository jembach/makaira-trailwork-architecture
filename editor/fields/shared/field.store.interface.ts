import { FieldValueStoreInterface } from "./field-value.store.interface";

export type FieldStoreInterfacePartialData<
  AdditionalFields extends Record<string, string> = {}
> = {
  id?: string;
  label?: string;
  description?: string;
} & AdditionalFields;

export interface FieldStoreInterface {
  //#region properties
  type: string;
  uuid: string;

  id?: string;
  label?: string;
  description?: string;
  //#endregion

  //#region actions
  createFieldValueStoreFrom<FieldStore extends FieldStoreInterface, Value>(
    value: Value
  ): FieldValueStoreInterface<FieldStore, Value>;
  //#endregion

  //#region getters
  isValid: boolean;
  //#endregion
}

export type FieldStoreInterfaceFullfilled = FieldStoreInterface &
  Required<Pick<FieldStoreInterface, "uuid">>;
