import emirates from "@/assets/partners/emirates.svg";
import ram from "@/assets/partners/ram.svg";
import amadeus from "@/assets/partners/amadeus.svg";
import saudia from "@/assets/partners/saudia.png";

export type Partner = {
  name: string;
  logo: string;
  /** stacked/portrait logos need more height than horizontal wordmarks */
  tall?: boolean;
};

export const partners: Partner[] = [
  { name: "Emirates", logo: emirates },
  { name: "Royal Air Maroc", logo: ram },
  { name: "Amadeus", logo: amadeus },
  { name: "Saudia", logo: saudia, tall: true },
];
