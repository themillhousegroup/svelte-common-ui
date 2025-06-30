<script lang="ts">
    import ThemeProvider from "$lib/ThemeProvider.svelte";
  import {
    CORE_THEME_NAMES,
    type AllThemePropertyNames,
    type Theme,
    type ThemedPropertyNameList,
  } from "$lib/theming";

  const CUSTOM_THEME_NAMES = [...CORE_THEME_NAMES, "MEDIUM"] as const;
  type MyThemeName = (typeof CUSTOM_THEME_NAMES)[number];

  const CUSTOM_THEME_PROP_NAMES = [
    "--theme-border-radius",
  ] satisfies ThemedPropertyNameList;
  type MyPropNames = AllThemePropertyNames<typeof CUSTOM_THEME_PROP_NAMES>;

  const allThemes: Record<MyThemeName, Theme<MyPropNames>> = {
    LIGHT: {
      "--theme-background-color": "white",
      "--theme-matte-color": "#d0d0f0b0",
      "--theme-border-color": "#bbf",
      "--theme-border-radius": "4px",
      "--theme-color": "blue",
    },
    DARK: {
      "--theme-background-color": "black",
      "--theme-matte-color": "#202020b0",
      "--theme-border-color": "#005",
      "--theme-border-radius": "8px",
      "--theme-color": "gray",
    },
    MEDIUM: {
      "--theme-background-color": "grey",
      "--theme-matte-color": "#606060b0",
      "--theme-border-color": "#335",
      "--theme-border-radius": "6px",
      "--theme-color": "orange",
    },
  };

  let themeIndex = $state(0);

  const rotateTheme = () => {
    themeIndex = (themeIndex + 1) % CUSTOM_THEME_NAMES.length;
  }

  const themeName = $derived(CUSTOM_THEME_NAMES[themeIndex])
</script>

<h1>SVELTE COMMON UI</h1>
<h2>Test Page</h2>
<h3>Themed Area: {themeName}</h3>

<button onclick={rotateTheme}>Rotate Theme</button>

<ThemeProvider {allThemes} themeName={themeName} >
  <div id="theme-inner" style:height={"50%"}>
    <h4>This <tt>h4</tt> has been themed {themeName}</h4>
  </div>
</ThemeProvider>

<style>

  #theme-inner {
    background-color: var(--theme-background-color);
    color: var(--theme-color);
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h4 {
    background-color: var(--theme-background-color);
    border-width: 1px;
    border-style: solid;
    border-radius: var(--theme-border-radius);
    border-color: var(--theme-border-color);
    color: var(--theme-color);
    
    padding: 8px;
  }
</style>
