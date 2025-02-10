import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Page from '../page';

describe('Page', () => {
  it('renders a heading', async () => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    render(await Page({ params: { lng: 'en' } }));
    const heading = screen.getByRole('main');
    expect(heading).toBeInTheDocument();
  });
});
