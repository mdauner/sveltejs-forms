import App from './TestApp.svelte';
import { render, fireEvent, wait } from '@testing-library/svelte';
import * as yup from 'yup';

describe('Form', () => {
	it('click on submit button dispatches submit event and sets isSubmitting to true', async () => {
		const { component, getByText } = render(App, {
			props: { onSubmit: jest.fn() },
		});
		const signInButton = getByText('Sign in');

		expect(signInButton).not.toHaveAttribute('disabled');
		await fireEvent.click(signInButton);
		expect(component.onSubmit).toHaveBeenCalledTimes(1);
		expect(signInButton).toHaveAttribute('disabled');
	});

	it('shows error message when schema is defined', async () => {
		const schema = yup.object().shape({
			email: yup
				.string()
				.required()
				.email(),
		});
		const { getByPlaceholderText, getByText } = render(App, {
			props: { schema },
		});
		const emailInput = getByPlaceholderText('Email');

		await fireEvent.change(emailInput, {
			target: { value: 'invalid value' },
		});
		await wait(() => {
			expect(
				getByText('email must be a valid email')
			).toBeInTheDocument();
		});
	});

	it('matches snapshot', async () => {
		const { container } = render(App);
		expect(container.firstChild).toMatchInlineSnapshot(`
		<div>
		  <form
		    class="sveltejs-forms"
		  >
		    <div
		      class="field"
		    >
		      <input
		        name="email"
		        placeholder="Email"
		        type="text"
		      />
		       
		    </div>
		     
		    <div
		      class="field"
		    >
		      <select
		        name="language"
		      >
		        <option
		          value=""
		        />
		        <option
		          value="svelte"
		        >
		          Svelte
		        </option>
		        <option
		          value="react"
		        >
		          React
		        </option>
		        <option
		          value="angular"
		        >
		          Angular
		        </option>
		      </select>
		       
		    </div>
		     
		    <button
		      type="submit"
		    >
		      Sign in
		    </button>
		  </form>
		</div>
	`);
	});
});
