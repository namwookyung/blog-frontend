import { useEffect } from 'react';
import qs from 'qs';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';

const PostListContainer = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
  );

  useEffect(() => {
    const { username } = params;
    const { page } = qs.parse(location, params, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ username, page }));
  }, [dispatch, location, params]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;
