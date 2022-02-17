import { makeAutoObservable } from "mobx";
import { v4 as uuidV4 } from "uuid";
import {
  FieldStoreInterface,
  FieldStoreInterfacePartialData,
} from "../shared/field.store.interface";
import {
  TextFieldValueStore,
  TextFieldValueStoreValueType,
} from "./TextFieldValue.store";

export const TextFieldType = "text";

export class TextFieldStore implements FieldStoreInterface {
  type = TextFieldType;

  uuid!: string;

  id?: string;

  label?: string;

  description?: string;

  constructor(
    uuid = uuidV4(),
    { id, label, description }: FieldStoreInterfacePartialData = {}
  ) {
    this.uuid = uuid;

    this.id = id;
    this.label = label;
    this.description = description;

    makeAutoObservable(this);
  }

  get isValid(): boolean {
    return !!this.id && !!this.label;
  }

  createFieldValueStoreFrom(value: TextFieldValueStoreValueType) {
    return new TextFieldValueStore(this, value);
  }
}
