import App from './TestApp.svelte';
import { fireEvent, wait } from '@testing-library/svelte';
import * as yup from 'yup';
import { render } from '../utils';

describe('Form', () => {
  it('click on submit button dispatches submit event and sets isSubmitting to true', async () => {
    const { component, getByText } = await render(App, {
      props: { onSubmit: jest.fn() },
    });
    const signInButton = getByText('Sign in');

    expect(component.form.$$.ctx.$isSubmitting).toBe(false);
    expect(signInButton).not.toHaveAttribute('disabled');

    await fireEvent.click(signInButton);
    await wait();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
    expect(signInButton).toHaveAttribute('disabled');
    expect(component.form.$$.ctx.$isSubmitting).toBe(true);
  });

  it('onSubmit event returns values, resetForm, setSubmitting', async done => {
    const {
      container,
      component,
      getByText,
      getByPlaceholderText,
    } = await render(App, {
      props: {
        onSubmit: jest.fn(
          ({ detail: { values, setSubmitting, resetForm } }) => {
            expect(values).toMatchSnapshot();

            expect(component.form.$$.ctx.$isSubmitting).toBeTruthy();
            setSubmitting(false);
            expect(component.form.$$.ctx.$isSubmitting).toBeFalsy();

            expect(component.form.$$.ctx.$values).toMatchSnapshot();
            expect(component.form.$$.ctx.$errors).toMatchSnapshot();
            expect(component.form.$$.ctx.$touched).toMatchSnapshot();
            resetForm();
            expect(component.form.$$.ctx.$values).toMatchSnapshot();
            expect(component.form.$$.ctx.$errors).toMatchSnapshot();
            expect(component.form.$$.ctx.$touched).toMatchSnapshot();

            done();
          }
        ),
      },
    });

    const emailInput = getByPlaceholderText('Email');
    await fireEvent.change(emailInput, {
      target: { value: 'test@user.com' },
    });

    const languageSelect = container.querySelector('select');
    await fireEvent.change(languageSelect, {
      target: { value: 'svelte' },
    });

    let osChoice = getByText('macOS');
    await fireEvent.click(osChoice);

    osChoice = getByText('Windows');
    await fireEvent.click(osChoice);

    const signInButton = getByText('Sign in');

    expect(component.form.$$.ctx.$isSubmitting).toBe(false);
    expect(signInButton).not.toHaveAttribute('disabled');

    await fireEvent.click(signInButton);
  });

  it('resetForm resets values to initialValues', async done => {
    const { component, getByText, getByPlaceholderText } = await render(App, {
      props: {
        initialValues: {
          user: { email: 'initial@value.com' },
        },
        onSubmit: jest.fn(({ detail: { resetForm } }) => {
          expect(component.form.$$.ctx.$values.user.email).toEqual(
            'test@user.com'
          );
          resetForm();
          expect(component.form.$$.ctx.$values.user.email).toEqual(
            'initial@value.com'
          );

          done();
        }),
      },
    });

    const emailInput = getByPlaceholderText('Email');
    await fireEvent.change(emailInput, {
      target: { value: 'test@user.com' },
    });

    const signInButton = getByText('Sign in');
    await fireEvent.click(signInButton);
  });

  it('resetForm accepts optional new form data object', async done => {
    const { component, getByText, getByPlaceholderText } = await render(App, {
      props: {
        initialValues: {
          user: { email: 'initial@value.com' },
        },
        onSubmit: jest.fn(({ detail: { resetForm } }) => {
          expect(component.form.$$.ctx.$values.user.email).toEqual(
            'test@user.com'
          );
          resetForm({
            user: { email: 'after@reset.com' },
          });
          expect(component.form.$$.ctx.$values.user.email).toEqual(
            'after@reset.com'
          );

          done();
        }),
      },
    });

    const emailInput = getByPlaceholderText('Email');
    await fireEvent.change(emailInput, {
      target: { value: 'test@user.com' },
    });

    const signInButton = getByText('Sign in');
    await fireEvent.click(signInButton);
  });

  it('shows error message when schema is defined', async () => {
    const schema = yup.object().shape({
      user: yup.object().shape({
        email: yup
          .string()
          .required()
          .email(),
      }),
    });
    const {
      container,
      component,
      getByPlaceholderText,
      getByText,
    } = await render(App, {
      props: { schema },
    });
    const emailInput = getByPlaceholderText('Email');

    await fireEvent.change(emailInput, {
      target: { value: 'invalid value' },
    });
    await fireEvent.blur(emailInput);
    await wait(() => {
      expect(getByText('user.email must be a valid email')).toBeInTheDocument();
    });
    expect(component.form.$$.ctx.$errors).toEqual({
      user: { email: 'user.email must be a valid email' },
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it('registers fields and sets default values', async () => {
    const { component } = await render(App);

    expect(component.form.$$.ctx.$values).toMatchObject({
      user: { email: '' },
      language: '',
      os: '',
    });
    expect(component.form.$$.ctx.$touched).toMatchObject({
      user: { email: false },
      language: false,
      os: false,
    });
  });

  it('isValid is undefined initially', async () => {
    const { component } = await render(App);
    expect(component.form.$$.ctx.isValid).toBe(undefined);
  });

  it('sets initial values', async () => {
    const { component } = await render(App, {
      props: { initialValues: { user: { email: 'test@user.com' } } },
    });

    expect(component.form.$$.ctx.$values).toMatchObject({
      user: { email: 'test@user.com' },
      language: '',
      os: '',
    });
  });

  it('matches snapshot', async () => {
    const { container } = await render(App);
    expect(container.firstChild).toMatchSnapshot();
  });
});
