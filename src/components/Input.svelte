<script>
  import { getContext } from 'svelte';
  import get from 'lodash-es/get';
  import { FORM } from './Form.svelte';
  import { exclude } from '@smui/common/exclude.js';
  import { useActions } from '@smui/common/useActions.js';
  
  export let name;
  export let label = '';
  export let type = 'text';
  export let multiline = false;
  export let use = [];
  let className = '';
  export {className as class};
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

<div use:useActions={use}
     class="field {className}" 
     class:error={get($touched, name) && get($errors, name)}
     {...exclude($$props, ['use', 'class'])}>
  {#if label}
    <label for={name}>{label}</label>
  {/if}
  {#if multiline}
    <textarea
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
