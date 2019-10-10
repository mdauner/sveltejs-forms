<script>
  import {
    Form,
    Input,
    Select,
    Choice,
  } from './components/components.module.js';
  import * as yup from 'yup';

  function handleReset() {
    console.log('form has been reset');
  }

  function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
      resetForm({
        user: { email: 'test@user.com' },
      });
    }, 2000);
  }

  const schema = yup.object().shape({
    user: yup.object().shape({
      email: yup
        .string()
        .required()
        .email(),
      password: yup.string().min(4),
      language: yup.string().required(),
      os: yup
        .array()
        .of(yup.string().required())
        .min(2),
    }),
  });

  const langOptions = [
    { id: 'svelte', title: 'Svelte' },
    { id: 'react', title: 'React' },
    { id: 'angular', title: 'Angular' },
  ];

  const osOptions = [
    { id: 'macos', title: 'macOS' },
    { id: 'linux', title: 'Linux 🐧' },
    { id: 'windows', title: 'Windows' },
  ];
</script>

<style lang="scss">
  :global(.sveltejs-forms) {
    background-color: lightgray;
    display: inline-block;
    padding: 1rem;
    .field {
      margin-bottom: 1rem;
      &.error {
        input,
        select {
          border: 1px solid red;
        }
        .message {
          margin-top: 0.2rem;
          color: red;
          font-size: 0.8rem;
        }
      }
    }
  }
</style>

<Form
  {schema}
  validateOnChange={true}
  validateOnBlur={true}
  on:submit={handleSubmit}
  on:reset={handleReset}
  let:isSubmitting
  let:isValid>
  <Input name="user.email" placeholder="Email" />
  <Input
    name="user.password"
    type="password"
    placeholder="Password"
    multiline />
  <Select name="user.language" options={langOptions} />
  <Choice name="user.os" options={osOptions} multiple />

  <button type="reset">Reset</button>
  <button type="submit" disabled={isSubmitting}>Sign in</button>
  The form is valid: {isValid}
</Form>
