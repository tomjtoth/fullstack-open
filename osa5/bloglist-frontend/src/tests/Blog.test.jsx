import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';
// import BlogCreationForm from '../components/BlogCreationform';

const BLOG = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 123,
    user: {
        name: 'Firstname Lastname'
    }
};

test('title + author gets rendered, but not url and likes', () => {
    const
        incrLike = vi.fn(),
        delBlog = vi.fn();

    render(<Blog x={[BLOG, incrLike, delBlog]} />);

    expect(screen.getByText('title', { exact: false })).toBeDefined();
    expect(screen.getByText('author', { exact: false })).toBeDefined();
    expect(screen.queryByText('url')).toBeNull();
    expect(screen.queryByText('likes 123')).toBeNull();
});

test('url and likes get shown after clicking "expand"', async () => {
    const
        incrLike = vi.fn(),
        delBlog = vi.fn();

    render(<Blog x={[BLOG, incrLike, delBlog]} />);

    expect(screen.queryByText('url')).toBeNull();
    expect(screen.queryByText('likes 123')).toBeNull();
    expect(screen.queryByText('Firstname Lastname')).toBeNull();

    const user = userEvent.setup();
    const button = screen.getByText('expand');
    await user.click(button);

    expect(screen.queryByText('url')).toBeDefined();
    expect(screen.queryByText('likes 123')).toBeDefined();
    expect(screen.queryByText('Firstname Lastname')).toBeDefined();
});

test('clicking the "like" button 2x calls `incrLike` 2x', async () => {
    const
        incrLike = vi.fn(),
        delBlog = vi.fn();

    render(<Blog x={[BLOG, incrLike, delBlog]} />);

    const user = userEvent.setup();
    const btnExpand = screen.getByText('expand');
    await user.click(btnExpand);

    const btnLike = screen.getByText('like');
    await user.click(btnLike);
    await user.click(btnLike);

    expect(incrLike.mock.calls).toHaveLength(2);
});

// test('BlogCreationForm calls setBlogs with correct array (?)', async () => {
//     const
//         setBlogs = vi.fn(),
//         setFeedback = vi.fn(),
//         blogSvc = {
//             createNew: vi.fn(),
//             then: vi.fn(),
//             catch: vi.fn()
//         },
//         blogs = [BLOG];

//     render(<BlogCreationForm x={{ blogs, setBlogs, blogSvc, setFeedback }} />);

//     const [title, author, url] = screen.getAllByRole('textbox');

//     const user = userEvent.setup();

//     await Promise.all([
//         user.type(title, 'new title'),
//         user.type(author, 'new author'),
//         user.type(url, 'new url')
//     ]);
//     await user.click(screen.getByText('create'));
//     console.log(blogSvc);

//     // expect(blogSvc.createNew.calls).toHaveLength(2);
// });
