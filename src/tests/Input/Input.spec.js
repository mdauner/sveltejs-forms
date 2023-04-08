// @ts-nocheck

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import * as yup from 'yup';
import App from './TestApp.svelte';

describe('Input', () => {
	test('renders textarea when multiline parameter is set', async () => {
		const { container } = render(App, { props: { multiline: true } });
		expect(container.firstChild).toMatchSnapshot();
	});

	test('renders label', async () => {
		const { container } = render(App, { props: { label: 'Email' } });
		expect(container.firstChild).toMatchSnapshot();
	});

	test('passes props to input', async () => {
		const { container } = render(App, { props: { disabled: true } });
		expect(container.firstChild).toMatchSnapshot();
	});

	// Skipped for $capture_state
	test.skip('updates form value on change', async () => {
		const { component, getByPlaceholderText } = render(App);

		const emailInput = getByPlaceholderText('Email');

		await fireEvent.change(emailInput, {
			target: { value: 'test@user.com' }
		});

		expect(component.form.$capture_state().$values).toMatchObject({
			email: 'test@user.com',
		  });
		
	});

	test('validates on input if field is touched', async () => {
		
		const user = userEvent.setup();
		
		const schema = yup.object().shape({
			email: yup.string().min(4)
		});
		render(App, {
			props: { schema, validateOnChange: true }
		});

		const emailInput = screen.getByPlaceholderText('Email');

		await fireEvent.change(emailInput, {
			target: { value: 'pas' }
		});

		await waitFor(() => expect (screen.getByText('email must be at least 4 characters')).toBeInTheDocument());
		user.type(emailInput, 's');
		await waitFor(() => expect (screen.queryByText('email must be at least 4 characters')).not.toBeInTheDocument());
	});

	test('validates on change if validateOnChange is true', async () => {
		const schema = yup.object().shape({
			email: yup.string().email()
		});
		render(App, {
			props: { schema, validateOnChange: true }
		});

		const emailInput = screen.getByPlaceholderText('Email');

		await fireEvent.change(emailInput, {
			target: { value: 'invalid value' }
		});

		await waitFor(() => expect (screen.getByText('email must be a valid email')).toBeInTheDocument());
	});

	test('does not validate on change if validateOnChange is false', async () => {
		const schema = yup.object().shape({
			email: yup.string().email()
		});
		render(App, {
			props: { schema, validateOnChange: false }
		});

		const emailInput = screen.getByPlaceholderText('Email');

		await fireEvent.change(emailInput, {
			target: { value: 'invalid value' }
		});

		await waitFor(() => expect (screen.queryByText('email must be a valid email')).not.toBeInTheDocument());
	});

	test('validates on blur if validateOnBlur is true', async () => {
		const schema = yup.object().shape({
			email: yup.string().email()
		});
		render(App, {
			props: { schema, validateOnChange: false, validateOnBlur: true }
		});

		const emailInput = screen.getByPlaceholderText('Email');

		await fireEvent.change(emailInput, {
			target: { value: 'invalid value' }
		});
		await fireEvent.blur(emailInput);

		await waitFor(() => expect (screen.getByText('email must be a valid email')).toBeInTheDocument());

	});

	test('does not validate on blur if validateOnBlur is false', async () => {
		const schema = yup.object().shape({
			email: yup.string().email()
		});
		render(App, {
			props: { schema, validateOnChange: false, validateOnBlur: false }
		});

		const emailInput = screen.getByPlaceholderText('Email');
		
		await fireEvent.change(emailInput, {
			target: { value: 'invalid value' }
		});
		await fireEvent.blur(emailInput);
		
		await waitFor(() => expect (screen.queryByText('email must be a valid email')).not.toBeInTheDocument());

	});

	test('matches snapshot', async () => {
		const { container } = render(App);
		expect(container.firstChild).toMatchSnapshot();
	});
});
