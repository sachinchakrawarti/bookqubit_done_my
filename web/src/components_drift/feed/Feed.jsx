"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaStar,
  FaRegStar,
  FaEllipsisH,
  FaUserPlus,
  FaUserCheck,
} from 'react-icons/fa';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import './Feed.css';

const Feed = () => {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Generate mock posts dynamically
  const generateMockPosts = (pageNum, filterType = 'all') => {
    const users = [
      { name: 'Emma Watson', username: '@emma_reads', avatar: '/avatars/emma.jpg', role: 'Book Reviewer' },
      { name: 'James Chen', username: '@james_loves_fantasy', avatar: '/avatars/james.jpg', role: 'Fantasy Lover' },
      { name: 'Book Club Hub', username: '@bookclubhub', avatar: '/avatars/bookclub.jpg', role: 'Community' },
      { name: 'Sarah Johnson', username: '@sarah_reads', avatar: '/avatars/sarah.jpg', role: 'Book Blogger' },
      { name: 'Michael Brown', username: '@michael_books', avatar: '/avatars/michael.jpg', role: 'Author' },
      { name: 'Drift Community', username: '@drift', avatar: '/avatars/drift.jpg', role: 'Official' },
    ];

    const books = [
      { title: 'Project Hail Mary', author: 'Andy Weir', rating: 4.8, cover: '/covers/project-hail-mary.jpg' },
      { title: 'The Way of Kings', author: 'Brandon Sanderson', rating: 4.9, cover: '/covers/way-of-kings.jpg' },
      { title: 'Atomic Habits', author: 'James Clear', rating: 4.7, cover: '/covers/atomic-habits.jpg' },
      { title: 'Tomorrow Tomorrow Tomorrow', author: 'Gabrielle Zevin', rating: 4.6, cover: '/covers/tomorrow.jpg' },
      { title: 'Fourth Wing', author: 'Rebecca Yarros', rating: 4.8, cover: '/covers/fourth-wing.jpg' },
      { title: 'Dune', author: 'Frank Herbert', rating: 4.9, cover: '/covers/dune.jpg' },
    ];

    const contents = [
      'Just finished this book - absolutely incredible! 🚀📚',
      'This book changed my perspective on life. Highly recommend!',
      '📖 Currently reading - such a page turner!',
      'Has anyone else read this? Would love to discuss!',
      'My favorite read of the year so far! 🌟🌟🌟🌟🌟',
      'Just added to my reading list. Can\'t wait to start!',
      'The writing style is beautiful. A must-read!',
      "Book club pick for this month. Let's discuss!",
    ];

    const postsPerPage = 5;
    const startIndex = (pageNum - 1) * postsPerPage;
    
    const newPosts = [];
    for (let i = 0; i < postsPerPage; i++) {
      const user = users[(startIndex + i) % users.length];
      const book = (startIndex + i) % 3 === 0 ? books[(startIndex + i) % books.length] : null;
      const content = contents[(startIndex + i) % contents.length];
      
      newPosts.push({
        id: `${pageNum}-${i}`,
        user: {
          name: user.name,
          username: user.username,
          avatar: user.avatar,
          role: user.role,
          isFollowing: (startIndex + i) % 3 === 0,
          followers: Math.floor(Math.random() * 10000) + 100,
        },
        content: content,
        book: book,
        likes: Math.floor(Math.random() * 1000) + 10,
        comments: Math.floor(Math.random() * 200) + 5,
        shares: Math.floor(Math.random() * 100) + 1,
        time: `${Math.floor(Math.random() * 24) + 1} ${Math.random() > 0.5 ? 'hours' : 'minutes'} ago`,
        liked: Math.random() > 0.7,
        saved: Math.random() > 0.8,
      });
    }
    
    return newPosts;
  };

  // Load more posts
  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPosts = generateMockPosts(page, filter);
      setPosts(prev => [...prev, ...newPosts]);
      setPage(prev => prev + 1);
      setLoading(false);
      
      // Stop loading after 5 pages for demo
      if (page >= 5) {
        setHasMore(false);
      }
    }, 1000);
  }, [page, loading, hasMore, filter]);

  // Initial load
  useEffect(() => {
    setLoading(true);
    setPosts([]);
    setPage(1);
    setHasMore(true);
    
    setTimeout(() => {
      const initialPosts = generateMockPosts(1, filter);
      setPosts(initialPosts);
      setPage(2);
      setLoading(false);
    }, 1000);
  }, [filter]);

  // Setup intersection observer for infinite scroll
  useEffect(() => {
    const currentLoadingRef = loadingRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );
    
    if (currentLoadingRef) {
      observer.observe(currentLoadingRef);
    }
    
    return () => {
      if (currentLoadingRef) {
        observer.unobserve(currentLoadingRef);
      }
    };
  }, [hasMore, loading, loadMorePosts]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, saved: !post.saved }
        : post
    ));
  };

  const handleFollow = (username) => {
    setPosts(posts.map(post =>
      post.user.username === username
        ? { ...post, user: { ...post.user, isFollowing: !post.user.isFollowing } }
        : post
    ));
  };

  const handleComment = (postId) => {
    console.log('Open comments for post:', postId);
  };

  const handleShare = (postId) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this post on Drift',
        text: 'Shared from Drift Social',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const filteredPosts = filter === 'all' 
    ? posts 
    : filter === 'following'
    ? posts.filter(post => post.user.isFollowing)
    : posts;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <FaStar key={i} className={`star filled ${theme.iconColors?.starFilled || 'text-amber-400'}`} size={14} />;
          } else if (i === fullStars && hasHalfStar) {
            return <FaStar key={i} className={`star half ${theme.iconColors?.starFilled || 'text-amber-400'}`} size={14} />;
          } else {
            return <FaRegStar key={i} className={`star empty ${theme.iconColors?.starEmpty || 'text-gray-300 dark:text-gray-600'}`} size={14} />;
          }
        })}
        <span className={`rating-text ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  if (loading && posts.length === 0) {
    return (
      <div className={`feed-loading ${theme.background?.page || 'bg-gray-50 dark:bg-gray-900'}`}>
        <div className={`spinner ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'}`}></div>
        <p className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>
          Loading your feed...
        </p>
      </div>
    );
  }

  return (
    <div className={`feed-container ${themeName}`} style={{ fontFamily: currentFont?.family }}>
      {/* Story Bar */}
      <div className={`story-bar ${theme.background?.card || 'bg-white dark:bg-gray-800'} ${theme.border?.default || 'border-gray-200 dark:border-gray-700'}`}>
        <div className="story-item">
          <div className={`story-ring ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'}`}>
            <img src="/avatars/current-user.jpg" alt="Your story" />
          </div>
          <span className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Your Story</span>
        </div>
        <div className="story-item">
          <div className="story-ring">
            <img src="/avatars/emma.jpg" alt="Emma" />
          </div>
          <span className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Emma</span>
        </div>
        <div className="story-item">
          <div className="story-ring">
            <img src="/avatars/james.jpg" alt="James" />
          </div>
          <span className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>James</span>
        </div>
        <div className="story-item">
          <div className="story-ring">
            <img src="/avatars/sarah.jpg" alt="Sarah" />
          </div>
          <span className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Sarah</span>
        </div>
        <div className="story-item">
          <div className="story-ring">
            <img src="/avatars/michael.jpg" alt="Michael" />
          </div>
          <span className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Michael</span>
        </div>
      </div>

      {/* Create Post */}
      <div className={`create-post-card ${theme.background?.card || 'bg-white dark:bg-gray-800'} ${theme.border?.default || 'border-gray-200 dark:border-gray-700'} ${theme.shadow?.container || 'shadow'}`}>
        <div className="create-post-input">
          <img src="/avatars/current-user.jpg" alt="Your avatar" className="avatar" />
          <input 
            type="text" 
            placeholder="Share what you're reading..."
            className={`${theme.background?.input || 'bg-gray-50 dark:bg-gray-900'} ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} ${theme.border?.default || 'border-gray-200 dark:border-gray-700'}`}
            readOnly
          />
        </div>
        <div className="create-post-actions">
          <button className={`photo-btn ${theme.background?.navigationDots || 'bg-gray-100 dark:bg-gray-700'} ${theme.textColors?.secondary || 'text-gray-700 dark:text-gray-300'}`}>
            📸 Photo
          </button>
          <button className={`book-btn ${theme.background?.navigationDots || 'bg-gray-100 dark:bg-gray-700'} ${theme.textColors?.secondary || 'text-gray-700 dark:text-gray-300'}`}>
            📚 Add Book
          </button>
          <button className={`poll-btn ${theme.background?.navigationDots || 'bg-gray-100 dark:bg-gray-700'} ${theme.textColors?.secondary || 'text-gray-700 dark:text-gray-300'}`}>
            📊 Poll
          </button>
        </div>
      </div>

      {/* Feed Filters */}
      <div className={`feed-filters ${theme.background?.card || 'bg-white dark:bg-gray-800'} ${theme.border?.default || 'border-gray-200 dark:border-gray-700'}`}>
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          For You
        </button>
        <button 
          className={`filter-btn ${filter === 'following' ? 'active' : ''}`}
          onClick={() => setFilter('following')}
        >
          Following
        </button>
        <button 
          className={`filter-btn ${filter === 'bookclub' ? 'active' : ''}`}
          onClick={() => setFilter('bookclub')}
        >
          Book Clubs
        </button>
      </div>

      {/* Posts Feed with Endless Scroll */}
      <div className="posts-feed">
        {filteredPosts.map((post, index) => (
          <div 
            key={`${post.id}-${index}`} 
            className={`post-card ${theme.background?.card || 'bg-white dark:bg-gray-800'} ${theme.shadow?.container || 'shadow'} ${theme.border?.default || 'border-gray-200 dark:border-gray-700'}`}
          >
            {/* Post Header */}
            <div className="post-header">
              <img src={post.user.avatar} alt={post.user.name} className="post-avatar" />
              <div className="post-user-info">
                <div className="post-user-name">
                  <span className={`user-name ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>
                    {post.user.name}
                  </span>
                  <span className={`user-role ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}>
                    {post.user.role}
                  </span>
                  {post.user.isFollowing && (
                    <span className={`following-badge ${theme.background?.badge || 'bg-green-100 dark:bg-green-900/30'} ${theme.textColors?.highlight || 'text-green-600 dark:text-green-400'}`}>
                      Following
                    </span>
                  )}
                </div>
                <div className={`post-username-time ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}>
                  {post.user.username} • {post.time}
                </div>
              </div>
              <div className="post-header-actions">
                <button className={`follow-user-btn ${post.user.isFollowing ? 'following' : ''} ${theme.buttonColors?.secondaryButton?.background || ''}`}>
                  {post.user.isFollowing ? <FaUserCheck size={14} /> : <FaUserPlus size={14} />}
                </button>
                <button className={`post-menu ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}>
                  <FaEllipsisH size={16} />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="post-content">
              <p className={theme.textColors?.primary || 'text-gray-900 dark:text-white'}>{post.content}</p>
              
              {/* Book Card (if present) */}
              {post.book && (
                <div className={`book-card ${theme.background?.section || 'bg-gray-50 dark:bg-gray-900'} ${theme.border?.default || 'border-gray-200 dark:border-gray-700'}`}>
                  <img src={post.book.cover} alt={post.book.title} className="book-cover" />
                  <div className="book-info">
                    <h4 className={theme.textColors?.primary || 'text-gray-900 dark:text-white'}>{post.book.title}</h4>
                    <p className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>by {post.book.author}</p>
                    {renderStars(post.book.rating)}
                    <button className={`want-to-read-btn ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} text-white`}>
                      Want to Read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Post Stats */}
            <div className={`post-stats ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}>
              <span>❤️ {post.likes.toLocaleString()} likes</span>
              <span>💬 {post.comments} comments</span>
              <span>🔄 {post.shares} shares</span>
            </div>

            {/* Post Actions */}
            <div className={`post-actions ${theme.border?.default || 'border-gray-200 dark:border-gray-700'}`}>
              <button 
                className={`action-btn ${post.liked ? 'liked' : ''}`}
                onClick={() => handleLike(post.id)}
              >
                {post.liked ? <FaHeart className="text-rose-500" size={20} /> : <FaRegHeart size={20} />}
                <span>Like</span>
              </button>
              <button className="action-btn" onClick={() => handleComment(post.id)}>
                <FaComment size={20} />
                <span>Comment</span>
              </button>
              <button className="action-btn" onClick={() => handleShare(post.id)}>
                <FaShare size={20} />
                <span>Share</span>
              </button>
              <button 
                className={`action-btn ${post.saved ? 'saved' : ''}`}
                onClick={() => handleSave(post.id)}
              >
                {post.saved ? <FaBookmark className="text-sky-500" size={20} /> : <FaRegBookmark size={20} />}
                <span>Save</span>
              </button>
            </div>
          </div>
        ))}
        
        {/* Loading Trigger for Endless Scroll */}
        <div ref={loadingRef} className="loading-trigger">
          {loading && (
            <div className="loading-more">
              <div className={`loading-spinner-small ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'}`}></div>
              <span className={theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}>
                Loading more posts...
              </span>
            </div>
          )}
          {!hasMore && posts.length > 0 && (
            <div className={`no-more-posts ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}>
              — You've seen all posts —
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;