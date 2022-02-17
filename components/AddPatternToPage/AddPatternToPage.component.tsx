import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import AddIcon from "@mui/icons-material/Add";
import {
  FullFilledPattern,
  ProjectPatternsStore,
} from "../../stores/project-patterns.store";
import { useCallback, useState } from "react";
import { EditPageStore } from "../../stores/edit-page.store";
import styles from "./AddPatternToPage.module.css";

export type AddPatternToPageProps = {
  projectPatterns: ProjectPatternsStore;
  editPageStore: EditPageStore;
};

export const AddPatternToPage: React.FC<AddPatternToPageProps> =
  observer<AddPatternToPageProps>(({ projectPatterns, editPageStore }) => {
    const [showAddPatternDialog, setShowAddPatternDialog] = useState(false);

    const onAddPattern = useCallback(() => {
      setShowAddPatternDialog(true);
    }, [setShowAddPatternDialog]);

    const onCloseDialog = useCallback(() => {
      setShowAddPatternDialog(false);
    }, [setShowAddPatternDialog]);

    const onSelectPattern = useCallback(
      (patternIdentifier: string) => {
        editPageStore.addPattern(patternIdentifier);
        setShowAddPatternDialog(false);
      },
      [editPageStore.addPattern]
    );

    return (
      <>
        <div className={styles.container}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            endIcon={<AddIcon />}
            onClick={onAddPattern}
          >
            Komponente hinzufügen
          </Button>
        </div>

        <Dialog onClose={onCloseDialog} open={showAddPatternDialog}>
          <DialogTitle>Komponente hinzufügen</DialogTitle>
          <List>
            {projectPatterns.fullFilledPatterns.map((pattern) => (
              <ListItemPattern
                key={pattern.id}
                pattern={pattern}
                onSelectPattern={onSelectPattern}
              />
            ))}
          </List>
        </Dialog>
      </>
    );
  });

type ListItemPatternProps = {
  pattern: FullFilledPattern;
  onSelectPattern: (patternIdentifier: string) => void;
};

const ListItemPattern: React.FC<ListItemPatternProps> =
  observer<ListItemPatternProps>(({ pattern, onSelectPattern }) => {
    const onClick = useCallback(() => {
      onSelectPattern(pattern.identifier);
    }, [onSelectPattern, pattern.identifier]);

    return (
      <ListItem button onClick={onClick}>
        <ListItemText primary={pattern.name} />
      </ListItem>
    );
  });
