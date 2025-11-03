import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

type tProps = {
  images: Array<{ src: string; name: string }>;
};
const Carousel = (props: tProps) => {
  const autoplay = useRef(Autoplay({ delay: 3000, playOnInit: true }));
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  return (
    <div
      className="overflow-hidden relative w-full h-[30vh] bg-black rounded-lg flex items-center justify-center"
      ref={emblaRef}
    >
      <div className="flex">
        {props.images?.map((i, index) => (
          <div
            key={index}
            className="flex-[0_0_100%] flex items-center justify-center"
          >
            <img
              src={i.src}
              alt={i.name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Carousel;
