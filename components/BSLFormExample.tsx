"use client";

import React from "react";
import BSLForm, { BSLFormData } from "./BSLForm";

export const BSLFormExample: React.FC = () => {
  const handleSubmit = (data: BSLFormData) => {
    console.log("Form submitted:", data);
    // Here you can handle the form data
    // For example: send to API, save to state, etc.
  };

  const defaultValues: BSLFormData = {
    rows: [
      {
        selectedLevels: ["1", "2"],
        roomSpecification: "ห้อง 101 ชั้น 1 อาคาร A",
      },
      {
        selectedLevels: ["3"],
        roomSpecification: "ห้อง 201 ชั้น 2 อาคาร B",
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            BSL Form Example
          </h1>
          <p className="text-muted-foreground">
            ตัวอย่างการใช้งานฟอร์มระดับห้องปฏิบัติการวิจัย (BSL - Biosafety Level)
          </p>
        </div>

        <BSLForm 
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          className="bg-background border rounded-lg p-6"
        />
      </div>
    </div>
  );
};

export default BSLFormExample;