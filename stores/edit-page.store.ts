import { makeAutoObservable } from "mobx";
import { EditPagePatternStore } from "./edit-page-pattern.store";
import { ProjectPatternsStore } from "./project-patterns.store";

export type EditPageStoreConfig = {
  config: {
    main: {
      elements: {
        id: string;
        component: string;
        properties: Record<"de" | "en", { content: Record<string, unknown> }>;
      }[];
    };
  };
};

export class EditPageStore {
  projectPatternStore!: ProjectPatternsStore;

  patterns: EditPagePatternStore[] = [];

  constructor(
    projectPatternStore: ProjectPatternsStore,
    config: EditPageStoreConfig
  ) {
    this.projectPatternStore = projectPatternStore;

    this.hydrate(config);

    makeAutoObservable(this, { projectPatternStore: false });
  }

  hydrate(config: EditPageStoreConfig) {
    config.config.main.elements.forEach((element) => {
      const pattern = this.projectPatternStore.getPattern(element.component);

      if (pattern) {
        this.patterns.push(
          new EditPagePatternStore(pattern, element.properties)
        );
      }
    });
  }

  addPattern(patternIdentifier: string) {
    const pattern = this.projectPatternStore.getPattern(patternIdentifier);
    console.log(pattern);
    if (pattern) {
      this.patterns.push(new EditPagePatternStore(pattern));
    }
  }
}
