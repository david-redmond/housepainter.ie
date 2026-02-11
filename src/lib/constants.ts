export const companyName = "Southeast Painters";
export const baseUrl = "https://www.housepainter.ie";

export const phone = "+353 87 619 1227";
export const phoneTel = "+353876191227";

export const whatsappNumber = "353876191227";
export const whatsappMessage =
  "Hi Southeast Painters, I'd like a quote for painting. My area is: ";

export const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`;

export const serviceAreas = [
  {
    county: "Dublin",
    towns: ["Dublin City", "Dun Laoghaire", "Swords", "Tallaght"],
  },
  {
    county: "Wicklow",
    towns: ["Bray", "Greystones", "Wicklow Town", "Arklow"],
  },
  {
    county: "Wexford",
    towns: ["Wexford Town", "Gorey", "Enniscorthy", "New Ross"],
  },
];

export const serviceAreasSummary = serviceAreas.map((area) => area.county).join(" · ");

export const facebookLink = "https://www.facebook.com/CiaranRedmond11";
export const instagramLink = "https://www.instagram.com/south_eastpainters/";
export const facebookReviewsLink =
  "https://www.facebook.com/CiaranRedmond11/reviews/?id=100048613225760&sk=reviews";