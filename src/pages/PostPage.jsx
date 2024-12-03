import React from 'react';
import PostForm from '../components/posting/PostForm';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const PostPage = () => {
  return (
    <div>
      <Header />
        <PostForm />
      <Footer />
    </div>
  );

};

export default PostPage;
