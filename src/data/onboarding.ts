type Slide = {
  key: string;
  title: string;
  body: string;
  action?: string;
};

export const DISCORD_LINK = "https://europython.eu/discord";

export const onboardingSlides: Slide[] = [
  {
    key: "welcome",
    title: "Welcome to EuroPython",
    body: "We're excited to have you here! I'll be your companion during the week. Let's take a quick tour to get you started.",
  },
  {
    key: "overview",
    title: "Everything you need, in one place",
    body: "Browse the schedule, explore speakers, and create your personalized agenda with favourites.",
  },
  {
    key: "plan",
    title: "Plan your day",
    body: "Tap the star icons on sessions to add them to your personal agenda for easy access and reminders.",
  },
  {
    key: "notify",
    title: "Stay in the loop",
    body: "Get real-time updates and session reminders to make sure you don't miss a thing. Notifications are enabled by default.",
    action: "requestNotifications",
  },
  {
    key: "community",
    title: "Interact with the community",
    body: "Join our Discord server to connect with other attendees, ask questions, and share your experience.",
    action: "promptDiscord",
  },
  {
    key: "start",
    title: "Let's get started!",
    body: "You're all set, dive in and explore the app. If you need help, or just want to say hi, look for our amazing volunteers wearing yellow T-shirts.",
  },
];
