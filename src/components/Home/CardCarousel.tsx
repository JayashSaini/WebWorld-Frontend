import { Carousel, Card } from "../ui/cardcarousel.tsx";
import { cardCarouselData } from "../../lib/data.tsx";

export function CardCarousal() {
  const cards = cardCarouselData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl  mx-auto text-3xl md:text-4xl font-bold text-white font-sans ">
        Get to know our <span>Courses.</span>
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
