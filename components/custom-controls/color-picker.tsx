"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "cn";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  presets?: string[];
  disabled?: boolean;
}

const DEFAULT_COLOR_PALETTE = [
  "#000000",
  "#0f172a",
  "#334155",
  "#ffffff",
  "#f8fafc",
  "#e2e8f0",
  "#2563eb",
  "#0284c7",
  "#0d9488",
  "#16a34a",
  "#ca8a04",
  "#ea580c",
  "#dc2626",
  "#db2777",
  "#7c3aed",
  "#4f46e5",
];

export function ColorPicker({
  color,
  onChange,
  presets = DEFAULT_COLOR_PALETTE,
  disabled = false,
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [tempHex, setTempHex] = useState(color);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          "flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border/70 bg-card hover:bg-accent/40 text-xs font-mono transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-ring outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      >
        <span
          className="w-4 h-4 rounded-md border border-black/10 shadow-xs shrink-0"
          style={{ backgroundColor: color || "#000000" }}
        />
        <span className="text-foreground/80 font-medium uppercase truncate">
          {color || "#000000"}
        </span>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-64 p-3 rounded-xl backdrop-blur-md bg-card/95 border-border shadow-xl space-y-3"
      >
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={
              color.startsWith("#") && color.length === 7 ? color : "#000000"
            }
            onChange={(e) => {
              onChange(e.target.value);
              setTempHex(e.target.value);
            }}
            className="w-10 h-10 rounded-lg cursor-pointer border border-border bg-transparent p-0.5 shrink-0"
          />
          <div className="flex-1 space-y-1">
            <Input
              value={tempHex}
              onChange={(e) => {
                setTempHex(e.target.value);
                if (/^#([0-9A-F]{3}){1,2}$/i.test(e.target.value)) {
                  onChange(e.target.value);
                }
              }}
              onBlur={() => setTempHex(color)}
              className="h-8 text-xs font-mono"
              placeholder="#000000"
            />
          </div>
        </div>

        <div className="grid grid-cols-8 gap-1.5 pt-1 border-t border-border/50">
          {presets.map((presetColor) => (
            <button
              key={presetColor}
              type="button"
              onClick={() => {
                onChange(presetColor);
                setTempHex(presetColor);
              }}
              className={cn(
                "w-6 h-6 rounded-md border border-black/10 transition-transform hover:scale-110 focus:outline-none focus:ring-1 focus:ring-ring shrink-0",
                color.toLowerCase() === presetColor.toLowerCase() &&
                  "ring-2 ring-primary ring-offset-1 ring-offset-background",
              )}
              style={{ backgroundColor: presetColor }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
