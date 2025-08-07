import {
  Control,
  useFieldArray,
  FieldValues,
  ArrayPath,
  FieldErrors,
  Path,
  UseFormWatch,
} from "react-hook-form";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProjectPersonnel } from "@/app/api/form/form.type";
import { RadioGroupField } from "./Form/RadioGroupField";
import { InputField } from "./Form/InputField";
import { TextAreaFieldField } from "./Form/TextAreaField";
import { useEffect } from "react";

interface MemberCardListProps<T extends FieldValues> {
  label?: string;
  control: Control<T>;
  name: ArrayPath<T>;
  watch?: UseFormWatch<T>;
  errors?: FieldErrors<T>;
  minPersonCount?: number;
  maxPersonCount?: number;
  initialData?: ProjectPersonnel[];
}

export function MemberCardList<T extends FieldValues>({
  label,
  control,
  name,
  watch,
  errors,
  minPersonCount = 0,
  maxPersonCount,
  initialData,
}: MemberCardListProps<T>) {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name,
  });

  // Initialize fields based on initialData or minPersonCount
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      // Set initial data if provided
      replace(initialData as any);
    } else if (fields.length === 0 && minPersonCount > 0) {
      // Create minimum required fields if no data exists
      const emptyPersons = Array.from({ length: minPersonCount }, () => ({
        fristNameTH: "",
      }));
      replace(emptyPersons as any);
    }
  }, [initialData, minPersonCount, replace, fields.length]);

  const handleAddMember = () => {
    if (maxPersonCount && fields.length >= maxPersonCount) {
      return; // Don't add if max limit reached
    }
    (append as (value: ProjectPersonnel) => void)({ fristNameTH: "" });
  };

  const handleRemoveMember = (index: number) => {
    if (fields.length <= minPersonCount) {
      return; // Don't remove if minimum required
    }
    remove(index);
  };

  const canAddMore = !maxPersonCount || fields.length < maxPersonCount;
  const canRemove = fields.length > minPersonCount;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{label}</h3>
        {minPersonCount > 0 && (
          <span className="text-sm text-muted-foreground">
            ต้องการอย่างน้อย {minPersonCount} คน
            {maxPersonCount && ` (สูงสุด ${maxPersonCount} คน)`}
          </span>
        )}
      </div>
      {fields.map((field, index) => (
        <Card key={field.id} className="p-4 flex flex-col gap-5 relative">
          <RadioGroupField
            control={control}
            name={`${name}.${index}.academicTitle` as Path<T>}
            label="คำนำหน้าชื่อ (Academic Title)"
            requiredMessage="กรุณาเลือกหัวหน้าโครงการวิจัย"
            options={[
              {
                label: "ผู้ช่วยศาสตราจารย์ (Asst. Prof.)",
                value: "asst-prof",
              },
              {
                label: "รองศาสตราจารย์ (Assoc. Prof.)",
                value: "assoc-prof",
              },
              { label: "ศาสตราจารย์ (Professor)", value: "professor" },
              { label: "นักศึกษา (Student)", value: "student" },
            ]}
            other={{
              name: `${name}.${index}.projectLeaderTitle` as Path<T>,
              placeholder: "ตำแหน่งวิชาการ/ยศ/คำนำหน้า",
              requiredMessage: "กรุณากรอกรายละเอียด",
            }}
          />
          <div className="space-y-3">
            <div>ชื่อ-สกุล (First Name - Last Name)</div>
            <div className="flex gap-x-2">
              <InputField
                control={control}
                name={`${name}.${index}.projectLeaderFristNameTH` as Path<T>}
                label="ชื่อ"
                labelPrefix="TH"
                errors={errors}
                hideLabel
              />
              <InputField
                control={control}
                name={`${name}.${index}.projectLeaderLastNameTH` as Path<T>}
                label="นามสกุล"
                labelPrefix="TH"
                errors={errors}
                hideLabel
              />
            </div>
            <div className="flex gap-x-2">
              <InputField
                control={control}
                name={`${name}.${index}.projectLeaderFristNameEN` as Path<T>}
                label="frist name"
                labelPrefix="EN"
                errors={errors}
                hideLabel
              />
              <InputField
                control={control}
                name={`${name}.${index}.projectLeaderLastNameEN` as Path<T>}
                label="last name"
                labelPrefix="EN"
                errors={errors}
                hideLabel
              />
            </div>
          </div>
          <div className="space-y-3">
            <TextAreaFieldField
              control={control}
              name={`${name}.${index}.contactAdressTH` as Path<T>}
              label="สถานที่ติดต่อ (Address)"
              labelPrefix="TH"
              errors={errors}
            />
            <TextAreaFieldField
              control={control}
              name={`${name}.${index}.contactAdressEN` as Path<T>}
              label="address"
              labelPrefix="EN"
              errors={errors}
              hideLabel
            />
          </div>
          <InputField
            control={control}
            name={`${name}.${index}.phoneNumber` as Path<T>}
            label="โทรศัพท์มือถือ (Mobile Phone)"
            errors={errors}
          />
          <InputField
            control={control}
            name={`${name}.${index}.email` as Path<T>}
            label="Email"
            errors={errors}
          />
          <RadioGroupField
            control={control}
            name={`${name}.${index}.biologicalWorker` as Path<T>}
            label="เป็นผู้ปฏิบัติงานกับ ตัวอย่างชีวภาพ หรือ จุลินทรีย์ พริออน พืช เซลล์ หรือ cell line พิษจากสัตว์ (Is working with biological samples or microorganisms, prions, plant cells or cell lines, animal toxins?)"
            requiredMessage="กรุณาเลือกผู้ปฏิบัติงานกับตัวอย่างชีวภาพ"
            options={[
              {
                label: "เป็น (Yes)",
                value: "yes",
              },
              {
                label: "ไม่เป็น (No)",
                value: "no",
              },
            ]}
          />
          <RadioGroupField
            control={control}
            name={`${name}.${index}.biosafetyTraining` as Path<T>}
            label="ประวัติการอบรมด้านความปลอดภัยทางชีวภาพ (Record of biosafety training)"
            requiredMessage="กรุณาเลือกประวัติการอบรม"
            options={[
              {
                label: "ผ่านการอบรมแล้ว (Pass Training)",
                value: "pass-training",
              },
              {
                label: "ขั้นต้น (ขั้นต้น)",
                value: "elementary",
              },
              {
                label: "ขั้นกลาง (Intermediate)",
                value: "entermediate",
              },
              {
                label: "เจ้าหน้าที่ความปลอดภัย (BSO)",
                value: "bso",
              },
              {
                label: "ยังไม่ผ่านการอบรม (No Training)",
                value: "no-training",
              },
            ]}
          />
          {watch?.(`${name}.${index}.biosafetyTraining` as Path<T>) &&
            watch?.(`${name}.${index}.biosafetyTraining` as Path<T>) !==
              "no-traninig" && <div>ppp</div>}
          {canRemove && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleRemoveMember(index)}
              className="absolute top-5 right-5 p-1 hover:bg-red-100"
            >
              <X className="w-5 h-5 text-destructive" />
            </Button>
          )}
        </Card>
      ))}
      {canAddMore && (
        <Button
          type="button"
          onClick={handleAddMember}
          variant="outline"
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-1" /> เพิ่มบุคลากร (Add Personnel)
        </Button>
      )}
    </div>
  );
}