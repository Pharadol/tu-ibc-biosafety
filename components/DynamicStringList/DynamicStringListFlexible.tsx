"use client";

import { useEffect } from "react";
import { useFieldArray, FieldValues, Control, FieldErrors } from "react-hook-form";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FlexibleDynamicStringListProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  name: string; // More flexible - accepts any string
  errors?: FieldErrors<T>;
  placeholder?: string;
  minItemCount?: number;
  maxItemCount?: number;
  addButtonText?: string;
  className?: string;
}

export function FlexibleDynamicStringList<T extends FieldValues>({
  label,
  control,
  name,
  errors,
  placeholder = "กรุณากรอกข้อมูล",
  minItemCount = 1,
  maxItemCount,
  addButtonText = "เพิ่มรายการ",
  className = "",
}: FlexibleDynamicStringListProps<T>) {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: name as any,
  });

  const handleAddItem = () => {
    if (maxItemCount && fields.length >= maxItemCount) {
      return;
    }
    append("" as any);
  };

  const handleRemoveItem = (index: number) => {
    if (fields.length <= minItemCount) {
      return;
    }
    remove(index);
  };

  const canAddMore = !maxItemCount || fields.length < maxItemCount;
  const canRemove = fields.length > minItemCount;

  // Initialize with minimum required items
  useEffect(() => {
    if (fields.length === 0 && minItemCount > 0) {
      const initialItems = Array(minItemCount).fill("");
      replace(initialItems as any);
    }
  }, [fields.length, minItemCount, replace]);

  // Get field error
  const getFieldError = (index: number) => {
    const fieldPath = `${name}.${index}` as keyof typeof errors;
    return errors?.[fieldPath];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">{label}</Label>
        {maxItemCount && (
          <span className="text-sm text-muted-foreground">
            {fields.length}/{maxItemCount}
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="flex-1">
              <div className="relative">
                <Input
                  {...control.register(`${name}.${index}` as any)}
                  placeholder={`${placeholder} ${index + 1}`}
                  className={`pr-10 ${
                    getFieldError(index) ? "border-destructive" : ""
                  }`}
                />
                {canRemove && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(index)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
              {getFieldError(index) && (
                <p className="text-sm text-destructive mt-1">
                  {getFieldError(index)?.message as string}
                </p>
              )}
            </div>
            
            {/* Show index number */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium text-muted-foreground">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {canAddMore && (
        <Button
          type="button"
          onClick={handleAddItem}
          variant="outline"
          size="sm"
          className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          {addButtonText}
        </Button>
      )}
      
      {fields.length === 0 && minItemCount === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">ยังไม่มีรายการ</p>
          <Button
            type="button"
            onClick={handleAddItem}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            {addButtonText}
          </Button>
        </div>
      )}
    </div>
  );
}