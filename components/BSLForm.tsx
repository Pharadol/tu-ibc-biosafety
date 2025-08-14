"use client";

import React from "react";
import { useForm, useFieldArray, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";

// BSL Levels configuration
const BSL_LEVELS = [
  { key: "1", label: "1" },
  { key: "1P", label: "1P" },
  { key: "2", label: "2" },
  { key: "2N", label: "2N" },
  { key: "2P", label: "2P" },
  { key: "3", label: "3" },
  { key: "3N", label: "3N" },
  { key: "3P", label: "3P" },
] as const;

// Form schema
const bslRowSchema = z.object({
  selectedLevels: z.array(z.string()).default([]),
  roomSpecification: z.string().default(""),
});

const bslFormSchema = z.object({
  rows: z.array(bslRowSchema).min(1, "At least one row is required"),
});

export type BSLFormData = z.infer<typeof bslFormSchema>;
export type BSLRowData = z.infer<typeof bslRowSchema>;

interface BSLFormProps {
  onSubmit: (data: BSLFormData) => void;
  defaultValues?: BSLFormData;
  className?: string;
}

interface BSLRowProps {
  control: Control<BSLFormData>;
  rowIndex: number;
  onRemove: () => void;
  canRemove: boolean;
}

const BSLRow: React.FC<BSLRowProps> = ({ 
  control, 
  rowIndex, 
  onRemove, 
  canRemove 
}) => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
      {/* Row number */}
      <div className="w-8 text-center font-medium">
        {rowIndex + 1}
      </div>

      {/* BSL Level checkboxes */}
      <div className="flex-1">
        <FormField
          control={control}
          name={`rows.${rowIndex}.selectedLevels`}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4 flex-wrap">
                {BSL_LEVELS.map((level) => (
                  <div key={level.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${rowIndex}-${level.key}`}
                      checked={field.value?.includes(level.key)}
                      onCheckedChange={(checked) => {
                        const currentValues = field.value || [];
                        if (checked) {
                          field.onChange([...currentValues, level.key]);
                        } else {
                          field.onChange(
                            currentValues.filter((value) => value !== level.key)
                          );
                        }
                      }}
                    />
                    <Label 
                      htmlFor={`${rowIndex}-${level.key}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {level.label}
                    </Label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Room specification input */}
      <div className="w-64">
        <FormField
          control={control}
          name={`rows.${rowIndex}.roomSpecification`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="ระบุเลขที่ห้อง/ชั้น/อาคาร/สถานที่"
                  {...field}
                  className="text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Remove button */}
      {canRemove && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRemove}
          className="p-2"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export const BSLForm: React.FC<BSLFormProps> = ({
  onSubmit,
  defaultValues = { rows: [{ selectedLevels: [], roomSpecification: "" }] },
  className = "",
}) => {
  const form = useForm<BSLFormData>({
    resolver: zodResolver(bslFormSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rows",
  });

  const handleAddRow = () => {
    append({ selectedLevels: [], roomSpecification: "" });
  };

  const handleRemoveRow = (index: number) => {
    remove(index);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-8 text-center font-semibold text-sm">
              ลำดับ
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-2">
                ระดับห้องปฏิบัติการวิจัย (BSL- Biosafety Level for Laboratory)
              </h3>
              <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                {BSL_LEVELS.map((level) => (
                  <div key={level.key} className="text-center min-w-[40px]">
                    {level.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-64 text-center font-semibold text-sm">
              ระบุเลขที่ห้อง/ชั้น/อาคาร/สถานที่
              <br />
              <span className="text-xs font-normal text-muted-foreground">
                (Specify room no./floor/building)
              </span>
            </div>
            <div className="w-10"></div> {/* Spacer for remove button column */}
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Rows */}
            <div className="space-y-3">
              {fields.map((field, index) => (
                <BSLRow
                  key={field.id}
                  control={form.control}
                  rowIndex={index}
                  onRemove={() => handleRemoveRow(index)}
                  canRemove={fields.length > 1}
                />
              ))}
            </div>

            {/* Add row button */}
            <div className="flex justify-start">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddRow}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                เพิ่มแถว
              </Button>
            </div>

            {/* Submit button */}
            <div className="flex justify-end pt-4">
              <Button type="submit" className="px-8">
                บันทึก
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BSLForm;