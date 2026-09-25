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
import {
  PaletteIcon,
  GeometricShapes01Icon,
  Image01Icon,
  Link01Icon,
  LayersIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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

  // Mapeo de valores a labels para los selects
  const qrStyleLabels: Record<string, string> = {
    squares: "Cuadrados Clásico",
    dots: "Puntos (Dots)",
    fluid: "Fluido Orgánico",
  };

  const ecLevelLabels: Record<string, string> = {
    L: "Bajo (L - 7%)",
    M: "Medio (M - 15%)",
    Q: "Alto (Q - 25%)",
    H: "Máximo (H - 30%)",
  };

  const paddingStyleLabels: Record<string, string> = {
    square: "Cuadrado",
    circle: "Círculo",
    rounded: "Redondeado",
  };

  const frameStyleLabels: Record<string, string> = {
    none: "Sin marco",
    minimal: "Minimalista Limpio",
    card: "Tarjeta Sombra Elevada",
    glass: "Efecto Glassmorphism",
    bordered: "Borde de Acento",
  };

  return (
    <div className="space-y-6 w-full">
      {/* Content Input Box */}
      <div className="space-y-2 p-4 rounded-2xl border border-border/70 bg-card/70 backdrop-blur-xs shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <HugeiconsIcon icon={Link01Icon} className="size-4 text-primary" />
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
        <TabsList className="grid grid-cols-4 w-full h-auto bg-muted/60 p-1 rounded-xl">
          <TabsTrigger
            value="style"
            className="text-xs rounded-lg gap-1.5 font-medium"
          >
            <HugeiconsIcon icon={GeometricShapes01Icon} className="size-3.5" />
            <span className="hidden sm:inline">Forma</span>
          </TabsTrigger>
          <TabsTrigger
            value="colors"
            className="text-xs rounded-lg gap-1.5 font-medium"
          >
            <HugeiconsIcon icon={PaletteIcon} className="size-3.5" />
            <span className="hidden sm:inline">Colores</span>
          </TabsTrigger>
          <TabsTrigger
            value="logo"
            className="text-xs rounded-lg gap-1.5 font-medium"
          >
            <HugeiconsIcon icon={Image01Icon} className="size-3.5" />
            <span className="hidden sm:inline">Logo</span>
          </TabsTrigger>
          <TabsTrigger
            value="frame"
            className="text-xs rounded-lg gap-1.5 font-medium"
          >
            <HugeiconsIcon icon={LayersIcon} className="size-3.5" />
            <span className="hidden sm:inline">Marco</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Form & Structure */}
        <TabsContent value="style" className="space-y-4 pt-3 w-full">
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
                  <SelectValue placeholder="Estilo">
                    {qrStyleLabels[config.qrStyle] || "Estilo"}
                  </SelectValue>
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
                  <SelectValue placeholder="Nivel">
                    {ecLevelLabels[config.ecLevel] || "Nivel"}
                  </SelectValue>
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
                  Bordes redondeados (Eyes)
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
              <div className="space-y-2.5 p-3 bg-muted/30 rounded-xl border border-border/60">
                {/* Global slider */}
                <RangeSlider
                  label="Radio global"
                  value={config.eyeRadius[0].outer[0]}
                  min={0}
                  max={25}
                  step={1}
                  onChange={(val) => {
                    const r: typeof config.eyeRadius = [
                      { outer: [val, val, val, val], inner: [Math.max(0, val - 4), Math.max(0, val - 4), Math.max(0, val - 4), Math.max(0, val - 4)] },
                      { outer: [val, val, val, val], inner: [Math.max(0, val - 4), Math.max(0, val - 4), Math.max(0, val - 4), Math.max(0, val - 4)] },
                      { outer: [val, val, val, val], inner: [Math.max(0, val - 4), Math.max(0, val - 4), Math.max(0, val - 4), Math.max(0, val - 4)] },
                    ];
                    updateConfig({ eyeRadius: r });
                  }}
                />

                {/* Individual toggle */}
                <div className="flex items-center justify-between pt-1 border-t border-border/40">
                  <span className="text-[11px] text-muted-foreground font-medium">
                    Ajuste individual por esquina
                  </span>
                  <Switch
                    checked={config.eyeRadiusMode === "individual"}
                    onCheckedChange={(checked) =>
                      updateConfig({ eyeRadiusMode: checked ? "individual" : "global" })
                    }
                    size="sm"
                  />
                </div>

                {config.eyeRadiusMode === "individual" && (
                  <div className="space-y-2 pt-1">
                    {([0, 1, 2] as const).map((idx) => {
                      const labels = ["Sup-Izq", "Sup-Der", "Inf-Izq"];
                      const corners = ["TL", "TR", "BR", "BL"];
                      const eye = config.eyeRadius[idx];

                      const updateCorner = (corner: number, val: number) => {
                        const newRadius = [...config.eyeRadius] as typeof config.eyeRadius;
                        const newOuter = [...eye.outer] as [number, number, number, number];
                        newOuter[corner] = val;
                        newRadius[idx] = { outer: newOuter, inner: eye.inner };
                        updateConfig({ eyeRadius: newRadius });
                      };

                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-background/60 border border-border/40"
                        >
                          <span className="text-[10px] font-semibold text-foreground w-12 shrink-0">
                            {labels[idx]}
                          </span>
                          <div className="flex items-center gap-1.5 flex-1">
                            {corners.map((label, ci) => (
                              <div key={ci} className="flex flex-col items-center gap-0.5 flex-1">
                                <span className="text-[8px] text-muted-foreground font-mono leading-none">
                                  {label}
                                </span>
                                <input
                                  type="number"
                                  min={0}
                                  max={25}
                                  value={eye.outer[ci]}
                                  onChange={(e) => updateCorner(ci, Math.min(25, Math.max(0, parseInt(e.target.value) || 0)))}
                                  className="w-full h-6 text-[11px] text-center font-mono bg-muted/50 border border-border/50 rounded-md outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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
                      <SelectValue placeholder="Estilo">
                        {paddingStyleLabels[config.logoPaddingStyle] ||
                          "Estilo"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="square">Cuadrado</SelectItem>
                      <SelectItem value="circle">Circular</SelectItem>
                      <SelectItem value="rounded">Redondeado</SelectItem>
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
                <SelectValue placeholder="Estilo">
                  {frameStyleLabels[config.frameStyle] || "Estilo"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="none">Sin marco</SelectItem>
                <SelectItem value="minimal">Minimalista Limpio</SelectItem>
                <SelectItem value="card">Tarjeta Sombra Elevada</SelectItem>
                <SelectItem value="glass">Efecto Glassmorphism</SelectItem>
                <SelectItem value="bordered">Borde de Acento</SelectItem>
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
