/**
 * =============================================================================
 * CANVICHORDS - Artwork Configuration
 * =============================================================================
 * 
 * HOW TO ADD NEW ARTWORKS:
 * 
 * 1. ADD YOUR IMAGE:
 *    - Place your image file in: src/assets/
 *    - Supported formats: .jpg, .jpeg, .png, .webp
 *    - Recommended size: 1200px+ on longest side for quality
 * 
 * 2. ADD YOUR AUDIO (Soundscape):
 *    - Option A: Use a URL to an MP3 file (external hosting)
 *    - Option B: Place audio in public/audio/ folder and use "/audio/filename.mp3"
 *    - Recommended: Ambient, calm music that loops well
 * 
 * 3. IMPORT YOUR IMAGE:
 *    - Add an import statement below (see examples)
 * 
 * 4. ADD ARTWORK ENTRY:
 *    - Copy an existing artwork object in the array
 *    - Fill in all required fields
 *    - Optional fields can be omitted
 * 
 * =============================================================================
 */

// =============================================================================
// IMAGE IMPORTS
// Add your image imports here. The variable name can be anything descriptive.
// =============================================================================
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";
import artwork5 from "@/assets/artwork-5.jpg";

// =============================================================================
// ARTWORK TYPE DEFINITION
// =============================================================================

export type ArtistType = "visual" | "musician" | "hybrid";

export interface Artwork {
  /** Unique URL-friendly identifier (lowercase, hyphens, no spaces) */
  id: string;
  /** Display title of the artwork */
  title: string;
  /** Artist's full name */
  artist: string;
  /** Artist type: visual, musician, or hybrid */
  artistType: ArtistType;
  /** Year created */
  year: number;
  /** Short description of the artwork (1-2 sentences) */
  description: string;
  /** Optional: Artist's statement about the work */
  artistStatement?: string;
  /** Imported image or URL path to the artwork image */
  image: string;
  /** URL or path to the ambient audio/soundscape (MP3 recommended) */
  soundscape: string;
  /** Optional: Physical dimensions (e.g., "120 × 180 cm") */
  dimensions?: string;
  /** Optional: Medium/materials used (e.g., "Oil on canvas") */
  medium?: string;
  /** Optional: Music video URL for the Listening Room (musicians/hybrids only) */
  musicVideo?: string;
}

