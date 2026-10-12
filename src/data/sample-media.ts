import desktop from "@/assets/sample-desktop.jpg";
import mobile from "@/assets/sample-mobile.jpg";
import diagram from "@/assets/sample-diagram.jpg";
import web from "@/assets/sample-web.jpg";

/** Bundled demo assets are referenced by key so stored data survives asset URL changes. */
export const SAMPLE_ASSETS: Record<string, { url: string; width: number; height: number }> = {
  "sample:desktop": { url: desktop, width: 1600, height: 1008 },
  "sample:mobile": { url: mobile, width: 720, height: 1568 },
  "sample:diagram": { url: diagram, width: 1600, height: 912 },
  "sample:web": { url: web, width: 1600, height: 1008 },
};
