// src/app/[lang]/(public)/[username]/page.jsx
import { notFound } from "next/navigation";
import PublicProfile from "@/features/public_profile/PublicProfile";
import { getUserByUsername } from "@/features/public_profile/data/users";

export default async function PublicProfilePage({ params }) {
  const { username } = await params;
  
  // The username from URL already has dots, use it directly
  const user = getUserByUsername(username);

  if (!user) {
    notFound();
  }

  return <PublicProfile user={user} />;
}