export type CollectionId = "traditional-wear" | "asoebi" | "wedding-gowns";

export interface CollectionItem {
  id: string;
  name: string;
  tag: string;
  image: string;
  attribution: string;
  collectionId: CollectionId;
}

export const collectionItems: CollectionItem[] = [
  // ── Traditional Wear ──────────────────────────────────────
  {
    id: "trad-1",
    name: "The Ankara Royale",
    tag: "Ankara · Full Outfit",
    image: "https://images.pexels.com/photos/20370167/pexels-photo-20370167.jpeg",
    attribution: "Ozichi Ogbu on Pexels",
    collectionId: "traditional-wear",
  },
  {
    id: "trad-2",
    name: "Heritage Kaftan",
    tag: "Kaftan · Bespoke",
    image: "https://images.pexels.com/photos/34249461/pexels-photo-34249461.jpeg",
    attribution: "Ab Pixels on Pexels",
    collectionId: "traditional-wear",
  },
  {
    id: "trad-3",
    name: "Celebration Attire",
    tag: "Ankara · Accessories",
    image: "https://images.pexels.com/photos/32703124/pexels-photo-32703124.jpeg",
    attribution: "Okiki Onipede on Pexels",
    collectionId: "traditional-wear",
  },
  {
    id: "trad-4",
    name: "Blush Ankara Set",
    tag: "Ankara · Two-Piece",
    image: "https://images.pexels.com/photos/33939066/pexels-photo-33939066.jpeg",
    attribution: "real gayu on Pexels",
    collectionId: "traditional-wear",
  },

  // ── Asoebi ────────────────────────────────────────────────
  {
    id: "asoebi-1",
    name: "Violet Lace Asoebi",
    tag: "Lace · Ceremony",
    image: "https://images.pexels.com/photos/32927397/pexels-photo-32927397.jpeg",
    attribution: "Abdulkadir Muhammad Sani on Pexels",
    collectionId: "asoebi",
  },
  {
    id: "asoebi-2",
    name: "Burgundy Ceremony Gown",
    tag: "Lace · Wedding Guest",
    image: "https://images.pexels.com/photos/29997421/pexels-photo-29997421.jpeg",
    attribution: "Khaliifah Hussein on Pexels",
    collectionId: "asoebi",
  },
  {
    id: "asoebi-3",
    name: "Powder Blue Asoebi",
    tag: "Tulle · Ceremony",
    image: "https://images.pexels.com/photos/31683727/pexels-photo-31683727.jpeg",
    attribution: "beelal.ng on Pexels",
    collectionId: "asoebi",
  },
  {
    id: "asoebi-4",
    name: "Turquoise Gele Set",
    tag: "Aso-oke · Full Set",
    image: "https://images.pexels.com/photos/32873419/pexels-photo-32873419.jpeg",
    attribution: "Matazu Multimedia on Pexels",
    collectionId: "asoebi",
  },

  // ── Wedding Gowns ─────────────────────────────────────────
  {
    id: "wedding-1",
    name: "Ivory Lace Bridal Gown",
    tag: "Lace · Bridal",
    image: "https://images.pexels.com/photos/30554065/pexels-photo-30554065.jpeg",
    attribution: "KOPIKO_EFFECT Austin Akputu on Pexels",
    collectionId: "wedding-gowns",
  },
  {
    id: "wedding-2",
    name: "Sequin Statement Gown",
    tag: "Sequin · Statement",
    image: "https://images.pexels.com/photos/31465386/pexels-photo-31465386.jpeg",
    attribution: "IB SHOT Photography on Pexels",
    collectionId: "wedding-gowns",
  },
  {
    id: "wedding-3",
    name: "Classic Cathedral Gown",
    tag: "Lace · Cathedral Train",
    image: "https://images.pexels.com/photos/31493789/pexels-photo-31493789.jpeg",
    attribution: "Milly Lavish on Pexels",
    collectionId: "wedding-gowns",
  },
  {
    id: "wedding-4",
    name: "Beaded Corset Gown",
    tag: "Beadwork · Couture",
    image: "https://images.pexels.com/photos/20091882/pexels-photo-20091882.jpeg",
    attribution: "Browne and Dixon Photography on Pexels",
    collectionId: "wedding-gowns",
  },
];
