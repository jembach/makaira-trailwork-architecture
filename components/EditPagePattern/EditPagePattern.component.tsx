import { observer } from "mobx-react-lite";
import { FieldValueStoreInterface } from "../../editor/fields/shared/field-value.store.interface";
import { FieldStoreInterface } from "../../editor/fields/shared/field.store.interface";
import { TextFieldEditValue } from "../../editor/fields/TextField/TextField.edit-value.component";
import { TextFieldType } from "../../editor/fields/TextField/TextField.store";
import { EditPagePatternStore } from "../../stores/edit-page-pattern.store";

export type EditPagePatternProps = { editPagePattern: EditPagePatternStore };

export const EditPagePattern: React.FC<EditPagePatternProps> =
  observer<EditPagePatternProps>(({ editPagePattern }) => {
    return (
      <>
        {editPagePattern.fieldValues.map((field) => (
          <EditPagePatternFieldResolver field={field} key={field.field.id} />
        ))}
      </>
    );
  });

type EditPagePatternFieldResolverProps = {
  field: FieldValueStoreInterface<FieldStoreInterface, unknown>;
};

const EditPagePatternFieldResolver: React.FC<EditPagePatternFieldResolverProps> =
  observer(({ field }) => {
    if (field.field.type === TextFieldType) {
      return <TextFieldEditValue store={field} />;
    }

    return null;
  });
