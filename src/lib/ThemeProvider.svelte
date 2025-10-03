<script lang="ts" generics="C extends ThemedPropertyNameList, T extends Theme<C>, N extends ThemeName | TNX, TNX extends string = never">
	import { type Theme, type ThemedPropertyNameList, type ThemeName } from "./theming";
	import type { Snippet } from "svelte";

  type Props = {
    allThemes: Record<N, T>, 
    themeName: N;
    children: Snippet;
  };
  
  const { allThemes, children, themeName }: Props = $props();

  const theme = $derived(allThemes[themeName]);
  const style = $derived(Object.entries(theme).map(([k, v]) => `${k}:${v}`).join(';'));
</script>

<article id="themeProvider" {style}>
  {@render children()}
</article>

<style>
  article {
    background-color: var(--theme-background-color);
    border-color: var(--theme-border-color);
    color: var(--theme-color);
  }
</style>
