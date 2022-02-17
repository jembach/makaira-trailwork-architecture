import { makeAutoObservable } from "mobx";

export class ConfigStore {
  language: string = "de";

  supportedLanguages = [
    { language: "de", label: "Deutsch" },
    { language: "en", label: "Englisch" },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setLanguage(language: string) {
    this.language = language;
  }
}
