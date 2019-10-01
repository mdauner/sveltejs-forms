<script>
  import {
    Form,
    Input,
    Select,
    Choice,
  } from '../src/components/components.module.js';

  export let onSubmit = () => {};
  export let schema = null;
  export let initialValues = {};
  export let showOptionalField = false;
  export let form = null;

  const langOptions = [
    { id: 'svelte', title: 'Svelte' },
    { id: 'react', title: 'React' },
    { id: 'angular', title: 'Angular' },
  ];

  const osOptions = [
    { id: 'macos', title: 'macOS' },
    { id: 'linux', title: 'Linux 🐧' },
    { id: 'windows', title: 'Windows' },
  ];
</script>

<Form
  {schema}
  {initialValues}
  on:submit={onSubmit}
  let:isSubmitting
  bind:this={form}>
  <Input name="email" placeholder="Email" />
  {#if showOptionalField}
    <Input name="optional" placeholder="Optional" />
  {/if}
  <button on:click={() => (showOptionalField = !showOptionalField)}>
    {#if showOptionalField}Hide{:else}Show{/if}
  </button>
  <Select name="language" options={langOptions} />
  <Choice name="os" options={osOptions} />

  <button type="submit" disabled={isSubmitting}>Sign in</button>
</Form>
