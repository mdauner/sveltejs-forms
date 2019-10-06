<script>
  import { Form, Input } from '../../src/components/components.module.js';

  export let onSubmit = () => {};
  export let schema = null;
  export let initialValues = {};
  export let validateOnBlur = true;
  export let validateOnChange = true;
  export let form = null;
  export let multiline = false;
</script>

<Form
  {schema}
  {initialValues}
  {validateOnBlur}
  {validateOnChange}
  on:submit={onSubmit}
  let:isSubmitting
  bind:this={form}>
  <Input name="email" placeholder="Email" {multiline} />

  <button type="submit" disabled={isSubmitting}>Sign in</button>
</Form>
