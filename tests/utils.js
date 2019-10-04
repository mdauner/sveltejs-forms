import { render, wait } from '@testing-library/svelte';

async function renderAndWait(component, options) {
  const renderedComponent = render(component, options);
  await wait();
  return renderedComponent;
}

export {
  renderAndWait as render
}
