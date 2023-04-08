<svelte:options accessors={true} />

<script>
	import { Form, Input, Select, Choice } from '../../lib/index.js';

	export let onSubmit = () => {};
	/**
	 * @type {any}
	 */
	export let schema = null;
	export let initialValues = {};
	export let form = null;

	const langOptions = [
		{ id: 'svelte', title: 'Svelte' },
		{ id: 'react', title: 'React' },
		{ id: 'angular', title: 'Angular' }
	];

	const osOptions = [
		{ id: 'macos', title: 'macOS' },
		{ id: 'linux', title: 'Linux 🐧' },
		{ id: 'windows', title: 'Windows' }
	];
</script>

<Form
	{schema}
	{initialValues}
	validateOnBlur={false}
	validateOnChange={true}
	on:submit={onSubmit}
	let:isSubmitting
	bind:this={form}>
	<Input name="user.email" placeholder="Email" />
	<Select name="language" options={langOptions} />
	<Choice name="os" options={osOptions} multiple />

	<button type="submit" disabled={isSubmitting}>Sign in</button>
</Form>
