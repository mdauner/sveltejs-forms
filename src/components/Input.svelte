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
    setValue,
    validate,
    values,
    errors,
    touched,
  } = getContext(FORM);

  registerField(name);

  onDestroy(() => {
    unregisterField(name);
  });

  function onChange(event) {
    touchField(name);
    setValue(name, event.target.value);
    validate();
  }

  function onInput(event) {
    setValue(name, event.target.value);
    validate();
  }
</script>

<div class="field" class:error={$touched[name] && $errors[name]}>
  {#if multiline}
    <textarea
      {name}
      {placeholder}
      value={$values[name]}
      on:input={onInput}
      on:change={onChange} />
  {:else}
    <input
      {name}
      {type}
      {placeholder}
      value={$values[name]}
      on:input={onInput}
      on:change={onChange} />
  {/if}
  {#if $touched[name] && $errors[name]}
    <div class="message">{$errors[name]}</div>
  {/if}
</div>
