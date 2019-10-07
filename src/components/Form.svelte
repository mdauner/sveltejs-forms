<script context="module">
  export const FORM = {};
</script>

<script>
  import { setContext, createEventDispatcher, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { createObjectWithDefaultValue } from '../utils';

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

  onMount(() => {
    new Set(
      Array.from(form.querySelectorAll('input,textarea,select'))
        .map(el => el.name)
        .filter(name => !!name)
    ).forEach(registerField);
  });

  function registerField(name) {
    $values[name] = initialValues[name] || '';
    $touched[name] = false;
  }

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
    Object.keys($values).forEach(name => {
      $values[name] = (data ? data[name] : initialValues[name]) || '';
      $touched[name] = false;
    });
    $errors = {};
    $validatedValues = {};
  }

  async function validate() {
    if (!schema) {
      isValid = true;
      return;
    }
    try {
      $validatedValues = await schema.validate(
        { ...$values },
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );
      $errors = {};
      isValid = true;
    } catch (err) {
      $errors = {};
      err.inner.forEach(error => {
        $errors[error.path] = error.message;
      });
      isValid = false;
    }
  }

  function touchField(name) {
    $touched[name] = true;
  }

  function setValue(name, value) {
    $values[name] = value;
  }

  function handleResetClick() {
    resetForm();
    dispatch('reset');
  }

  async function handleSubmit() {
    Object.keys($values).forEach(name => ($touched[name] = true));

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
  on:submit|preventDefault={handleSubmit}
  on:reset={handleResetClick}
  class="sveltejs-forms"
  bind:this={form}>
  <slot isSubmitting={$isSubmitting} {isValid} />
</form>
