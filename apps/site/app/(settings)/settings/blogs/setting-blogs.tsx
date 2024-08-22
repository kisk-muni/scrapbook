import { Suspense } from 'react';
import { ProfileBlogs } from 'app/(settings)/settings/blogs/blog-card-list';
import AddBlog from './add-blog';
import { addBlog } from './actions';

function BlogSkeleton() {
  return (
    <div className="space-y-4 animate-pulse ">
      <div className="h-36 px-8 py-6 bg-white rounded-xl flex flex-col">
        <div className="h-6 w-20 mt-0.5 mb-2 rounded-full bg-smoke"></div>
        <div className="h-5 w-44 mt-0.5 mb-2.5 rounded-full bg-smoke"></div>
      </div>
    </div>
  );
}

export default async function SettingBlog() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Připojení externího blogu</h2>
      <p className="text-lg">
        Příspěvky z připojených blogů se budou zobrazovat na vašem profilu mezi
        ostatními.
      </p>
      <div className="my-8">
        <AddBlog addBlog={addBlog} defaultFeedUrl="" defaultUrl="" />
      </div>
      <Suspense fallback={<BlogSkeleton />}>
        <ProfileBlogs />
      </Suspense>
    </div>
  );
}
