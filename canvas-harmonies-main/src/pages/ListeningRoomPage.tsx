import { useParams, Navigate } from "react-router-dom";
import ListeningRoom from "@/components/listening-room/ListeningRoom";
import { getArtworkById } from "@/data/artworks";

const ListeningRoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const artwork = id ? getArtworkById(id) : undefined;

  // Redirect if artwork not found or has no music video
  if (!artwork || !artwork.musicVideo) {
    return <Navigate to={artwork ? `/artwork/${artwork.id}` : "/gallery"} replace />;
  }

  return <ListeningRoom artwork={artwork} />;
};

export default ListeningRoomPage;
