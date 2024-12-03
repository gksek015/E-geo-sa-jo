import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
// import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import MyPage from '../pages/MyPage';
import MyProfilePage from '../pages/MyProfilePage';
import PostPage from '../pages/PostPage';
import UpdatePostPage from '../pages/UpdatePostPage';
import DetailPage from '../pages/DetailPage';
import ListPage from '../pages/ListPage';
import TopStoresPage from '../pages/TopStoresPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        {/* <Route element={<Layout />}> */}
          <Route path="home" element={<HomePage />} />
          <Route path="home/:id" element={<DetailPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="update" element={<UpdatePostPage />} />
          <Route path="myprofile" element={<MyProfilePage />} />
          <Route path="topratedstores" element={<TopStoresPage />} />
          <Route path="post" element={<PostPage />} />
          <Route path='list' element={<ListPage/>}/>
          <Route path='list/:id' element={<DetailPage/>}/>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
