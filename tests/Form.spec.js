import App from './TestApp.svelte';
import { render, fireEvent, wait } from '@testing-library/svelte';
import * as yup from 'yup';

describe('Form', () => {
  it('click on submit button dispatches submit event and sets isSubmitting to true', async () => {
    const { component, getByText } = render(App, {
      props: { onSubmit: jest.fn() },
    });
    const signInButton = getByText('Sign in');

    expect(component.form.$$.ctx.$isSubmitting).toBe(false);
    expect(signInButton).not.toHaveAttribute('disabled');

    await fireEvent.click(signInButton);
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
    expect(signInButton).toHaveAttribute('disabled');
    expect(component.form.$$.ctx.$isSubmitting).toBe(true);
  });

  it('shows error message when schema is defined', async () => {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required()
        .email(),
    });
    const { component, getByPlaceholderText, getByText } = render(App, {
      props: { schema },
    });
    const emailInput = getByPlaceholderText('Email');

    await fireEvent.change(emailInput, {
      target: { value: 'invalid value' },
    });
    await wait(() => {
      expect(getByText('email must be a valid email')).toBeInTheDocument();
    });
    expect(component.form.$$.ctx.$errors).toEqual({
      email: 'email must be a valid email',
    });
  });

  it('registers fields and sets default values', async () => {
    const { component } = render(App);

    expect(component.form.$$.ctx.$values).toEqual({
      email: '',
      language: '',
      os: '',
    });
    expect(component.form.$$.ctx.$touched).toEqual({
      email: false,
      language: false,
      os: false,
    });
    expect(component.form.$$.ctx.$errors).toEqual({
      email: null,
      language: null,
      os: null,
    });
  });

  it('sets initial values', async () => {
    const { component } = render(App, {
      props: { initialValues: { email: 'test@user.com' } },
    });

    expect(component.form.$$.ctx.$values).toEqual({
      email: 'test@user.com',
      language: '',
      os: '',
    });
  });

  it('unregisters when field is removed', async () => {
    const { component, getByText, getByPlaceholderText } = render(App);

    expect(component.form.$$.ctx.$values).not.toHaveProperty('optional');
    let showButton = getByText('Show');
    await showButton.click();
    await wait(() => {
      expect(getByPlaceholderText('Optional')).toBeInTheDocument();
      expect(component.form.$$.ctx.$values).toHaveProperty('optional');
    });

    showButton = getByText('Hide');
    await showButton.click();
    expect(component.form.$$.ctx.$values).not.toHaveProperty('optional');
  });

  it('matches snapshot', async () => {
    const { container } = render(App);
    expect(container.firstChild).toMatchSnapshot();
  });
});
