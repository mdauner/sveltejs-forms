<script>
  import { getContext } from 'svelte';
  import { FORM } from './Form.svelte';

  export let name;
  export let options;

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
  <select
    {name}
    bind:value={$values[name]}
    on:change={onChange}
    on:blur={onBlur}>
    <option value="" />
    {#each options as option}
      <option value={option.id}>{option.title}</option>
    {/each}
  </select>
  {#if $touched[name] && $errors[name]}
    <div class="message">{$errors[name]}</div>
  {/if}
</div>
