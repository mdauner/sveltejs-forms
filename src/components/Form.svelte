<script context="module">
  export const FORM = {};
</script>

<script>
  import { setContext, createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';

  export let initialValues = {};
  export let schema = null;

  const dispatch = createEventDispatcher();
  const values = writable({});
  const validatedValues = writable({});
  const errors = writable({});
  const touched = writable({});
  const isSubmitting = writable(false);

  setContext(FORM, {
    registerField: name => {
      $values[name] = initialValues[name] || '';
      $touched[name] = false;
      $errors[name] = null;
    },
    unregisterField: name => {
      delete $values[name];
      delete $touched[name];
      delete $errors[name];
    },
    touchField,
    values,
    errors,
    touched,
    isSubmitting,
  });

  function resetForm() {
    Object.keys($values).forEach(name => {
      $values[name] = initialValues[name] || '';
      $errors[name] = null;
      $touched[name] = false;
    });
    $validatedValues = {};
  }

  async function validate() {
    try {
      $validatedValues = await schema.validate(
        { ...$values },
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );
      $errors = {};
      return true;
    } catch (err) {
      $errors = {};
      err.inner.forEach(error => {
        $errors[error.path] = error.message;
      });
    }
  }

  function touchField(name, value) {
    if (value) {
      $values[name] = value;
    }
    $touched[name] = true;

    if (schema) {
      validate();
    }
  }

  async function handleSubmit() {
    let isValid = false;
    Object.keys($values).forEach(name => ($touched[name] = true));

    if (schema) {
      isValid = await validate();
    }
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
  <slot isSubmitting={$isSubmitting} />
</form>
