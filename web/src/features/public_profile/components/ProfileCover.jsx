// src/features/public_profile/components/ProfileCover.jsx
"use client";

import React from "react";

export default function ProfileCover({ coverImage, avatar, name }) {
  return (
    <div className="profile-cover-container">
      <img src={coverImage} alt="Cover" className="profile-cover-image" />
      <div className="profile-avatar-wrapper">
        <img src={avatar} alt={name} className="profile-avatar" />
      </div>
    </div>
  );
}