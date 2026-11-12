import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Navbar from './Navbar';

describe('Navbar', () => {
  afterEach(() => {
    cleanup();
  });

  it('offers Blog in both desktop and mobile navigation', () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));

    expect(screen.getAllByRole('link', { name: 'Blog' }).map((link) => link.getAttribute('href'))).toEqual(['/blog', '/blog']);
  });

  it('offers Merch between Home and Team in both menus', () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));

    expect(
      screen.getAllByRole('link', { name: 'Merch' }).map((link) => link.getAttribute('href')),
    ).toEqual(['/merch', '/merch']);
  });
});
