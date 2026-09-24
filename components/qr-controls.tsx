"use client";

import React from "react";
import { QRConfig, QRStyle, ECLevel, LogoPaddingStyle } from "@/lib/qr-types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPicker } from "@/components/custom-controls/color-picker";
import { RangeSlider } from "@/components/custom-controls/range-slider";
import { LogoUploader } from "@/components/custom-controls/logo-uploader";
import { PresetsManager } from "@/components/presets-manager";
import { Palette, Shapes, ImageIcon, Link, Layers } from "lucide-react";

interface QRControlsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
  customPresets: any[];
  onSelectPreset: (preset: any) => void;
  onSavePreset: (name: string, description: string) => void;
  onDeletePreset: (id: string) => void;
}

export function QRControls({
  config,
  onChange,
  customPresets,
  onSelectPreset,
  onSavePreset,
  onDeletePreset,
}: QRControlsProps) {
  const updateConfig = (updates: Partial<QRConfig>) => {
    onChange({ ...config, ...updates });
  };

  return (
    <div className="space-y-6 w-full">
      {/* Content Input Box */}
      <div className="space-y-2 p-4 rounded-2xl border border-border/70 bg-card/70 backdrop-blur-xs shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Link className="size-4 text-primary" />
            <span>Contenido del QR</span>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            {config.value.length} caracteres
          </span>
        </div>
        <Input
          placeholder="https://tu-enlace.com o cualquier texto..."
          value={config.value}
          onChange={(e) => updateConfig({ value: e.target.value })}
          className="h-10 text-sm bg-background/80"
        />
      </div>

      {/* Presets & Style Gallery */}
      <PresetsManager
        customPresets={customPresets}
        onSelectPreset={onSelectPreset}
        onSavePreset={onSavePreset}
        onDeletePreset={onDeletePreset}
      />

      {/* Tabs of Fine Controls */}
      <Tabs defaultValue="style" className="w-full">
        <TabsList className="grid grid-cols-4 w-full h-9 bg-muted/60 p-1 rounded-xl">
          <TabsTrigger
            value="style"
            className="text-xs rounded-lg gap-1.5 font-medium"
          >
            <Shapes className="size-3.5" />
            <span className="hidden sm:inline">Forma</span>
          </TabsTrigger>
          <TabsTrigger
            value="colors"
            className="text-xs rounded-lg gap-1.5 font-medium"
          >
            <Palette className="size-3.5" />
            <span className="hidden sm:inline">Colores</span>
          </TabsTrigger>
          <TabsTrigger
            value="logo"
            className="text-xs rounded-lg gap-1.5 font-medium"
          >
            <ImageIcon className="size-3.5" />
            <span className="hidden sm:inline">Logo</span>
          </TabsTrigger>
          <TabsTrigger
            value="frame"
            className="text-xs rounded-lg gap-1.5 font-medium"
          >
            <Layers className="size-3.5" />
            <span className="hidden sm:inline">Marco</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Form & Structure */}
        <TabsContent value="style" className="space-y-4 pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Patrón del QR
              </Label>
              <Select
                value={config.qrStyle}
                onValueChange={(val) => {
                  if (val) updateConfig({ qrStyle: val as QRStyle });
                }}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Estilo" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="squares">Cuadrados Clásico</SelectItem>
                  <SelectItem value="dots">Puntos (Dots)</SelectItem>
                  <SelectItem value="fluid">Fluido Orgánico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Corrección de Error
              </Label>
              <Select
                value={config.ecLevel}
                onValueChange={(val) => {
                  if (val) updateConfig({ ecLevel: val as ECLevel });
                }}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Nivel" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="L">Bajo (L - 7%)</SelectItem>
                  <SelectItem value="M">Medio (M - 15%)</SelectItem>
                  <SelectItem value="Q">Alto (Q - 25%)</SelectItem>
                  <SelectItem value="H">Máximo (H - 30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <RangeSlider
              label="Zona de Quietud (Margen interno)"
              value={config.quietZone}
              min={0}
              max={40}
              step={2}
              unit="px"
              onChange={(val) => updateConfig({ quietZone: val })}
            />

            <RangeSlider
              label="Resolución base de render"
              value={config.size}
              min={200}
              max={600}
              step={20}
              unit="px"
              onChange={(val) => updateConfig({ size: val })}
            />
          </div>

          {/* Eye Radii Switch & Control */}
          <div className="pt-2 border-t border-border/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-foreground">
                  Bordes redondeados en esquinas (Eyes)
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Personaliza las esquinas de detección
                </p>
              </div>
              <Switch
                checked={config.enableEyeRadius}
                onCheckedChange={(checked) =>
                  updateConfig({ enableEyeRadius: checked })
                }
              />
            </div>

            {config.enableEyeRadius && (
              <div className="grid grid-cols-3 gap-2 p-3 bg-muted/30 rounded-xl border border-border/60">
                {[0, 1, 2].map((idx) => {
                  const titles = ["Top-Left", "Top-Right", "Bottom-Left"];
                  const currentRad = config.eyeRadius[idx].outer[0];
                  return (
                    <div key={idx} className="space-y-1.5 text-center">
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {titles[idx]}
                      </span>
                      <RangeSlider
                        label="Radio"
                        value={currentRad}
                        min={0}
                        max={25}
                        step={1}
                        onChange={(val) => {
                          const newRadius = [
                            ...config.eyeRadius,
                          ] as typeof config.eyeRadius;
                          newRadius[idx] = {
                            outer: [val, val, val, val],
                            inner: [
                              Math.max(0, val - 4),
                              Math.max(0, val - 4),
                              Math.max(0, val - 4),
                              Math.max(0, val - 4),
                            ],
                          };
                          updateConfig({ eyeRadius: newRadius });
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Tab 2: Colors */}
        <TabsContent value="colors" className="space-y-4 pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Color de Fondo
              </Label>
              <ColorPicker
                color={config.bgColor}
                onChange={(color) => updateConfig({ bgColor: color })}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Color del QR (Primer plano)
              </Label>
              <ColorPicker
                color={config.fgColor}
                onChange={(color) => updateConfig({ fgColor: color })}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-border/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-foreground">
                  Color independiente en esquinas
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Colorea los marcos y centros de escaneo
                </p>
              </div>
              <Switch
                checked={config.enableEyeColor}
                onCheckedChange={(checked) =>
                  updateConfig({ enableEyeColor: checked })
                }
              />
            </div>

            {config.enableEyeColor && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-muted/30 rounded-xl border border-border/60">
                {[0, 1, 2].map((idx) => {
                  const titles = [
                    "Esquina Sup-Izq",
                    "Esquina Sup-Der",
                    "Esquina Inf-Izq",
                  ];
                  const eye = config.eyeColor[idx];
                  return (
                    <div
                      key={idx}
                      className="space-y-2 border-b sm:border-b-0 pb-2 sm:pb-0"
                    >
                      <p className="text-[11px] font-semibold text-foreground">
                        {titles[idx]}
                      </p>
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-muted-foreground">
                          Exterior
                        </span>
                        <ColorPicker
                          color={eye.outer}
                          onChange={(c) => {
                            const newEyeColor = [
                              ...config.eyeColor,
                            ] as typeof config.eyeColor;
                            newEyeColor[idx] = {
                              ...newEyeColor[idx],
                              outer: c,
                            };
                            updateConfig({ eyeColor: newEyeColor });
                          }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-muted-foreground">
                          Interior
                        </span>
                        <ColorPicker
                          color={eye.inner}
                          onChange={(c) => {
                            const newEyeColor = [
                              ...config.eyeColor,
                            ] as typeof config.eyeColor;
                            newEyeColor[idx] = {
                              ...newEyeColor[idx],
                              inner: c,
                            };
                            updateConfig({ eyeColor: newEyeColor });
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Tab 3: Logo Controls */}
        <TabsContent value="logo" className="space-y-4 pt-3">
          <LogoUploader
            logoImage={config.logoImage}
            onChange={(dataUrl) => updateConfig({ logoImage: dataUrl })}
          />

          {config.logoImage && (
            <div className="space-y-4 pt-2 border-t border-border/50">
              <div className="grid grid-cols-2 gap-3">
                <RangeSlider
                  label="Ancho del Logo"
                  value={config.logoWidth}
                  min={20}
                  max={120}
                  step={2}
                  unit="px"
                  onChange={(val) => updateConfig({ logoWidth: val })}
                />
                <RangeSlider
                  label="Alto del Logo"
                  value={config.logoHeight}
                  min={20}
                  max={120}
                  step={2}
                  unit="px"
                  onChange={(val) => updateConfig({ logoHeight: val })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <RangeSlider
                  label="Opacidad Logo"
                  value={Math.round(config.logoOpacity * 100)}
                  min={10}
                  max={100}
                  step={5}
                  unit="%"
                  onChange={(val) => updateConfig({ logoOpacity: val / 100 })}
                />
                <RangeSlider
                  label="Padding Alrededor"
                  value={config.logoPadding}
                  min={0}
                  max={20}
                  step={1}
                  unit="px"
                  onChange={(val) => updateConfig({ logoPadding: val })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Estilo de Padding
                  </Label>
                  <Select
                    value={config.logoPaddingStyle}
                    onValueChange={(val) => {
                      if (val) {
                        updateConfig({
                          logoPaddingStyle: val as LogoPaddingStyle,
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="square">Cuadrado</SelectItem>
                      <SelectItem value="circle">Circular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-xs font-medium text-muted-foreground">
                    Limpiar fondo del logo
                  </span>
                  <Switch
                    checked={config.removeQrCodeBehindLogo}
                    onCheckedChange={(checked) =>
                      updateConfig({ removeQrCodeBehindLogo: checked })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Tab 4: Frame & Presentation */}
        <TabsContent value="frame" className="space-y-4 pt-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Estilo de Tarjeta / Marco
            </Label>
            <Select
              value={config.frameStyle}
              onValueChange={(val: any) => updateConfig({ frameStyle: val })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="card">Tarjeta Sombra Elevada</SelectItem>
                <SelectItem value="glass">Efecto Glassmorphism</SelectItem>
                <SelectItem value="bordered">Borde de Acento</SelectItem>
                <SelectItem value="minimal">Minimalista Limpio</SelectItem>
                <SelectItem value="none">Sin marco</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Texto del Badge / Llamada a la acción
            </Label>
            <Input
              placeholder="Ej: ESCANEA AQUÍ"
              value={config.frameLabel || ""}
              onChange={(e) => updateConfig({ frameLabel: e.target.value })}
              className="h-8 text-xs"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
