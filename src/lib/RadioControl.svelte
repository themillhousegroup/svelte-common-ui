<script lang="ts" generics="O">
	import type { Snippet } from "svelte";

	// A Snippet that will be told whether it's the current selected item
	// It will also possibly get given a style string which will help it fit
	// within the required 'pill' rounded-rectangle outline
	type SelectableStyledSnippet = Snippet<[selected: boolean, style?: string]>;

	type Props = {
		label?: string;
		options: Readonly<Array<O>>;
		optionLabelSnippets: Array<SelectableStyledSnippet>;
		selectedValue: O;
		onValueChanged: (newValue: O) => void;		
	}

	const { label, options, selectedValue, onValueChanged, optionLabelSnippets }: Props = $props();
	const selectedIndex = $derived(options.indexOf(selectedValue));

	const onIndexChange = (newIndex: number) => {
		const newValue = options[newIndex];
		onValueChanged(newValue); 
	};

	const PILL_BORDER_RADIUS_PX = 8;
	const INNER_BORDER_RADIUS_PX = PILL_BORDER_RADIUS_PX - 1;

	// Ghetto first-child/last-child for the container AND the children
	const pillStyling = (isContainer: boolean):Array<string | undefined> => {
		const borderRadius = `${isContainer ? PILL_BORDER_RADIUS_PX : INNER_BORDER_RADIUS_PX}px`;
		return options.map((_,i) => {
			if (i === 0) {
				return `border-radius: ${borderRadius} 0 0 ${borderRadius};`;
			}
			if (i === options.length -1) {
				return `border-radius: 0 ${borderRadius} ${borderRadius} 0;`;
			}
			return undefined;
		});
	};
</script>

<div class="radioControl">
	{#if label}
		<label for="radioOptions">{label}</label>
	{/if}

	<div class="radioOptions">
		{#each options as optionValue,i}
			<div 
				class="pill" 
				style={pillStyling(true)[i]}
				role={JSON.stringify(optionValue)}
				onclick={() => onIndexChange(i)}>  
				{@render optionLabelSnippets[i](selectedIndex === i, pillStyling(false)[i])}
			</div>
		{/each}
	</div>
</div>

<style>

	.radioControl {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	label {
		margin-bottom: 0.25em;
	}

	.radioOptions {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.pill {
		border: 1px solid var(--theme-border-color);
		border-right: none;
		cursor: pointer;

		&:last-child {
			border-right: 1px solid var(--theme-border-color);
		}
	}
</style>