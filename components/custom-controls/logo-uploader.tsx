"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload01Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface LogoUploaderProps {
  logoImage?: string;
  onChange: (dataUrl?: string) => void;
  disabled?: boolean;
}

export function LogoUploader({
  logoImage,
  onChange,
  disabled = false,
}: LogoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("El archivo es demasiado grande. Elige una imagen menor a 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {logoImage ? (
        <div className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg border border-border bg-card p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
              <img
                src={logoImage}
                alt="Logo preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="text-xs space-y-0.5">
              <p className="font-medium text-foreground">Logo activo</p>
              <p className="text-muted-foreground text-[11px]">Personalizado</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
            >
              Cambiar
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="icon-sm"
              disabled={disabled}
              onClick={() => onChange(undefined)}
            >
              <HugeiconsIcon icon={Delete02Icon} className="size-3.5" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !disabled && fileInputRef.current?.click()}
          className="border border-dashed border-border/80 hover:border-primary/50 hover:bg-accent/20 cursor-pointer rounded-xl p-5 flex flex-col items-center justify-center gap-2 transition-colors text-center"
        >
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <HugeiconsIcon icon={Upload01Icon} className="size-4" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-foreground">
              Subir imagen o logo
            </p>
            <p className="text-[11px] text-muted-foreground">
              PNG, SVG, JPG o WebP hasta 2MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
