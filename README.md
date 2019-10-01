# sveltejs-forms

![npm](https://img.shields.io/npm/v/sveltejs-forms)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/sveltejs-forms)
![npm](https://img.shields.io/npm/dw/sveltejs-forms)

![GitHub](https://img.shields.io/github/license/mdauner/sveltejs-forms)
![Actions Status](https://github.com/mdauner/sveltejs-forms/workflows/Node%20CI/badge.svg)
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
      resetForm();
    }, 2000);

    /**
     * {
     *   email: 'email@example.com',
     *   password: '123456',
     *   language: 'svelte',
     *   os: 'osx,linux'
     * }
     */
  }

  const schema = yup.object().shape({
    email: yup
      .string()
      .required()
      .email(),
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
    }

    .error {
      margin-top: 0.2rem;
      color: red;
      font-size: 0.8rem;
    }
  }
</style>

<Form {schema} {initialValues} on:submit={handleSubmit} let:isSubmitting>
  <Input name="email" placeholder="Email" />
  <Input name="password" type="password" placeholder="Password" />
  <Select name="language" options={langOptions} />
  <Choice name="os" options={osOptions} multiple />

  <button type="submit" disabled={isSubmitting}>Sign in</button>
</Form>
```
