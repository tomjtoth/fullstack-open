import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from '../components/Blog';

test('title + author gets rendered, but not url and likes', () => {
    const
        blog = {
            title: 'title',
            author: 'author',
            url: 'url',
            likes: 123
        },
        incrLike = vi.fn(),
        delBlog = vi.fn();

    render(<Blog x={[blog, incrLike, delBlog]} />);

    expect(screen.getByText('title', { exact: false })).toBeDefined();
    expect(screen.getByText('author', { exact: false })).toBeDefined();
    expect(screen.queryByText('url')).toBeNull();
    expect(screen.queryByText('likes', { exact: false })).toBeNull();
});

