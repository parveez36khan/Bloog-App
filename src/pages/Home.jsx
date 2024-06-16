import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import Container from '../components/container/Container';
import PostCard from '../components/PostCard';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 bg-gray-100">
        <Container>
          <div className="flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ width: '600px', height: '400px' }}>
              <div className=" p-8">
                <h1 className="text-3xl font-semibold mb-4 text-center text-gray-800">Welcome to Bloog App!</h1>
                <p className="text-lg font-semibold text-gray-600  items-centertext-center">
                  where you can use for both personally for uploading memories as post and share with loved ones whereas for professionally use upload documents like Id card etc.
                </p>
              </div>
              
              <div className='flex justify-center items-center'>
              <button onClick={()=>navigate('/signup')}
                  class="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
                >
                  Hover me!
                  <span
                    class="absolute w-40 h-32 -top-8 -left-2 bg-blue-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"
                  ></span>
                  <span
                    class="absolute w-40 h-32 -top-8 -left-2 bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"
                  ></span>
                  <span
                    class="absolute w-40 h-32 -top-8 -left-2 bg-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"
                  ></span>
                  <span
                    class="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
                    > Starting </span
                  >
                </button>

              </div>

              
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap -mx-4">
          {posts.map((post) => (
            <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
