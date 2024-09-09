<script lang="ts">
    import { formSchema, type FormSchema } from "./QuestionSchema";
    import {
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data;

    const form = superForm(data.form, {
        validators: zodClient(formSchema),
		dataType: 'json'
    });

    const { form: formData } = form;

    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Separator } from "$lib/components/ui/separator";
    import * as Form from "$lib/components/ui/form";
</script>


<div class="flex flex-col items-center space-y-4">
  <h2 class="text-2xl">Question</h2>
  <p class="text-xl mx-8">
  {data.step.text}
  </p>
  <Separator class="w-[300px]" />
  <form method="POST" action="?/question" class="grid gap-4 w-[300px]">
    <Form.Field {form} name="answer">
      <Form.Control let:attrs>
        <Form.Label class="text-xl">Réponse</Form.Label>
        <Input {...attrs} bind:value={$formData.code} disabled={data.progress !== data.step.order} />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="escapeId" class="hidden">
      <Form.Control let:attrs>
        <Input {...attrs} bind:value={$formData.escapeId}/>
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Button type="submit" class="w-full text-xl"  disabled={data.progress !== data.step.order}>
        Valider
    </Button>
  </form>
</div>