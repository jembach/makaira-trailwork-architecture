import { List } from "@mui/material";
import { observer } from "mobx-react-lite";
import { EditPageStore } from "../../stores/edit-page.store";
import { EditPagePatternItem } from "../EditPagePatternItem/EditPagePatternItem.component";

export type EditPagePatternListProps = {
  editPageStore: EditPageStore;
};

export const EditPagePatternList: React.FC<EditPagePatternListProps> =
  observer<EditPagePatternListProps>(({ editPageStore }) => {
    return (
      <List>
        {editPageStore.patterns.map((editPagePattern) => (
          <EditPagePatternItem
            key={editPagePattern.id}
            editPagePattern={editPagePattern}
          />
        ))}
      </List>
    );
  });
