import Pagination from '../../components/posts/Pagination';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import QueryString from 'qs';

const PaginationContainer = () => {
  const location = useLocation();
  const params = useParams();
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading['posts/LIST_POSTS'],
  }));

  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!posts || loading) return null;

  const { username } = params;

  // page가 없으면 1을 기본값으로 사용
  const { page = 1 } = QueryString.parse(location.params, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      username={username}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default PaginationContainer;
