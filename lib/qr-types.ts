export type QRStyle = "squares" | "dots" | "fluid";

export type ECLevel = "L" | "M" | "Q" | "H";

export type LogoPaddingStyle = "square" | "circle";

export type EyeRadiusMode = "global" | "individual";

export interface EyeRadiusItem {
  outer: [number, number, number, number];
  inner: [number, number, number, number];
}

export interface EyeColorItem {
  outer: string;
  inner: string;
}

export interface QRConfig {
  // Data
  value: string;

  // Sizing & Margin
  size: number;
  quietZone: number;
  margin: number;

  // Colors
  bgColor: string;
  fgColor: string;
  enableEyeColor: boolean;
  eyeColor: [EyeColorItem, EyeColorItem, EyeColorItem];

  // Design style
  qrStyle: QRStyle;
  ecLevel: ECLevel;
  enableEyeRadius: boolean;
  eyeRadiusMode: EyeRadiusMode;
  eyeRadius: [EyeRadiusItem, EyeRadiusItem, EyeRadiusItem];

  // Logo
  logoImage?: string;
  logoWidth: number;
  logoHeight: number;
  logoOpacity: number;
  removeQrCodeBehindLogo: boolean;
  logoPadding: number;
  logoPaddingStyle: LogoPaddingStyle;

  // Presentation card styling
  frameStyle: "none" | "minimal" | "card" | "glass" | "bordered";
  frameLabel?: string;
}

export interface QRPreset {
  id: string;
  name: string;
  description: string;
  config: Partial<QRConfig>;
  isCustom?: boolean;
}

export const DEFAULT_QR_CONFIG: QRConfig = {
  value: "https://github.com",
  size: 320,
  quietZone: 16,
  margin: 0,
  bgColor: "#ffffff",
  fgColor: "#0f172a",
  enableEyeColor: false,
  eyeColor: [
    { outer: "#0f172a", inner: "#0f172a" },
    { outer: "#0f172a", inner: "#0f172a" },
    { outer: "#0f172a", inner: "#0f172a" },
  ],
  qrStyle: "squares",
  ecLevel: "M",
  enableEyeRadius: false,
  eyeRadiusMode: "global",
  eyeRadius: [
    { outer: [0, 0, 0, 0], inner: [0, 0, 0, 0] },
    { outer: [0, 0, 0, 0], inner: [0, 0, 0, 0] },
    { outer: [0, 0, 0, 0], inner: [0, 0, 0, 0] },
  ],
  logoImage: undefined,
  logoWidth: 60,
  logoHeight: 60,
  logoOpacity: 1,
  removeQrCodeBehindLogo: true,
  logoPadding: 6,
  logoPaddingStyle: "square",
  frameStyle: "card",
  frameLabel: "SCAN ME",
};

export const BUILTIN_PRESETS: QRPreset[] = [
  {
    id: "minimal-dark",
    name: "Obsidian Core",
    description: "Monocromático elegante de alto contraste",
    config: {
      bgColor: "#09090b",
      fgColor: "#f8fafc",
      qrStyle: "squares",
      ecLevel: "H",
      quietZone: 20,
      enableEyeRadius: true,
      eyeRadius: [
        { outer: [8, 8, 8, 8], inner: [4, 4, 4, 4] },
        { outer: [8, 8, 8, 8], inner: [4, 4, 4, 4] },
        { outer: [8, 8, 8, 8], inner: [4, 4, 4, 4] },
      ],
      enableEyeColor: true,
      eyeColor: [
        { outer: "#38bdf8", inner: "#38bdf8" },
        { outer: "#38bdf8", inner: "#38bdf8" },
        { outer: "#38bdf8", inner: "#38bdf8" },
      ],
      frameStyle: "glass",
    },
  },
  {
    id: "fluid-cyan",
    name: "Neon Fluid",
    description: "Estilo fluido con ojos redondeados y acento cyan",
    config: {
      bgColor: "#ffffff",
      fgColor: "#0284c7",
      qrStyle: "fluid",
      ecLevel: "Q",
      quietZone: 18,
      enableEyeRadius: true,
      eyeRadius: [
        { outer: [16, 0, 16, 0], inner: [10, 0, 10, 0] },
        { outer: [0, 16, 0, 16], inner: [0, 10, 0, 10] },
        { outer: [16, 0, 16, 0], inner: [10, 0, 10, 0] },
      ],
      enableEyeColor: true,
      eyeColor: [
        { outer: "#0369a1", inner: "#0284c7" },
        { outer: "#0369a1", inner: "#0284c7" },
        { outer: "#0369a1", inner: "#0284c7" },
      ],
      frameStyle: "card",
    },
  },
  {
    id: "dots-purple",
    name: "Cosmic Dots",
    description: "Puntos circulares con acento púrpura y magenta",
    config: {
      bgColor: "#f8fafc",
      fgColor: "#7c3aed",
      qrStyle: "dots",
      ecLevel: "H",
      quietZone: 20,
      enableEyeRadius: true,
      eyeRadius: [
        { outer: [20, 20, 20, 20], inner: [12, 12, 12, 12] },
        { outer: [20, 20, 20, 20], inner: [12, 12, 12, 12] },
        { outer: [20, 20, 20, 20], inner: [12, 12, 12, 12] },
      ],
      enableEyeColor: true,
      eyeColor: [
        { outer: "#db2777", inner: "#7c3aed" },
        { outer: "#db2777", inner: "#7c3aed" },
        { outer: "#db2777", inner: "#7c3aed" },
      ],
      frameStyle: "bordered",
    },
  },
  {
    id: "emerald-tech",
    name: "Emerald Matrix",
    description: "Verde esmeralda limpio con estilo corporativo",
    config: {
      bgColor: "#ffffff",
      fgColor: "#059669",
      qrStyle: "squares",
      ecLevel: "H",
      quietZone: 16,
      enableEyeRadius: true,
      eyeRadius: [
        { outer: [12, 12, 0, 12], inner: [6, 6, 0, 6] },
        { outer: [12, 12, 12, 0], inner: [6, 6, 6, 0] },
        { outer: [12, 0, 12, 12], inner: [6, 0, 6, 6] },
      ],
      enableEyeColor: true,
      eyeColor: [
        { outer: "#047857", inner: "#10b981" },
        { outer: "#047857", inner: "#10b981" },
        { outer: "#047857", inner: "#10b981" },
      ],
      frameStyle: "card",
    },
  },
  {
    id: "sunset-gold",
    name: "Sunset Ember",
    description: "Tonos cálidos naranja y café oscuro",
    config: {
      bgColor: "#fffbeb",
      fgColor: "#c2410c",
      qrStyle: "fluid",
      ecLevel: "Q",
      quietZone: 18,
      enableEyeRadius: true,
      eyeRadius: [
        { outer: [14, 14, 14, 14], inner: [8, 8, 8, 8] },
        { outer: [14, 14, 14, 14], inner: [8, 8, 8, 8] },
        { outer: [14, 14, 14, 14], inner: [8, 8, 8, 8] },
      ],
      enableEyeColor: true,
      eyeColor: [
        { outer: "#9a3412", inner: "#ea580c" },
        { outer: "#9a3412", inner: "#ea580c" },
        { outer: "#9a3412", inner: "#ea580c" },
      ],
      frameStyle: "minimal",
    },
  },
];
