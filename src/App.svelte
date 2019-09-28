<script>
	import { Form, Input } from './components/components.module.js';
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
		password: yup.string().min(4),
	});
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

<Form {schema} on:submit={handleSubmit} let:isSubmitting>
	<Input name="email" placeholder="Email" />
	<Input name="password" type="password" placeholder="Password" />

	<button type="submit" disabled={isSubmitting}>Sign in</button>
</Form>
