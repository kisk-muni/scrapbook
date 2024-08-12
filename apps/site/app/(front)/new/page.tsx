import { post } from 'app/actions';
import NewPostCard from 'components/new-post';

export default function NewPostPage() {
  return <NewPostCard post={post} defaultPost={''} />;
}
