<script>
  import { Form, Input, Select } from './components/components.module.js';
  import * as yup from 'yup';

  function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
      resetForm();
    }, 2000);

    /**
     * {
     *   email: 'email@example.com',
     *   password: '123456',
     *   language: 'svelte'
     * }
     */
  }

  const schema = yup.object().shape({
    email: yup
      .string()
      .required()
      .email(),
    password: yup.string().min(4),
    language: yup.string().required(),
  });

  const options = [
    { id: 'svelte', title: 'Svelte' },
    { id: 'react', title: 'React' },
    { id: 'angular', title: 'Angular' },
  ];

  const initialValues = {
    language: 'svelte',
  };
</script>

<style lang="scss">
  :global(.sveltejs-forms) {
    background-color: lightgray;
    display: inline-block;
    padding: 1rem;
    .field {
      margin-bottom: 1rem;
    }

    .error {
      margin-top: 0.2rem;
      color: red;
      font-size: 0.8rem;
    }
  }
</style>

<Form {schema} {initialValues} on:submit={handleSubmit} let:isSubmitting>
  <Input name="email" placeholder="Email" />
  <Input name="password" type="password" placeholder="Password" />
  <Select name="language" {options} />

  <button type="submit" disabled={isSubmitting}>Sign in</button>
</Form>
