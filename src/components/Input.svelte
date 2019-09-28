<script>
	import { getContext } from 'svelte';
	import { FORM } from './Form.svelte';

	export let name;
	export let type = 'text';
	export let placeholder = '';
	export let multiline = false;

	const { registerInput, handleChange, values, errors, touched } = getContext(
		FORM
	);

	registerInput(name);
</script>

<div class="field">
	{#if multiline}
		<textarea
			{name}
			{placeholder}
			value={$values[name]}
			on:change={handleChange} />
	{:else}
		<input
			{name}
			{type}
			{placeholder}
			value={$values[name]}
			on:change={handleChange} />
	{/if}
	{#if $touched[name] && $errors[name]}
		<div class="error">{$errors[name]}</div>
	{/if}
</div>
