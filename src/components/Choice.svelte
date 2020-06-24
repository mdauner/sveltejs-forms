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
        id={option.id}
        type="checkbox"
        {name}
        on:change={onChange}
        on:blur={onBlur}
        bind:group={$choice}
        value={option.id}
        {...$$restProps} />
    {:else}
      <input
        id={option.id}
        type="radio"
        {name}
        on:change={onChange}
        on:blur={onBlur}
        bind:group={$choice}
        value={option.id}
        {...$$restProps} />
    {/if}
    {#if option.title}
      <label for={option.id}>
        {#if option.save}
          {@html option.title}
        {:else}
          {option.title}
        {/if}
      </label>
    {/if}
  {/each}
  {#if get($touched, name) && get($errors, name)}
    <div class="message">{get($errors, name)}</div>
  {/if}
</div>
