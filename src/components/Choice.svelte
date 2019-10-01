<script>
  import { getContext, onDestroy } from 'svelte';
  import { FORM } from './Form.svelte';

  export let name;
  export let options;
  export let multiple = false;

  const {
    registerField,
    unregisterField,
    touchField,
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
  }
</script>

<div class="field">
  {#each options as option}
    {#if multiple}
      <input
        id={option.id}
        type="checkbox"
        {name}
        on:change={onChange}
        bind:group={$values[name]}
        value={option.id} />
    {:else}
      <input
        id={option.id}
        type="radio"
        {name}
        on:change={onChange}
        bind:group={$values[name]}
        value={option.id} />
    {/if}
    {#if option.title}
      <label for={option.id}>{option.title}</label>
    {/if}
  {/each}
  {#if $touched[name] && $errors[name]}
    <div class="error">{$errors[name]}</div>
  {/if}
</div>
