import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Applies the stored theme before the first paint. Without this the page
 * renders dark and then jumps to light, which is worse than either.
 */
const SCRIPT = `try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
