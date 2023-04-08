// @ts-nocheck
import App from './TestApp.svelte';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import * as yup from 'yup';
import { describe, expect, test, vi, afterEach } from 'vitest';

describe('Form', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	});

	// Skipped for $capture_state
	test.skip('click on submit button dispatches submit event and sets isSubmitting to true', async () => {
		const { component } = render(App, {
			props: { onSubmit: vi.fn() }
		});
		const signInButton = screen.getByText('Sign in');
		expect(component.form.$capture_state().$isSubmitting).toBe(false);
		expect(signInButton).not.toHaveAttribute('disabled');
	
		await fireEvent.click(signInButton);
		await waitFor(() =>{});

		expect(component.onSubmit).toHaveBeenCalledTimes(1);
		expect(signInButton).toHaveAttribute('disabled');
		expect(component.form.$capture_state().$isSubmitting).toBe(true);
	});

	// Skipped for $capture_state
	test.skip('onSubmit event returns values, resetForm, setSubmitting', async () => {
		const { container, component, getByText, getByPlaceholderText } = await render(App, {
			props: {
				onSubmit: jest.fn(({ detail: { values, setSubmitting, resetForm } }) => {
					expect(values).toMatchSnapshot();

					expect(component.form.$capture_state().$isSubmitting).toBeTruthy();

					setSubmitting(false);
					let formState = component.form.$capture_state();
					expect(formState.$isSubmitting).toBeFalsy();
					expect(formState.$values).toMatchSnapshot();
					expect(formState.$errors).toMatchSnapshot();
					expect(formState.$touched).toMatchSnapshot();

					resetForm();
					formState = component.form.$capture_state();
					expect(formState.$values).toMatchSnapshot();
					expect(formState.$errors).toMatchSnapshot();
					expect(formState.$touched).toMatchSnapshot();
				})
			}
		});

		const emailInput = getByPlaceholderText('Email');
		await fireEvent.change(emailInput, {
			target: { value: 'test@user.com' }
		});

		const languageSelect = container.querySelector('select');
		await fireEvent.change(languageSelect, {
			target: { value: 'svelte' }
		});

		let osChoice = getByText('macOS');
		await fireEvent.click(osChoice);

		osChoice = getByText('Windows');
		await fireEvent.click(osChoice);

		const signInButton = getByText('Sign in');

		expect(component.form.$capture_state().$isSubmitting).toBe(false);
		expect(signInButton).not.toHaveAttribute('disabled');

		await fireEvent.click(signInButton);
	});

	// Skipped for $capture_state
	test.skip('resetForm resets values to initialValues', async () => {
		const { component, getByText, getByPlaceholderText } = await render(App, {
			props: {
				initialValues: {
					user: { email: 'initial@value.com' }
				},
				onSubmit: vi.fn(({ detail: { resetForm } }) => {
					expect(component.form.$capture_state().$values.user.email).toEqual('test@user.com');
					resetForm();
					expect(component.form.$capture_state().$values.user.email).toEqual('initial@value.com');

				})
			}
		});

		const emailInput = getByPlaceholderText('Email');
		await fireEvent.change(emailInput, {
			target: { value: 'test@user.com' }
		});

		const signInButton = getByText('Sign in');
		await fireEvent.click(signInButton);
	});

	// Skipped for $capture_state
	test.skip('resetForm accepts optional new form data object', async () => {
		const { component, getByText, getByPlaceholderText } = await render(App, {
			props: {
				initialValues: {
					user: { email: 'initial@value.com' }
				},
				onSubmit: jest.fn(({ detail: { resetForm } }) => {
					expect(component.form.$capture_state().$values.user.email).toEqual('test@user.com');
					resetForm({
						user: { email: 'after@reset.com' }
					});
					expect(component.form.$capture_state().$values.user.email).toEqual('after@reset.com');
				})
			}
		});

		const emailInput = getByPlaceholderText('Email');
		await fireEvent.change(emailInput, {
			target: { value: 'test@user.com' }
		});

		const signInButton = getByText('Sign in');
		await fireEvent.click(signInButton);
	});

	test('shows error message when schema is defined', async () => {
		const schema = yup.object().shape({
			user: yup.object().shape({
				email: yup.string().required().email()
			})
		});
		const { container} =  render(App, {
			props: { schema }
		});
		const emailInput = screen.getByPlaceholderText('Email');

		await fireEvent.change(emailInput, {
			target: { value: 'invalid value' }
		});
		await fireEvent.blur(emailInput);
		await waitFor(() => {
			expect(screen.getByText('user.email must be a valid email')).toBeInTheDocument();
		});

		expect(container.firstChild).toMatchSnapshot();
	});

	// Skipped for $capture_state
	test.skip('registers fields and sets default values', async () => {
		const { component } = await render(App);

		expect(component.form.$capture_state().$values).toMatchObject({
			user: { email: '' },
			language: '',
			os: []
		});
		expect(component.form.$capture_state().$touched).toMatchObject({
			user: { email: false },
			language: false,
			os: false
		});
	});

	// Skipped for $capture_state
	test.skip('isValid is undefined initially', async () => {
		const { component } = await render(App);
		expect(component.form.$capture_state().isValid).toBe(undefined);
	});

	// Skipped for $capture_state
	test.skip('sets initial values', async () => {
		const { component } = await render(App, {
			props: { initialValues: { user: { email: 'test@user.com' } } }
		});

		expect(component.form.$capture_state().$values).toMatchObject({
			user: { email: 'test@user.com' },
			language: '',
			os: []
		});
	});

	test('matches snapshot', async () => {
		const { container } = await render(App);
		expect(container.firstChild).toMatchSnapshot();
	});
});
