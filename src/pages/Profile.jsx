import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
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

    let unsub = null;
    let didFallback = false;

    // Try with orderBy first
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        where('authorId', '==', targetUserId),
        orderBy('createdAt', 'desc')
      );
      unsub = onSnapshot(
        postsQuery,
        (snapshot) => {
          setUserPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          setPostsLoading(false);
        },
        async (error) => {
          // Fallback: fetch without orderBy and sort in JS
          if (!didFallback) {
            didFallback = true;
            const fallbackQuery = query(
              collection(db, 'posts'),
              where('authorId', '==', targetUserId)
            );
            const snap = await getDocs(fallbackQuery);
            const posts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sort in JS by createdAt (if exists)
            posts.sort((a, b) => {
              const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
              const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
              return bTime - aTime;
            });
            setUserPosts(posts);
            setPostsLoading(false);
          }
        }
      );
    } catch (err) {
      // Should not happen, but fallback just in case
      (async () => {
        const fallbackQuery = query(
          collection(db, 'posts'),
          where('authorId', '==', targetUserId)
        );
        const snap = await getDocs(fallbackQuery);
        const posts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        posts.sort((a, b) => {
          const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
          const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
          return bTime - aTime;
        });
        setUserPosts(posts);
        setPostsLoading(false);
      })();
    }

    return () => {
      if (unsub) unsub();
    };
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
            {/* Always show post count after posts are loaded */}
            {postsLoading
              ? 'Loading posts...'
              : `${userPosts.length} post${userPosts.length !== 1 ? 's' : ''}`}
          </div>
        </div>

        <div className="profile-posts">
          <h2>{isOwnProfile ? 'Your Posts' : `${profileData.name}'s Posts`}</h2>
          {/* Always show posts list after loading */}
          {postsLoading ? (
            <div className="loading">Loading posts...</div>
          ) : (
            <div className="posts-list">
              {userPosts.length === 0 ? (
                <p className="no-posts">
                  {isOwnProfile
                    ? "You haven't posted anything yet."
                    : "This user hasn't posted anything yet."}
                </p>
              ) : (
                userPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isOwnPost={post.authorId === currentUser?.uid}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;