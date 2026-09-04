import React from "react";

export function JsonLdSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "EventPlanner",
    name: "Eden & Blooms",
    image: "https://edenandblooms.com/assets/hero_u_ring.jpg",
    logo: "https://edenandblooms.com/assets/logo.png",
    description:
      "Affordable and thoughtful event decor for weddings, birthdays, anniversaries, and corporate celebrations. Custom U-shaped ring setups, balloon & floral arches, and personalized backdrops.",
    url: "https://edenandblooms.com",
    telephone: "+918248604075",
    email: "edenandblooms@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    priceRange: "₹₹",
    sameAs: [
      "https://www.instagram.com/eden.and.blooms",
      "https://www.facebook.com/profile.php?id=61590282037328",
    ],
    knowsAbout: [
      "Event Decor",
      "Balloon Decor",
      "Floral Arches",
      "Wedding Stage Decoration",
      "Birthday Party Backdrops",
      "Custom Rings & Backdrops",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
