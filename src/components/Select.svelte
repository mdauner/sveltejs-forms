<script>
  import { getContext } from 'svelte';
  import get from 'lodash-es/get';
  import { FORM } from './Form.svelte';

  export let name;
  export let label = '';
  export let options;

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
  <select
    {name}
    id={name}
    value={get($values, name)}
    on:change={onChange}
    on:blur={onBlur}>
    <option value="" />
    {#each options as option}
      <option value={option.id}>{option.title}</option>
    {/each}
  </select>
  {#if get($touched, name) && get($errors, name)}
    <div class="message">{get($errors, name)}</div>
  {/if}
</div>
