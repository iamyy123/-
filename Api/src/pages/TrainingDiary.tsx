import { useState, useEffect } from 'react';
import { DiaryPost, getDiaryPosts, createDiaryPost } from '../services/api';
import { useTrainerStore } from '../store/store';

const TrainingDiary = () => {
  const [posts, setPosts] = useState<DiaryPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { name } = useTrainerStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getDiaryPosts();
        setPosts(data.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const newPost = await createDiaryPost({
        title:title,
        body: content,
        userId: 1,
      });
      setPosts([newPost, ...posts]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  if (loading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">训练日记</h1>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">写新日记</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <input
                type="text"
                placeholder="标题"
                className="input input-bordered"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control">
              <textarea
                placeholder="今天的训练心得..."
                className="textarea textarea-bordered h-24"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              发布
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className="text-sm text-base-content/70">作者: {name}</p>
              <p>{post.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingDiary;