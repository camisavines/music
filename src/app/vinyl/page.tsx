"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Download, Upload, PlayFilled, StopFilled } from "@carbon/icons-react";

// ── Mode ───────────────────────────────────────────────────────────────────────
type Mode = "vinyl" | "cassette" | "cd";

// ── Shared settings ────────────────────────────────────────────────────────────
interface SharedSettings {
  rpm: number;
  spin: boolean;
  backgroundColor: string;
  shadowBlur: number;
  showReflection: boolean;
  vinylSize: number;  // 0.5–1.0, fraction of canvas radius
  imageScale: number; // 1.0 = fill exactly; >1 zooms in, <1 zooms out
}

// ── Vinyl-specific ─────────────────────────────────────────────────────────────
interface VinylSettings extends SharedSettings {
  vinylColor: string;
  labelRadius: number;
  grooveCount: number;
  grooveOpacity: number;
  grooveColor: string;
}

// ── Cassette-specific ──────────────────────────────────────────────────────────
interface CassetteSettings extends SharedSettings {
  bodyColor: string;
  reelColor: string;
  tapeColor: string;
  windowColor: string;
  labelColor: string;
}

// ── CD-specific ────────────────────────────────────────────────────────────────
interface CDSettings extends SharedSettings {
  discColor: string;
  iridescence: boolean;
  ringCount: number;
}

// ── Text overlay ───────────────────────────────────────────────────────────────
interface TextOverlay {
  enabled: boolean;
  line1: string;
  line2: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  bold: boolean;
  italic: boolean;
  position: "top" | "bottom" | "center";
  opacity: number;
  letterSpacing: number;
}

type ExportFormat = "png" | "webm";

// ── GCD helper for clean aspect ratio labels ───────────────────────────────────
function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }
function arLabel(w: number, h: number): string {
  const g = gcd(w, h);
  return `${w / g}:${h / g}`;
}

// ── Video presets ──────────────────────────────────────────────────────────────
interface VideoPreset {
  id: string;
  label: string;
  platform: string;
  width: number;
  height: number;
  icon: string;
}

const VIDEO_PRESETS: VideoPreset[] = [
  { id: "instagram_sq",    label: "Square",       platform: "Instagram",  width: 1080, height: 1080, icon: "⬜" },
  { id: "instagram_port",  label: "Portrait",     platform: "Instagram",  width: 1080, height: 1350, icon: "📸" },
  { id: "instagram_story", label: "Story / Reel", platform: "Instagram",  width: 1080, height: 1920, icon: "📱" },
  { id: "tiktok",          label: "Video",        platform: "TikTok",     width: 1080, height: 1920, icon: "🎵" },
  { id: "youtube_thumb",   label: "Thumbnail",    platform: "YouTube",    width: 1280, height: 720,  icon: "▶️" },
  { id: "youtube_short",   label: "Short",        platform: "YouTube",    width: 1080, height: 1920, icon: "🩳" },
  { id: "twitter_sq",      label: "Square Post",  platform: "X / Twitter", width: 1080, height: 1080, icon: "✖️" },
  { id: "facebook_sq",     label: "Square Post",  platform: "Facebook",   width: 1080, height: 1080, icon: "👍" },
  { id: "facebook_story",  label: "Story",        platform: "Facebook",   width: 1080, height: 1920, icon: "📲" },
];

// ── Defaults ───────────────────────────────────────────────────────────────────
const VINYL_DEFAULTS: VinylSettings = {
  rpm: 16, spin: true, backgroundColor: "#080608", shadowBlur: 32, showReflection: true,
  vinylSize: 0.9, imageScale: 1.0,
  vinylColor: "#111111", labelRadius: 0.38, grooveCount: 36, grooveOpacity: 0.55, grooveColor: "#2a2a2a",
};
const CASSETTE_DEFAULTS: CassetteSettings = {
  rpm: 16, spin: true, backgroundColor: "#080608", shadowBlur: 24, showReflection: true,
  vinylSize: 0.9, imageScale: 1.0,
  bodyColor: "#1a1a2e", reelColor: "#222222", tapeColor: "#1a0a00", windowColor: "#0d1b2a", labelColor: "#c9a84c",
};
const CD_DEFAULTS: CDSettings = {
  rpm: 16, spin: true, backgroundColor: "#080608", shadowBlur: 28, showReflection: true,
  vinylSize: 0.9, imageScale: 1.0,
  discColor: "#c8c8c8", iridescence: true, ringCount: 48,
};
const TEXT_DEFAULTS: TextOverlay = {
  enabled: false, line1: "Track Title", line2: "Artist Name",
  fontSize: 28, fontFamily: "serif", color: "#ffffff",
  bold: false, italic: false, position: "bottom", opacity: 1, letterSpacing: 2,
};

const FONT_OPTIONS = ["serif", "sans-serif", "monospace", "cursive", "Georgia", "Impact", "Courier New"];

// ── Helper: draw an image cover-cropped into a circle, with zoom ─────────────
function drawImgCircle(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cx: number, cy: number, radius: number,
  zoom = 1.0
) {
  const iw = img.naturalWidth  || img.width;
  const ih = img.naturalHeight || img.height;
  const scale = Math.max((radius * 2) / iw, (radius * 2) / ih) * zoom;
  const sw = iw * scale, sh = ih * scale;
  ctx.drawImage(img, cx - sw / 2, cy - sh / 2, sw, sh);
}

