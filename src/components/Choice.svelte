<script>
  import { getContext } from 'svelte';
  import get from 'lodash-es/get';
  import set from 'lodash-es/set';
  import writableDerived from 'svelte-writable-derived';
  import { FORM } from './Form.svelte';

  export let name;
  export let options;
  export let multiple = false;
  export let value = '';

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

  if (value) {
    setTimeout(() => {
      choice.set(value);
    }, 0);
  }
</script>

<div class="field" class:error={get($touched, name) && get($errors, name)}>
  {#each options as option}
    {#if multiple}
      <input
        id="{name}-{option.id}"
        type="checkbox"
        {name}
        bind:group={$choice}
        on:change={onChange}
        on:blur={onBlur}
        value={option.id}
        {...$$restProps} />
    {:else}
      <input
        id="{name}-{option.id}"
        type="radio"
        {name}
        bind:group={$choice}
        on:change={onChange}
        on:blur={onBlur}
        value={option.id}
        {...$$restProps} />
    {/if}
    {#if option.title}
      <label for={option.id}>{option.title}</label>
    {/if}
  {/each}
  {#if get($touched, name) && get($errors, name)}
    <div class="message">{get($errors, name)}</div>
  {/if}
</div>
