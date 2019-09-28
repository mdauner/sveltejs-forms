# sveltejs-forms

![npm](https://img.shields.io/npm/v/sveltejs-forms)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/sveltejs-forms)
![npm](https://img.shields.io/npm/dw/sveltejs-forms)

![GitHub](https://img.shields.io/github/license/mdauner/sveltejs-forms)
![Actions Status](https://github.com/mdauner/sveltejs-forms/workflows/Node%20CI/badge.svg)
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
	import { Form, Input } from 'sveltejs-forms';
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
		 *   password: '123456'
		 * }
		 */
	}

	const schema = yup.object().shape({
		email: yup
			.string()
			.required()
			.email(),
		password: yup.string().min(4)
	});
</script>

<style lang="scss">
	:global(.sveltejs-forms) {
		background-color: lightgray;
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

<Form {schema} on:submit={handleSubmit} let:isSubmitting>
	<Input name="email" />
	<Input name="password" type="password" />

	<button type="submit" disabled={isSubmitting}>Sign in</button>
</Form>
```
