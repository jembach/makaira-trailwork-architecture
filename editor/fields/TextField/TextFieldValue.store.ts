import { makeAutoObservable } from "mobx";
import {
  FieldValueStoreInterface,
  FieldValueStoreInterfaceI18nValue,
} from "../shared/field-value.store.interface";
import { TextFieldStore } from "./TextField.store";

export type TextFieldValueStoreValueType =
  FieldValueStoreInterfaceI18nValue<string>;

export class TextFieldValueStore
  implements
    FieldValueStoreInterface<TextFieldStore, TextFieldValueStoreValueType>
{
  field!: TextFieldStore;

  value!: TextFieldValueStoreValueType;

  constructor(field: TextFieldStore, value: TextFieldValueStoreValueType = {}) {
    this.field = field;
    this.value = value;

    makeAutoObservable(this);
  }

  setValue(lng: string, value: string) {
    this.value[lng] = value;
  }
}
