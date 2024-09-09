<script lang="ts">
    import type { PageData } from "./$types";
    import { currentStep, progressStore } from '$lib/stores';

    import TextStep from "$lib/components/forms/TextStep.svelte";
    import QuestionStep from "$lib/components/forms/QuestionStep.svelte";
    import GeoStep from "$lib/components/forms/GeoStep.svelte";

    export let data: PageData;
    $: ({ step, progress } = data)

    $: currentStep.set(step.order);
    $: progressStore.set(progress)
</script>

<h1 class="text-4xl text-center m-5">
    {step.name}
</h1>

{#if step.type == "TEXT"}
    <TextStep bind:data />
{:else if step.type == "QUESTION"}
    <QuestionStep bind:data/>
{:else if step.type == "GEO"}
    <GeoStep bind:data />
{:else}
    <p>Unknown step type: {step.type}</p>
{/if}
