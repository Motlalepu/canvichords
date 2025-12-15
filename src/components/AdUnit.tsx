import React, { useEffect } from "react";

interface AdUnitProps {
  slot: string; // Google AdSense slot ID (e.g., "1234567890")
  format: "horizontal" | "vertical" | "sidebar"; // Ad format
  style?: React.CSSProperties; // Optional custom styles
}

/**
 * AdUnit Component
 *
 * Renders a Google AdSense ad unit container.
 * The actual ad content is injected by the Google AdSense script.
 *
 * Props:
 * - slot: AdSense slot ID (empty string for now, to be filled with your ID)
 * - format: "horizontal" (728x90 or 300x600), "vertical" (300x600), "sidebar" (300x600)
 * - style: Optional custom CSS styles
 *
 * Usage:
 * <AdUnit slot="1234567890" format="horizontal" />
 */
const AdUnit: React.FC<AdUnitProps> = ({ slot, format, style }) => {
  useEffect(() => {
    // When the component mounts, push the ad to Google AdSense if the script is loaded
    if (typeof window !== "undefined" && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      } catch (e) {
        // AdSense script might not be loaded yet, which is fine
        console.debug("AdSense script not loaded yet");
      }
    }
  }, [slot]);

  // Determine dimensions based on format
  const getDimensions = () => {
    switch (format) {
      case "horizontal":
        return {
          width: "100%",
          minHeight: "90px", // 728x90 or 300x250
          maxWidth: "728px",
        };
      case "vertical":
        return {
          width: "300px",
          height: "600px",
        };
      case "sidebar":
        return {
          width: "300px",
          minHeight: "600px",
          display: "flex",
          justifyContent: "center",
        };
      default:
        return {
          width: "100%",
          minHeight: "90px",
        };
    }
  };

  // Don't render ad unit if slot is empty (prevents errors from invalid slots)
  if (!slot) {
    return (
      <div
        className="bg-muted/20 border border-dashed border-muted-foreground/20 rounded flex items-center justify-center"
        style={{
          ...getDimensions(),
          ...style,
        }}
      >
        <p className="text-xs text-muted-foreground text-center px-2">
          Ad Unit (Slot ID to be configured)
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        ...getDimensions(),
        ...style,
      }}
      className="ad-container"
    >
      {/* 
        Google AdSense script in index.html will automatically find this element
        and inject the ad. Structure:
        
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
             data-ad-slot="SLOT_ID_HERE"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      */}
      {/* Your AdSense client ID (ca-pub-...) goes in data-ad-client below */}
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          ...getDimensions(),
          ...style,
        }}
        data-ad-client=""
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdUnit;
