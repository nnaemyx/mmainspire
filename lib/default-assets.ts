export const defaultAssets: Record<string, { label: string; group: string; defaultUrl: string }> = {
  "home-hero": {
    label: "Home Page - Hero Background",
    group: "Home Page",
    defaultUrl: "https://res.cloudinary.com/mmainspire/image/upload/v1698521215/mmainspire/kc3pudrbh3aij5i57ryk.jpg"
  },
  "home-about": {
    label: "Home Page - About Section",
    group: "Home Page",
    defaultUrl: "https://images.pexels.com/photos/14452561/pexels-photo-14452561.jpeg"
  },
  "home-enquiry": {
    label: "Home Page - Bottom Enquiry Background",
    group: "Home Page",
    defaultUrl: "https://images.pexels.com/photos/29447184/pexels-photo-29447184.jpeg"
  },
  "collection-card-traditional": {
    label: "Home Collection Card - Traditional Wear",
    group: "Home Page",
    defaultUrl: "https://images.pexels.com/photos/32703119/pexels-photo-32703119.jpeg"
  },
  "collection-card-asoebi": {
    label: "Home Collection Card - Asoebi",
    group: "Home Page",
    defaultUrl: "https://images.pexels.com/photos/12118377/pexels-photo-12118377.jpeg"
  },
  "collection-card-wedding": {
    label: "Home Collection Card - Wedding Gowns",
    group: "Home Page",
    defaultUrl: "https://images.pexels.com/photos/8271275/pexels-photo-8271275.jpeg"
  },
  "collections-page-trad-2": {
    label: "Collections Page - Traditional Wear Sub-image",
    group: "Collections Overview Page",
    defaultUrl: "https://images.pexels.com/photos/28733460/pexels-photo-28733460.jpeg"
  },
  "collections-page-asoebi-2": {
    label: "Collections Page - Asoebi Sub-image",
    group: "Collections Overview Page",
    defaultUrl: "https://images.pexels.com/photos/29046518/pexels-photo-29046518.jpeg"
  },
  "collections-page-wedding-2": {
    label: "Collections Page - Wedding Sub-image",
    group: "Collections Overview Page",
    defaultUrl: "https://images.pexels.com/photos/11086563/pexels-photo-11086563.jpeg"
  },
  "trad-wear-hero": {
    label: "Traditional Wear Page - Hero Background",
    group: "Traditional Wear Page",
    defaultUrl: "https://images.pexels.com/photos/32703119/pexels-photo-32703119.jpeg"
  },
  "trad-wear-cta": {
    label: "Traditional Wear Page - Bottom CTA Background",
    group: "Traditional Wear Page",
    defaultUrl: "https://images.pexels.com/photos/28733460/pexels-photo-28733460.jpeg"
  },
  "asoebi-hero": {
    label: "Asoebi Page - Hero Background",
    group: "Asoebi Page",
    defaultUrl: "https://images.pexels.com/photos/12118377/pexels-photo-12118377.jpeg"
  },
  "asoebi-cta": {
    label: "Asoebi Page - Bottom CTA Background",
    group: "Asoebi Page",
    defaultUrl: "https://images.pexels.com/photos/29046518/pexels-photo-29046518.jpeg"
  },
  "wedding-hero": {
    label: "Wedding Gowns Page - Hero Background",
    group: "Wedding Gowns Page",
    defaultUrl: "https://images.pexels.com/photos/8271275/pexels-photo-8271275.jpeg"
  },
  "wedding-cta": {
    label: "Wedding Gowns Page - Bottom CTA Background",
    group: "Wedding Gowns Page",
    defaultUrl: "https://images.pexels.com/photos/11086563/pexels-photo-11086563.jpeg"
  },
  "about-hero": {
    label: "About Page - Hero Background",
    group: "About Page",
    defaultUrl: "https://images.pexels.com/photos/29133855/pexels-photo-29133855.jpeg"
  },
  "about-story": {
    label: "About Page - Our Story Photo",
    group: "About Page",
    defaultUrl: "https://images.pexels.com/photos/16669744/pexels-photo-16669744.jpeg"
  },
  "about-ceo": {
    label: "About Page - CEO / Founder Portrait",
    group: "About Page",
    defaultUrl: ""
  },
  "about-cta": {
    label: "About Page - Bottom CTA Background",
    group: "About Page",
    defaultUrl: "https://images.pexels.com/photos/14452561/pexels-photo-14452561.jpeg"
  }
};

export function getAssetUrl(key: string, dbAssets: { key: string, imageUrl: string }[]) {
  const dbAsset = dbAssets.find(a => a.key === key);
  if (dbAsset && dbAsset.imageUrl) {
    return dbAsset.imageUrl;
  }
  return defaultAssets[key]?.defaultUrl || "";
}
