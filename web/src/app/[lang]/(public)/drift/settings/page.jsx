"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaUser,
  FaBell,
  FaLock,
  FaPalette,
  FaLanguage,
  FaGlobe,
  FaMoon,
  FaSun,
  FaMobileAlt,
  FaEnvelope,
  FaUserCircle,
  FaCamera,
  FaCheck,
  FaShieldAlt,
  FaEye,
  FaTrash,
  FaSignOutAlt,
  FaBook,
  FaUsers,
  FaHeart,
  FaComment,
  FaStar,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DriftSettingsPage() {
  const { lang } = useParams();
  const router = useRouter();
  const { theme, themeName, setTheme } = useTheme();
  const { currentFont } = useFont();
  const { language, setLanguage } = useLanguage();
  
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // User settings state
  const [userSettings, setUserSettings] = useState({
    // Profile
    displayName: "Alex Kumar",
    username: "@alex_reader",
    bio: "Book lover | Reading enthusiast | Drift community member",
    email: "alex@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    birthday: "1995-06-15",
    gender: "Male",
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    mentionNotifications: true,
    newFollowerNotifications: true,
    bookRecommendations: true,
    communityUpdates: false,
    
    // Privacy
    profileVisibility: "public", // public, friends, private
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowTagging: true,
    allowMessages: "everyone", // everyone, friends, nobody
    readReceipts: true,
    showActivityStatus: true,
    
    // Appearance
    theme: themeName,
    fontSize: "medium", // small, medium, large
    compactMode: false,
    reduceAnimations: false,
    
    // Language
    appLanguage: language,
    contentLanguage: "en",
    translateMessages: false,
    
    // Social
    linkedAccounts: {
      google: true,
      facebook: false,
      twitter: false,
    },
  });

  const [tempSettings, setTempSettings] = useState(userSettings);
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  // Handle save settings
  const handleSaveSettings = () => {
    setUserSettings(tempSettings);
    setIsEditing(false);
    // Here you would save to backend
    alert("Settings saved successfully!");
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setTempSettings(userSettings);
    setIsEditing(false);
  };

  // Handle image upload
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "avatar") {
          setAvatar(reader.result);
        } else {
          setCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logout
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      // Here you would handle logout logic
      router.push(`/${lang}`);
    }
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    if (confirm("Are you absolutely sure? This action cannot be undone!")) {
      // Here you would handle account deletion
      router.push(`/${lang}`);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "privacy", label: "Privacy", icon: <FaLock /> },
    { id: "appearance", label: "Appearance", icon: <FaPalette /> },
    { id: "language", label: "Language", icon: <FaLanguage /> },
    { id: "social", label: "Social", icon: <FaUsers /> },
  ];

  return (
    <div 
      className={`${theme.background?.section || "bg-gray-50 dark:bg-gray-900"} min-h-screen`}
      style={{ fontFamily: currentFont?.family }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} border-b ${theme.border?.default || "border-gray-200 dark:border-gray-700"} px-4 py-3 sticky top-0 z-10`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
            >
              <FaArrowLeft className={`${theme.iconColors?.primary || "text-gray-600 dark:text-gray-400"}`} />
            </button>
            <h1 className={`text-xl font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}>
              Settings
            </h1>
            {isEditing && (
              <div className="ml-auto flex gap-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-3 py-1 text-sm bg-sky-500 text-white rounded-lg hover:bg-sky-600"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar Tabs */}
          <div className={`md:w-64 ${theme.background?.card || "bg-white dark:bg-gray-800"} md:border-r ${theme.border?.default || "border-gray-200 dark:border-gray-700"}`}>
            <div className="p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    activeTab === tab.id
                      ? "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400"
                      : `hover:bg-gray-100 dark:hover:bg-gray-700 ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
              
              {/* Logout Button */}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 md:p-6">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className={`text-lg font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-4`}>
                    Profile Settings
                  </h2>
                  
                  {/* Cover & Avatar */}
                  <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} rounded-lg overflow-hidden mb-6`}>
                    <div className="relative h-32 bg-gradient-to-r from-sky-500 to-indigo-500">
                      {coverImage && (
                        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                      )}
                      <label className="absolute bottom-2 right-2 p-1 bg-black/50 rounded-full cursor-pointer hover:bg-black/70">
                        <FaCamera className="text-white text-sm" />
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "cover")} />
                      </label>
                    </div>
                    <div className="relative px-4 pb-4">
                      <div className="absolute -top-12 left-4">
                        <div className="relative">
                          {avatar ? (
                            <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover" />
                          ) : (
                            <FaUserCircle className="w-24 h-24 text-gray-400 bg-white dark:bg-gray-800 rounded-full" />
                          )}
                          <label className="absolute bottom-0 right-0 p-1 bg-sky-500 rounded-full cursor-pointer">
                            <FaCamera className="text-white text-xs" />
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "avatar")} />
                          </label>
                        </div>
                      </div>
                      <div className="mt-14 space-y-3">
                        <div>
                          <label className={`block text-sm font-medium ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"} mb-1`}>
                            Display Name
                          </label>
                          <input
                            type="text"
                            value={tempSettings.displayName}
                            onChange={(e) => setTempSettings({...tempSettings, displayName: e.target.value})}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 ${theme.background?.input || "bg-gray-50 dark:bg-gray-700"} ${theme.textColors?.primary || "text-gray-900 dark:text-white"} rounded-lg border ${theme.border?.default || "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-sky-500 ${!isEditing && "opacity-75"}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"} mb-1`}>
                            Username
                          </label>
                          <input
                            type="text"
                            value={tempSettings.username}
                            onChange={(e) => setTempSettings({...tempSettings, username: e.target.value})}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 ${theme.background?.input || "bg-gray-50 dark:bg-gray-700"} ${theme.textColors?.primary || "text-gray-900 dark:text-white"} rounded-lg border ${theme.border?.default || "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-sky-500 ${!isEditing && "opacity-75"}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"} mb-1`}>
                            Bio
                          </label>
                          <textarea
                            rows="3"
                            value={tempSettings.bio}
                            onChange={(e) => setTempSettings({...tempSettings, bio: e.target.value})}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 ${theme.background?.input || "bg-gray-50 dark:bg-gray-700"} ${theme.textColors?.primary || "text-gray-900 dark:text-white"} rounded-lg border ${theme.border?.default || "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-sky-500 ${!isEditing && "opacity-75"}`}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-sm font-medium ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"} mb-1`}>
                              Email
                            </label>
                            <input
                              type="email"
                              value={tempSettings.email}
                              onChange={(e) => setTempSettings({...tempSettings, email: e.target.value})}
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 ${theme.background?.input || "bg-gray-50 dark:bg-gray-700"} ${theme.textColors?.primary || "text-gray-900 dark:text-white"} rounded-lg border ${theme.border?.default || "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-sky-500 ${!isEditing && "opacity-75"}`}
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"} mb-1`}>
                              Phone
                            </label>
                            <input
                              type="tel"
                              value={tempSettings.phone}
                              onChange={(e) => setTempSettings({...tempSettings, phone: e.target.value})}
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 ${theme.background?.input || "bg-gray-50 dark:bg-gray-700"} ${theme.textColors?.primary || "text-gray-900 dark:text-white"} rounded-lg border ${theme.border?.default || "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-sky-500 ${!isEditing && "opacity-75"}`}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-sm font-medium ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"} mb-1`}>
                              Location
                            </label>
                            <input
                              type="text"
                              value={tempSettings.location}
                              onChange={(e) => setTempSettings({...tempSettings, location: e.target.value})}
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 ${theme.background?.input || "bg-gray-50 dark:bg-gray-700"} ${theme.textColors?.primary || "text-gray-900 dark:text-white"} rounded-lg border ${theme.border?.default || "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-sky-500 ${!isEditing && "opacity-75"}`}
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"} mb-1`}>
                              Birthday
                            </label>
                            <input
                              type="date"
                              value={tempSettings.birthday}
                              onChange={(e) => setTempSettings({...tempSettings, birthday: e.target.value})}
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 ${theme.background?.input || "bg-gray-50 dark:bg-gray-700"} ${theme.textColors?.primary || "text-gray-900 dark:text-white"} rounded-lg border ${theme.border?.default || "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-sky-500 ${!isEditing && "opacity-75"}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div>
                <h2 className={`text-lg font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-4`}>
                  Notification Preferences
                </h2>
                <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} rounded-lg divide-y ${theme.border?.default || "divide-gray-200 dark:divide-gray-700"}`}>
                  {[
                    { key: "emailNotifications", label: "Email Notifications", icon: <FaEnvelope /> },
                    { key: "pushNotifications", label: "Push Notifications", icon: <FaMobileAlt /> },
                    { key: "messageNotifications", label: "Message Notifications", icon: <FaComment /> },
                    { key: "mentionNotifications", label: "Mentions", icon: <FaAtSign /> },
                    { key: "newFollowerNotifications", label: "New Followers", icon: <FaUsers /> },
                    { key: "bookRecommendations", label: "Book Recommendations", icon: <FaBook /> },
                    { key: "communityUpdates", label: "Community Updates", icon: <FaGlobe /> },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <span className={`${theme.iconColors?.secondary || "text-gray-500"}`}>
                          {item.icon}
                        </span>
                        <span className={`${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}>
                          {item.label}
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempSettings[item.key]}
                          onChange={(e) => setTempSettings({...tempSettings, [item.key]: e.target.checked})}
                          className="sr-only peer"
                          disabled={!isEditing}
                        />
                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div>
                <h2 className={`text-lg font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-4`}>
                  Privacy & Security
                </h2>
                <div className="space-y-4">
                  <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} rounded-lg p-4`}>
                    <h3 className={`font-medium ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-3`}>
                      Profile Visibility
                    </h3>
                    <div className="space-y-2">
                      {["public", "friends", "private"].map((option) => (
                        <label key={option} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value={option}
                            checked={tempSettings.profileVisibility === option}
                            onChange={(e) => setTempSettings({...tempSettings, profileVisibility: e.target.value})}
                            disabled={!isEditing}
                            className="text-sky-500 focus:ring-sky-500"
                          />
                          <span className={`${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"} capitalize`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} rounded-lg p-4`}>
                    <h3 className={`font-medium ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-3`}>
                      Who can message me?
                    </h3>
                    <div className="space-y-2">
                      {["everyone", "friends", "nobody"].map((option) => (
                        <label key={option} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="allowMessages"
                            value={option}
                            checked={tempSettings.allowMessages === option}
                            onChange={(e) => setTempSettings({...tempSettings, allowMessages: e.target.value})}
                            disabled={!isEditing}
                            className="text-sky-500 focus:ring-sky-500"
                          />
                          <span className={`${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"} capitalize`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} rounded-lg p-4 space-y-3`}>
                    {[
                      { key: "showEmail", label: "Show my email address" },
                      { key: "showPhone", label: "Show my phone number" },
                      { key: "showLocation", label: "Show my location" },
                      { key: "allowTagging", label: "Allow others to tag me" },
                      { key: "readReceipts", label: "Send read receipts" },
                      { key: "showActivityStatus", label: "Show when I'm active" },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center justify-between">
                        <span className={`${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}>
                          {item.label}
                        </span>
                        <input
                          type="checkbox"
                          checked={tempSettings[item.key]}
                          onChange={(e) => setTempSettings({...tempSettings, [item.key]: e.target.checked})}
                          disabled={!isEditing}
                          className="w-4 h-4 text-sky-500 focus:ring-sky-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div>
                <h2 className={`text-lg font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-4`}>
                  Appearance
                </h2>
                <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} rounded-lg divide-y ${theme.border?.default || "divide-gray-200 dark:divide-gray-700"}`}>
                  <div className="p-4">
                    <label className={`block text-sm font-medium ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"} mb-2`}>
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["light", "dark", "midnight", "cyberpunk"].map((themeName) => (
                        <button
                          key={themeName}
                          onClick={() => {
                            setTempSettings({...tempSettings, theme: themeName});
                            setTheme(themeName);
                          }}
                          className={`p-2 rounded-lg border capitalize ${
                            tempSettings.theme === themeName
                              ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            {themeName === "light" && <FaSun className="text-yellow-500" />}
                            {themeName === "dark" && <FaMoon className="text-gray-500" />}
                            {themeName === "midnight" && <FaMoon className="text-indigo-500" />}
                            {themeName === "cyberpunk" && <FaStar className="text-pink-500" />}
                            <span className="text-xs capitalize">{themeName}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4">
                    <label className={`block text-sm font-medium ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"} mb-2`}>
                      Font Size
                    </label>
                    <div className="flex gap-3">
                      {["small", "medium", "large"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setTempSettings({...tempSettings, fontSize: size})}
                          className={`px-3 py-1 rounded-lg border capitalize ${
                            tempSettings.fontSize === size
                              ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    {[
                      { key: "compactMode", label: "Compact mode (denser layout)" },
                      { key: "reduceAnimations", label: "Reduce animations" },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center justify-between">
                        <span className={`${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}>
                          {item.label}
                        </span>
                        <input
                          type="checkbox"
                          checked={tempSettings[item.key]}
                          onChange={(e) => setTempSettings({...tempSettings, [item.key]: e.target.checked})}
                          className="w-4 h-4 text-sky-500 focus:ring-sky-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Language Settings */}
            {activeTab === "language" && (
              <div>
                <h2 className={`text-lg font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-4`}>
                  Language Preferences
                </h2>
                <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} rounded-lg p-4 space-y-4`}>
                  <div>
                    <label className={`block text-sm font-medium ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"} mb-2`}>
                      App Language
                    </label>
                    <select
                      value={tempSettings.appLanguage}
                      onChange={(e) => {
                        setTempSettings({...tempSettings, appLanguage: e.target.value});
                        setLanguage(e.target.value);
                      }}
                      className={`w-full px-3 py-2 ${theme.background?.input || "bg-gray-50 dark:bg-gray-700"} rounded-lg border ${theme.border?.default || "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="bn">Bengali</option>
                      <option value="te">Telugu</option>
                      <option value="mr">Marathi</option>
                      <option value="ta">Tamil</option>
                      <option value="ur">Urdu</option>
                      <option value="gu">Gujarati</option>
                      <option value="kn">Kannada</option>
                      <option value="ml">Malayalam</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"} mb-2`}>
                      Content Language
                    </label>
                    <select
                      value={tempSettings.contentLanguage}
                      onChange={(e) => setTempSettings({...tempSettings, contentLanguage: e.target.value})}
                      className={`w-full px-3 py-2 ${theme.background?.input || "bg-gray-50 dark:bg-gray-700"} rounded-lg border ${theme.border?.default || "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="bn">Bengali</option>
                      <option value="te">Telugu</option>
                      <option value="mr">Marathi</option>
                    </select>
                  </div>

                  <label className="flex items-center justify-between">
                    <span className={`${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}>
                      Auto-translate messages
                    </span>
                    <input
                      type="checkbox"
                      checked={tempSettings.translateMessages}
                      onChange={(e) => setTempSettings({...tempSettings, translateMessages: e.target.checked})}
                      className="w-4 h-4 text-sky-500 focus:ring-sky-500"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Social Settings */}
            {activeTab === "social" && (
              <div>
                <h2 className={`text-lg font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-4`}>
                  Connected Accounts
                </h2>
                <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} rounded-lg divide-y ${theme.border?.default || "divide-gray-200 dark:divide-gray-700"}`}>
                  {[
                    { key: "google", label: "Google", icon: "G" },
                    { key: "facebook", label: "Facebook", icon: "f" },
                    { key: "twitter", label: "Twitter", icon: "X" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center font-bold">
                          {item.icon}
                        </div>
                        <span className={`${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}>
                          {item.label}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          // Handle connect/disconnect
                        }}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          tempSettings.linkedAccounts[item.key]
                            ? "bg-red-100 text-red-600 dark:bg-red-900/20"
                            : "bg-sky-100 text-sky-600 dark:bg-sky-900/20"
                        }`}
                      >
                        {tempSettings.linkedAccounts[item.key] ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Danger Zone */}
                <div className="mt-6">
                  <h3 className={`text-lg font-semibold text-red-600 mb-3`}>Danger Zone</h3>
                  <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} rounded-lg border border-red-200 dark:border-red-800 p-4`}>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700"
                    >
                      <FaTrash />
                      <span>Delete Account</span>
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      This action cannot be undone. All your data will be permanently deleted.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} rounded-lg max-w-md w-full p-6`}>
            <h3 className={`text-lg font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-2`}>
              Delete Account?
              </h3>
            <p className={`${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"} mb-4 text-sm`}>
              Are you absolutely sure? This action cannot be undone and all your data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper icon component
const FaAtSign = () => <span>@</span>;