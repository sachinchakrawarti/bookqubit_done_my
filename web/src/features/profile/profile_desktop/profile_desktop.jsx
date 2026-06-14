"use client";

import "./profile_desktop.css";
import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiBookOpen,
  FiStar,
  FiUsers,
  FiEdit2,
  FiSettings,
  FiLogOut,
  FiHeart,
  FiBookmark,
  FiMessageSquare,
  FiTrendingUp,
  FiClock,
  FiMapPin,
  FiLink,
  FiThumbsUp,
  FiShare2,
  FiMoreHorizontal,
  FiGrid,
  FiList,
  FiSearch,
  FiFilter,
} from "react-icons/fi";

export default function ProfileDesktop() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff&size=120",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200",
    joinDate: "January 2024",
    bio: "Passionate reader and book lover. Always looking for the next great story to dive into. I enjoy reading fiction, science fiction, and fantasy books.",
    location: "New York, USA",
    website: "https://johndoe.com",
    twitter: "@johndoe",
    instagram: "@johndoe",
    stats: {
      booksRead: 127,
      reviews: 48,
      followers: 342,
      following: 156,
      readingStreak: 15,
      totalPages: 45230,
    },
    favoriteGenres: ["Fiction", "Science Fiction", "Fantasy", "Mystery", "Thriller"],
    recentBooks: [
      { 
        id: 1, 
        title: "The Great Gatsby", 
        author: "F. Scott Fitzgerald", 
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
        rating: 4.5,
        date: "2024-01-15"
      },
      { 
        id: 2, 
        title: "1984", 
        author: "George Orwell", 
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
        rating: 4.8,
        date: "2024-01-10"
      },
      { 
        id: 3, 
        title: "Dune", 
        author: "Frank Herbert", 
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
        rating: 4.7,
        date: "2024-01-05"
      },
      { 
        id: 4, 
        title: "The Hobbit", 
        author: "J.R.R. Tolkien", 
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
        rating: 4.9,
        date: "2023-12-28"
      },
    ],
    recentReviews: [
      {
        id: 1,
        bookTitle: "The Great Gatsby",
        rating: 4.5,
        content: "A masterpiece of American literature. The themes of wealth, love, and the American Dream are brilliantly explored.",
        date: "2024-01-15",
        likes: 24,
      },
      {
        id: 2,
        bookTitle: "1984",
        rating: 5,
        content: "A chilling vision of the future that remains relevant today. Orwell's warnings about surveillance and control are more important than ever.",
        date: "2024-01-10",
        likes: 42,
      },
    ],
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: <FiUser /> },
    { id: "books", label: "Books", icon: <FiBookOpen /> },
    { id: "reviews", label: "Reviews", icon: <FiStar /> },
    { id: "followers", label: "Followers", icon: <FiUsers /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fontStyle = currentFont?.family ? { fontFamily: currentFont.family } : {};

  const renderStars = (rating) => {
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`star ${i < Math.floor(rating) ? "filled" : i < rating ? "half" : "empty"}`}
            fill={i < Math.floor(rating) ? "currentColor" : "none"}
          />
        ))}
        <span className="rating-value">{rating}</span>
      </div>
    );
  };

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`profile-desktop ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      <div className="profile-container">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-avatar-section">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <button className="profile-edit-btn">
              <FiEdit2 /> Edit Profile
            </button>
          </div>

          <div className="profile-stats-mini">
            <div className="stat-mini-item">
              <FiBookOpen />
              <div>
                <strong>{user.stats.booksRead}</strong>
                <span>Books</span>
              </div>
            </div>
            <div className="stat-mini-item">
              <FiStar />
              <div>
                <strong>{user.stats.reviews}</strong>
                <span>Reviews</span>
              </div>
            </div>
            <div className="stat-mini-item">
              <FiUsers />
              <div>
                <strong>{user.stats.followers}</strong>
                <span>Followers</span>
              </div>
            </div>
          </div>

          <div className="profile-location">
            <div className="location-item">
              <FiMapPin />
              <span>{user.location}</span>
            </div>
            <div className="location-item">
              <FiLink />
              <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a>
            </div>
            <div className="location-item">
              <FiCalendar />
              <span>Joined {user.joinDate}</span>
            </div>
          </div>

          <nav className="profile-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`profile-nav-item ${activeTab === item.id ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
            <button className="profile-nav-item logout">
              <FiLogOut /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="profile-main">
          {/* Cover Image */}
          <div className="profile-cover">
            <img src={user.coverImage} alt="Cover" className="cover-image" />
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <FiBookOpen className="stat-icon" />
              <div className="stat-info">
                <h3>{user.stats.booksRead}</h3>
                <p>Books Read</p>
              </div>
            </div>
            <div className="stat-card">
              <FiStar className="stat-icon" />
              <div className="stat-info">
                <h3>{user.stats.reviews}</h3>
                <p>Reviews</p>
              </div>
            </div>
            <div className="stat-card">
              <FiUsers className="stat-icon" />
              <div className="stat-info">
                <h3>{user.stats.followers}</h3>
                <p>Followers</p>
              </div>
            </div>
            <div className="stat-card">
              <FiTrendingUp className="stat-icon" />
              <div className="stat-info">
                <h3>{user.stats.readingStreak}</h3>
                <p>Day Streak</p>
              </div>
            </div>
            <div className="stat-card">
              <FiClock className="stat-icon" />
              <div className="stat-info">
                <h3>{user.stats.totalPages.toLocaleString()}</h3>
                <p>Total Pages</p>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="profile-tab-content">
            {activeTab === "overview" && (
              <div className="overview-tab">
                {/* Bio Section */}
                <div className="bio-section">
                  <h3>About Me</h3>
                  <p>{user.bio}</p>
                  <div className="social-links">
                    <a href="#" className="social-link">Twitter</a>
                    <a href="#" className="social-link">Instagram</a>
                    <a href="#" className="social-link">Goodreads</a>
                  </div>
                </div>

                {/* Favorite Genres */}
                <div className="genres-section">
                  <h3>Favorite Genres</h3>
                  <div className="genres-list">
                    {user.favoriteGenres.map((genre, index) => (
                      <span key={index} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                </div>

                {/* Recent Books */}
                <div className="recent-books-section">
                  <div className="section-header">
                    <h3>Recently Read</h3>
                    <button className="view-all-btn">View All</button>
                  </div>
                  <div className="recent-books-grid">
                    {user.recentBooks.map((book) => (
                      <div key={book.id} className="recent-book-card">
                        <img src={book.cover} alt={book.title} />
                        <div className="book-info">
                          <h4>{book.title}</h4>
                          <p>{book.author}</p>
                          {renderStars(book.rating)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Reviews */}
                <div className="recent-reviews-section">
                  <div className="section-header">
                    <h3>Recent Reviews</h3>
                    <button className="view-all-btn">View All</button>
                  </div>
                  <div className="reviews-list">
                    {user.recentReviews.map((review) => (
                      <div key={review.id} className="review-card">
                        <div className="review-header">
                          <h4>{review.bookTitle}</h4>
                          {renderStars(review.rating)}
                        </div>
                        <p className="review-content">{review.content}</p>
                        <div className="review-footer">
                          <span className="review-date">{review.date}</span>
                          <button className="like-btn">
                            <FiThumbsUp /> {review.likes}
                          </button>
                          <button className="share-btn">
                            <FiShare2 />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "books" && (
              <div className="books-tab">
                <div className="tab-header">
                  <h3>My Books Library</h3>
                  <div className="tab-actions">
                    <div className="search-bar">
                      <FiSearch />
                      <input type="text" placeholder="Search books..." />
                    </div>
                    <div className="view-toggle">
                      <button 
                        className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                        onClick={() => setViewMode("grid")}
                      >
                        <FiGrid />
                      </button>
                      <button 
                        className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                        onClick={() => setViewMode("list")}
                      >
                        <FiList />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="book-filters">
                  <button className="filter-btn active">All Books</button>
                  <button className="filter-btn">Currently Reading</button>
                  <button className="filter-btn">Want to Read</button>
                  <button className="filter-btn">Completed</button>
                  <button className="filter-btn">Favorites</button>
                </div>

                <div className={`books-grid ${viewMode}`}>
                  {user.recentBooks.map((book) => (
                    <div key={book.id} className="book-item">
                      <img src={book.cover} alt={book.title} />
                      <div className="book-details">
                        <h4>{book.title}</h4>
                        <p>{book.author}</p>
                        {renderStars(book.rating)}
                        <div className="book-actions">
                          <button className="book-action-btn">Read</button>
                          <button className="book-action-btn">Review</button>
                          <button className="book-action-btn">Share</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews-tab">
                <div className="tab-header">
                  <h3>My Reviews</h3>
                  <div className="tab-actions">
                    <div className="search-bar">
                      <FiSearch />
                      <input type="text" placeholder="Search reviews..." />
                    </div>
                    <button className="filter-btn">
                      <FiFilter /> Filter
                    </button>
                  </div>
                </div>

                <div className="reviews-full-list">
                  {user.recentReviews.map((review) => (
                    <div key={review.id} className="review-full-card">
                      <div className="review-header">
                        <div className="review-book-info">
                          <h4>{review.bookTitle}</h4>
                          {renderStars(review.rating)}
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <p className="review-full-content">{review.content}</p>
                      <div className="review-actions">
                        <button className="like-btn">
                          <FiThumbsUp /> {review.likes}
                        </button>
                        <button className="comment-btn">
                          <FiMessageSquare /> 5
                        </button>
                        <button className="share-btn">
                          <FiShare2 />
                        </button>
                        <button className="more-btn">
                          <FiMoreHorizontal />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "followers" && (
              <div className="followers-tab">
                <div className="tab-header">
                  <h3>Followers & Following</h3>
                  <div className="tab-actions">
                    <div className="search-bar">
                      <FiSearch />
                      <input type="text" placeholder="Search people..." />
                    </div>
                  </div>
                </div>

                <div className="followers-stats">
                  <div className="follower-stat">
                    <strong>{user.stats.followers}</strong>
                    <span>Followers</span>
                  </div>
                  <div className="follower-stat">
                    <strong>{user.stats.following}</strong>
                    <span>Following</span>
                  </div>
                </div>

                <div className="followers-grid">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="follower-card">
                      <img src={`https://ui-avatars.com/api/?name=User+${i}&background=3b82f6&color=fff`} alt={`User ${i}`} />
                      <div className="follower-info">
                        <h4>Reader {i}</h4>
                        <p>Book Enthusiast</p>
                        <button className="follow-btn">Following</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="settings-tab">
                <h3>Account Settings</h3>
                <div className="settings-form">
                  <div className="settings-group">
                    <label>Display Name</label>
                    <input type="text" defaultValue={user.name} />
                  </div>
                  <div className="settings-group">
                    <label>Email</label>
                    <input type="email" defaultValue={user.email} />
                  </div>
                  <div className="settings-group">
                    <label>Bio</label>
                    <textarea rows="4" defaultValue={user.bio} />
                  </div>
                  <div className="settings-group">
                    <label>Location</label>
                    <input type="text" defaultValue={user.location} />
                  </div>
                  <div className="settings-group">
                    <label>Website</label>
                    <input type="url" defaultValue={user.website} />
                  </div>
                  <div className="settings-actions">
                    <button className="save-btn">Save Changes</button>
                    <button className="cancel-btn">Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}