import App from './TestApp.svelte';
import { fireEvent, wait } from '@testing-library/svelte';
import * as yup from 'yup';
import { render } from '../utils';

describe('Input', () => {
  it('renders textarea when multiline parameter is set', async () => {
    const { container } = await render(App, { props: { multiline: true } });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('updates form value on change', async () => {
    const { component, getByPlaceholderText } = await render(App);

    const emailInput = getByPlaceholderText('Email');

    await fireEvent.change(emailInput, {
      target: { value: 'test@user.com' },
    });

    expect(component.form.$$.ctx.$values).toMatchObject({
      email: 'test@user.com',
    });
  });

  it('validates on change if validateOnChange is true', async () => {
    const schema = yup.object().shape({
      email: yup.string().email(),
    });
    const { component, getByPlaceholderText } = await render(App, {
      props: { schema, validateOnChange: true },
    });

    const emailInput = getByPlaceholderText('Email');

    await fireEvent.change(emailInput, {
      target: { value: 'invalid value' },
    });
    await wait();

    expect(component.form.$$.ctx.$errors).toEqual({
      email: 'email must be a valid email',
    });
  });

  it('does not validate on change if validateOnChange is false', async () => {
    const schema = yup.object().shape({
      email: yup.string().email(),
    });
    const { component, getByPlaceholderText } = await render(App, {
      props: { schema, validateOnChange: false },
    });

    const emailInput = getByPlaceholderText('Email');

    await fireEvent.change(emailInput, {
      target: { value: 'invalid value' },
    });
    await wait();

    expect(component.form.$$.ctx.$errors).toEqual({});
  });

  it('validates on blur if validateOnBlur is true', async () => {
    const schema = yup.object().shape({
      email: yup.string().email(),
    });
    const { component, getByPlaceholderText } = await render(App, {
      props: { schema, validateOnChange: false, validateOnBlur: true },
    });

    const emailInput = getByPlaceholderText('Email');

    await fireEvent.change(emailInput, {
      target: { value: 'invalid value' },
    });
    await fireEvent.blur(emailInput);
    await wait();

    expect(component.form.$$.ctx.$errors).toEqual({
      email: 'email must be a valid email',
    });
  });

  it('does not validate on blur if validateOnBlur is false', async () => {
    const schema = yup.object().shape({
      email: yup.string().email(),
    });
    const { component, getByPlaceholderText } = await render(App, {
      props: { schema, validateOnChange: false, validateOnBlur: false },
    });

    const emailInput = getByPlaceholderText('Email');

    await fireEvent.change(emailInput, {
      target: { value: 'invalid value' },
    });
    await fireEvent.blur(emailInput);
    await wait();
    expect(component.form.$$.ctx.$errors).toEqual({});
  });

  it('matches snapshot', async () => {
    const { container } = await render(App);
    expect(container.firstChild).toMatchSnapshot();
  });
});
