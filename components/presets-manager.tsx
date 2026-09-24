"use client";

import React, { useState } from "react";
import { QRPreset, BUILTIN_PRESETS } from "@/lib/qr-types";
import { Button } from "@/components/ui/button";
import { Sparkles, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface PresetsManagerProps {
  customPresets: QRPreset[];
  onSelectPreset: (preset: QRPreset) => void;
  onSavePreset: (name: string, description: string) => void;
  onDeletePreset: (id: string) => void;
}

export function PresetsManager({
  customPresets,
  onSelectPreset,
  onSavePreset,
  onDeletePreset,
}: PresetsManagerProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSavePreset(name.trim(), description.trim());
    setName("");
    setDescription("");
    setOpenDialog(false);
  };

  const allPresets = [...BUILTIN_PRESETS, ...customPresets];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Estilos & Presets
          </span>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger
            render={
              <Button
                variant="outline"
                size="xs"
                className="gap-1 shadow-2xs text-[11px]"
              >
                <Plus className="size-3" />
                Guardar actual
              </Button>
            }
          />
          <DialogContent className="rounded-2xl max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-sm font-semibold">
                Guardar preset personalizado
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Nombre del estilo
                </label>
                <Input
                  placeholder="Ej: Mi Marca Neón"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-8 text-xs"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Descripción breve
                </label>
                <Input
                  placeholder="Ej: Tonos cian para redes"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" size="sm" disabled={!name.trim()}>
                  Guardar estilo
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid of presets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {allPresets.map((preset) => (
          <div
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className="group relative cursor-pointer border border-border/70 hover:border-primary/50 bg-card/60 hover:bg-card p-2.5 rounded-xl transition-all shadow-xs flex flex-col justify-between gap-2"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-semibold text-foreground truncate">
                  {preset.name}
                </span>
                {preset.isCustom && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="opacity-0 group-hover:opacity-100 hover:text-destructive h-5 w-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePreset(preset.id);
                    }}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground line-clamp-1">
                {preset.description}
              </p>
            </div>

            <div className="flex items-center gap-1.5 pt-1 border-t border-border/40">
              <span
                className="w-3 h-3 rounded-full border border-black/10 shrink-0 shadow-2xs"
                style={{ backgroundColor: preset.config.bgColor || "#ffffff" }}
              />
              <span
                className="w-3 h-3 rounded-full border border-black/10 shrink-0 shadow-2xs"
                style={{ backgroundColor: preset.config.fgColor || "#000000" }}
              />
              {preset.config.qrStyle && (
                <span className="text-[9px] font-mono uppercase text-muted-foreground ml-auto">
                  {preset.config.qrStyle}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
