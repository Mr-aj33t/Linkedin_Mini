import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

function LikeButton({ postId, likes, likeCount }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const isLiked = likes.includes(currentUser?.uid);

  const handleLike = async () => {
    if (!currentUser || loading) return;

    setLoading(true);
    try {
      const postRef = doc(db, 'posts', postId);
      
      if (isLiked) {
        // Unlike the post
        await updateDoc(postRef, {
          likes: arrayRemove(currentUser.uid),
          likeCount: increment(-1)
        });
      } else {
        // Like the post
        await updateDoc(postRef, {
          likes: arrayUnion(currentUser.uid),
          likeCount: increment(1)
        });
      }
    } catch (error) {
      console.error('Error updating like:', error);
      toast.error('Failed to update like');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="like-section">
      <button 
        onClick={handleLike}
        className={`like-btn ${isLiked ? 'liked' : ''}`}
        disabled={loading}
      >
        <span className="like-icon">
          {isLiked ? '❤️' : '🤍'}
        </span>
        {loading ? 'Loading...' : (isLiked ? 'Unlike' : 'Like')}
      </button>
      <span className="like-count">
        {likeCount} {likeCount === 1 ? 'like' : 'likes'}
      </span>
    </div>
  );
}

export default LikeButton;
