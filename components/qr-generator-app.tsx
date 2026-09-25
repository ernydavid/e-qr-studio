"use client";

import React, { useState, useEffect } from "react";
import { QRConfig, DEFAULT_QR_CONFIG, QRPreset } from "@/lib/qr-types";
import {
  saveLastConfigCookie,
  loadLastConfigCookie,
  getCustomPresets,
  saveCustomPreset,
  deleteCustomPreset,
  saveThemePreference,
  loadThemePreference,
} from "@/lib/qr-storage";
import { QRPreview } from "@/components/qr-preview";
import { QRControls } from "@/components/qr-controls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  QrCode01Icon,
  Rotate01Icon,
  Sun01Icon,
  Moon01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function QRGeneratorApp() {
  const [config, setConfig] = useState<QRConfig>(DEFAULT_QR_CONFIG);
  const [customPresets, setCustomPresets] = useState<QRPreset[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    // Delay initialization to microtask to avoid synchronous cascading renders warning
    const id = requestAnimationFrame(() => {
      const savedConfig = loadLastConfigCookie();
      if (savedConfig) {
        setConfig(savedConfig);
      }
      setCustomPresets(getCustomPresets());

      // Load theme preference from cookies or system preference
      const savedTheme = loadThemePreference();
      if (savedTheme) {
        // Use saved theme preference
        const isDark = savedTheme === "dark";
        setIsDarkMode(isDark);
        applyTheme(isDark);
      } else if (document.documentElement.classList.contains("dark")) {
        // Fallback to current DOM state
        setIsDarkMode(true);
      }
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Update cookies whenever config changes
  const handleConfigChange = (newConfig: QRConfig) => {
    setConfig(newConfig);
    saveLastConfigCookie(newConfig);
  };

  const handleSelectPreset = (preset: QRPreset) => {
    const updated = { ...config, ...preset.config };
    handleConfigChange(updated);
  };

  const handleSavePreset = (name: string, description: string) => {
    const saved = saveCustomPreset({
      name,
      description,
      config: {
        bgColor: config.bgColor,
        fgColor: config.fgColor,
        qrStyle: config.qrStyle,
        ecLevel: config.ecLevel,
        quietZone: config.quietZone,
        enableEyeColor: config.enableEyeColor,
        eyeColor: config.eyeColor,
        enableEyeRadius: config.enableEyeRadius,
        eyeRadius: config.eyeRadius,
        frameStyle: config.frameStyle,
        frameLabel: config.frameLabel,
      },
    });
    setCustomPresets((prev) => [saved, ...prev]);
  };

  const handleDeletePreset = (id: string) => {
    deleteCustomPreset(id);
    setCustomPresets((prev) => prev.filter((p) => p.id !== id));
  };

  const handleReset = () => {
    handleConfigChange(DEFAULT_QR_CONFIG);
  };

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    applyTheme(nextMode);
    saveThemePreference(nextMode);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 selection:bg-primary/20">
      {/* Header Bar */}
      <header className="border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
              <HugeiconsIcon icon={QrCode01Icon} className="size-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-foreground">
                QR Studio
              </span>
              <Badge
                variant="secondary"
                className="text-[10px] font-mono px-1.5 py-0 h-4"
              >
                PRO
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-foreground gap-1.5 h-8"
            >
              <HugeiconsIcon icon={Rotate01Icon} className="size-3.5" />
              <span className="hidden sm:inline">Restablecer</span>
            </Button>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={toggleDarkMode}
              className=""
            >
              {isDarkMode ? (
                <HugeiconsIcon icon={Sun01Icon} className="size-4" />
              ) : (
                <HugeiconsIcon icon={Moon01Icon} className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: QR Controls */}
          <div className="lg:col-span-7 space-y-6">
            <QRControls
              config={config}
              onChange={handleConfigChange}
              customPresets={customPresets}
              onSelectPreset={handleSelectPreset}
              onSavePreset={handleSavePreset}
              onDeletePreset={handleDeletePreset}
            />
          </div>

          {/* Right Column: Sticky Live Preview */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <QRPreview config={config} isLoading={!mounted} />
          </div>
        </div>
      </main>
    </div>
  );
}
