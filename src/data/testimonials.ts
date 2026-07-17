// Placeholder testimonials — replace with real client quotes and headshots before launch.
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Coorbitz rebuilt our entire order platform in under three months and cut our page load times by more than half. Their team communicated like an in-house squad, not a vendor.",
    name: "Sarah Mitchell",
    role: "VP of Engineering",
    company: "Northfield Retail Group",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "The AI agent they built now handles nearly 40% of our support volume end-to-end. It paid for itself in the first quarter.",
    name: "David Chen",
    role: "Head of Customer Operations",
    company: "Vantage Logistics",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "We came in with a rough idea and left with a production-ready MVP investors actually understood. Coorbitz thinks like a product team, not just developers.",
    name: "Priya Nair",
    role: "Founder & CEO",
    company: "Lendly",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "Their cloud migration work cut our infrastructure spend by 30% while improving uptime. Meticulous planning and zero surprises.",
    name: "James O'Connor",
    role: "CTO",
    company: "Meridian Health Partners",
    rating: 5,
  },
];
