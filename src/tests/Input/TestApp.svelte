<svelte:options accessors={true} />

<script>
	import { Form, Input } from '../../lib/index.js';

	export let onSubmit = () => {};
	/**
	 * @type {any}
	 */
	export let schema = null;
	export let initialValues = {};
	export let validateOnBlur = true;
	export let validateOnChange = true;
	export let form = null;
	export let multiline = false;
	export let label = '';
	export let disabled = false;
</script>

<Form
	{schema}
	{initialValues}
	{validateOnBlur}
	{validateOnChange}
	on:submit={onSubmit}
	let:isSubmitting
	bind:this={form}>
	<Input name="email" {label} placeholder="Email" {multiline} {disabled} />

	<button type="submit" disabled={isSubmitting}>Sign in</button>
</Form>
