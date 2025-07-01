<script lang="ts">
    import ThemeProvider from "$lib/ThemeProvider.svelte";
    import ModalMatte from "$lib/ModalMatte.svelte";
    import RadioControl from "$lib/RadioControl.svelte";
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

  let showModal = $state(false);
  const displayModal = () => {
    showModal = true;
  }
  const onMatteClicked = () => {
    showModal = false;
  }

  const CLOCK_STYLES = ["TWELVE", "TWENTYFOUR"] as const;
  type ClockStyle = (typeof CLOCK_STYLES)[number];
  let clockStyle: ClockStyle = $state(CLOCK_STYLES[0]);

  const setClockStyle = (newClockStyle: ClockStyle) => {
    clockStyle = newClockStyle;
  }
</script>

<ThemeProvider {allThemes} themeName={themeName}>


  {#if showModal}
    <ModalMatte {onMatteClicked}>
      <h4>I'm just the contents of the modal</h4>
    </ModalMatte>
  {/if}

  <h1>SVELTE COMMON UI</h1>
  <h2>Test Page</h2>
  <h3>Theme: {themeName}</h3>

  <button onclick={rotateTheme}>Rotate Theme</button>
  <button onclick={displayModal}>Show ModalMatte</button>

  <div id="theme-inner" style:height={"50%"}>
    <h4>This <tt>h4</tt> has been themed {themeName}</h4>
  </div>

<div class="demo-group">
		{#snippet twelve(selected: boolean, style?: string)}
			<span class={`inner ${selected && 'selected'}`} {style}>
				<h3>12-hour</h3>
				<h4>e.g. 9:30pm</h4>
			</span>
		{/snippet}
		{#snippet twentyFour(selected: boolean, style?: string)}
			<span class={`inner ${selected && 'selected'}`} {style}>
				<h3>24-hour</h3>
				<h4>e.g. 21:30</h4>
			</span>
		{/snippet}
		<RadioControl
			label="Clock Style"
			options={CLOCK_STYLES}
			selectedValue={clockStyle}
			onValueChanged={setClockStyle}
			optionLabelSnippets={[twelve, twentyFour]}
		/>
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

  .demo-group {
		display: flex;
		gap: 1dvh;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}

	.inner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 3em;
		min-width: 5em;
		padding: 0.25em;

		&.selected {
			background-color: #00ff0040;
		}
	}
</style>
