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

  function touchField(path) {
    $touched = set($touched, path, true);
  }

  function setValue(path, value) {
    $values = set($values, path, value);
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
  on:submit|preventDefault={handleSubmit}
  on:reset={handleResetClick}
  class="sveltejs-forms"
  bind:this={form}>
  <slot isSubmitting={$isSubmitting} {isValid} />
</form>
