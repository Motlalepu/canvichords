import React from "react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PurchasePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-16 text-center">
        <h1 className="text-4xl mb-4">Purchases Removed</h1>
        <p className="mb-8">
          The marketplace no longer supports direct purchases. You can view
          artist portfolios and contact artists to arrange sales.
        </p>
        <Link to="/">
          <Button>Return to Gallery</Button>
        </Link>
      </main>
    </div>
  );
};

export default PurchasePage;
