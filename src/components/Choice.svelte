<script>
  import { getContext } from 'svelte';
  import { FORM } from './Form.svelte';

  export let name;
  export let options;
  export let multiple = false;

  const {
    touchField,
    validate,
    values,
    errors,
    touched,
    validateOnBlur,
    validateOnChange,
  } = getContext(FORM);

  function onChange() {
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
  {#each options as option}
    {#if multiple}
      <input
        id={option.id}
        type="checkbox"
        {name}
        on:change={onChange}
        on:blur={onBlur}
        bind:group={$values[name]}
        value={option.id} />
    {:else}
      <input
        id={option.id}
        type="radio"
        {name}
        on:change={onChange}
        on:blur={onBlur}
        bind:group={$values[name]}
        value={option.id} />
    {/if}
    {#if option.title}
      <label for={option.id}>{option.title}</label>
    {/if}
  {/each}
  {#if $touched[name] && $errors[name]}
    <div class="message">{$errors[name]}</div>
  {/if}
</div>
