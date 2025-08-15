"use client";

import { useEffect } from "react";
import { useFieldArray, FieldValues } from "react-hook-form";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DynamicStringListProps } from "./DynamicStringList.types";

export function DynamicStringList<T extends FieldValues>({
  label,
  control,
  name,
  errors,
  placeholder = "กรุณากรอกข้อมูล",
  minItemCount = 1,
  maxItemCount,
  addButtonText = "เพิ่มรายการ",
  className = "",
  isReadonly,
  getValues,
  trigger,
  onValueUpdate,
  required = true,
  requiredMessage = "กรุณากรอกข้อมูล",
  allowWhitespace = false,
}: DynamicStringListProps<T>) {
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

  // Get field error - ปรับให้ทำงานถูกต้อง
  const getFieldError = (index: number) => {
    // วิธีที่ 1: ใช้ nested object access
    const nameStr = name as string;
    const fieldErrors = errors?.[nameStr as keyof typeof errors] as any;
    const error = fieldErrors?.[index];
    
    // วิธีที่ 2: ลองหา error ด้วย string path
    if (!error) {
      const fieldPath = `${nameStr}.${index}`;
      const pathParts = fieldPath.split('.');
      let currentError = errors as any;
      
      for (const part of pathParts) {
        if (currentError && typeof currentError === 'object') {
          currentError = currentError[part];
        } else {
          currentError = null;
          break;
        }
      }
      
      return currentError;
    }
    
    return error;
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
      
      {/* Debug: แสดง errors ทั้งหมด */}
      {process.env.NODE_ENV === 'development' && errors && (
        <div className="p-2 bg-red-50 text-xs">
          <strong>Debug Errors:</strong>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </div>
      )}
      
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="flex-1">
              <div className="relative">
                <Input
                  {...control.register(`${name}.${index}` as any, {
                    required: required ? requiredMessage : false,
                    validate: (value) => {
                      if (required && (!value || value.length === 0)) {
                        return requiredMessage;
                      }
                      if (!allowWhitespace && value && value.trim().length === 0) {
                        return "กรุณากรอกข้อมูล (ไม่อนุญาตให้ใช้เฉพาะช่องว่าง)";
                      }
                      return true;
                    }
                  })}
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
              {(() => {
                const fieldError = getFieldError(index);
                // Debug: แสดงใน console
                if (fieldError) {
                  console.log(`Field error for ${name}.${index}:`, fieldError);
                }
                
                return fieldError && (
                  <p className="text-sm text-destructive mt-1">
                    {fieldError?.message || fieldError}
                  </p>
                );
              })()}
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