import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoute from './PublicRoute'; 
import PrivateRoute from './PrivateRoute'; 
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import HomePage from '../pages/HomePage';
import MyPage from '../pages/MyPage';
import MyProfilePage from '../pages/MyProfilePage';
import PostPage from '../pages/PostPage';
// import UpdatePostPage from '../pages/UpdatePostPage';
import DetailPage from '../pages/DetailPage';
import ListPage from '../pages/ListPage';
import Layout from '../components/layout/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="home/:id" element={<DetailPage />} />
            <Route path="mypage" element={<MyPage />} />
            {/* <Route path="mypage/:id" element={<UpdatePostPage />} /> */}
            <Route path="myprofile" element={<MyProfilePage />} />
            <Route path="post" element={<PostPage />} />
            <Route path="list" element={<ListPage />} />
            <Route path="list/:id" element={<DetailPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
