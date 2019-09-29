<script>
	import {
		Form,
		Input,
		Select,
	} from '../src/components/components.module.js';

	export let onSubmit = () => {};

	export let schema = null;

	const options = [
		{ id: 'svelte', title: 'Svelte' },
		{ id: 'react', title: 'React' },
		{ id: 'angular', title: 'Angular' },
	];
</script>

<Form {schema} on:submit={onSubmit} let:isSubmitting>
	<Input name="email" placeholder="Email" />
	<Select name="language" {options} />

	<button type="submit" disabled={isSubmitting}>Sign in</button>
</Form>
