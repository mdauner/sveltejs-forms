<script>
  import { getContext } from 'svelte';
  import get from 'lodash-es/get';
  import set from 'lodash-es/set';
  import writableDerived from 'svelte-writable-derived';
  import { FORM } from './Form.svelte';

  export let name;
  export let options;
  export let multiple = false;

  const { touchField, values, errors, touched, validateOnChange } = getContext(
    FORM
  );

  const choice = writableDerived(
    values,
    $values => get($values, name, multiple ? [] : ''),
    newValue => set($values, name, newValue)
  );

  function onChange() {
    touchField(name, validateOnChange);
  }

  function onBlur() {
    touchField(name);
  }
</script>

<div class="field" class:error={get($touched, name) && get($errors, name)}>
  {#each options as option}
    {#if multiple}
      <input
        id={option.id}
        type="checkbox"
        {name}
        on:change={onChange}
        on:blur={onBlur}
        bind:group={$choice}
        value={option.id} />
    {:else}
      <input
        id={option.id}
        type="radio"
        {name}
        on:change={onChange}
        on:blur={onBlur}
        bind:group={$choice}
        value={option.id} />
    {/if}
    {#if option.title}
      <label for={option.id}>{option.title}</label>
    {/if}
  {/each}
  {#if get($touched, name) && get($errors, name)}
    <div class="message">{get($errors, name)}</div>
  {/if}
</div>
