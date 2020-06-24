<script>
  import { getContext } from 'svelte';
  import get from 'lodash-es/get';
  import { FORM } from './Form.svelte';

  export let name;
  export let label = '';
  export let type = 'text';
  export let multiline = false;
  export let rows = 2;

  const { touchField, setValue, values, errors, touched } = getContext(FORM);

  function onChange(event) {
    setValue(name, event.target.value);
  }

  function onBlur() {
    touchField(name);
  }

  if (Object.keys($$restProps).includes('value')) {
    setTimeout(() => setValue(name, $$restProps.value, false), 0);
  }
</script>

<div class="field" class:error={get($touched, name) && get($errors, name)}>
  {#if label}
    <label for={name}>{label}</label>
  {/if}
  {#if multiline}
    <textarea
      {rows}
      {name}
      id={name}
      value={get($values, name)}
      on:blur={onBlur}
      on:change={onChange}
      {...$$restProps} />
  {:else}
    <input
      {name}
      {type}
      id={name}
      value={get($values, name)}
      on:blur={onBlur}
      on:change={onChange}
      {...$$restProps} />
  {/if}
  {#if get($touched, name) && get($errors, name)}
    <div class="message">{get($errors, name)}</div>
  {/if}
</div>
