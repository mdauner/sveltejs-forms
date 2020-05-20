<script context="module">
  export const FORM = {};
</script>

<script>
  import { setContext, createEventDispatcher, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import set from 'lodash-es/set';
  import get from 'lodash-es/get';
  import { createObjectWithDefaultValue, deepCopy } from '../utils';

  export let initialValues = {};
  export let schema = null;
  export let validateOnChange = true;
  export let validateOnBlur = true;

  const dispatch = createEventDispatcher();
  const values = writable(createObjectWithDefaultValue());
  const validatedValues = writable({});
  const errors = writable({});
  const touched = writable({});
  const isSubmitting = writable(false);

  let isValid;
  let form;
  let fields;

  // `class` usage inspired by the implementation at Svelte-Material-UI
  import { exclude } from '@smui/common/exclude.js';
  import { useActions } from '@smui/common/useActions.js';
  export let use = [];
  let className = '';
  export { className as class };

  onMount(() => {
    fields = Array.from(form.querySelectorAll('input,textarea,select'))
      .filter(el => !!el.name)
      .map(el => ({ path: el.name }))
      .reduce((allElements, currentElement) => {
        const isCurrentElement = el => el.path === currentElement.path;
        const multiple = !!allElements.find(isCurrentElement);

        return [
          ...allElements.filter(el => !isCurrentElement(el)),
          { ...currentElement, multiple },
        ];
      }, []);

    resetForm();
  });

  setContext(FORM, {
    touchField,
    setValue,
    validate,
    values,
    errors,
    touched,
    isSubmitting,
    validateOnBlur,
    validateOnChange,
  });

  function resetForm(data) {
    fields.forEach(({ path, multiple }) => {
      $values = set(
        $values,
        path,
        get(data ? data : initialValues, path, multiple ? [] : '')
      );
      $touched = set($touched, path, false);
    });
    $errors = {};
    $validatedValues = {};
    isValid = undefined;
  }

  async function validate() {
    if (!schema) {
      isValid = true;
      return;
    }
    try {
      $validatedValues = await schema.validate(deepCopy($values), {
        abortEarly: false,
        stripUnknown: true,
      });
      $errors = {};
      isValid = true;
    } catch (err) {
      $errors = {};
      err.inner.forEach(error => {
        $errors = set($errors, error.path, error.message);
      });
      isValid = false;
    }
  }

  function touchField(path, shouldValidate = false) {
    if (validateOnBlur || shouldValidate) {
      $touched = set($touched, path, true);
      validate();
    }
  }

  function setValue(path, value, validateForm = true) {
    $values = set($values, path, value);
    $touched = set($touched, path, true);

    if (validateForm && validateOnChange) {
      validate();
    }
  }

  function handleResetClick() {
    resetForm();
    dispatch('reset');
  }

  async function handleSubmit() {
    fields.forEach(({ path }) => ($touched = set($touched, path, true)));
    await validate();
    if (!schema || isValid) {
      $isSubmitting = true;
      dispatch('submit', {
        values: schema ? { ...$validatedValues } : { ...$values },
        setSubmitting: value => ($isSubmitting = value),
        resetForm,
      });
    }
  }
</script>

<form
  use:useActions={use}
  on:submit|preventDefault={handleSubmit}
  on:reset={handleResetClick}
  class="sveltejs-forms {className}"
  bind:this={form}
  {...exclude($$props, ['use', 'class'])}
  >
  <slot
    isSubmitting={$isSubmitting}
    {isValid}
    {setValue}
    {touchField}
    {validate}
    values={$values}
    errors={$errors}
    touched={$touched} />
</form>
