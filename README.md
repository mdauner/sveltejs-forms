# sveltejs-forms

![npm](https://img.shields.io/npm/v/sveltejs-forms)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/sveltejs-forms)
![npm](https://img.shields.io/npm/dm/sveltejs-forms)

![GitHub](https://img.shields.io/github/license/mdauner/sveltejs-forms)
![Actions Status](https://github.com/mdauner/sveltejs-forms/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/mdauner/sveltejs-forms/branch/master/graph/badge.svg)](https://codecov.io/gh/mdauner/sveltejs-forms)

Declarative forms for [Svelte](https://svelte.dev/).

[DEMO](https://svelte.dev/repl/8e7deaa261364b4f8b2c0caff1982eeb?version=3.19.2)

## Features

- optional schema-based validation through [Yup](https://github.com/jquense/yup)
- access to nested properties using paths
- supports custom components
- provides `Input`, `Select`, `Choice` components to reduce boilerplate

## Install

```shell
$ npm i sveltejs-forms
```

or

```shell
$ yarn add sveltejs-forms
```

## How to use

### With provided `Input`, `Select`, `Choice` helper components

```html
<script>
  import { Form, Input, Select, Choice } from 'sveltejs-forms';
  import * as yup from 'yup';

  function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
      resetForm({
        user: { email: 'test@user.com' }, // optional
      });
    }, 2000);

    /**
     * {
     *   user: {
     *    email: 'email@example.com'
     *   },
     *   password: '123456',
     *   language: 'svelte',
     *   os: 'osx,linux'
     * }
     */
  }

  function handleReset() {
    console.log('form has been reset');
  }

  const schema = yup.object().shape({
    user: yup.object().shape({
      email: yup
        .string()
        .required()
        .email(),
    }),
    password: yup.string().min(4),
    language: yup.string().required(),
    os: yup.string(),
  });

  const langOptions = [
    { id: 'svelte', title: 'Svelte' },
    { id: 'react', title: 'React' },
    { id: 'angular', title: 'Angular' },
  ];

  const osOptions = [
    { id: 'macos', title: 'macOS' },
    { id: 'linux', title: 'Linux 🐧' },
    { id: 'windows', title: 'Windows' },
  ];

  const initialValues = {
    language: 'svelte',
  };
</script>

<style lang="scss" global>
  .sveltejs-forms {
    background-color: lightgray;
    display: inline-block;
    padding: 1rem;

    .field {
      margin-bottom: 1rem;
      &.error {
        input {
          border: 1px solid red;
        }
        .message {
          margin-top: 0.2rem;
          color: red;
          font-size: 0.8rem;
        }
      }
    }
  }
</style>

<Form
  {schema}  <!-- optional -->
  {initialValues} <!-- optional -->
  validateOnBlur={false} <!-- optional, default: true -->
  validateOnChange={false} <!-- optional, default: true -->
  on:submit={handleSubmit}
  on:reset={handleReset}
  let:isSubmitting
  let:isValid
>
  <Input name="user.email" label="Email" placeholder="e.g. user@example.com" /> <!-- nested field -->
  <Input name="password" type="password" placeholder="Password" />
  <Select name="language" options={langOptions} />
  <Choice name="os" options={osOptions} multiple />

  <button type="reset">Reset</button>
  <button type="submit" disabled={isSubmitting}>Sign in</button>
  The form is valid: {isValid}
</Form>
```

### With custom component:

```html
<script>
  import { Form } from 'sveltejs-forms';
  import Select from 'svelte-select';
  import yup from 'yup';

  let svelteSelect;

  function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
      svelteSelect.handleClear();
      resetForm();
    }, 2000);
  }

  const schema = yup.object().shape({
    food: yup.string().required()
  });

  let items = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'pizza', label: 'Pizza' },
    { value: 'cake', label: 'Cake' },
    { value: 'chips', label: 'Chips' },
    { value: 'ice-cream', label: 'Ice Cream' },
  ];
</script>

<Form
  {schema}
  on:submit={handleSubmit}
  let:isSubmitting
  let:setValue
  let:values
  let:errors
  let:touched>

  <Select
    {items}
    bind:this={svelteSelect}
    inputAttributes="{{ name: 'food' }}"
    hasError="{touched['food'] && errors['food']}"
    on:select="{({ detail }) => setValue('food', detail.value)}"
    on:clear="{() => setValue('food', '')}"
    selectedValue="{items.find(item => item.value === values['food'])}"/>

  <button type="submit" disabled={isSubmitting}>Submit</button>
</Form>
```

## Slot props

| Name | Type |
|------|------|
| isSubmitting | `boolean`
| isValid | `boolean`
| setValue(path, value) | `function`
| touchField(path) | `function`
| validate() | `function`
| values |  `object`
| errors |  `object`
| touched |  `object`

## Contributions

**All contributions are welcome.**
