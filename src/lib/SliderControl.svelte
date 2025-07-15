<script lang="ts" generics="O">
	
	type Props = {
		label?: string;
		underLabel?: string;
		options: ReadonlyArray<O>;
		optionLabelSnippets?: Array<SelectableStyledSnippet>;
		selectedValue: O;
		onValueChanged: (newValue: O) => void;
	}

	// https://svelte.dev/docs/svelte/$props#$props.id()
	const instanceId = $props.id();
	const { label, underLabel, options, optionLabelSnippets, selectedValue, onValueChanged }: Props = $props();
	const selectedIndex = $derived(options.indexOf(selectedValue));

	const onchange = (event: Event & { currentTarget: EventTarget & HTMLInputElement; }) => {
		const newIndex = parseInt(event.currentTarget.value, 10);
		onIndexChange(newIndex);
	};

	const onIndexChange = (newIndex: number) => {
		const newValue = options[newIndex];
		onValueChanged(newValue); 
	};
	const inputId = `sliderControl-${instanceId}`;
	const markerId = `marker-${instanceId}`;
</script>

<div class="sliderControl">
	{#if label}
		<label for={inputId}>{label}</label>
	{/if}

	<input 
	    id={inputId}
		type="range" 
		min="0" step="1" max={options.length -1} 
		value={selectedIndex} 
		list={markerId}
		{onchange}
	/>

	<div id={markerId} class="optionLabels">
		{#each options as optionValue,i}
			{#if optionLabelSnippets}
				{@render optionLabelSnippets[i](selectedIndex === i)}
			{:else}
				<div class="marker"> 
					{optionValue}
				</div>
			{/if}
		{/each}
	</div>


	{#if underLabel}
		<h4>{underLabel}</h4>
	{/if}
</div>

<style>

	.sliderControl {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: var(--width);
	}

	input[type=range] {
		z-index: 10;
		width: var(--width);
		cursor: pointer;
		background-color: var(--theme-color);	
	}

	.optionLabels {
		z-index: 5;
		position: relative;
		top: -7px;
		display: flex;
		justify-content: space-between;
		color: var(--theme-color);
		width: calc(var(--width) + 16px); /* Cater for the thumb */	
	}

	.marker {
		flex: 1;
		display:flex;
		flex-direction: column;
		align-items: center;

		&::before {
			content: "|";
		}
	}

</style>