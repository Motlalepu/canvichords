const GalleryIntro = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              About the Gallery
            </p>
            <h2 className="text-gallery-heading text-5xl md:text-6xl lg:text-7xl">
              Where Art Meets Sound
            </h2>
          </div>

          <div className="space-y-6 text-gallery text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              Welcome to CANVICHORDS, a digital sanctuary where visual art and curated soundscapes 
              converge to create an immersive gallery experience. Our carefully selected collection 
              showcases contemporary artists pushing the boundaries of their mediums.
            </p>
            <p>
              Each piece is presented with the reverence it deserves—spacious, well-lit, and 
              accompanied by thoughtfully chosen ambient music that enhances your viewing experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryIntro;
