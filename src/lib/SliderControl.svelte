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

	{#if optionLabelSnippets}
		<div id={markerId} class="optionLabels">
			{#each options as optionValue,i}
				{@render optionLabelSnippets[i](selectedIndex === i)}
			{/each}
		</div>

	{:else}
		<datalist id={markerId} class="optionLabels">
			{#each options as optionValue,i}
				<option value={i}> 
					{optionValue}
				</option>
			{/each}
		</datalist>
	{/if}

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
		width: var(--width);
		cursor: pointer;
		background-color: var(--theme-color);	
	}

	.optionLabels {
		display: flex;
		justify-content: space-between;
		color: var(--theme-color);
		width: var(--width);	
	}

	datalist.optionLabels {
		font-size: small;
	}
</style>