export const pricingPlans = [
  {
    name: "Free",
    description:
      "Basic features for individuals starting their AI career journey",
    price: {
      monthly: 0,
      annual: 0,
    },
    features: [
      "5 AI job applications per month",
      "Basic resume analysis",
      "Limited job recommendations",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "Advanced features for serious job seekers",
    price: {
      monthly: 19,
      annual: 190,
    },
    features: [
      "Unlimited AI job applications",
      "Advanced resume optimization",
      "Personalized job recommendations",
      "Interview preparation tools",
      "Priority email support",
      "Career progress tracking",
    ],
    cta: "Start Pro Plan",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Complete solution for teams and organizations",
    price: {
      monthly: 49,
      annual: 490,
    },
    features: [
      "Everything in Pro",
      "Team collaboration tools",
      "Dedicated account manager",
      "Custom AI training models",
      "API access",
      "Advanced analytics",
      "24/7 phone & email support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const faqs = [
  {
    question: "How does the AI job matching work?",
    answer:
      "Our AI analyzes your skills, experience, and preferences to match you with the most relevant job opportunities. The algorithm continuously learns from your interactions to improve recommendations over time.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit toward your next billing cycle.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, we offer a 14-day free trial for our Pro plan. No credit card is required to start your trial.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for annual enterprise plans.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your current billing period.",
  },
];
