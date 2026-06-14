"use client";

import React, { useState, useEffect } from "react";
import ProfileCover from "./components/ProfileCover";
import ProfileHeader from "./components/ProfileHeader";
import ProfileStats from "./components/ProfileStats";
import ProfileGenres from "./components/ProfileGenres";
import ProfileBooks from "./components/ProfileBooks";
import ProfileReviews from "./components/ProfileReviews";
import "./public_profile.css";

export default function PublicProfile({ user, currentUserId = null }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(user?.stats?.followers || 0);
  const [isLoading, setIsLoading] = useState(false);

  // Check if current user is following this profile on load
  useEffect(() => {
    if (currentUserId && user?.id) {
      // Replace with your actual API call
      const checkFollowStatus = async () => {
        try {
          // Example API call
          // const response = await fetch(`/api/follow/status?userId=${currentUserId}&targetId=${user.id}`);
          // const data = await response.json();
          // setIsFollowing(data.isFollowing);
          
          // Mock for now
          const savedFollows = JSON.parse(localStorage.getItem('following') || '[]');
          setIsFollowing(savedFollows.includes(user.id));
        } catch (error) {
          console.error("Error checking follow status:", error);
        }
      };
      checkFollowStatus();
    }
  }, [currentUserId, user?.id]);

  const handleFollow = async () => {
    if (!currentUserId) {
      // Redirect to login or show login modal
      alert("Please login to follow users");
      return;
    }

    setIsLoading(true);
    try {
      // Replace with your actual API call
      // const response = await fetch("/api/follow", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ userId: currentUserId, targetId: user.id }),
      // });
      
      if (!isFollowing) {
        // Follow action
        setFollowersCount(prev => prev + 1);
        setIsFollowing(true);
        
        // Save to localStorage (mock)
        const savedFollows = JSON.parse(localStorage.getItem('following') || '[]');
        localStorage.setItem('following', JSON.stringify([...savedFollows, user.id]));
        
        // Show success message
        console.log(`Now following ${user.name}`);
      } else {
        // Unfollow action
        setFollowersCount(prev => prev - 1);
        setIsFollowing(false);
        
        // Remove from localStorage (mock)
        const savedFollows = JSON.parse(localStorage.getItem('following') || '[]');
        localStorage.setItem('following', JSON.stringify(savedFollows.filter(id => id !== user.id)));
        
        console.log(`Unfollowed ${user.name}`);
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update user stats with new followers count
  const updatedUser = {
    ...user,
    stats: {
      ...user.stats,
      followers: followersCount,
    },
  };

  return (
    <div className="public-profile">
      <ProfileCover coverImage={user.coverImage} avatar={user.avatar} name={user.name} />
      
      <div className="profile-content">
        <ProfileHeader 
          user={updatedUser} 
          isFollowing={isFollowing}
          onFollow={handleFollow}
          isLoading={isLoading}
          currentUserId={currentUserId}
        />
        <ProfileStats stats={updatedUser.stats} />
        <ProfileGenres 
          favoriteGenres={user.favoriteGenres} 
          favoriteAuthors={user.favoriteAuthors} 
        />
        <ProfileBooks recentBooks={user.recentBooks} />
        <ProfileReviews recentReviews={user.recentReviews} />
      </div>
    </div>
  );
}