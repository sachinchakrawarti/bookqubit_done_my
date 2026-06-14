// src/app/[lang]/(public)/[username]/following/page.jsx
import { notFound } from "next/navigation";
import { getUserByUsername } from "@/features/public_profile/data/users";

export default async function FollowingPage({ params }) {
  const { username } = await params;
  const user = getUserByUsername(username);

  if (!user) {
    notFound();
  }

  // Mock following list - replace with actual API call
  const followingList = [
    { id: 2, name: "Sachin Chakrawarti", username: "sachin._.chakrawarti", avatar: "https://ui-avatars.com/api/?name=Sachin+Chakrawarti&background=3b82f6&color=fff&size=80" },
    { id: 3, name: "Shraddha Kapoor", username: "shraddha._.kapoor", avatar: "https://ui-avatars.com/api/?name=Shraddha+Kapoor&background=10b981&color=fff&size=80" },
  ];

  return (
    <div className="follow-page">
      <div className="follow-page-header">
        <h1>Following</h1>
        <p>@{user.username}</p>
      </div>
      <div className="follow-list">
        {followingList.map((follow) => (
          <a key={follow.id} href={`/${follow.username}`} className="follow-card">
            <img src={follow.avatar} alt={follow.name} />
            <div>
              <strong>{follow.name}</strong>
              <span>@{follow.username}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}