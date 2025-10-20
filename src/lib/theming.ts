export type CSSThemedPropertyName = `--theme-${string}`;

export type ThemedPropertyNameList = Array<CSSThemedPropertyName>;

export const CORE_THEME_PROPERTY_NAMES = [
  "--theme-background-color",
  "--theme-matte-color",
  "--theme-border-color",
  "--theme-color"
] as const satisfies ThemedPropertyNameList;

export type CoreThemePropertyName = (typeof CORE_THEME_PROPERTY_NAMES)[number];

export type CorePropertyNameList = Array<CoreThemePropertyName>

export type AllThemePropertyNames<C extends ThemedPropertyNameList = []> = 
[...CorePropertyNameList, ...C];

export type AllThemePropertyName<C extends ThemedPropertyNameList> = AllThemePropertyNames<C>[number];

export type Theme<C extends ThemedPropertyNameList> = 
  Record<AllThemePropertyName<C>, string>;

export const CORE_THEME_NAMES = ["LIGHT", "DARK"] as const;
export type ThemeName = (typeof CORE_THEME_NAMES)[number];

export type AllThemeNames<XTN extends Array<string> = []> = [...Array<ThemeName>, ...XTN];
export type OneThemeName<XTN extends Array<string> = []> = AllThemeNames<XTN>[number];

export type ThemeSet<C extends ThemedPropertyNameList, T extends Theme<C>, XTN extends Array<string> = []> = Record<OneThemeName<XTN>, T>
