<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";

    import { formSchema, type FormSchema } from "./schema";
    import {
      type SuperValidated,
      type Infer,
      superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    
    export let data: SuperValidated<Infer<FormSchema>>;
    
    const form = superForm(data, {
      validators: zodClient(formSchema),
      dataType: "json",
    });
	
	  const { form: formData, enhance } = form
</script>
  
<form method="POST" use:enhance class="grid place-items-center h-screen">
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title class="text-2xl">Connexion</Card.Title>
      <Card.Description>Enter your email below to login to your account.</Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-4">
			<div class="grid gap-2">
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Input {...attrs} bind:value={$formData.email} placeholder="Email" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Input type="password" {...attrs} bind:value={$formData.password} placeholder="Mot de passe" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			</div>
    </Card.Content>
    <Card.Footer>
      <Button class="w-full" type="submit">Se connecter</Button>
    </Card.Footer>
  </Card.Root>
</form>