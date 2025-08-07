import { Control, useFieldArray, Path, FieldValues, ArrayPath, FieldErrors } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Plus } from "lucide-react";
import { InputField } from "@/components/shared/Form/InputField";

// Define the structure that array items should have
interface MemberItem {
  name: string;
}

interface MemberCardListProps<T extends FieldValues> {
  control: Control<T>;
  name: ArrayPath<T>;
  label?: string;
  roleType?: string;
  errors?: FieldErrors<T>;
}

export function MemberCardList<T extends FieldValues>({
  control,
  name,
  label = "Members",
  roleType = "",
  errors,
}: MemberCardListProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAddMember = () => {
    append({ name: '' } as MemberItem & any);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{label}</h3>
        <Button type="button" onClick={handleAddMember} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-1" /> เพิ่ม{roleType || 'สมาชิก'}
        </Button>
      </div>
      {fields.map((field, index) => (
        <Card key={field.id} className="p-4 flex items-center gap-2">
          <div className="flex-1">
            <InputField
              control={control}
              name={`${name}.${index}.name` as Path<T>}
              label={`ชื่อ${roleType || 'สมาชิก'}`}
              placeholder={`ชื่อ${roleType || 'สมาชิก'}`}
              errors={errors}
              hideLabel
            />
          </div>
          <Button type="button" variant="ghost" onClick={() => remove(index)}>
            <X className="w-5 h-5 text-destructive" />
          </Button>
        </Card>
      ))}
    </div>
  );
}