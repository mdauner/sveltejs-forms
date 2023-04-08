<script>
	import { getContext } from 'svelte';
	import get from 'lodash-es/get';
	import { FORM } from './Form.svelte';

	/**
	 * @type {string}
	 */
	export let name;
	export let label = '';
	/**
	 * @type {any}
	 */
	export let options;

	const { touchField, setValue, values, errors, touched } = getContext(FORM);

	/**
	 * @param {Event & { currentTarget: HTMLElement & HTMLSelectElement}} event
	 */
	function onChange(event) {
		// @ts-ignore
		setValue(name, event.target.value);
	}

	function onBlur() {
		touchField(name);
	}

	if (Object.keys($$restProps).includes('value')) {
		setTimeout(() => setValue(name, $$restProps.value, false), 0);
	}
</script>

<div class="field" class:error={get($touched, name) && get($errors, name)}>
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	<select
		{name}
		id={name}
		value={get($values, name)}
		on:change={onChange}
		on:blur={onBlur}
		{...$$restProps}>
		<option value="" />
		{#each options as option}
			<option value={option.id} selected={get($values, name) === option.id}>
				{option.title}
			</option>
		{/each}
	</select>
	{#if get($touched, name) && get($errors, name)}
		<div class="message">{get($errors, name)}</div>
	{/if}
</div>
