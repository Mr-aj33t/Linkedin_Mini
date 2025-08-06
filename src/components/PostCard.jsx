import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function PostCard({ post }) {
  const { currentUser } = useAuth();

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <Link to={`/profile/${post.authorId}`} className="author-link">
            <h4>{post.authorName}</h4>
          </Link>
          <p className="post-date">{formatDate(post.createdAt)}</p>
        </div>
        {currentUser && currentUser.uid === post.authorId && (
          <DeleteButton postId={post.id} />
        )}
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      
      <div className="post-actions">
        <LikeButton 
          postId={post.id} 
          likes={post.likes || []} 
          likeCount={post.likeCount || 0}
        />
      </div>
    </div>
  );
}

export default PostCard;
