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

<Form {schema} on:submit={handleSubmit} let:isSubmitting>
	<Input name="email" />
	<Input name="password" type="password" />

	<button type="submit" disabled={isSubmitting}>Sign in</button>
</Form>
