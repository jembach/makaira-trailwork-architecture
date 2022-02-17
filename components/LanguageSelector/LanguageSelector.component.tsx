import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { ConfigStore } from "../../stores/config.store";
import styles from "./LanguageSelector.module.css";

export type LanguageSelectorProps = { configStore: ConfigStore };

export const LanguageSelector: React.FC<LanguageSelectorProps> =
  observer<LanguageSelectorProps>(({ configStore }) => {
    const onChangeLanguage = useCallback(
      (e: SelectChangeEvent<string>) => {
        configStore.setLanguage(e.target.value);
      },
      [configStore.setLanguage]
    );

    return (
      <div className={styles.container}>
        <Select
          label="Sprache"
          size="small"
          value={configStore.language}
          onChange={onChangeLanguage}
        >
          {configStore.supportedLanguages.map(({ language, label }) => (
            <MenuItem value={language} key={language}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  });
