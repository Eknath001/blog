import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BlogCard from '../components/BlogCard'; // Adjust import if not aliasing

const SearchList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('q')?.toLowerCase() || '';
  const { blog } = useSelector(store => store.blog);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Search results for "${query}"`;
  }, [query]);

  const filteredBlogs = blog.filter((b) =>
    [b.title, b.subtitle, b.category].some((field) =>
      field?.toLowerCase().includes(query)
    )
  );

  return (
    <div className='pt-32'>
      <div className='max-w-6xl mx-auto px-4'>
        <h2 className='mb-5 text-xl font-semibold'>Search Results for: <span className='text-blue-600'>"{query}"</span></h2>
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No results found for "{query}"</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 my-10'>
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchList;
