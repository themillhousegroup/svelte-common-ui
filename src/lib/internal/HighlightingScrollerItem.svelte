<script lang="ts" generics="P">
	import type { Snippet } from "svelte"; 
	import type { ParameterizedSelectableStyledSnippet } from "../types"; 

	type Props = {
		targetY: number;
		item: P;
		itemRenderingSnippet: ParameterizedSelectableStyledSnippet<P>;
	}
	let container = $state(undefined);
	const { targetY, item, itemRenderingSnippet } = $props();

	let clientHeight = $state(0);

	let offsetBot = $derived(clientHeight + container?.offsetTop);
</script>

<div class=".highlightingScrollerItem" bind:clientHeight bind:this={container}>
	{@render itemRenderingSnippet(item, 
		container?.offsetTop < targetY && offsetBot > targetY)}
</div>
			