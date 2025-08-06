import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import PostCard from '../components/PostCard';

function Profile() {
  const { userId } = useParams();
  const { currentUser, userProfile } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);

  const targetUserId = userId || currentUser?.uid;
  const isOwnProfile = !userId || userId === currentUser?.uid;

  // Profile data fetch
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!targetUserId) return;
      
      try {
        if (isOwnProfile && userProfile) {
          setProfileData(userProfile);
        } else {
          const userDoc = await getDoc(doc(db, 'users', targetUserId));
          if (userDoc.exists()) {
            setProfileData(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [targetUserId, isOwnProfile, userProfile]);

  // Posts fetch with real-time updates
  useEffect(() => {
    if (!targetUserId) return;

    setPostsLoading(true);

    const postsQuery = query(
      collection(db, 'posts'),
      where('authorId', '==', targetUserId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot) => {
        const posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUserPosts(posts);
        setPostsLoading(false);
      },
      (error) => {
        console.error('Error fetching posts:', error);
        setPostsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [targetUserId]);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!profileData) {
    return <div className="error">User not found</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <h1>{profileData.name}</h1>
          <p className="profile-email">{profileData.email}</p>
          {profileData.bio && (
            <p className="profile-bio">{profileData.bio}</p>
          )}
          <div className="profile-stats">
            <span className="post-count">
              {postsLoading ? 'Loading posts...' : `${userPosts.length} posts`}
            </span>
          </div>
        </div>

        <div className="profile-posts">
          <h2>{isOwnProfile ? 'Your Posts' : `${profileData.name}'s Posts`}</h2>
          
          {postsLoading ? (
            <div className="loading">Loading posts...</div>
          ) : userPosts.length === 0 ? (
            <p className="no-posts">
              {isOwnProfile ? 'You haven\'t posted anything yet.' : 'This user hasn\'t posted anything yet.'}
            </p>
          ) : (
            <div className="posts-list">
              {userPosts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  isOwnPost={post.authorId === currentUser?.uid}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;