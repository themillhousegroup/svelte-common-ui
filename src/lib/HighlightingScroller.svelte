<script lang="ts" generics="P">
	import type { ParameterizedSelectableStyledSnippet } from "./types"; 
	import InnerItem from "./internal/HighlightingScrollerItem.svelte"; 

	type Props = {
		items: Array<P>;
		itemRenderingSnippet: ParameterizedSelectableStyledSnippet<P>;
	}
	let outerHeight = $state(0);
	let scrollTop = $state(0);
	let container;
	const { itemRenderingSnippet, items } = $props();

	let midpoint = $derived(outerHeight / 2 + scrollTop);

</script>

<div class="highlightingScroller" 
	bind:clientHeight={outerHeight}
	bind:this={container}
	onscroll={()=>scrollTop = container.scrollTop}
	>	
	
	{#each items as item, i}
		<InnerItem {item} 
			{itemRenderingSnippet}
			targetY={midpoint}/>
	{/each}
</div>
	
<style>

.highlightingScroller {
	height: 100%;
	overflow-y: scroll;
}

</style>
