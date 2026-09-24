"use client";

import React, { useRef, useState } from "react";
import { QRCode, IProps } from "react-qrcode-logo";
import { QRConfig } from "@/lib/qr-types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Download, Copy, Check } from "lucide-react";
import {
  downloadCanvasAsPNG,
  downloadCanvasAsWEBP,
  downloadCanvasAsJPEG,
  copyCanvasToClipboard,
} from "@/lib/qr-export";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface QRPreviewProps {
  config: QRConfig;
  isLoading?: boolean;
}

export function QRPreview({ config, isLoading = false }: QRPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const getCanvasElement = (): HTMLCanvasElement | null => {
    if (!containerRef.current) return null;
    return containerRef.current.querySelector("canvas");
  };

  const handleExport = async (format: "png" | "webp" | "jpg" | "svg") => {
    const canvas = getCanvasElement();
    if (!canvas) return;

    const baseName = "qr-code";
    if (format === "png") {
      await downloadCanvasAsPNG(canvas, `${baseName}.png`, 2);
    } else if (format === "webp") {
      await downloadCanvasAsWEBP(canvas, `${baseName}.webp`);
    } else if (format === "jpg") {
      await downloadCanvasAsJPEG(canvas, `${baseName}.jpg`);
    } else if (format === "svg") {
      // Create SVG wrapper with embedded image for maximum compatibility
      const dataUrl = canvas.toDataURL("image/png");
      const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
        <image width="${canvas.width}" height="${canvas.height}" href="${dataUrl}" />
      </svg>`;
      const blob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `${baseName}.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleCopy = async () => {
    const canvas = getCanvasElement();
    if (!canvas) return;
    const success = await copyCanvasToClipboard(canvas);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Build react-qrcode-logo props
  const qrProps: IProps = {
    value: config.value || "https://example.com",
    size: config.size,
    bgColor: config.bgColor,
    fgColor: config.fgColor,
    qrStyle: config.qrStyle,
    ecLevel: config.ecLevel,
    quietZone: config.quietZone,
    eyeRadius: config.enableEyeRadius ? config.eyeRadius : undefined,
    eyeColor: config.enableEyeColor ? config.eyeColor : undefined,
    logoImage: config.logoImage,
    logoWidth: config.logoImage ? config.logoWidth : undefined,
    logoHeight: config.logoImage ? config.logoHeight : undefined,
    logoOpacity: config.logoImage ? config.logoOpacity : undefined,
    removeQrCodeBehindLogo: config.removeQrCodeBehindLogo,
    logoPadding: config.logoImage ? config.logoPadding : undefined,
    logoPaddingStyle: config.logoImage ? config.logoPaddingStyle : undefined,
  };

  const getFrameClasses = () => {
    switch (config.frameStyle) {
      case "glass":
        return "backdrop-blur-md bg-card/60 border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-6";
      case "bordered":
        return "border-2 border-primary/40 bg-card rounded-2xl p-6 shadow-xl";
      case "minimal":
        return "p-2 bg-transparent";
      case "card":
      default:
        return "border border-border/80 bg-card/90 shadow-xl rounded-2xl p-6";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md mx-auto sticky top-8">
      {/* Container with dynamic card styling */}
      <div
        className={`relative transition-all duration-300 ${getFrameClasses()}`}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-4 space-y-4">
            <Skeleton className="w-[280px] h-[280px] rounded-xl animate-pulse bg-muted" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24 bg-muted" />
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="flex flex-col items-center justify-center"
          >
            <div className="overflow-hidden rounded-xl bg-transparent transition-transform duration-200 hover:scale-[1.02]">
              <QRCode {...qrProps} />
            </div>

            {config.frameLabel &&
              config.frameStyle !== "none" &&
              config.frameStyle !== "minimal" && (
                <div className="mt-4 text-center">
                  <Badge
                    variant="outline"
                    className="px-3 py-1 font-mono tracking-widest text-[11px] uppercase border-border/60 bg-muted/40 font-semibold"
                  >
                    {config.frameLabel}
                  </Badge>
                </div>
              )}
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 w-full justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="default"
                size="lg"
                disabled={isLoading || !config.value}
                className="flex-1 max-w-[220px] shadow-lg shadow-primary/10 gap-2 font-medium"
              >
                <Download className="size-4" />
                Descargar QR
              </Button>
            }
          />
          <DropdownMenuContent
            align="center"
            className="w-48 rounded-xl shadow-xl"
          >
            <DropdownMenuItem
              onClick={() => handleExport("png")}
              className="cursor-pointer"
            >
              <span className="font-medium">PNG</span>
              <span className="ml-auto text-[11px] text-muted-foreground font-mono">
                Alta res (2x)
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleExport("webp")}
              className="cursor-pointer"
            >
              <span className="font-medium">WebP</span>
              <span className="ml-auto text-[11px] text-muted-foreground font-mono">
                Web ligero
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleExport("jpg")}
              className="cursor-pointer"
            >
              <span className="font-medium">JPEG</span>
              <span className="ml-auto text-[11px] text-muted-foreground font-mono">
                Estándar
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleExport("svg")}
              className="cursor-pointer"
            >
              <span className="font-medium">SVG</span>
              <span className="ml-auto text-[11px] text-muted-foreground font-mono">
                Vectorial
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="lg"
          onClick={handleCopy}
          disabled={isLoading || !config.value}
          className="gap-2 shadow-xs"
        >
          {copied ? (
            <>
              <Check className="size-4 text-emerald-500" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="size-4" />
              Copiar
            </>
          )}
        </Button>
      </div>

      {/* Value feedback note */}
      <div className="text-center">
        <p className="text-[11px] text-muted-foreground font-mono truncate max-w-[320px]">
          {config.value ? config.value : "Introduce un enlace o texto..."}
        </p>
      </div>
    </div>
  );
}
