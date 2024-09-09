<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Briefcase, MoveLeft, MoveRight } from 'lucide-svelte';
</script>

<div class="flex flex-col justify-around items-center p-4 h-full">
	<div class="text-center">
		<h1 class="text-4xl pb-2">Tutoriel</h1>
		<p class="text-lg">Dans ce tutoriel, vous apprendrez les bases du jeu</p>
	</div>
	<div class="flex flex-col space-y-4">
		<div class="flex flex-row items-center justify-center space-x-4">
			<Button><Briefcase /></Button>
      <p>Ce bouton ouvre l'inventaire où vous pouvez voir les objets que
			vous avez collectés.</p>
		</div>
		<div class="flex flex-row items-center justify-center space-x-4">
			<Button><MoveLeft /></Button>
      <p>Ce bouton vous permet de revenir en arrière.</p>
		</div>
		<div class="flex flex-row items-center justify-center space-x-4">
			<Button><MoveRight /></Button>
      <p>Ce bouton vous permet de passer à l'étape suivante.</p>
		</div>
	</div>
	<Button href="/game/play" class="text-xl">Lancer la partie</Button>
</div>
