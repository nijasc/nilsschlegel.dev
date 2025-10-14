<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let el: HTMLDivElement;
  let leaving = false;

  let {
    inDuration = 0.5,
    outDuration = 0.35,
    easeIn = "power3.out",
    easeOut = "power2.in",
    yFrom = 24,
    fade = true,
    children
  } = $props();

  onMount(() => {
    gsap.set(el, { opacity: fade ? 0 : 1, y: yFrom });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: inDuration,
      ease: easeIn,
      clearProps: "transform,opacity"
    });
  });

  export async function playOut(): Promise<void> {
    if (leaving) return;
    leaving = true;
    await new Promise<void>((resolve) => {
      gsap.to(el, {
        opacity: fade ? 0 : 1,
        y: yFrom,
        duration: outDuration,
        ease: easeOut,
        onComplete: () => resolve()
      });
    });
  }
</script>

<div bind:this={el} style="will-change: transform, opacity">
  {@render children()}
</div>