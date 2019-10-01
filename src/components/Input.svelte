<script>
  import { getContext, onDestroy } from 'svelte';
  import { FORM } from './Form.svelte';

  export let name;
  export let type = 'text';
  export let placeholder = '';
  export let multiline = false;

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

  function onChange(event) {
    touchField(name, event.target.value);
  }
</script>

<div class="field">
  {#if multiline}
    <textarea {name} {placeholder} value={$values[name]} on:change={onChange} />
  {:else}
    <input
      {name}
      {type}
      {placeholder}
      value={$values[name]}
      on:change={onChange} />
  {/if}
  {#if $touched[name] && $errors[name]}
    <div class="error">{$errors[name]}</div>
  {/if}
</div>
