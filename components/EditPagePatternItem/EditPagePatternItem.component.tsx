import { Dialog, DialogTitle, ListItem, ListItemText } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { EditPagePatternStore } from "../../stores/edit-page-pattern.store";
import { EditPagePattern } from "../EditPagePattern/EditPagePattern.component";

export type EditPagePatternItemProps = {
  editPagePattern: EditPagePatternStore;
};

export const EditPagePatternItem: React.FC<EditPagePatternItemProps> =
  observer<EditPagePatternItemProps>(({ editPagePattern }) => {
    const [showEditPagePattern, setShowEditPagePattern] = useState(false);

    const onClickItem = useCallback(() => {
      setShowEditPagePattern(true);
    }, []);

    const onCloseDialog = useCallback(() => {
      setShowEditPagePattern(false);
    }, []);

    return (
      <>
        <ListItem button onClick={onClickItem}>
          <ListItemText primary={editPagePattern.pattern.name} />
        </ListItem>
        <Dialog open={showEditPagePattern} onClose={onCloseDialog}>
          <DialogTitle>
            Inhalt der Komponente <i>{editPagePattern.pattern.name}</i>{" "}
            bearbeiten
          </DialogTitle>
          <EditPagePattern editPagePattern={editPagePattern} />
        </Dialog>
      </>
    );
  });
