<script lang="ts" generics="O">
	
	type Props = {
		label?: string;
		underLabel?: string;
		options: ReadonlyArray<O>;
		selectedValue: O;
		onValueChanged: (newValue: O) => void;
	}
	const uid = $props.id();
	const { label, underLabel, options, selectedValue, onValueChanged }: Props = $props();
	const selectedIndex = $derived(options.indexOf(selectedValue));

	const onchange = (event: Event & { currentTarget: EventTarget & HTMLInputElement; }) => {
		const newIndex = parseInt(event.currentTarget.value, 10);
		onIndexChange(newIndex);
	};

	const onIndexChange = (newIndex: number) => {
		const newValue = options[newIndex];
		onValueChanged(newValue); 
	};
	const markerId = `marker-${uid}`;
</script>

<div class="sliderControl">
	{#if label}
		<label for="controlsRange">{label}</label>
	{/if}

	<input name="controlsRange" 
		type="range" 
		min="0" step="1" max={options.length -1} 
		value={selectedIndex} 
		list={markerId}
		{onchange}
	/>

	<datalist id={markerId}>
		{#each options as optionValue,i}
			<option value={i}> 
				{optionValue}
			</option>
		{/each}
	</datalist>

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
		width: 90%;
		cursor: pointer;
		background-color: var(--theme-color);	
	}

	datalist {
		display: flex;
		justify-content: space-around;
		color: var(--theme-color);
		width: 100%;
		font-size: small;
	}
</style>