import Cookies from "js-cookie";
import { DEFAULT_QR_CONFIG, QRConfig, QRPreset } from "./qr-types";

const COOKIE_NAME = "qr_config_last_state";
const STORAGE_KEY_PRESETS = "qr_custom_presets_v1";

export function saveLastConfigCookie(config: QRConfig): void {
  try {
    // Exclude large base64 strings from cookie if needed to prevent 4kb limit
    const configToStore: QRConfig = {
      ...config,
      logoImage:
        config.logoImage && config.logoImage.length > 500
          ? undefined
          : config.logoImage,
    };
    Cookies.set(COOKIE_NAME, JSON.stringify(configToStore), {
      expires: 365,
      sameSite: "lax",
    });
  } catch (err) {
    console.error("Error saving config cookie:", err);
  }
}

export function loadLastConfigCookie(): QRConfig | null {
  try {
    const raw = Cookies.get(COOKIE_NAME);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_QR_CONFIG, ...parsed };
  } catch (err) {
    console.error("Error loading config cookie:", err);
    return null;
  }
}

export function getCustomPresets(): QRPreset[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRESETS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error loading custom presets:", err);
    return [];
  }
}

export function saveCustomPreset(
  preset: Omit<QRPreset, "id" | "isCustom">,
): QRPreset {
  const current = getCustomPresets();
  const newPreset: QRPreset = {
    ...preset,
    id: `custom_${Date.now()}`,
    isCustom: true,
  };
  const updated = [newPreset, ...current];
  try {
    localStorage.setItem(STORAGE_KEY_PRESETS, JSON.stringify(updated));
  } catch (err) {
    console.error("Error saving custom preset:", err);
  }
  return newPreset;
}

export function deleteCustomPreset(id: string): void {
  const current = getCustomPresets();
  const updated = current.filter((p) => p.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY_PRESETS, JSON.stringify(updated));
  } catch (err) {
    console.error("Error deleting custom preset:", err);
  }
}
