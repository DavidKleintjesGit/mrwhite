export const THEME_STORAGE_KEY = "mrwhite-theme";

export type Theme = "dark" | "light";

export function readTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "light"
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Not remembering the theme is a nuisance, not a failure.
  }
}
