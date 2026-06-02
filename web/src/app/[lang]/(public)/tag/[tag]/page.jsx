import TagDetails from "@/features/tag/TagDetails";

export default function TagDetailsPage({ params }) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  
  return <TagDetails tagName={decodedTag} />;
}