import type { Snippet } from "svelte";

// A Snippet that will be told whether it's the current selected item
// It will also possibly get given a `style` string which will help it fit
// within the parent component (e.g. rounded corners)
export type SelectableStyledSnippet = Snippet<[selected: boolean, style?: string]>;

// A Snippet that will be given:
// - the item it should render (of type P)
// - a boolean indicating whether it's the current selected item
// - (optionally) a `style` string which will help it fit within the parent component (e.g. rounded corners)
export type ParameterizedSelectableStyledSnippet<P> = Snippet<[item: P, selected: boolean, style?: string]>;
