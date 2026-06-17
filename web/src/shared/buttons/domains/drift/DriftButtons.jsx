"use client";

import React from 'react';
import {
  FaInfoCircle,
  FaHeart,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaBookmark,
  FaFlag,
  FaUserPlus,
  FaUserCheck,
  FaUsers,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaBell,
  FaCrown,
  FaRocket,
} from 'react-icons/fa';
import { getDetailRoute } from '../../constants/routes';
import './DriftButtons.css';

const BaseButton = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  icon,
  className = '',
  disabled = false,
  loading = false,
  ...props
}) => {
  const btnClass = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${disabled || loading ? 'btn-disabled' : ''}
    ${loading ? 'btn-loading' : ''}
    ${className}
  `.trim();

  const content = (
    <>
      {loading && <span className="btn-spinner"></span>}
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-label">{children}</span>
    </>
  );

  if (to) {
    return (
      <a href={to} className={btnClass} {...props}>
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <a href={href} className={btnClass} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={btnClass} onClick={onClick} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
};

export const DriftButtons = {
  // ============================================
  // View Details / Post
  // ============================================
  ViewDetails: ({ slug, size = 'md', label = 'View Post', className = '', ...props }) => (
    <BaseButton
      to={getDetailRoute('drift', slug)}
      variant="drift"
      size={size}
      icon={<FaInfoCircle />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Follow / Unfollow User
  // ============================================
  Follow: ({
    isFollowing = false,
    onToggle,
    size = 'md',
    className = '',
    label = 'Follow',
    ...props
  }) => (
    <BaseButton
      variant={isFollowing ? 'follow-active' : 'follow'}
      size={size}
      icon={isFollowing ? <FaUserCheck /> : <FaUserPlus />}
      onClick={onToggle}
      className={`${className} ${isFollowing ? 'active' : ''}`}
      {...props}
    >
      {isFollowing ? 'Following ✓' : label}
    </BaseButton>
  ),

  // ============================================
  // Like Post
  // ============================================
  Like: ({
    isLiked = false,
    count = 0,
    onToggle,
    size = 'md',
    className = '',
    label = 'Like',
    ...props
  }) => (
    <BaseButton
      variant={isLiked ? 'like-active' : 'like'}
      size={size}
      icon={<FaThumbsUp />}
      onClick={onToggle}
      className={`${className} ${isLiked ? 'active' : ''}`}
      {...props}
    >
      {count > 0 ? count : label}
    </BaseButton>
  ),

  // ============================================
  // Comment
  // ============================================
  Comment: ({
    count = 0,
    onClick,
    size = 'md',
    className = '',
    label = 'Comment',
    ...props
  }) => (
    <BaseButton
      variant="comment"
      size={size}
      icon={<FaComment />}
      onClick={onClick}
      className={className}
      {...props}
    >
      {count > 0 ? count : label}
    </BaseButton>
  ),

  // ============================================
  // Share Post
  // ============================================
  SharePost: ({
    onShare,
    size = 'md',
    label = 'Share',
    className = '',
    ...props
  }) => {
    const handleShare = () => {
      if (navigator.share) {
        navigator
          .share({
            title: 'Check out this post!',
            text: 'I found this amazing post on Drift Social',
            url: window.location.href,
          })
          .catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('Link copied to clipboard!');
        });
      }
      if (onShare) onShare();
    };

    return (
      <BaseButton
        variant="share"
        size={size}
        icon={<FaShare />}
        onClick={handleShare}
        className={className}
        {...props}
      >
        {label}
      </BaseButton>
    );
  },

  // ============================================
  // Save Post
  // ============================================
  SavePost: ({
    isSaved = false,
    onToggle,
    size = 'md',
    className = '',
    label = 'Save',
    ...props
  }) => (
    <BaseButton
      variant={isSaved ? 'save-active' : 'save'}
      size={size}
      icon={<FaBookmark />}
      onClick={onToggle}
      className={`${className} ${isSaved ? 'active' : ''}`}
      {...props}
    >
      {isSaved ? 'Saved ✓' : label}
    </BaseButton>
  ),

  // ============================================
  // Report
  // ============================================
  Report: ({
    onReport,
    size = 'md',
    className = '',
    label = 'Report',
    ...props
  }) => (
    <BaseButton
      variant="report"
      size={size}
      icon={<FaFlag />}
      onClick={onReport}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Create Post
  // ============================================
  CreatePost: ({
    onClick,
    size = 'md',
    className = '',
    label = 'Create Post',
    ...props
  }) => (
    <BaseButton
      variant="create"
      size={size}
      icon={<FaPlusCircle />}
      onClick={onClick}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Edit Post
  // ============================================
  EditPost: ({
    onClick,
    size = 'md',
    className = '',
    label = 'Edit',
    ...props
  }) => (
    <BaseButton
      variant="edit"
      size={size}
      icon={<FaEdit />}
      onClick={onClick}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Delete Post
  // ============================================
  DeletePost: ({
    onDelete,
    size = 'md',
    className = '',
    label = 'Delete',
    ...props
  }) => (
    <BaseButton
      variant="delete"
      size={size}
      icon={<FaTrash />}
      onClick={onDelete}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Join Community
  // ============================================
  JoinCommunity: ({
    isJoined = false,
    onToggle,
    size = 'md',
    className = '',
    label = 'Join Community',
    ...props
  }) => (
    <BaseButton
      variant={isJoined ? 'join-active' : 'join'}
      size={size}
      icon={isJoined ? <FaUserCheck /> : <FaUsers />}
      onClick={onToggle}
      className={`${className} ${isJoined ? 'active' : ''}`}
      {...props}
    >
      {isJoined ? 'Joined ✓' : label}
    </BaseButton>
  ),

  // ============================================
  // Follow Topic / Hashtag
  // ============================================
  FollowTopic: ({
    isFollowing = false,
    onToggle,
    size = 'md',
    className = '',
    label = 'Follow Topic',
    ...props
  }) => (
    <BaseButton
      variant={isFollowing ? 'follow-active' : 'follow-topic'}
      size={size}
      icon={isFollowing ? <FaUserCheck /> : <FaRocket />}
      onClick={onToggle}
      className={`${className} ${isFollowing ? 'active' : ''}`}
      {...props}
    >
      {isFollowing ? 'Following ✓' : label}
    </BaseButton>
  ),

  // ============================================
  // Notifications
  // ============================================
  Notifications: ({
    count = 0,
    onClick,
    size = 'md',
    className = '',
    label = 'Notifications',
    ...props
  }) => (
    <BaseButton
      variant="notification"
      size={size}
      icon={<FaBell />}
      onClick={onClick}
      className={className}
      {...props}
    >
      {count > 0 ? `${count}` : label}
    </BaseButton>
  ),

  // ============================================
  // Award / Badge
  // ============================================
  Award: ({
    onClick,
    size = 'md',
    className = '',
    label = 'Award',
    ...props
  }) => (
    <BaseButton
      variant="award"
      size={size}
      icon={<FaCrown />}
      onClick={onClick}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),
};

export default DriftButtons;