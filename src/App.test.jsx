import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { categories, post, posts } from './test/fixtures';

vi.mock('./client', () => ({
  default: {
    config: () => ({ projectId: 'test', dataset: 'test' }),
    fetch: vi.fn(async (query) => {
      if (query.includes('slug.current == $slug')) return [post];
      if (query.includes('_type == "category"')) return categories;
      if (query.includes('_type == "post"')) return posts;
      return [];
    }),
  },
}));

function renderAt(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('App', () => {
  beforeEach(() => {
    document.title = '';
  });

  it('renders a blog post with its rich content', async () => {
    const { container } = renderAt('/blog/lcmsplot');

    expect(await screen.findByRole('heading', { level: 1, name: post.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Motivation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'lcmsPlot repository' })).toHaveAttribute(
      'href',
      'https://github.com/computational-metabolomics/lcmsPlot',
    );
    expect(screen.getByText('library(lcmsPlot)')).toBeInTheDocument();
    expect(screen.getByAltText('Four features plotted with lcmsPlot')).toHaveAttribute(
      'src',
      'https://cdn.sanity.io/images/test/test/abc123-1600x1120.png',
    );
    expect(container.querySelector('.katex')).not.toBeNull();
    expect(screen.getByText('Research')).toBeInTheDocument();
    await waitFor(() => expect(document.title).toBe('Ossama Edbali | Blog'));
  });

  it('lists blog posts and category filters', async () => {
    renderAt('/blog');

    for (const p of posts) {
      expect(await screen.findByText(p.title)).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'Open source' })).toBeInTheDocument();
    expect(screen.getByText('30th April 2023')).toBeInTheDocument();
  });

  it('shows the not found page for unknown routes', async () => {
    renderAt('/does-not-exist');

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
    await waitFor(() => expect(document.title).toBe('Ossama Edbali | Page not found'));
  });
});
