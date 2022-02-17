import { makeAutoObservable } from "mobx";
import { FIELDS_TYPE } from "../editor/fields/config";
import { FieldStoreInterface } from "../editor/fields/shared/field.store.interface";
import { PatternStore } from "../editor/pattern/pattern.store";

export type ProjectPatternsStorePatterns = {
  id: string | number;
  identifier: string;
  name: string;
  fields: {
    uuid: string;
    id: string;
    label: string;
    description?: string;
    type: string;
  }[];
}[];

export type FullFilledPattern = PatternStore &
  Required<Pick<PatternStore, "identifier" | "name">>;

export type ProjectPatternsStoreConfig = unknown;

export class ProjectPatternsStore {
  allPatterns: PatternStore[] = [];

  constructor(patterns: ProjectPatternsStorePatterns) {
    this.hydrate(patterns);

    makeAutoObservable(this);
  }

  hydrate(patterns: ProjectPatternsStorePatterns) {
    patterns.forEach((pattern) => {
      const fields: FieldStoreInterface[] = [];

      pattern.fields.forEach((field) => {
        if (FIELDS_TYPE[field.type]) {
          fields.push(
            // @ts-ignore
            new FIELDS_TYPE[field.type](field.uuid, {
              id: field.id,
              label: field.label,
              description: field.description,
            })
          );
        }
      });

      this.allPatterns.push(
        new PatternStore(pattern.id, {
          identifier: pattern.identifier,
          name: pattern.name,
          fields,
        })
      );
    });
  }

  getPattern(patternIdentifier: string): PatternStore | undefined {
    return this.allPatterns.find(
      (pattern) => pattern.identifier === patternIdentifier
    );
  }

  get fullFilledPatterns(): FullFilledPattern[] {
    const patterns: FullFilledPattern[] = [];

    this.allPatterns.forEach((pattern) => {
      if (pattern.identifier !== undefined && pattern.name !== undefined) {
        // @ts-ignore
        patterns.push(pattern);
      }
    });

    return patterns;
  }
}
