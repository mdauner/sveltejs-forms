# sveltejs-forms

![npm](https://img.shields.io/npm/v/sveltejs-forms)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/sveltejs-forms)
![npm](https://img.shields.io/npm/dw/sveltejs-forms)

![GitHub](https://img.shields.io/github/license/mdauner/sveltejs-forms)
![Actions Status](https://github.com/mdauner/sveltejs-forms/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/mdauner/sveltejs-forms/branch/master/graph/badge.svg)](https://codecov.io/gh/mdauner/sveltejs-forms)
[![Maintainability](https://api.codeclimate.com/v1/badges/a5df28cac1b693245079/maintainability)](https://codeclimate.com/github/mdauner/sveltejs-forms/maintainability)

Declarative forms for [Svelte](https://svelte.dev/).

## Install

```shell
$ npm i sveltejs-forms
```

or

```shell
$ yarn add sveltejs-forms
```

## How to use

### Example

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

<style lang="scss">
  :global(.sveltejs-forms) {
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
  <Input name="user.email" placeholder="Email" /> <!-- nested field -->
  <Input name="password" type="password" placeholder="Password" />
  <Select name="language" options={langOptions} />
  <Choice name="os" options={osOptions} multiple />

  <button type="reset">Reset</button>
  <button type="submit" disabled={isSubmitting}>Sign in</button>
  The form is valid: {isValid}
</Form>
```
