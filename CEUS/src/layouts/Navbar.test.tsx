import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('offers Blog in both desktop and mobile navigation', () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));

    expect(screen.getAllByRole('link', { name: 'Blog' }).map((link) => link.getAttribute('href'))).toEqual(['/blog', '/blog']);
  });
});
