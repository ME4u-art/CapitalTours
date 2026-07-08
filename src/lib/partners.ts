import emirates from "@/assets/partners/emirates.svg";
import ram from "@/assets/partners/ram.svg";
import amadeus from "@/assets/partners/amadeus.svg";
import saudia from "@/assets/partners/saudia.svg";

export type Partner = {
  name: string;
  logo: string;
};

export const partners: Partner[] = [
  { name: "Emirates", logo: emirates },
  { name: "Royal Air Maroc", logo: ram },
  { name: "Amadeus", logo: amadeus },
  { name: "Saudia", logo: saudia },
];
