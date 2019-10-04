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
    <div class="message">{$errors[name]}</div>
  {/if}
</div>
