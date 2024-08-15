<script>
    import { t, locales, locale } from '$lib/i18n';

    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as RadioGroup from "$lib/components/ui/radio-group";
</script>

<div class="flex flex-col items-center justify-around h-screen">
        <div class="grid gap-2 text-center">
            <h1 class="text-3xl font-bold">Escape the forest</h1>
            <p class="text-muted-foreground text-balance">
            {$t('home.description')}
            </p>
        </div>
        <div class="grid gap-4 w-[300px]">
            <div class="grid gap-2">
            <Label for="code">Code</Label>
            <Input id="code" type="text" maxlength={6} placeholder="XXXXXX" required />
            </div>
            <Button type="submit" class="w-full text-xl">
            {$t('home.play')}
            </Button>
        </div>
        <RadioGroup.Root bind:value="{$locale}" class="grid gap-2 grid-cols-2">
            {#each $locales as value}
                <Label for={value} class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4">
                    {$t(`common.lang.${value}`)}
                    <RadioGroup.Item class="sr-only" value={value} id={value} />
                </Label>
            {/each}
        </RadioGroup.Root>
        <div class="grid gap-2">
            <p>Open source on <a href="#">GitHub</a></p>
        </div>
</div>