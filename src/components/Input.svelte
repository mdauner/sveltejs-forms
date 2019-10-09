<script>
  import { getContext } from 'svelte';
  import get from 'lodash-es/get';
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

<div class="field" class:error={get($touched, name) && get($errors, name)}>
  {#if multiline}
    <textarea
      {name}
      {placeholder}
      value={get($values, name)}
      on:blur={onBlur}
      on:change={onChange} />
  {:else}
    <input
      {name}
      {type}
      {placeholder}
      value={get($values, name)}
      on:blur={onBlur}
      on:change={onChange} />
  {/if}
  {#if get($touched, name) && get($errors, name)}
    <div class="message">{get($errors, name)}</div>
  {/if}
</div>
