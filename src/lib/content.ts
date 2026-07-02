/**
 * Page content for the marketing pages (services, FAQ).
 *
 * The copy here is written to be truthful for any professional painting and
 * decorating business. It intentionally avoids specifics that only the owner
 * can confirm (exact years in business, named paint brands, specific
 * guarantees, real customer names). Where a claim would need owner input it is
 * kept general. Do not add fabricated reviews, ratings, or credentials.
 */

export interface ServiceContent {
  slug: string;
  name: string;
  /** Short benefit-led sentence used for cards and meta descriptions. */
  summary: string;
  /** Pain-point opener shown at the top of the service page. */
  intro: string;
  /** What the service includes / the process. */
  included: string[];
  /** Supporting paragraphs. */
  body: string[];
}

export const servicesContent: ServiceContent[] = [
  {
    slug: "interior-painting",
    name: "Interior Painting",
    summary:
      "Clean, hard-wearing interior painting for walls, ceilings, and woodwork — with your home protected and left spotless.",
    intro:
      "A fresh coat of paint transforms a room, but the difference between a DIY job and a professional finish is in the preparation and the care taken while it's done. We paint walls, ceilings, and woodwork to a crisp, durable standard, and we treat your home with respect from the first dust sheet to the final clean-up.",
    included: [
      "Careful protection of floors, furniture, and fittings before any painting starts",
      "Full preparation: filling cracks, sanding, caulking, and priming where needed",
      "Two coats of quality trade paint for an even, long-lasting finish",
      "Crisp cutting-in around ceilings, skirting, and trim",
      "A tidy finish — we clean up at the end of every day and on completion",
    ],
    body: [
      "Whether it's a single room refresh, a full house repaint, a new build, or a rental turnaround, we work cleanly and to schedule so you can get your space back quickly.",
      "Not sure on colours? We're happy to talk through options and finishes that suit the room, the light, and how the space is used.",
    ],
  },
  {
    slug: "exterior-painting",
    name: "Exterior Painting",
    summary:
      "Weatherproof exterior painting for houses and buildings — thorough prep that stands up to the Irish climate.",
    intro:
      "Exterior paintwork protects your home as well as improving how it looks, and in the Irish climate the preparation matters more than anything. We clean, repair, and prime surfaces properly so the finish resists rain, damp, and weathering for years — not months.",
    included: [
      "Washing down and removing dirt, moss, and flaking paint",
      "Repairing and filling cracked render and damaged surfaces",
      "Priming bare and porous areas before top coats",
      "Masonry, render, pebbledash, timber, fascia, soffit, and guttering",
      "Weather-appropriate scheduling so coats cure properly",
    ],
    body: [
      "We work around the weather to make sure each coat goes on and cures in the right conditions, which is what gives an exterior finish its longevity.",
      "From a full house repaint to freshening up windows, doors, and trim, we'll advise on what your property actually needs.",
    ],
  },
  {
    slug: "commercial",
    name: "Commercial Painting",
    summary:
      "Commercial painting and decorating with minimal disruption — offices, retail, hospitality, and rental properties.",
    intro:
      "For commercial premises, downtime costs money. We plan around your opening hours — including evenings and weekends where needed — so your business keeps running while the work gets done to a professional standard.",
    included: [
      "Flexible scheduling, including out-of-hours work",
      "Offices, retail units, hospitality, and rental properties",
      "Clean, low-disruption working with clear communication",
      "Fully insured work (ask us for details)",
    ],
    body: [
      "We're happy to quote for one-off refreshes or ongoing maintenance across multiple units, and to coordinate with facilities or property managers.",
    ],
  },
  {
    slug: "wallpapering",
    name: "Wallpapering",
    summary: "Expert wallpaper hanging, feature walls, and removal — neat seams and precise pattern matching.",
    intro:
      "Wallpaper lives or dies on the preparation and the hanging. We prep walls properly, line where needed, and hang with careful pattern matching and neat seams for a finish that looks right in every light.",
    included: [
      "Wall preparation and lining where required",
      "Standard, textured, and specialist papers",
      "Feature walls and full-room wallpapering",
      "Removal of old wallpaper and making good",
    ],
    body: [
      "Bringing your own paper or still choosing? We'll let you know how much you need and what will hang and wear well.",
    ],
  },
  {
    slug: "woodwork",
    name: "Woodwork & Trim",
    summary: "Painting, staining, and finishing of doors, skirting, architrave, and staircases for a sharp, durable finish.",
    intro:
      "Woodwork takes the most wear in a home, so it needs proper preparation and the right finish. We sand, fill, and coat doors, skirting, architrave, and staircases for a smooth, hard-wearing result.",
    included: [
      "Doors, skirting boards, architrave, and window boards",
      "Staircases, handrails, and spindles",
      "Sanding, filling, and priming before finishing",
      "Gloss, satin, eggshell, staining, and varnishing",
    ],
    body: [
      "We can match existing finishes or help you update tired woodwork to freshen the whole room.",
    ],
  },
];

export function getService(slug: string): ServiceContent | undefined {
  return servicesContent.find((service) => service.slug === slug);
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Do you provide free quotes?",
    answer:
      "Yes — quotes are free and with no obligation. Send us your details and a few notes about the project (and photos if you have them) and we'll come back to you, usually within one business day. For most jobs we'll arrange a quick visit to see the space and give you an accurate price.",
  },
  {
    question: "Which areas do you cover?",
    answer:
      "We cover Dublin, Wicklow, and Wexford, including towns such as Bray, Greystones, Wicklow Town, Arklow, Gorey, Enniscorthy, New Ross, Wexford Town, Dún Laoghaire, Swords, and Tallaght. If you're nearby and not sure, just ask.",
  },
  {
    question: "How much does it cost to paint a room or house?",
    answer:
      "Every job is different, so we don't quote blind. The main things that affect price are the size and number of rooms or surfaces, the amount of preparation and repair needed, ceiling height, the number of colours, and whether it's interior or exterior work. Tell us about your project and we'll give you a clear, itemised quote for free.",
  },
  {
    question: "How long does a typical job take?",
    answer:
      "A single room is often done in a day or two, while a full interior repaint typically runs several days to a week depending on size and prep. Exterior jobs depend on the property and the weather. We'll give you a realistic timeframe with your quote and keep you updated as we go.",
  },
  {
    question: "Does the Irish weather affect exterior painting?",
    answer:
      "It does — exterior coatings need dry, suitable conditions to go on and cure properly. We plan exterior work around the weather and won't rush a coat on in the wrong conditions, because that's what protects the finish and makes it last.",
  },
  {
    question: "Will you protect my furniture and keep the place clean?",
    answer:
      "Always. We cover and protect floors, furniture, and fittings before we start, work cleanly throughout, and tidy up at the end of each day and on completion. A tidy site is part of a professional finish.",
  },
  {
    question: "Are you insured?",
    answer:
      "Yes, we're fully insured. If you need specific details for a commercial or managed property, just ask and we'll provide them.",
  },
  {
    question: "How do I get started?",
    answer:
      "Use the quote form on our site, call us, or message us on WhatsApp. Share what you'd like done and we'll take it from there.",
  },
];
