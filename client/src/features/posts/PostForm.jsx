import React, { useState } from 'react';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="flex-1" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-lg font-bold">Create a new post</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2"
        placeholder="Title"
      />
      <textarea
        className="mb-4 h-32 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Something interesting"
      ></textarea>

      <button
        type="submit"
        className="text-white bg-blue-400 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-4 py-2 text-center"
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;
