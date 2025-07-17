import type { Snippet } from "svelte";

// A Snippet that will be told whether it's the current selected item
// It will also possibly get given a `style` string which will help it fit
// within the parent component (e.g. rounded corners)
export type SelectableStyledSnippet = Snippet<[selected: boolean, style?: string]>;
