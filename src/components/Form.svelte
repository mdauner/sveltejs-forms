<script context="module">
  export const FORM = {};
</script>

<script>
  import { setContext, createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';

  export let initialValues = {};
  export let schema = null;
  export let validateOnChange = true;
  export let validateOnBlur = true;

  const dispatch = createEventDispatcher();
  const values = writable({});
  const validatedValues = writable({});
  const errors = writable({});
  const touched = writable({});
  const isSubmitting = writable(false);

  let isValid;

  setContext(FORM, {
    registerField,
    unregisterField,
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

  function registerField(name) {
    $values[name] = initialValues[name] || '';
    $touched[name] = false;
  }

  function unregisterField(name) {
    delete $values[name];
    delete $touched[name];
    delete $errors[name];
    validate();
  }

  function resetForm() {
    Object.keys($values).forEach(name => {
      $values[name] = initialValues[name] || '';
      $touched[name] = false;
    });
    $errors = {};
    $validatedValues = {};
    validate();
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

<form on:submit|preventDefault={handleSubmit} class="sveltejs-forms">
  <slot isSubmitting={$isSubmitting} {isValid} />
</form>
