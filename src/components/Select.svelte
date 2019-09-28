<script>
	import { getContext } from 'svelte';
	import { FORM } from './Form.svelte';

	export let name;
	export let options;

	const { registerInput, handleChange, values, errors, touched } = getContext(
		FORM
	);

	registerInput(name);
</script>

<div class="field">
	<select {name} value={$values[name]} on:change={handleChange}>
		<option value="" />
		{#each options as option}
			<option value={option.id}>{option.title}</option>
		{/each}
	</select>
	{#if $touched[name] && $errors[name]}
		<div class="error">{$errors[name]}</div>
	{/if}
</div>
