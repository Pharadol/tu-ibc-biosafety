"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DynamicStringList } from "./DynamicStringList";

// Form schema
const exampleFormSchema = z.object({
  researchObjectives: z
    .array(z.string().min(1, "กรุณากรอกวัตถุประสงค์"))
    .min(1, "ต้องมีวัตถุประสงค์อย่างน้อย 1 รายการ"),
  researchMethods: z
    .array(z.string().min(1, "กรุณากรอกวิธีการวิจัย"))
    .min(1, "ต้องมีวิธีการวิจัยอย่างน้อย 1 รายการ"),
  expectedResults: z
    .array(z.string().min(1, "กรุณากรอกผลที่คาดว่าจะได้รับ"))
    .min(1, "ต้องมีผลที่คาดว่าจะได้รับอย่างน้อย 1 รายการ"),
  equipmentList: z
    .array(z.string().min(1, "กรุณากรอกรายการอุปกรณ์"))
    .optional(),
  references: z
    .array(z.string().min(1, "กรุณากรอกเอกสารอ้างอิง"))
    .optional(),
});

type ExampleFormData = z.infer<typeof exampleFormSchema>;

export const DynamicStringListExample: React.FC = () => {
  const form = useForm<ExampleFormData>({
    resolver: zodResolver(exampleFormSchema),
    defaultValues: {
      researchObjectives: [""],
      researchMethods: [""],
      expectedResults: [""],
      equipmentList: [],
      references: [],
    },
  });

  const onSubmit = (data: ExampleFormData) => {
    console.log("Form Data:", data);
    // Handle form submission
    alert("ดูข้อมูลใน Console");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Dynamic String List Example
          </h1>
          <p className="text-muted-foreground">
            ตัวอย่างการใช้งาน DynamicStringList สำหรับฟอร์มวิจัย
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Research Objectives - Required, Min 1, Max 5 */}
            <DynamicStringList
              control={form.control}
              name="researchObjectives"
              label="วัตถุประสงค์การวิจัย (Research Objectives)"
              errors={form.formState.errors}
              placeholder="กรุณากรอกวัตถุประสงค์"
              minItemCount={1}
              maxItemCount={5}
              addButtonText="เพิ่มวัตถุประสงค์"
            />

            {/* Research Methods - Required, Min 1, No Max */}
            <DynamicStringList
              control={form.control}
              name="researchMethods"
              label="วิธีการวิจัย (Research Methods)"
              errors={form.formState.errors}
              placeholder="กรุณากรอกวิธีการวิจัย"
              minItemCount={1}
              addButtonText="เพิ่มวิธีการวิจัย"
            />

            {/* Expected Results - Required, Min 1, Max 3 */}
            <DynamicStringList
              control={form.control}
              name="expectedResults"
              label="ผลที่คาดว่าจะได้รับ (Expected Results)"
              errors={form.formState.errors}
              placeholder="กรุณากรอกผลที่คาดว่าจะได้รับ"
              minItemCount={1}
              maxItemCount={3}
              addButtonText="เพิ่มผลที่คาดหวัง"
            />

            {/* Equipment List - Optional, Min 0, Max 10 */}
            <DynamicStringList
              control={form.control}
              name="equipmentList"
              label="รายการอุปกรณ์ (Equipment List)"
              errors={form.formState.errors}
              placeholder="กรุณากรอกรายการอุปกรณ์"
              minItemCount={0}
              maxItemCount={10}
              addButtonText="เพิ่มอุปกรณ์"
            />

            {/* References - Optional, Min 0, No Max */}
            <DynamicStringList
              control={form.control}
              name="references"
              label="เอกสารอ้างอิง (References)"
              errors={form.formState.errors}
              placeholder="กรุณากรอกเอกสารอ้างอิง"
              minItemCount={0}
              addButtonText="เพิ่มเอกสารอ้างอิง"
            />

            <div className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                รีเซ็ต
              </Button>
              <Button type="submit" className="px-8">
                บันทึกข้อมูล
              </Button>
            </div>
          </form>
        </Form>

        {/* Display current form values */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">Current Form Values:</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(form.watch(), null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DynamicStringListExample;