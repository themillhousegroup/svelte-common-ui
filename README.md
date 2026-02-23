# svelte-common-ui

Simple components for common styling tasks in a Svelte (5) app.
Most of these components make considerable usage of [Svelte's `#snippet` concept](https://svelte.dev/docs/svelte/snippet) to make the components fairly agnostic to the actual styling of the UI. 

### Warning
This library is currently under development and is not yet ready for production use.

## Guiding principles
- No "legacy" (pre-v5) Svelte
- Strong types
- Good starting points, but easy to extend if needed

## Components

### `ThemeProvider`

#### Example

https://themillhousegroup.github.io/svelte-common-ui/

##### Usage
```
<ThemeProvider {allThemes} themeName={themeName} >
    <h4>This child has been themed</h4>
</ThemeProvider>
```

##### Setup
`ThemeProvider` makes heavy use of types to ensure that:
- the `themeName` belongs to `allThemes`
- each `Theme` within `allThemes` contains all the required CSS variables
- each CSS variable is in the form `--theme-${string}`

Check the `routes/+page.svelte` file for an example that sets up 3 theme names and adds custom theme variables.

##### Defaults
Out of the box, you can get started straight away with the default `ThemeName`s `LIGHT` and `DARK`.
You will also need to set up some colors to satisfy the requirements of the `CorePropertyNameList`:
- `--theme-background-color`
- `--theme-matte-color`
- `--theme-border-color`
- `--theme-color`

So for example:

```
  import { ThemeName, Theme, AllThemePropertyNames } from 'svelte-common-ui';

  const allThemes: Record<ThemeName, Theme<AllThemePropertyNames> = {
    LIGHT: {
      "--theme-background-color": "white",
      "--theme-matte-color": "#d0d0f0b0",
      "--theme-border-color": "#bbf",
      "--theme-color": "blue",
    },
    DARK: {
      "--theme-background-color": "black",
      "--theme-matte-color": "#202020b0",
      "--theme-border-color": "#005",
      "--theme-color": "gray",
    },
  };
```
Now you can use the `ThemeProvider` as per the "Usage" section above.


## Demo page setup
Follows the [SvelteKit Guide](https://svelte.dev/docs/kit/adapter-static) using the `adapter-static`.


