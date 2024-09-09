<script lang="ts">
	import { Button } from '$lib/components/ui/button';
    import * as Drawer from '$lib/components/ui/drawer';
    import { Briefcase, MoveLeft, MoveRight } from 'lucide-svelte';
    
    import type { LayoutData } from "./$types";
    export let data: LayoutData;
    const { session } = data;

    import { currentStep, progressStore } from '$lib/stores';

    // Subscribe to the current step
    let step: number;
    currentStep.subscribe(value => {
        step = value;
    });

    let progress: number;
    progressStore.subscribe(value => {
      progress = value;
    });
</script>

<div class="w-full h-screen flex flex-col justify-between bg-secondary">
    <slot />
    <div class="w-full bg-primary">
        <div class="grid grid-cols-4 gap-4 p-2">
            <Drawer.Root>
                <Drawer.Trigger asChild let:builder>
                  <Button builders={[builder]}><Briefcase/></Button>
                </Drawer.Trigger>
                <Drawer.Content>
                  <div class="mx-auto w-full max-w-sm">
                    <Drawer.Header>
                      <Drawer.Title>Inventaire</Drawer.Title>
                      <Drawer.Description>Voici les objets que vous avez collectés</Drawer.Description>
                    </Drawer.Header>
                    <div class="p-4">
                    {#if !session.inventory}
                        <p>Vous n'avez pas encore d'objets dans votre inventaire</p>
                    {:else}
                        <ul>
                            {#each session.inventory as item}
                                <li>{item.name}</li>
                            {/each}
                        </ul>
                    {/if}
                    </div>
                    <Drawer.Footer>
                      <Drawer.Close asChild let:builder>
                        <Button builders={[builder]} variant="outline">Fermer</Button>
                      </Drawer.Close>
                    </Drawer.Footer>
                  </div>
                </Drawer.Content>
            </Drawer.Root>
            <div></div>
            {#if step <= 1}
            <Button disabled><MoveLeft/></Button>
            {:else}
            <Button href="/game/play/{step-1}"><MoveLeft/></Button>
            {/if}
            {#if step >= progress}
            <Button disabled><MoveRight/></Button>
            {:else}
            <Button href="/game/play/{step+1}"><MoveRight/></Button>
            {/if}
        </div>
    </div>
</div>