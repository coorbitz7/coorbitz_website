export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "What does it cost to work with you?",
    answer:
      "It depends on scope, and we won't guess before understanding the problem. After a first conversation we'll tell you whether it looks like a small fixed-scope project, a phased build or an ongoing engagement, with a range for each before you commit to anything.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Small websites and automations are usually a matter of weeks; platforms and AI systems take months and are delivered in stages so you get something useful early. We agree a realistic plan in the Architect step rather than promising a date on day one.",
  },
  {
    question: "Do you work with small businesses, or only larger companies?",
    answer:
      "Mostly startups and growing businesses, plus the internal systems that run our parent company's trading operations. If you've outgrown spreadsheets but aren't ready for enterprise software, that's the work we know best.",
  },
  {
    question: "Can you add AI to something we already use?",
    answer:
      "Yes, and that's most of our AI work. We integrate with your existing products, databases and workflows rather than replacing them, and we'll tell you honestly when a simpler, non-AI approach will do the job.",
  },
  {
    question: "Where is your team?",
    answer:
      "Coorbitz is the technology brand of Coordinatez, headquartered in Chicago, Illinois, with our engineering team in Mehsana, Gujarat, India. We work across US and Indian hours.",
  },
  {
    question: "Who owns the code and the accounts?",
    answer:
      "You do. Source code, hosting, domains and third-party accounts are set up in your name from the start, so you're never dependent on us to keep the lights on.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We stay on to monitor, fix and improve, either as a support arrangement or as the next stage of the build. Nothing goes live without documentation and a proper handover.",
  },
];
