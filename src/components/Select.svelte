<script>
  import { getContext, onDestroy } from 'svelte';
  import { FORM } from './Form.svelte';

  export let name;
  export let options;

  const {
    registerField,
    unregisterField,
    touchField,
    validate,
    values,
    errors,
    touched,
  } = getContext(FORM);

  registerField(name);

  onDestroy(() => {
    unregisterField(name);
  });

  function onChange() {
    touchField(name);
    validate();
  }
</script>

<div class="field" class:error={$touched[name] && $errors[name]}>
  <select {name} bind:value={$values[name]} on:change={onChange}>
    <option value="" />
    {#each options as option}
      <option value={option.id}>{option.title}</option>
    {/each}
  </select>
  {#if $touched[name] && $errors[name]}
    <div class="message">{$errors[name]}</div>
  {/if}
</div>
