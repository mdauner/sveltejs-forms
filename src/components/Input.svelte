<script>
  import { getContext } from 'svelte';
  import get from 'lodash-es/get';
  import { FORM } from './Form.svelte';

  export let name;
  export let label = '';
  export let type = 'text';
  export let placeholder = '';
  export let multiline = false;

  const { touchField, setValue, values, errors, touched } = getContext(FORM);

  function onChange(event) {
    setValue(name, event.target.value);
  }

  function onBlur() {
    touchField(name);
  }
</script>

<div class="field" class:error={get($touched, name) && get($errors, name)}>
  {#if label}
    <label for={name}>{label}</label>
  {/if}
  {#if multiline}
    <textarea
      {name}
      {placeholder}
      id={name}
      value={get($values, name)}
      on:blur={onBlur}
      on:change={onChange} />
  {:else}
    <input
      {name}
      {type}
      {placeholder}
      id={name}
      value={get($values, name)}
      on:blur={onBlur}
      on:change={onChange} />
  {/if}
  {#if get($touched, name) && get($errors, name)}
    <div class="message">{get($errors, name)}</div>
  {/if}
</div>
