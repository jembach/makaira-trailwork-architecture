import { makeAutoObservable } from "mobx";
import { v4 as uuidV4 } from "uuid";
import { FieldValueStoreInterface } from "../editor/fields/shared/field-value.store.interface";
import { FieldStoreInterface } from "../editor/fields/shared/field.store.interface";
import { PatternStore } from "../editor/pattern/pattern.store";

export class EditPagePatternStore {
  id!: string | number;

  pattern!: PatternStore;

  fieldValues!: FieldValueStoreInterface<FieldStoreInterface, unknown>[];

  constructor(
    pattern: PatternStore,
    properties: Record<string, { content: Record<string, unknown> }> = {},
    id: string | number = uuidV4()
  ) {
    this.pattern = pattern;
    this.id = id;

    const fieldValues: FieldValueStoreInterface<
      FieldStoreInterface,
      unknown
    >[] = [];

    const languages = Object.keys(properties);

    pattern.fields.forEach((field) => {
      const fieldId = field.id;

      const values = fieldId
        ? Object.fromEntries(
            languages.map((language) => [
              language,
              properties[language].content[fieldId],
            ])
          )
        : {};

      fieldValues.push(field.createFieldValueStoreFrom(values));
    });

    this.fieldValues = fieldValues;

    makeAutoObservable(this, { pattern: false });
  }
}
