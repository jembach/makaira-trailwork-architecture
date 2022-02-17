import { makeAutoObservable } from "mobx";
import { v4 as uuidV4 } from "uuid";
import { FieldStoreInterface } from "../fields/shared/field.store.interface";

export class PatternStore {
  id!: string | number;

  fields!: FieldStoreInterface[];

  identifier?: string;

  name?: string;

  constructor(
    id: string | number = uuidV4(),
    partialData: {
      identifier?: string;
      name?: string;
      fields?: FieldStoreInterface[];
    } = {}
  ) {
    this.id = id;
    this.fields = partialData.fields ?? [];
    this.identifier = partialData.identifier;
    this.name = partialData.name;

    makeAutoObservable(this);
  }
}