// ── Helper: draw an image cover-cropped into a rectangle, with zoom ──────────
function drawImgRect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number, y: number, w: number, h: number,
  zoom = 1.0
) {
  const iw = img.naturalWidth  || img.width;
  const ih = img.naturalHeight || img.height;
  const scale = Math.max(w / iw, h / ih) * zoom;
  const sw = iw * scale, sh = ih * scale;
  ctx.drawImage(img, x + (w - sw) / 2, y + (h - sh) / 2, sw, sh);
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Draw: Vinyl ───────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function drawVinyl(
  ctx: CanvasRenderingContext2D, size: number, angle: number,
  img: HTMLImageElement | null, s: VinylSettings
) {
  const cx = size / 2, cy = size / 2;
  const R = (size / 2 - 4) * s.vinylSize;
  const labelR = R * s.labelRadius;
  const holeR = R * 0.025;

  ctx.clearRect(0, 0, size, size);

  if (s.shadowBlur > 0) {
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.85)";
    ctx.shadowBlur = s.shadowBlur;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = s.vinylColor; ctx.fill();
    ctx.restore();
  }

  // Disc
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = s.vinylColor; ctx.fill();
  ctx.restore();

  // Grooves
  ctx.save();
  ctx.globalAlpha = s.grooveOpacity;
  const gStart = labelR + R * 0.04, gEnd = R - R * 0.04;
  const gStep = (gEnd - gStart) / s.grooveCount;
  for (let i = 0; i <= s.grooveCount; i++) {
    ctx.beginPath(); ctx.arc(cx, cy, gStart + i * gStep, 0, Math.PI * 2);
    ctx.strokeStyle = s.grooveColor; ctx.lineWidth = 0.6; ctx.stroke();
  }
  ctx.restore();

  // Sheen
  if (s.showReflection) {
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    const g = ctx.createLinearGradient(cx - R, cy - R, cx + R * 0.6, cy + R * 0.6);
    g.addColorStop(0, "rgba(255,255,255,0.07)");
    g.addColorStop(0.4, "rgba(255,255,255,0.02)");
    g.addColorStop(1, "rgba(0,0,0,0.15)");
    ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    ctx.restore();
  }

  // Label (rotates)
  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(angle); ctx.translate(-cx, -cy);
  ctx.beginPath(); ctx.arc(cx, cy, labelR, 0, Math.PI * 2); ctx.clip();
  if (img) {
    drawImgCircle(ctx, img, cx, cy, labelR, s.imageScale);
  } else {
    const lg = ctx.createRadialGradient(cx, cy - labelR * 0.3, 0, cx, cy, labelR);
    lg.addColorStop(0, "#3a2060"); lg.addColorStop(0.6, "#1a0d3a"); lg.addColorStop(1, "#0e0820");
    ctx.fillStyle = lg; ctx.fillRect(cx - labelR, cy - labelR, labelR * 2, labelR * 2);
    ctx.fillStyle = "rgba(201,168,76,0.85)";
    ctx.font = `bold ${Math.round(labelR * 0.18)}px sans-serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("UPLOAD", cx, cy - labelR * 0.12);
    ctx.font = `${Math.round(labelR * 0.13)}px sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillText("YOUR IMAGE", cx, cy + labelR * 0.12);
  }
  ctx.restore();

  // Spindle hole
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, holeR, 0, Math.PI * 2);
  ctx.fillStyle = "#000"; ctx.fill();
  ctx.restore();
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Draw: Cassette ────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function drawCassette(
  ctx: CanvasRenderingContext2D, size: number, angle: number,
  img: HTMLImageElement | null, s: CassetteSettings
) {
  ctx.clearRect(0, 0, size, size);
  const scale = s.vinylSize;
  const W = size * 0.82 * scale, H = size * 0.58 * scale;
  const x = (size - W) / 2, y = (size - H) / 2;
  const r = size * 0.04 * scale;

  if (s.shadowBlur > 0) {
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.8)"; ctx.shadowBlur = s.shadowBlur;
    ctx.beginPath(); ctx.roundRect(x, y, W, H, r);
    ctx.fillStyle = s.bodyColor; ctx.fill();
    ctx.restore();
  }

  // Body
  ctx.save();
  ctx.beginPath(); ctx.roundRect(x, y, W, H, r);
  ctx.fillStyle = s.bodyColor; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 1; ctx.stroke();
  ctx.restore();

  // Label area
  const lx = x + W * 0.08, ly = y + H * 0.06, lw = W * 0.84, lh = H * 0.40;
  ctx.save();
  ctx.beginPath(); ctx.roundRect(lx, ly, lw, lh, r * 0.6);
  if (img) {
    ctx.clip();
    drawImgRect(ctx, img, lx, ly, lw, lh, s.imageScale);
  } else {
    ctx.fillStyle = s.labelColor; ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.font = `bold ${Math.round(size * 0.04 * scale)}px sans-serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("UPLOAD IMAGE", size / 2, ly + lh / 2);
  }
  ctx.restore();

  // Window
  const wx = x + W * 0.18, wy = y + H * 0.52, ww = W * 0.64, wh = H * 0.36;
  ctx.save();
  ctx.beginPath(); ctx.roundRect(wx, wy, ww, wh, r * 0.5);
  ctx.fillStyle = s.windowColor; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1; ctx.stroke();
  ctx.restore();

  // Reels
  const lrx = x + W * 0.30, lry = y + H * 0.62, reelR = H * 0.18;
  drawReel(ctx, lrx, lry, reelR, angle, s);
  const rrx = x + W * 0.70, rry = y + H * 0.62;
  drawReel(ctx, rrx, rry, reelR, -angle * 0.9, s);

  // Tape path
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(lrx + reelR * 0.6, lry + reelR * 0.2);
  ctx.lineTo(wx + ww * 0.2, wy + wh * 0.8);
  ctx.lineTo(wx + ww * 0.8, wy + wh * 0.8);
  ctx.lineTo(rrx - reelR * 0.6, rry + reelR * 0.2);
  ctx.strokeStyle = s.tapeColor; ctx.lineWidth = size * 0.012 * scale; ctx.stroke();
  ctx.restore();

  // Screw holes
  const screwR = size * 0.012 * scale;
  for (const [sx, sy] of [[x + W * 0.08, y + H * 0.88], [x + W * 0.92, y + H * 0.88]] as [number, number][]) {
    ctx.save();
    ctx.beginPath(); ctx.arc(sx, sy, screwR, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 0.5; ctx.stroke();
    ctx.restore();
  }

  if (s.showReflection) {
    ctx.save();
    ctx.beginPath(); ctx.roundRect(x, y, W, H, r); ctx.clip();
    const g = ctx.createLinearGradient(x, y, x + W * 0.5, y + H * 0.5);
    g.addColorStop(0, "rgba(255,255,255,0.06)");
    g.addColorStop(1, "rgba(0,0,0,0.12)");
    ctx.fillStyle = g; ctx.fillRect(x, y, W, H);
    ctx.restore();
  }
}

function drawReel(
  ctx: CanvasRenderingContext2D, cx: number, cy: number, R: number,
  angle: number, s: CassetteSettings
) {
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = s.reelColor; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 0.5; ctx.stroke();
  ctx.translate(cx, cy); ctx.rotate(angle);
  for (let i = 0; i < 3; i++) {
    ctx.rotate((Math.PI * 2) / 3);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, R * 0.75);
    ctx.strokeStyle = "rgba(255,255,255,0.18)"; ctx.lineWidth = 1.5; ctx.stroke();
  }
  ctx.restore();
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, R * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = "#333"; ctx.fill();
  ctx.restore();
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Draw: CD ──────────────────────────────────────────────════════════════════
// ══════════════════════════════════════════════════════════════════════════════
function drawCD(
  ctx: CanvasRenderingContext2D, size: number, angle: number,
  img: HTMLImageElement | null, s: CDSettings
) {
  ctx.clearRect(0, 0, size, size);
  const cx = size / 2, cy = size / 2;
  const R = (size / 2 - 4) * s.vinylSize;
  const innerR = R * 0.15;
  const artR   = R * 0.45;
  const holeR  = R * 0.045;

  if (s.shadowBlur > 0) {
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.7)"; ctx.shadowBlur = s.shadowBlur;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = s.discColor; ctx.fill();
    ctx.restore();
  }

  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = s.discColor; ctx.fill();
  ctx.restore();

  if (s.iridescence) {
    ctx.save();
    ctx.translate(cx, cy); ctx.rotate(angle * 0.3); ctx.translate(-cx, -cy);
    const ringStep = (R - innerR - R * 0.05) / s.ringCount;
    const hueBase = (angle * 30) % 360;
    for (let i = 0; i < s.ringCount; i++) {
      const rr = innerR + R * 0.05 + i * ringStep;
      const hue = (hueBase + i * (360 / s.ringCount)) % 360;
      ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue},80%,70%,0.18)`;
      ctx.lineWidth = ringStep * 0.7; ctx.stroke();
    }
    ctx.restore();
  }

  // Art (rotates)
  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(angle); ctx.translate(-cx, -cy);
  ctx.beginPath(); ctx.arc(cx, cy, artR, 0, Math.PI * 2); ctx.clip();
  if (img) {
    drawImgCircle(ctx, img, cx, cy, artR, s.imageScale);
  } else {
    const lg = ctx.createRadialGradient(cx, cy, 0, cx, cy, artR);
    lg.addColorStop(0, "#1e3a5f"); lg.addColorStop(1, "#0a1a2e");
    ctx.fillStyle = lg; ctx.fillRect(cx - artR, cy - artR, artR * 2, artR * 2);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = `bold ${Math.round(artR * 0.2)}px sans-serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("UPLOAD", cx, cy);
  }
  ctx.restore();

  // Hub
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.fillStyle = s.discColor; ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1; ctx.stroke();
  ctx.restore();

  if (s.showReflection) {
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    const g = ctx.createLinearGradient(cx - R, cy - R, cx + R * 0.4, cy + R * 0.4);
    g.addColorStop(0, "rgba(255,255,255,0.18)");
    g.addColorStop(0.3, "rgba(255,255,255,0.04)");
    g.addColorStop(1, "rgba(0,0,0,0.12)");
    ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    ctx.restore();
  }

  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, holeR, 0, Math.PI * 2);
  ctx.fillStyle = "#111"; ctx.fill();
  ctx.restore();
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Draw: Text overlay ────────────────────────────────────────────────────────
// width/height = full canvas; squareSide = artwork square side (for padding ref)
// ══════════════════════════════════════════════════════════════════════════════
function drawText(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  squareSide: number,
  t: TextOverlay
) {
  if (!t.enabled) return;
  const { line1, line2, fontSize, fontFamily, color, bold, italic, position, opacity, letterSpacing } = t;
  if (!line1 && !line2) return;

  ctx.save();
  ctx.globalAlpha = opacity;

  const weight = bold ? "bold" : "normal";
  const fStyle = italic ? "italic" : "normal";
  ctx.font = `${fStyle} ${weight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // Padding relative to the art square; text centred on full canvas width
  const pad   = squareSide * 0.07;
  const lineH = fontSize * 1.45;
  const textX = width / 2;
  let baseY: number;
  if (position === "top")         baseY = pad + fontSize;
  else if (position === "bottom") baseY = height - pad - (line2 ? lineH : 0);
  else                            baseY = height / 2 - lineH / 2 + fontSize;

  const drawSpaced = (str: string, x: number, y: number) => {
    if (letterSpacing === 0) { ctx.fillText(str, x, y); return; }
    let totalW = 0;
    for (const ch of str) totalW += ctx.measureText(ch).width + letterSpacing;
    totalW -= letterSpacing;
    let cx2 = x - totalW / 2;
    for (const ch of str) {
      const cw = ctx.measureText(ch).width;
      ctx.fillText(ch, cx2 + cw / 2, y);
      cx2 += cw + letterSpacing;
    }
  };

  if (line1) drawSpaced(line1, textX, baseY);
  if (line2) drawSpaced(line2, textX, baseY + lineH);

  ctx.restore();
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Main component ────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
export default function VinylPage() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number>(0);
  const angleRef     = useRef<number>(0);
  const lastTimeRef  = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recorderRef  = useRef<MediaRecorder | null>(null);
  const chunksRef    = useRef<Blob[]>([]);

  const [mode, setMode]             = useState<Mode>("vinyl");
  const [labelImg, setLabelImg]     = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName]     = useState<string>("");
  // Base square size derived from viewport — used to scale the preset AR preview
  const [canvasBase, setCanvasBase] = useState(500);
  const [recording, setRecording]   = useState(false);
  const [recSeconds, setRecSeconds] = useState(5);
  const [exportFmt, setExportFmt]   = useState<ExportFormat>("png");
  const [activeTab, setActiveTab]   = useState<"style" | "text" | "export">("style");
  const [videoPreset, setVideoPreset] = useState<VideoPreset>(VIDEO_PRESETS[0]);

  const [vinyl,    setVinyl]    = useState<VinylSettings>(VINYL_DEFAULTS);
  const [cassette, setCassette] = useState<CassetteSettings>(CASSETTE_DEFAULTS);
  const [cd,       setCD]       = useState<CDSettings>(CD_DEFAULTS);
  const [text,     setText]     = useState<TextOverlay>(TEXT_DEFAULTS);

  // Responsive base size
  useEffect(() => {
    function measure() {
      const w = window.innerWidth;
      if (w < 500)       setCanvasBase(Math.min(w - 32, 320));
      else if (w < 900)  setCanvasBase(420);
      else               setCanvasBase(500);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Derive preview dimensions from the selected preset AR (capped so neither
  // side exceeds canvasBase — the artwork stays fully visible)
  const presetAR  = videoPreset.width / videoPreset.height;
  const previewW  = presetAR >= 1 ? canvasBase : Math.round(canvasBase * presetAR);
  const previewH  = presetAR <= 1 ? canvasBase : Math.round(canvasBase / presetAR);

  // ── Image upload ─────────────────────────────────────────────────────────────
  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); setLabelImg(img); };
    img.src = url;
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // ── Unified draw call ─────────────────────────────────────────────────────────
  // For non-square outputs (social presets) we composite the square art
  // centred on a canvas of the preset dimensions, letterboxed with the bg colour.
  const drawFrame = useCallback((
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    angle: number
  ) => {
    const bg = (mode === "vinyl" ? vinyl : mode === "cassette" ? cassette : cd).backgroundColor;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // The art square fits inside the shorter dimension
    const squareSide = Math.min(width, height);
    const artOffX = (width  - squareSide) / 2;
    const artOffY = (height - squareSide) / 2;

    ctx.save();
    ctx.translate(artOffX, artOffY);
    if (mode === "vinyl")    drawVinyl(ctx, squareSide, angle, labelImg, vinyl);
    if (mode === "cassette") drawCassette(ctx, squareSide, angle, labelImg, cassette);
    if (mode === "cd")       drawCD(ctx, squareSide, angle, labelImg, cd);
    ctx.restore();

    // Text overlay is drawn across the full canvas dimensions
    drawText(ctx, width, height, squareSide, text);
  }, [mode, vinyl, cassette, cd, labelImg, text]);

  // ── Animation loop (preview canvas — always square) ───────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spin = mode === "vinyl" ? vinyl.spin : mode === "cassette" ? cassette.spin : cd.spin;
    const rpm  = mode === "vinyl" ? vinyl.rpm  : mode === "cassette" ? cassette.rpm  : cd.rpm;

    const loop = (ts: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = ts;
      const dt = (ts - lastTimeRef.current) / 1000;
      lastTimeRef.current = ts;
      if (spin) angleRef.current += (rpm * Math.PI * 2) / 60 * dt;
      drawFrame(ctx, previewW, previewH, angleRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = null;
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [drawFrame, previewW, previewH, mode, vinyl.spin, vinyl.rpm, cassette.spin, cassette.rpm, cd.spin, cd.rpm]);

  // ── PNG download ──────────────────────────────────────────────────────────────
  const downloadPNG = useCallback(() => {
    const exportSize = 1200;
    const off = document.createElement("canvas");
    off.width = off.height = exportSize;
    const ctx = off.getContext("2d");
    if (!ctx) return;
    drawFrame(ctx, exportSize, exportSize, angleRef.current);
    const link = document.createElement("a");
    link.download = `${mode}-art.png`;
    link.href = off.toDataURL("image/png");
    link.click();
  }, [drawFrame, mode]);

  // ── WebM recording — renders into an offscreen canvas at preset resolution ────
  const recOffscreenRef = useRef<HTMLCanvasElement | null>(null);
  const recRafRef       = useRef<number>(0);

  const startRecording = useCallback(() => {
    const spin = mode === "vinyl" ? vinyl.spin : mode === "cassette" ? cassette.spin : cd.spin;
    const rpm  = mode === "vinyl" ? vinyl.rpm  : mode === "cassette" ? cassette.rpm  : cd.rpm;

    // Build offscreen canvas at exact preset dimensions
    const off = document.createElement("canvas");
    off.width  = videoPreset.width;
    off.height = videoPreset.height;
    recOffscreenRef.current = off;

    const ctx = off.getContext("2d");
    if (!ctx) return;

    // Dedicated angle for recording so it doesn't share with preview
    let recAngle = angleRef.current;
    let lastTs: number | null = null;

    const renderLoop = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      if (spin) recAngle += (rpm * Math.PI * 2) / 60 * dt;
      drawFrame(ctx, videoPreset.width, videoPreset.height, recAngle);
      recRafRef.current = requestAnimationFrame(renderLoop);
    };
    recRafRef.current = requestAnimationFrame(renderLoop);

    const stream = off.captureStream(30);

    // VP9 preferred; fall back to default codec if browser doesn't support it
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";

    const recorder = new MediaRecorder(stream, { mimeType });
    chunksRef.current = [];
    recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    recorder.onstop = () => {
      cancelAnimationFrame(recRafRef.current);
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `${mode}-${videoPreset.id}.webm`;
      link.href = url; link.click();
      URL.revokeObjectURL(url);
      setRecording(false);
    };
    recorder.start();
    recorderRef.current = recorder;
    setRecording(true);
    setTimeout(() => recorder.stop(), recSeconds * 1000);
  }, [mode, recSeconds, videoPreset, drawFrame, vinyl, cassette, cd]);

  const stopRecording = useCallback(() => {
    recorderRef.current?.stop();
    cancelAnimationFrame(recRafRef.current);
  }, []);

  // ── Setters ───────────────────────────────────────────────────────────────────
  const setV = <K extends keyof VinylSettings>(k: K, v: VinylSettings[K]) =>
    setVinyl(p => ({ ...p, [k]: v }));
  const setC = <K extends keyof CassetteSettings>(k: K, v: CassetteSettings[K]) =>
    setCassette(p => ({ ...p, [k]: v }));
  const setD = <K extends keyof CDSettings>(k: K, v: CDSettings[K]) =>
    setCD(p => ({ ...p, [k]: v }));
  const setT = <K extends keyof TextOverlay>(k: K, v: TextOverlay[K]) =>
    setText(p => ({ ...p, [k]: v }));

  const shared = mode === "vinyl" ? vinyl : mode === "cassette" ? cassette : cd;
  const setShared = (key: keyof SharedSettings, val: SharedSettings[typeof key]) => {
    if (key === "spin" && val === false) angleRef.current = 0;
    if (mode === "vinyl")    setV(key as keyof VinylSettings, val as never);
    if (mode === "cassette") setC(key as keyof CassetteSettings, val as never);
    if (mode === "cd")       setD(key as keyof CDSettings, val as never);
  };

  const currentBg = shared.backgroundColor;

  const resetAll = () => {
    setVinyl(VINYL_DEFAULTS); setCassette(CASSETTE_DEFAULTS);
    setCD(CD_DEFAULTS); setText(TEXT_DEFAULTS);
    setLabelImg(null); setFileName("");
  };

  return (
    <div className="vp-page">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="vp-header">
        <h1 className="vp-title">
          Music <span className="vp-accent">Art</span> Generator
        </h1>
        <p className="vp-subtitle">
          Spinning vinyl, cassette &amp; CD art — watermark-free PNG &amp; WebM
        </p>
      </div>

      {/* ── Mode switcher ───────────────────────────────────────────────────── */}
      <div className="vp-mode-bar">
        {(["vinyl", "cassette", "cd"] as Mode[]).map(m => (
          <button
            key={m}
            className={`vp-mode-btn${mode === m ? " vp-mode-btn--active" : ""}`}
            onClick={() => setMode(m)}
          >
            {m === "vinyl" ? "🎵 Vinyl" : m === "cassette" ? "📼 Cassette" : "💿 CD"}
          </button>
        ))}
      </div>

      {/* ── Main layout ─────────────────────────────────────────────────────── */}
      <div className="vp-layout">

        {/* ── Left: canvas + upload + export ──────────────────────────────── */}
        <div className="vp-left">
          {/* Preview */}
          <div className="vp-preview-wrap" style={{ background: currentBg }}>
            <canvas ref={canvasRef} width={previewW} height={previewH} />
          </div>

          {/* Upload */}
          <div
            className="vp-dropzone"
            onDrop={onDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === "Enter" && fileInputRef.current?.click()}
          >
            <Upload size={16} />
            <span>{fileName || "Drop artwork here or click to upload"}</span>
            {fileName && (
              <button
                className="vp-clear"
                onClick={e => { e.stopPropagation(); setLabelImg(null); setFileName(""); }}
              >✕</button>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: "none" }} />

          {/* Quick export buttons */}
          <div className="vp-quick-export">
            <button className="vp-btn-export vp-btn-png" onClick={downloadPNG}>
              <Download size={14} /> PNG (1200×1200)
            </button>
            <button
              className={`vp-btn-export vp-btn-webm${recording ? " recording" : ""}`}
              onClick={recording ? stopRecording : startRecording}
            >
              {recording
                ? <><StopFilled size={14} /> Stop</>
                : <><PlayFilled size={14} /> Record WebM</>}
            </button>
          </div>
        </div>

        {/* ── Right: controls panel ────────────────────────────────────────── */}
        <aside className="vp-panel">

          {/* Tabs */}
          <div className="vp-tabs">
            {(["style", "text", "export"] as const).map(tab => (
              <button
                key={tab}
                className={`vp-tab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "style" ? "🎨 Style" : tab === "text" ? "✍️ Text" : "⬇️ Export"}
              </button>
            ))}
          </div>

          {/* ══ STYLE tab ════════════════════════════════════════════════════ */}
          {activeTab === "style" && (
            <div className="vp-scroll">

              {/* ── Playback ─────────────────────────────────────────── */}
              <Section title="Playback">
                <Row label="Spinning">
                  <Toggle on={shared.spin} onClick={() => setShared("spin", !shared.spin)} />
                </Row>
                <Row label={`Speed — ${shared.rpm} RPM`}>
                  <input type="range" min={3} max={30} step={1} value={shared.rpm}
                    onChange={e => setShared("rpm", Number(e.target.value))} className="vc-range" />
                </Row>
                <Row label={`Size — ${Math.round(shared.vinylSize * 100)}%`}>
                  <input type="range" min={50} max={100} step={1}
                    value={Math.round(shared.vinylSize * 100)}
                    onChange={e => setShared("vinylSize", Number(e.target.value) / 100)} className="vc-range" />
                </Row>
              </Section>

              {/* ── Appearance ───────────────────────────────────────── */}
              <Section title="Appearance">
                <ColorRow label="Background" value={shared.backgroundColor}
                  onChange={v => setShared("backgroundColor", v)} />
                <Row label={`Shadow — ${shared.shadowBlur}px`}>
                  <input type="range" min={0} max={80} step={2} value={shared.shadowBlur}
                    onChange={e => setShared("shadowBlur", Number(e.target.value))} className="vc-range" />
                </Row>
                <Row label="Sheen overlay">
                  <Toggle on={shared.showReflection}
                    onClick={() => setShared("showReflection", !shared.showReflection)} />
                </Row>
                <Row label={`Image zoom — ${Math.round(shared.imageScale * 100)}%`}>
                  <input type="range" min={50} max={200} step={5}
                    value={Math.round(shared.imageScale * 100)}
                    onChange={e => setShared("imageScale", Number(e.target.value) / 100)}
                    className="vc-range" />
                </Row>
              </Section>

              {/* ── VINYL controls ───────────────────────────────────── */}
              {mode === "vinyl" && (
                <Section title="Vinyl">
                  <ColorRow label="Disc colour" value={vinyl.vinylColor}
                    onChange={v => setV("vinylColor", v)} />
                  <ColorRow label="Groove colour" value={vinyl.grooveColor}
                    onChange={v => setV("grooveColor", v)} />
                  <Row label={`Label size — ${Math.round(vinyl.labelRadius * 100)}%`}>
                    <input type="range" min={20} max={55} step={1}
                      value={Math.round(vinyl.labelRadius * 100)}
                      onChange={e => setV("labelRadius", Number(e.target.value) / 100)} className="vc-range" />
                  </Row>
                  <Row label={`Grooves — ${vinyl.grooveCount}`}>
                    <input type="range" min={5} max={80} step={1} value={vinyl.grooveCount}
                      onChange={e => setV("grooveCount", Number(e.target.value))} className="vc-range" />
                  </Row>
                  <Row label={`Groove opacity — ${Math.round(vinyl.grooveOpacity * 100)}%`}>
                    <input type="range" min={0} max={100} step={1}
                      value={Math.round(vinyl.grooveOpacity * 100)}
                      onChange={e => setV("grooveOpacity", Number(e.target.value) / 100)} className="vc-range" />
                  </Row>
                </Section>
              )}

              {/* ── CASSETTE controls ────────────────────────────────── */}
              {mode === "cassette" && (
                <Section title="Cassette">
                  <ColorRow label="Body"   value={cassette.bodyColor}   onChange={v => setC("bodyColor", v)} />
                  <ColorRow label="Reels"  value={cassette.reelColor}   onChange={v => setC("reelColor", v)} />
                  <ColorRow label="Tape"   value={cassette.tapeColor}   onChange={v => setC("tapeColor", v)} />
                  <ColorRow label="Window" value={cassette.windowColor} onChange={v => setC("windowColor", v)} />
                  <ColorRow label="Label"  value={cassette.labelColor}  onChange={v => setC("labelColor", v)} />
                </Section>
              )}

              {/* ── CD controls ──────────────────────────────────────── */}
              {mode === "cd" && (
                <Section title="CD">
                  <ColorRow label="Disc" value={cd.discColor} onChange={v => setD("discColor", v)} />
                  <Row label="Iridescence">
                    <Toggle on={cd.iridescence} onClick={() => setD("iridescence", !cd.iridescence)} />
                  </Row>
                  <Row label={`Rings — ${cd.ringCount}`}>
                    <input type="range" min={10} max={80} step={2} value={cd.ringCount}
                      onChange={e => setD("ringCount", Number(e.target.value))} className="vc-range" />
                  </Row>
                </Section>
              )}
            </div>
          )}

          {/* ══ TEXT tab ═════════════════════════════════════════════════════ */}
          {activeTab === "text" && (
            <div className="vp-scroll">
              <Section title="Text overlay">
                <Row label="Enabled">
                  <Toggle on={text.enabled} onClick={() => setT("enabled", !text.enabled)} />
                </Row>
              </Section>

              <Section title="Content">
                <div className="vc-field">
                  <label className="vc-label">Line 1</label>
                  <input type="text" value={text.line1}
                    onChange={e => setT("line1", e.target.value)}
                    className="vc-input" placeholder="Track title" />
                </div>
                <div className="vc-field">
                  <label className="vc-label">Line 2</label>
                  <input type="text" value={text.line2}
                    onChange={e => setT("line2", e.target.value)}
                    className="vc-input" placeholder="Artist name" />
                </div>
              </Section>

              <Section title="Typography">
                <div className="vc-field">
                  <label className="vc-label">Font</label>
                  <select value={text.fontFamily}
                    onChange={e => setT("fontFamily", e.target.value)} className="vc-select">
                    {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <Row label={`Size — ${text.fontSize}px`}>
                  <input type="range" min={10} max={80} step={1} value={text.fontSize}
                    onChange={e => setT("fontSize", Number(e.target.value))} className="vc-range" />
                </Row>
                <ColorRow label="Colour" value={text.color} onChange={v => setT("color", v)} />
                <Row label="Style">
                  <div className="vc-btnrow">
                    <button className={`vc-style-btn${text.bold ? " active" : ""}`}
                      onClick={() => setT("bold", !text.bold)}><strong>B</strong></button>
                    <button className={`vc-style-btn${text.italic ? " active" : ""}`}
                      onClick={() => setT("italic", !text.italic)}><em>I</em></button>
                  </div>
                </Row>
                <Row label="Position">
                  <div className="vc-btnrow">
                    {(["top", "center", "bottom"] as const).map(p => (
                      <button key={p} className={`vc-style-btn${text.position === p ? " active" : ""}`}
                        onClick={() => setT("position", p)}>{p}</button>
                    ))}
                  </div>
                </Row>
                <Row label={`Opacity — ${Math.round(text.opacity * 100)}%`}>
                  <input type="range" min={0} max={100} step={1}
                    value={Math.round(text.opacity * 100)}
                    onChange={e => setT("opacity", Number(e.target.value) / 100)} className="vc-range" />
                </Row>
                <Row label={`Letter spacing — ${text.letterSpacing}px`}>
                  <input type="range" min={-4} max={20} step={1} value={text.letterSpacing}
                    onChange={e => setT("letterSpacing", Number(e.target.value))} className="vc-range" />
                </Row>
              </Section>
            </div>
          )}

          {/* ══ EXPORT tab ═══════════════════════════════════════════════════ */}
          {activeTab === "export" && (
            <div className="vp-scroll">

              {/* Format selector */}
              <Section title="Format">
                <Row label="Type">
                  <div className="vc-btnrow">
                    {(["png", "webm"] as ExportFormat[]).map(f => (
                      <button key={f} className={`vc-style-btn${exportFmt === f ? " active" : ""}`}
                        onClick={() => setExportFmt(f)}>{f.toUpperCase()}</button>
                    ))}
                  </div>
                </Row>
              </Section>

              {/* PNG options */}
              {exportFmt === "png" && (
                <Section title="PNG">
                  <p className="vc-hint">Exports the current frame at 1200×1200 px with background.</p>
                  <button className="vp-export-big" style={{ marginTop: "0.6rem" }} onClick={downloadPNG}>
                    <Download size={14} /> Download PNG
                  </button>
                </Section>
              )}

              {/* WebM options */}
              {exportFmt === "webm" && (<>
                <Section title="Duration">
                  <Row label={`${recSeconds} seconds`}>
                    <input type="range" min={1} max={30} step={1} value={recSeconds}
                      onChange={e => setRecSeconds(Number(e.target.value))} className="vc-range" />
                  </Row>
                </Section>

                {/* Social media presets */}
                <Section title="Platform preset">
                  <p className="vc-hint" style={{ marginBottom: "0.6rem" }}>
                    Sets the output resolution. Preview stays square; video is rendered at full resolution.
                  </p>

                  {/* Group by platform */}
                  {Array.from(new Set(VIDEO_PRESETS.map(p => p.platform))).map(platform => (
                    <div key={platform} className="vp-preset-group">
                      <span className="vp-preset-platform">{platform}</span>
                      <div className="vp-preset-row">
                        {VIDEO_PRESETS.filter(p => p.platform === platform).map(preset => {
                          const isActive = videoPreset.id === preset.id;
                          return (
                            <button
                              key={preset.id}
                              className={`vp-preset-card${isActive ? " active" : ""}`}
                              onClick={() => setVideoPreset(preset)}
                              title={`${preset.width}×${preset.height}`}
                            >
                              <AspectBox w={preset.width} h={preset.height} active={isActive} />
                              <span className="vp-preset-name">{preset.label}</span>
                              <span className="vp-preset-ar">{arLabel(preset.width, preset.height)}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Selected preset info */}
                  <div className="vp-preset-info">
                    <span className="vp-preset-info-label">{videoPreset.icon} {videoPreset.platform} — {videoPreset.label}</span>
                    <span className="vp-preset-info-dim">{videoPreset.width}×{videoPreset.height} px</span>
                  </div>
                </Section>

                <Section title="">
                  <button
                    className={`vp-export-big${recording ? " recording" : ""}`}
                    onClick={recording ? stopRecording : startRecording}
                  >
                    {recording
                      ? <><StopFilled size={14} /> Stop Recording</>
                      : <><PlayFilled size={14} /> Record {recSeconds}s ({videoPreset.width}×{videoPreset.height})</>}
                  </button>
                  {recording && <p className="vc-hint" style={{ color: "#f87171", marginTop: "0.4rem" }}>● Recording — file downloads when done.</p>}
                </Section>
              </>)}
            </div>
          )}

          {/* Reset */}
          <button className="vp-reset" onClick={resetAll}>↺ Reset all defaults</button>
        </aside>
      </div>

      {/* ── Scoped styles ───────────────────────────────────────────────────── */}
      <style>{`
        /* ── Page shell ──────────────────────────────────────────────────── */
        .vp-page {
          min-height: 100vh;
          padding: 1.5rem 1rem 5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .vp-header { text-align: center; margin-bottom: 1.25rem; }
        .vp-title {
          font-size: clamp(1.6rem, 4vw, 2.6rem);
          font-weight: 700; letter-spacing: 0.03em; margin: 0 0 0.3rem;
        }
        .vp-accent { color: var(--accent-gold); }
        .vp-subtitle { color: #64748b; font-size: 0.875rem; margin: 0; }

        /* ── Mode bar ────────────────────────────────────────────────────── */
        .vp-mode-bar {
          display: flex; gap: 0.5rem; justify-content: center;
          margin-bottom: 1.5rem; flex-wrap: wrap;
        }
        .vp-mode-btn {
          padding: 0.4rem 1.25rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #64748b; border-radius: 24px;
          font-size: 0.85rem; font-weight: 500; cursor: pointer;
          transition: all 0.18s;
        }
        .vp-mode-btn--active {
          background: rgba(201,168,76,0.12);
          border-color: rgba(201,168,76,0.5);
          color: var(--accent-gold);
        }
        .vp-mode-btn:hover:not(.vp-mode-btn--active) {
          border-color: rgba(255,255,255,0.22); color: #94a3b8;
        }

        /* ── Two-column layout ───────────────────────────────────────────── */
        .vp-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (min-width: 860px) {
          .vp-layout { grid-template-columns: auto 320px; }
        }

        /* ── Left column ─────────────────────────────────────────────────── */
        .vp-left {
          display: flex; flex-direction: column;
          align-items: center; gap: 0.75rem;
        }
        .vp-preview-wrap {
          border-radius: 12px;
          padding: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          transition: background 0.3s;
        }
        .vp-preview-wrap canvas { display: block; }

        /* Drop zone */
        .vp-dropzone {
          display: flex; align-items: center; gap: 0.55rem;
          width: 100%; max-width: 532px;
          padding: 0.6rem 0.9rem;
          border: 1px dashed rgba(201,168,76,0.3);
          border-radius: 6px; cursor: pointer;
          color: #64748b; font-size: 0.8rem;
          background: rgba(255,255,255,0.02);
          transition: all 0.18s;
        }
        .vp-dropzone:hover { border-color: var(--accent-gold); color: var(--accent-gold); }
        .vp-clear {
          margin-left: auto; background: none; border: none;
          color: #475569; cursor: pointer; font-size: 0.75rem;
          padding: 0 0.15rem; line-height: 1;
        }
        .vp-clear:hover { color: #f87171; }

        /* Quick export row */
        .vp-quick-export {
          display: flex; gap: 0.5rem; width: 100%; max-width: 532px; flex-wrap: wrap;
        }
        .vp-btn-export {
          flex: 1; display: flex; align-items: center; justify-content: center;
          gap: 0.4rem; padding: 0.55rem 1rem;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.04em; border-radius: 4px;
          cursor: pointer; transition: background 0.18s; white-space: nowrap;
          background: transparent;
        }
        .vp-btn-png {
          border: 1px solid rgba(201,168,76,0.45);
          color: var(--accent-gold);
        }
        .vp-btn-png:hover { background: rgba(201,168,76,0.1); }
        .vp-btn-webm {
          border: 1px solid rgba(100,180,255,0.4);
          color: rgba(100,180,255,0.9);
        }
        .vp-btn-webm:hover { background: rgba(100,180,255,0.08); }
        .vp-btn-webm.recording {
          border-color: rgba(248,113,113,0.5); color: #f87171;
          animation: pulse-slow 1.2s ease-in-out infinite;
        }

        /* ── Right panel ─────────────────────────────────────────────────── */
        .vp-panel {
          background: rgba(18,14,23,0.8);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          display: flex; flex-direction: column;
          overflow: hidden;
          max-height: calc(100vh - 8rem);
        }

        /* Tabs */
        .vp-tabs {
          display: flex;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .vp-tab {
          flex: 1; padding: 0.6rem 0;
          background: none; border: none;
          color: #475569; font-size: 0.75rem;
          font-weight: 500; cursor: pointer;
          letter-spacing: 0.04em;
          transition: color 0.15s;
          border-bottom: 2px solid transparent;
        }
        .vp-tab.active {
          color: var(--accent-gold);
          border-bottom-color: var(--accent-gold);
        }
        .vp-tab:hover:not(.active) { color: #94a3b8; }

        /* Scrollable body */
        .vp-scroll {
          overflow-y: auto;
          overflow-x: hidden;
          flex: 1;
          padding: 0 0 0.5rem;
        }
        .vp-scroll::-webkit-scrollbar { width: 3px; }
        .vp-scroll::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 2px; }

        /* Section block */
        .vp-section {
          padding: 0.85rem 1rem 0.35rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .vp-section:last-child { border-bottom: none; }
        .vp-section-title {
          font-size: 0.65rem; text-transform: uppercase;
          letter-spacing: 0.1em; color: #475569;
          margin: 0 0 0.7rem;
        }

        /* Row: label + control */
        .vp-row {
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.65rem;
        }
        .vp-row:last-child { margin-bottom: 0; }
        .vp-row-label {
          font-size: 0.75rem; color: #94a3b8;
          white-space: nowrap; flex-shrink: 0;
          min-width: 0; max-width: 55%;
        }
        .vp-row-ctrl { flex: 1; min-width: 0; display: flex; justify-content: flex-end; }

        /* Field (full width) */
        .vc-field { margin-bottom: 0.65rem; }
        .vc-field:last-child { margin-bottom: 0; }

        /* Labels / inputs / selects */
        .vc-label {
          display: block; font-size: 0.7rem; color: #64748b;
          letter-spacing: 0.05em; text-transform: uppercase;
          margin-bottom: 0.3rem;
        }
        .vc-input {
          width: 100%; padding: 0.4rem 0.65rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
          color: #e2e8f0; font-size: 0.85rem; outline: none;
          transition: border-color 0.15s;
        }
        .vc-input:focus { border-color: rgba(201,168,76,0.4); }
        .vc-select {
          width: 100%; padding: 0.4rem 0.65rem;
          background: rgba(18,14,23,0.95);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
          color: #e2e8f0; font-size: 0.85rem; cursor: pointer; outline: none;
        }
        .vc-select:focus { border-color: rgba(201,168,76,0.4); }
        .vc-hint {
          font-size: 0.75rem; color: #475569;
          line-height: 1.5; margin: 0.5rem 0 0;
        }

        /* Range slider */
        .vc-range {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 3px; border-radius: 2px;
          background: rgba(255,255,255,0.1); outline: none; cursor: pointer;
        }
        .vc-range::-webkit-slider-thumb {
          -webkit-appearance: none; width: 13px; height: 13px;
          border-radius: 50%; background: var(--accent-gold);
          cursor: pointer; border: none;
        }
        .vc-range::-moz-range-thumb {
          width: 13px; height: 13px; border-radius: 50%;
          background: var(--accent-gold); cursor: pointer; border: none;
        }

        /* Colour picker */
        .vc-color-row { display: flex; align-items: center; gap: 0.5rem; }
        .vc-color {
          width: 32px; height: 24px;
          border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
          padding: 1px; background: none; cursor: pointer; flex-shrink: 0;
        }
        .vc-color-val { font-size: 0.72rem; color: #475569; font-family: monospace; }

        /* Toggle */
        .vc-toggle {
          padding: 0.2rem 0.75rem; border-radius: 20px;
          font-size: 0.72rem; font-weight: 600;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03); color: #475569;
          cursor: pointer; transition: all 0.15s; letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .vc-toggle.on {
          background: rgba(201,168,76,0.14);
          border-color: rgba(201,168,76,0.45);
          color: var(--accent-gold);
        }

        /* Style buttons (bold / italic / position) */
        .vc-btnrow { display: flex; gap: 0.35rem; flex-wrap: wrap; justify-content: flex-end; }
        .vc-style-btn {
          padding: 0.22rem 0.65rem; border-radius: 4px;
          font-size: 0.75rem; border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03); color: #64748b;
          cursor: pointer; transition: all 0.15s; text-transform: capitalize;
        }
        .vc-style-btn.active {
          background: rgba(201,168,76,0.14);
          border-color: rgba(201,168,76,0.45); color: var(--accent-gold);
        }
        .vc-style-btn:hover:not(.active) {
          border-color: rgba(255,255,255,0.2); color: #94a3b8;
        }

        /* Big export button */
        .vp-export-big {
          display: flex; align-items: center; justify-content: center;
          gap: 0.45rem; width: 100%; padding: 0.6rem;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.4);
          color: var(--accent-gold); font-size: 0.875rem; font-weight: 600;
          cursor: pointer; border-radius: 4px; transition: background 0.18s;
        }
        .vp-export-big:hover { background: rgba(201,168,76,0.18); }
        .vp-export-big.recording {
          border-color: rgba(248,113,113,0.5); color: #f87171;
          background: rgba(248,113,113,0.08);
          animation: pulse-slow 1.2s ease-in-out infinite;
        }

        /* ── Preset cards ─────────────────────────────────────────────────── */
        .vp-preset-group { margin-bottom: 0.75rem; }
        .vp-preset-platform {
          display: block; font-size: 0.65rem; text-transform: uppercase;
          letter-spacing: 0.08em; color: #475569; margin-bottom: 0.35rem;
        }
        .vp-preset-row {
          display: flex; flex-wrap: wrap; gap: 0.4rem;
        }
        .vp-preset-card {
          display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
          padding: 0.45rem 0.5rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 6px; cursor: pointer;
          transition: all 0.15s; min-width: 54px;
        }
        .vp-preset-card:hover {
          border-color: rgba(201,168,76,0.3);
          background: rgba(201,168,76,0.05);
        }
        .vp-preset-card.active {
          border-color: rgba(201,168,76,0.55);
          background: rgba(201,168,76,0.1);
        }
        .vp-preset-name {
          font-size: 0.65rem; color: #64748b; white-space: nowrap;
        }
        .vp-preset-card.active .vp-preset-name { color: var(--accent-gold); }
        .vp-preset-ar {
          font-size: 0.6rem; color: #475569; font-family: monospace;
        }
        .vp-preset-card.active .vp-preset-ar { color: rgba(201,168,76,0.7); }

        /* Aspect box SVG wrapper */
        .vp-aspect-box { display: flex; align-items: center; justify-content: center; }

        /* Selected preset info bar */
        .vp-preset-info {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 0.6rem; padding: 0.45rem 0.65rem;
          background: rgba(201,168,76,0.07);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 5px;
        }
        .vp-preset-info-label { font-size: 0.75rem; color: var(--accent-gold); }
        .vp-preset-info-dim   { font-size: 0.7rem;  color: #64748b; font-family: monospace; }

        /* Reset */
        .vp-reset {
          margin: 0.5rem 1rem 0.75rem;
          padding: 0.4rem; background: transparent;
          border: 1px solid rgba(255,255,255,0.07); color: #475569;
          font-size: 0.75rem; border-radius: 4px; cursor: pointer;
          transition: all 0.15s; letter-spacing: 0.03em;
          flex-shrink: 0;
        }
        .vp-reset:hover { border-color: rgba(255,255,255,0.18); color: #94a3b8; }
      `}</style>
    </div>
  );
}

// ── Small reusable layout components ─────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="vp-section">
      {title && <p className="vp-section-title">{title}</p>}
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="vp-row">
      <span className="vp-row-label">{label}</span>
      <div className="vp-row-ctrl">{children}</div>
    </div>
  );
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button className={`vc-toggle${on ? " on" : ""}`} onClick={onClick} aria-pressed={on}>
      {on ? "On" : "Off"}
    </button>
  );
}

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Row label={label}>
      <div className="vc-color-row">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="vc-color" />
        <span className="vc-color-val">{value}</span>
      </div>
    </Row>
  );
}

// ── Aspect ratio visualiser (tiny SVG rectangle matching the preset ratio) ────
function AspectBox({ w, h, active }: { w: number; h: number; active: boolean }) {
  const MAX = 28;
  const ar = w / h;
  let bw: number, bh: number;
  if (ar >= 1) { bw = MAX; bh = Math.round(MAX / ar); }
  else         { bh = MAX; bw = Math.round(MAX * ar); }
  return (
    <div className="vp-aspect-box" style={{ width: MAX, height: MAX }}>
      <svg width={bw} height={bh}>
        <rect
          x={0} y={0} width={bw} height={bh} rx={2}
          fill={active ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.08)"}
          stroke={active ? "rgba(201,168,76,0.7)" : "rgba(255,255,255,0.2)"}
          strokeWidth={1}
        />
      </svg>
    </div>
  );
}
