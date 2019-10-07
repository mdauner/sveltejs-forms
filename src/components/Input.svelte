<script>
  import { getContext } from 'svelte';
  import { FORM } from './Form.svelte';

  export let name;
  export let type = 'text';
  export let placeholder = '';
  export let multiline = false;

  const {
    touchField,
    setValue,
    validate,
    values,
    errors,
    touched,
    validateOnBlur,
    validateOnChange,
  } = getContext(FORM);

  function onChange(event) {
    setValue(name, event.target.value);
    touchField(name);

    if (validateOnChange) {
      validate();
    }
  }

  function onBlur() {
    if (validateOnBlur) {
      touchField(name);
      validate();
    }
  }
</script>

<div class="field" class:error={$touched[name] && $errors[name]}>
  {#if multiline}
    <textarea
      {name}
      {placeholder}
      value={$values[name]}
      on:blur={onBlur}
      on:change={onChange} />
  {:else}
    <input
      {name}
      {type}
      {placeholder}
      value={$values[name]}
      on:blur={onBlur}
      on:change={onChange} />
  {/if}
  {#if $touched[name] && $errors[name]}
    <div class="message">{$errors[name]}</div>
  {/if}
</div>
