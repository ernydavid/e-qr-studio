import confetti from "canvas-confetti";

export function fireSuccessConfetti() {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { y: 0.8 },
    colors: ["#38bdf8", "#818cf8", "#c084fc", "#34d399"],
  });
}

export async function downloadCanvasAsPNG(
  canvas: HTMLCanvasElement,
  filename = "qr-code.png",
  scaleMultiplier = 2,
): Promise<void> {
  // Create higher resolution copy for crisp print/digital output
  const offscreen = document.createElement("canvas");
  offscreen.width = canvas.width * scaleMultiplier;
  offscreen.height = canvas.height * scaleMultiplier;
  const ctx = offscreen.getContext("2d");
  if (!ctx) return;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(canvas, 0, 0, offscreen.width, offscreen.height);

  const dataUrl = offscreen.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
  fireSuccessConfetti();
}

export async function downloadCanvasAsWEBP(
  canvas: HTMLCanvasElement,
  filename = "qr-code.webp",
): Promise<void> {
  const dataUrl = canvas.toDataURL("image/webp", 1.0);
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
  fireSuccessConfetti();
}

export async function downloadCanvasAsJPEG(
  canvas: HTMLCanvasElement,
  filename = "qr-code.jpg",
): Promise<void> {
  const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
  fireSuccessConfetti();
}

export async function copyCanvasToClipboard(
  canvas: HTMLCanvasElement,
): Promise<boolean> {
  try {
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        fireSuccessConfetti();
        resolve(true);
      }, "image/png");
    });
  } catch (err) {
    console.error("Failed to copy image to clipboard:", err);
    return false;
  }
}
