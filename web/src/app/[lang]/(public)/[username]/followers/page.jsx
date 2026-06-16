// src/app/[lang]/(public)/[username]/followers/page.jsx
import { notFound } from "next/navigation";
import { getUserByUsername } from "@/features/public_profile/data/users";

export default async function FollowersPage({ params }) {
  const { username } = await params;
  const user = getUserByUsername(username);

  if (!user) {
    notFound();
  }

  // Mock followers list - replace with actual API call
  const followersList = [
    { id: 4, name: "Ishani Krishna", username: "ishani._.krishna", avatar: "https://ui-avatars.com/api/?name=Ishani+Krishna&background=ef4444&color=fff&size=80" },
    { id: 5, name: "Hania Amir", username: "hania._.amir", avatar: "https://ui-avatars.com/api/?name=Hania+Amir&background=ec4899&color=fff&size=80" },
  ];

  return (
    <div className="follow-page">
      <div className="follow-page-header">
        <h1>Followers</h1>
        <p>@{user.username}</p>
      </div>
      <div className="follow-list">
        {followersList.map((follower) => (
          <a key={follower.id} href={`/${follower.username}`} className="follow-card">
            <img src={follower.avatar} alt={follower.name} />
            <div>
              <strong>{follower.name}</strong>
              <span>@{follower.username}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}