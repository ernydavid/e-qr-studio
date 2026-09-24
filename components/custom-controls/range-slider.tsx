"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";

interface RangeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
  disabled?: boolean;
}

export function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  disabled = false,
}: RangeSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className="font-mono text-foreground font-semibold bg-muted/50 px-1.5 py-0.5 rounded text-[11px]">
          {value}
          {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onValueChange={(vals) => {
          if (Array.isArray(vals)) {
            onChange(vals[0]);
          } else if (typeof vals === "number") {
            onChange(vals);
          }
        }}
        className="w-full"
      />
    </div>
  );
}