// =============================================================================
// ARTWORK COLLECTION
// Add, edit, or remove artworks below. The order here determines gallery order.
// =============================================================================
export const artworks: Artwork[] = [
  // -------------------------------------------------------------------------
  // ARTWORK 1: Terracotta Flow
  // -------------------------------------------------------------------------
  {
    id: "terracotta-flow",
    title: "Untitled",
    artist: "Louie X",
    artistType: "hybrid",
    year: 2016,
    description: "A portait of a lady and a puppy",
    artistStatement: "This was a paid commission piece for a client who wanted a portrait of their dog along with them.",
    image: artwork1,
    soundscape: "https://res.cloudinary.com/dyvsfyaze/video/upload/v1770124116/Louie_X-_Cant_escape_Lion_Roar_Riddim_Prod_by_Taf_Lion_jbDJFzmlmXU_yg8eoh.mp3",
    dimensions: "120 × 180 cm",
    medium: "acyrlic on canvas",
    musicVideo: "https://res.cloudinary.com/dyvsfyaze/video/upload/v1770147780/10_Zambian_Songs_Written_By_Louie-X_pburwy.mp4"

  },

  // -------------------------------------------------------------------------
  // ARTWORK 2: Silent Waters
  // -------------------------------------------------------------------------
  {
    id: "silent-waters",
    title: "Untitled A",
    artist: "Letlhogonolo",
    artistType: "visual",
    year: 2023,
    description: "A expression of calm and serenity through cool blues and gentle brushstrokes. The composition invites viewers to lose themselves in tranquil reflections.",
    artistStatement: "This piece was inspired by the quiet moments of dawn and the way light dances on water.",
    image: artwork2,
    soundscape: "https://assets.mixkit.co/music/preview/mixkit-forest-treasure-702.mp3",
    dimensions: "100 × 125 cm",
    medium: "Acrylic and mist on canvas",
  },

  // -------------------------------------------------------------------------
  // ARTWORK 3: Geometric Dusk
  // -------------------------------------------------------------------------
  {
    id: "geometric-dusk",
    title: "Crotchet Hats",
    artist: "Yanga",
    artistType: "visual",
    year: 2024,
    description: " Crotchet hats arranged in a precise yet dynamic composition. The interplay of light and shadow creates a sense of depth and movement.",
    artistStatement: "I was inspired by the beauty of everyday objects and their potential to create harmony through geometry.",
    image: artwork3,
    soundscape: "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3",
    dimensions: "90 × 90 cm",
    medium: "wool and needle"
  },

  // -------------------------------------------------------------------------
  // ARTWORK 4: Ethereal Bloom
  // -------------------------------------------------------------------------
  {
    id: "raii",
    title: "Hop Hop Leave Me Not",
    artist: "Ra-I ",
    artistType: "hybrid",
    year: 2020,
    description: "Hip Hop Leave Me Not is a vibrant depiction of the journey to knwoing oneself through the lens of hip hop culture.",
    artistStatement: "This piece reflects my personal journey and the influence of hip hop on my identity.",
    image: artwork4,
    soundscape: "https://res.cloudinary.com/dyvsfyaze/video/upload/v1770124214/ELEMENT_Ft_RA_I_Big_Belly_Bufu_Initialed_Endee_Swanker_Teyise_Slim_Dojeur_MC_LA__J4ypHifmhI_fmnmpv.mp3",
    dimensions: "80 × 100 cm",
    medium: "Digital",
    musicVideo: "https://res.cloudinary.com/dyvsfyaze/video/upload/v1770123523/videoplayback_3_rk4d5w.mp4"
  },

  // -------------------------------------------------------------------------
  // ARTWORK 5: Ember Dance
  // -------------------------------------------------------------------------
  {
    id: "ember-dance",
    title: "Untitled B",
    artist: "Louie x",
    artistType: "hybrid",
    year: 2014,
    description: "Raw ",
    artistStatement: "I paint with urgency, letting the canvas receive whatever needs to emerge. This piece came from a place of transformation.",
    image: artwork5,
    soundscape: "https://assets.mixkit.co/music/preview/mixkit-sun-and-his-daughter-580.mp3",
    dimensions: "140 × 200 cm",
    medium: "Oil and mixed media"
  },


  // -------------------------------------------------------------------------
  // ADD YOUR ARTWORK HERE - Copy the template below and fill in your details
  // -------------------------------------------------------------------------
  /*
  {
    id: "your-artwork-id",           // URL-friendly: lowercase, hyphens only
    title: "Your Artwork Title",
    artist: "Artist Name",
    artistType: "visual",            // "visual" | "musician" | "hybrid"
    year: 2024,
    description: "A brief description of the artwork.",
    artistStatement: "Optional artist statement about the work.",  // Remove if not needed
    image: yourImportedImage,        // Use the variable name from your import
    soundscape: "https://example.com/your-audio.mp3",  // Or "/audio/local-file.mp3"
    dimensions: "100 × 100 cm",      // Remove if not needed
    medium: "Medium used",           // Remove if not needed
    musicVideo: "https://example.com/video.mp4"  // Optional: enables Listening Room
  },
  */
];

// =============================================================================
// HELPER FUNCTIONS (Do not modify)
// =============================================================================

export const getArtworkById = (id: string): Artwork | undefined => {
  return artworks.find(artwork => artwork.id === id);
};

export const getNextArtwork = (currentId: string): Artwork | undefined => {
  const currentIndex = artworks.findIndex(artwork => artwork.id === currentId);
  if (currentIndex === -1 || currentIndex === artworks.length - 1) {
    return artworks[0];
  }
  return artworks[currentIndex + 1];
};

export const getPreviousArtwork = (currentId: string): Artwork | undefined => {
  const currentIndex = artworks.findIndex(artwork => artwork.id === currentId);
  if (currentIndex === -1 || currentIndex === 0) {
    return artworks[artworks.length - 1];
  }
  return artworks[currentIndex - 1];
};
