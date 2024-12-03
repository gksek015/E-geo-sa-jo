
import React from 'react';
import PostUpdateDelete from '../components/layout/PostUpdateDelete';
import { useParams } from 'react-router-dom';

const UpdatePostPage = () => {
  const storeId = "49aea70d-a279-4717-a328-529adf49d39b"
  // const { id : storeId } = useParams();
  return <PostUpdateDelete storeId={storeId}/>;
};


export default UpdatePostPage;
