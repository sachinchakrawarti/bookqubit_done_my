// src/app/[lang]/(public)/[username]/page.jsx
import { notFound } from "next/navigation";
import PublicProfile from "@/features/public_profile/PublicProfile";
import { getUserByUsername, getAllUsernames } from "@/data/dummyusers/dummyusers";

export default async function PublicProfilePage({ params }) {
  const { username } = await params;
  
  // The username from URL already has dots, use it directly
  const user = getUserByUsername(username);

  if (!user) {
    notFound();
  }

  return <PublicProfile user={user} />;
}

// Generate static paths for all 10 users at build time
export async function generateStaticParams() {
  const usernames = getAllUsernames();
  const languages = ['en']; // Add other languages as needed
  
  const paths = [];
  for (const lang of languages) {
    for (const username of usernames) {
      paths.push({ lang, username });
    }
  }
  
  return paths;
}