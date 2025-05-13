import React from 'react';

const BlogCard = ({ blog }) => (
  <div className="border p-4 rounded shadow-md">
    <h2 className="text-xl font-bold">{blog.title}</h2>
    <p className="text-sm text-gray-500">By {blog.author} | {blog.category}</p>
    <p>{blog.content}</p>
    {blog.image && <img src={blog.image} alt="" className="mt-2 max-h-60" />}
  </div>
);

export default BlogCard;
