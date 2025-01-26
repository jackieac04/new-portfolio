import { useEffect, useState } from "react";
import "animate.css";
import useIntersectionObserver from "./UseIntersectionObserver";
import me from "/main/me.jpg";
import meArt from "/main/me.png";

const ScrollAnimatedSection = () => {
  const entries = useIntersectionObserver({ threshold: 0.1 });
  const [img, setImg] = useState<boolean>(false);

  useEffect(() => {
    entries.forEach((entry) => {
      const element = entry.target;
      if (entry.isIntersecting) {
        element.classList.add("animate__animated", "animate__fadeInUp");
      }
    });
  }, [entries]);

  return (
    <section className="p-8 md:p-32 gap-y-24 flex flex-col bg-orange-50 ">
      <div className="flex flex-col gap-y-8 md:flex-row observe">
        <div className="flex-col flex md:w-2/3">
          <h2>About Me</h2>
          <p className="">
            Hi! My name is Jaclyn Cohen, I'm a junior at{" "}
            <b className="focus"> Brown University </b>
            studying <b className="focus">Computer Science </b> and{" "}
            <b className="focus">Visual Arts.</b> I love both topics
            individually but I'm especially interested in intersections between
            the two from <b>graphics</b> to{" "}
            <b className="focus">frontend development </b>
            to <b className="focus">UIUX</b> and everything inbetween.
          </p>
        </div>

        <div
          className="rounded mx-[2.5%] object-contain flex justify-center flex flex-col"
          onMouseEnter={() => setImg(true)}
          onMouseLeave={() => setImg(false)}
        >
          {!img ? (
            <img className="max-h-[80vh] rounded" src={me} />
          ) : (
            <img className="max-h-[80vh] rounded" src={meArt} />
          )}
          <p>The glasses are perscription!</p>
        </div>
      </div>
    </section>
  );
};

export default ScrollAnimatedSection;
