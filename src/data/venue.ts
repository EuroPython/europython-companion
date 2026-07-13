export type VenueImage = {
  source: number;
  /** Known pixel dimensions, so the lightbox can size itself without a runtime resolve. */
  width: number;
  height: number;
  accessibilityLabel: string;
  caption: string;
};

export type VenueFloor = {
  id: string;
  level: string;
  blurb: string;
  rooms: string[];
  plan: VenueImage;
};

export type AccessibilityItem = {
  icon: string;
  title: string;
  text: string;
};

export const ACCESSIBILITY_EMAIL = "accessibility@europython.eu";

// S1 (Auditorium Hall) and S2 (Theatre Hall) are multi-floor rooms — they
// physically span F0 through F3, which is why they appear on every floor's
// plan and room list below.
export const MULTI_FLOOR_ROOMS_NOTE =
  "S1 and S2 span multiple floors, so they appear on every level's plan.";

export const venueFloors: VenueFloor[] = [
  {
    id: "f0",
    level: "F0 — Ground floor",
    blurb: "Both entrances and registration.",
    rooms: [
      "Entrance #1 — main entrance (Barska Street), Wed–Fri",
      "Entrance #3 — tutorial days entrance (Bułhaka Street), Mon–Tue",
      "Registration & info desk — at Entrance #3 on tutorial days; on the right as you enter from Entrance #1 on conference days",
      "Exhibit Hall",
      "F0 (Glass Room) — session room",
      "Cloakroom",
      "First aid room & parent/child facility",
      "S1 and S2 (lower level)",
      "Lifts to every floor",
    ],
    plan: {
      source: require("../../assets/venue/floors/f0.webp"),
      width: 2573,
      height: 1819,
      accessibilityLabel:
        "Floor plan of ICE Kraków ground floor F0, showing entrances 1 and 3, registration, and the lower level of S1 and S2.",
      caption: "F0 — Ground floor",
    },
  },
  {
    id: "f1",
    level: "F1 — Level 1",
    blurb: "Mid level of S1 and S2.",
    rooms: [
      "S1 and S2 (mid level)",
      "Dressing rooms & office space",
      "Lifts to every floor",
    ],
    plan: {
      source: require("../../assets/venue/floors/f1.webp"),
      width: 2573,
      height: 1819,
      accessibilityLabel:
        "Floor plan of ICE Kraków level F1, showing the mid level of S1 and S2.",
      caption: "F1 — Level 1",
    },
  },
  {
    id: "f2",
    level: "F2 — Level 2",
    blurb: "Mid level of S1 and S2, plus F2 (Fishbowl Room) and Room 2.017/2.018.",
    rooms: [
      "S1 and S2 (mid level)",
      "F2 (Fishbowl Room) — session room",
      "Room 2.017/2.018 — session room",
      "Dressing Room 206 — prayer / meditation room",
      "Red VIP F2 — low-stimulation room",
      "Lifts to every floor",
    ],
    plan: {
      source: require("../../assets/venue/floors/f2.webp"),
      width: 2573,
      height: 1819,
      accessibilityLabel:
        "Floor plan of ICE Kraków level F2, showing Dressing Room 206 used as a prayer and meditation room, and the Red VIP low-stimulation room.",
      caption: "F2 — Level 2",
    },
  },
  {
    id: "f3",
    level: "F3 — Level 3",
    blurb: "Upper level of S1 and S2, plus S3, S4, and the quiet room.",
    rooms: [
      "S1 and S2 (upper level)",
      "S3A / S3B",
      "S4, S4A, S4B",
      "S4 (1, 2, 3) — open space",
      "S4 (4) — open space",
      "S4 (5) — open space",
      "S4(12) — Quiet room",
      "Press room",
      "Lifts to every floor",
    ],
    plan: {
      source: require("../../assets/venue/floors/f3.webp"),
      width: 2573,
      height: 1819,
      accessibilityLabel:
        "Floor plan of ICE Kraków level F3, showing S3A/S3B, the S4 rooms including open space rooms S4 (1,2,3), S4 (4), S4 (5), and quiet room S4(12), and the upper level of S1 and S2.",
      caption: "F3 — Level 3",
    },
  },
];

export const venueEntrances: VenueImage[] = [
  {
    source: require("../../assets/venue/tutorial-entrance.webp"),
    width: 852,
    height: 685,
    accessibilityLabel:
      "Map showing accessible Entrance number 3 on the West side of ICE Kraków, off Bułhaka Street, opposite the Park Inn Hotel — used on tutorial days.",
    caption: "Tutorial days (Mon–Tue): Entrance #3, off Bułhaka Street",
  },
  {
    source: require("../../assets/venue/main-entrance.webp"),
    width: 1776,
    height: 824,
    accessibilityLabel:
      "Map showing the accessible main entrance off Barska Street, step-free with a photo-cell activated door beside the revolving doors — used on conference days.",
    caption: "Conference days (Wed–Fri): main entrance, Barska Street",
  },
];

export const quietRoomImages: VenueImage[] = [
  {
    source: require("../../assets/venue/quiet-room-floor3.webp"),
    width: 2258,
    height: 1324,
    accessibilityLabel: "Floor 3 map showing the location of the quiet room, S4(12).",
    caption: "Quiet room location — level F3",
  },
  {
    source: require("../../assets/venue/quiet-room-s4-12.webp"),
    width: 451,
    height: 451,
    accessibilityLabel: "Detailed map of room S4(12), the quiet room.",
    caption: "Quiet room detail — S4(12)",
  },
];

export const accessibilityItems: AccessibilityItem[] = [
  {
    icon: "power-sleep",
    title: "Quiet room — S4(12), level F3",
    text: "A dedicated room for anyone who needs a break from noise and stimulation.",
  },
  {
    icon: "sofa-outline",
    title: "Low-stimulation room — Red VIP F2, level F2",
    text: "An empty, low-stimulation room away from the main halls.",
  },
  {
    icon: "meditation",
    title: "Prayer / meditation room — Dressing Room 206, level F2",
    text: "Available for prayer or quiet meditation throughout the conference.",
  },
  {
    icon: "human-wheelchair",
    title: "Accessible toilets",
    text: "On every floor. The ground floor (F0) has larger cabins, lower wash basins, and period products.",
  },
  {
    icon: "puzzle-outline",
    title: "Neurodiversity bags",
    text: "Bags with fidget items are available at the Info Desk.",
  },
  {
    icon: "baby-face-outline",
    title: "Childcare & breastfeeding",
    text: "Free childcare is provided during the main conference (Mon–Fri). There are no restrictions on where you can breastfeed.",
  },
  {
    icon: "food-apple-outline",
    title: "Dietary needs",
    text: "Allergens are marked and menus are provided daily.",
  },
  {
    icon: "ear-hearing-off",
    title: "Hearing & captioning",
    text: "No live captioning is available. Interpreters only if pre-arranged. No hearing aid induction loops — live streams have a delay.",
  },
  {
    icon: "email-outline",
    title: "Questions?",
    text: "Email the accessibility team or ask any volunteer on site.",
  },
];
