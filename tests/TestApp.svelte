<script>
  import { Form, Input, Select } from '../src/components/components.module.js';

  export let onSubmit = () => {};
  export let schema = null;
  export let showOptionalField = false;
  export let form = null;

  const options = [
    { id: 'svelte', title: 'Svelte' },
    { id: 'react', title: 'React' },
    { id: 'angular', title: 'Angular' },
  ];
</script>

<Form {schema} on:submit={onSubmit} let:isSubmitting bind:this={form}>
  <Input name="email" placeholder="Email" />
  {#if showOptionalField}
    <Input name="optional" placeholder="Optional" />
  {/if}
  <button on:click={() => (showOptionalField = !showOptionalField)}>
    {#if showOptionalField}Hide{:else}Show{/if}
  </button>
  <Select name="language" {options} />

  <button type="submit" disabled={isSubmitting}>Sign in</button>
</Form>
