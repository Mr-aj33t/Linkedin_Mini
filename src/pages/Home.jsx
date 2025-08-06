import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import PostCard from '../components/PostCard';
import toast from 'react-hot-toast';

function Home() {
  const { currentUser, userProfile } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Real-time listener for posts
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setLoading(true);
    try {
      console.log('Creating post with authorId:', currentUser.uid); // Debug log
      
      await addDoc(collection(db, 'posts'), {
        content: newPost,
        authorId: currentUser.uid, // Make sure this matches the query
        authorName: userProfile?.name || currentUser.email,
        authorEmail: currentUser.email,
        createdAt: new Date(),
        likes: [],
        likeCount: 0
      });

      setNewPost('');
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="create-post-section">
          <h2>Create a Post</h2>
          <form onSubmit={handleCreatePost} className="create-post-form">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              rows="4"
              className="post-textarea"
              required
            />
            <button 
              type="submit" 
              className="post-btn"
              disabled={loading || !newPost.trim()}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>

        <div className="posts-section">
          <h2>Recent Posts</h2>
          {posts.length === 0 ? (
            <p className="no-posts">No posts yet. Be the first to share something!</p>
          ) : (
            <div className="posts-list">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
