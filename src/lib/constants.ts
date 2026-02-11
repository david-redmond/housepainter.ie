export const companyName = "Southeast Painters";
export const baseUrl = "https://www.housepainter.ie";

export const phone = "+353 87 123 4567";
export const phoneTel = "+353871234567";

export const whatsappNumber = "353871234567";
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
  {
    county: "Waterford",
    towns: ["Waterford City", "Dungarvan", "Tramore", "Lismore"],
  },
];

export const serviceAreasSummary = serviceAreas.map((area) => area.county).join(" · ");
