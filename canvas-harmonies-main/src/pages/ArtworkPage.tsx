import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import ArtworkView from "@/components/gallery/ArtworkView";
import { getArtworkById } from "@/data/artworks";

const ArtworkPage = () => {
  const { id } = useParams<{ id: string }>();
  const artwork = id ? getArtworkById(id) : undefined;

  if (!artwork) {
    return <Navigate to="/gallery" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ArtworkView artwork={artwork} />
    </div>
  );
};

export default ArtworkPage;
