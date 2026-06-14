"use client";

import React from "react";
import { FiMapPin, FiCalendar, FiLink, FiTwitter, FiInstagram, FiUserPlus, FiUserCheck } from "react-icons/fi";

export default function ProfileHeader({ user, isFollowing, onFollow, isLoading, currentUserId }) {
  const isOwnProfile = currentUserId === user?.id;

  return (
    <div className="profile-header">
      <div className="profile-header-top">
        <h1 className="profile-name">{user.name}</h1>
        {!isOwnProfile && (
          <button
            className={`follow-btn ${isFollowing ? "following" : ""}`}
            onClick={onFollow}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner-small"></span>
            ) : isFollowing ? (
              <>
                <FiUserCheck /> Following
              </>
            ) : (
              <>
                <FiUserPlus /> Follow
              </>
            )}
          </button>
        )}
      </div>
      
      <p className="profile-username">@{user.username}</p>
      <p className="profile-bio">{user.bio}</p>

      <div className="profile-meta">
        {user.location && (
          <span className="meta-item">
            <FiMapPin /> {user.location}
          </span>
        )}
        <span className="meta-item">
          <FiCalendar /> Joined {user.joinDate}
        </span>
      </div>

      <div className="profile-links">
        {user.website && (
          <a href={user.website} target="_blank" rel="noopener noreferrer" className="profile-link">
            <FiLink /> Website
          </a>
        )}
        {user.twitter && (
          <a href={`https://twitter.com/${user.twitter.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="profile-link">
            <FiTwitter /> {user.twitter}
          </a>
        )}
        {user.instagram && (
          <a href={`https://instagram.com/${user.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="profile-link">
            <FiInstagram /> {user.instagram}
          </a>
        )}
      </div>
    </div>
  );
}