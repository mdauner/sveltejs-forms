<script>
  import { getContext } from 'svelte';
  import get from 'lodash-es/get';
  import { FORM } from './Form.svelte';

  export let name;
  export let options;
  export let multiple = false;

  let choiceValue = get($values, name, []);

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

  function onChange() {
    setValue(name, choiceValue);
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
  {#each options as option}
    {#if multiple}
      <input
        id={option.id}
        type="checkbox"
        {name}
        on:change={onChange}
        on:blur={onBlur}
        bind:group={choiceValue}
        value={option.id} />
    {:else}
      <input
        id={option.id}
        type="radio"
        {name}
        on:change={onChange}
        on:blur={onBlur}
        bind:group={choiceValue}
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
