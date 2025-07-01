<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    onMatteClicked: () => void;
    children: Snippet;
  };
  
  const { children, onMatteClicked }: Props = $props();

  const MATTE_ID = "modal-matte";

  // We must check the event was actually intended for me
  // and not just a bubble-up from the child(ren)
  const onclick = (event: Event) => {
    if (event.target.id === MATTE_ID) {
      onMatteClicked();
    }
  }
</script>

<div id={MATTE_ID} {onclick}>
    {@render children()}
</div>

<style>
  #modal-matte {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: var(--theme-matte-color);
    z-index: 100;
  }
</style>