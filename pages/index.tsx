import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import patterns from "../demo/components.json";
import config from "../demo/landingpage.json";
import { createContext, useState } from "react";
import { EditPageStore } from "../stores/edit-page.store";
import { observer } from "mobx-react-lite";
import { ProjectPatternsStore } from "../stores/project-patterns.store";
import { AddPatternToPage } from "../components/AddPatternToPage/AddPatternToPage.component";
import { Card, Divider } from "@mui/material";
import { EditPagePatternList } from "../components/EditPagePatternList/EditPagePatternList.component";
import { LanguageSelector } from "../components/LanguageSelector/LanguageSelector.component";
import { ConfigStore } from "../stores/config.store";

const projectPatternsStore = new ProjectPatternsStore(patterns);

const configStore = new ConfigStore();

export const ConfigContext = createContext<{ config: ConfigStore }>({
  config: configStore,
});

const Home: NextPage = observer(() => {
  const [editPageStore] = useState(
    () => new EditPageStore(projectPatternsStore, config)
  );

  return (
    <ConfigContext.Provider value={{ config: configStore }}>
      <div className={styles.main}>
        <div className={styles.page}>
          <Card>
            <LanguageSelector configStore={configStore} />
            <Divider />
            <EditPagePatternList editPageStore={editPageStore} />
            <Divider />
            <AddPatternToPage
              editPageStore={editPageStore}
              projectPatterns={projectPatternsStore}
            />
          </Card>
        </div>
        <div className={styles.preview}></div>
      </div>
    </ConfigContext.Provider>
  );
});

export default Home;
