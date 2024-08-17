import { Routes, Route, Link } from "react-router-dom";
import Art from "./art/Art";
import UIUX from "./uiux/UIUX";
import ResponsiveRedesign from "./uiux/ResponsiveRedesign";
import AB from "./uiux/AB";
import CS from "./cs/CS";
import "./App.css";
import Development from "./uiux/Development";
import Iterative from "./uiux/Iterative";
import { useState } from "react";
import BLT from "./uiux/BLT";
import JAC from "/main/logo.png";
import Bathrooms from "./cs/Bathrooms";
import Pab from "./cs/Pab";
import resume from "/main/JaclynCohenResume0224.pdf";
import Dreamweaver from "./cs/Dreamweaver";
import Footer from "./Footer";
import VideoComponent from "./VideoComponent";
import flowers from "/main/flowers.mp4";

function App() {
  const [dark, setDark] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDark((prev) => !prev);
    document.body.classList.toggle("dark-mode", !dark);
  };

  document.addEventListener("scroll", function () {
    const navbar = document.getElementById("nav");
    const path = window.location.hash;

    if (path == "#/" || path == "/#/") {
      const videoSection = document.getElementById("video");
      const videoHeight = videoSection!.offsetHeight;
      if (window.scrollY < videoHeight) {
        navbar!.classList.add("navbar-light");
        navbar!.classList.remove("navbar-dark");
      } else {
        navbar!.classList.add("navbar-dark");
        navbar!.classList.remove("navbar-light");
      }
    } else {
      console.log("???");
      navbar!.classList.add("navbar-dark");
      navbar!.classList.remove("navbar-light");
    }
  });

  return (
    <>
      <article
        className={`route-content min-h-[105vh] ${dark ? "dark" : "light"}`}
      >
        <nav id="nav">
          <div className="left-links grid grid-cols-2 relative">
            <Link to={"/"} className="flex mr-[2%] w-[20%] absolute">
              <img
                className="imgg justify-self-start self-start align-top !max-w-[100px]"
                src={JAC}
                alt=""
                style={{ transform: " translate(-30%, -35%)" }}
              />
            </Link>
            <button
              className={
                (dark ? "darkbtn" : "lightbtn") +
                " absolute w-6 h-6 justify-self-start"
              }
              style={{ transform: "translate(220%, 20%)" }}
              onClick={toggleDarkMode}
            />
          </div>
          <div className="right-links">
            <Link className="cs" to={"/cs"}>
              CS
            </Link>
            <Link className="uiux" to={"/uiux"}>
              UIUX
            </Link>
            <Link className="art" to={"/art"}>
              Art
            </Link>
            <a href={resume} target="_blank">
              Resumé
            </a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home dark={dark} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/art" element={<Art dark={dark} />} />
          <Route path="/uiux" element={<UIUX />}>
            <Route index element={<UIUX />} />
          </Route>
          <Route path="/respred" element={<ResponsiveRedesign />} />
          <Route path="/abtest" element={<AB />} />
          <Route path="/dev" element={<Development />} />
          <Route path="/cs" element={<CS />} />
          <Route path="/iter" element={<Iterative />} />
          <Route path="/blt" element={<BLT />} />
          <Route path="/bath" element={<Bathrooms />} />
          <Route path="/pab" element={<Pab />} />
          <Route path="/dream" element={<Dreamweaver />} />
        </Routes>
        <div className="w-full h-fit">
          <Footer dark={dark} />
        </div>
      </article>
    </>
  );
}

const csskills: string[] = [
  "TypeScript",
  "Python",
  "Java",
  "HTML",
  "CSS",
  "Git + GitHub",
  "Azure",
  "MongoDB",
  "APIs",
  "React",
  "Fullstack",
];
const designskills: string[] = [
  "Figma",
  "Responsive Design",
  "Personas",
  "AB Testing",
  "UX research",
];

const artskills: string[] = [
  "Acrylic Painting",
  "Digital Illustration",
  "Lithography",
  "Linocut",
  "Bookarts",
  "Mural Painting",
  "Lasercutter",
  "Graphic Design",
  "Woodblock Printing",
  "Adobe Illustrator",
];

interface HomeProps {
  dark: boolean;
}

function Home({ dark }: HomeProps) {
  // const [hovered, setHovered] = useState(false);

  // const handleMouseEnter = () => {
  //   setHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setHovered(false);
  // };

  return (
    <>
      <main
        className={dark ? "darktop relative h-fit" : "lighttop relative h-fit"}
      >
        <div className="bgimg w-screen h-fit flex flex-col">
          <div className="pink relative w-screen bg-cover bg-no-repeat h-fit ">
            <VideoComponent />
          </div>

          <div className="orange flex flex-col md:flex-row min-h-[110vh] py-[3rem]">
            <div className=" md:max-w-[45%] rounded mx-[2.5%] mt-[5vh]">
              <div className="title mt-[5vh] mb-[2%] flex">
                <video
                  src={flowers}
                  loop
                  typeof="video/mp4"
                  autoPlay
                  className="w-[10%]"
                />
                <h1
                  className="justify-self-left mr-[.5rem] mb-[1rem]"
                  style={{ fontSize: "4rem" }}
                >
                  About Me
                </h1>
                <video
                  src={flowers}
                  loop
                  typeof="video/mp4"
                  autoPlay
                  className="w-[10%]"
                />
              </div>

              <p className="mx-[5%] text-[4vw] md:text-[3vw] lg:text-[1.8vw] btm">
                Hi! My name is Jaclyn Cohen, I'm a junior at{" "}
                <b className="focus">
                  {" "}
                  Brown University{" "}
                </b>
                studying <b className="focus">Computer Science </b> and <b className="focus">Visual Arts.</b> I love
                both topics individually but I'm especially interested in
                intersections between the two from <b>graphics</b> to to{" "}
                <b className="focus">frontend development </b>
                to <b className="focus">UIUX</b> and everything inbetween.
              </p>
            </div>
          </div>
          <div className="yellow h-fit min-h-screen flex flex-row">
            <div className="w-1/2"></div>
            <div className="  lg:max-w-[45%] rounded mx-[2.5%] mt-[5vh] px-[2.5%]">
              <div className="title mt-[5vh] mb-[2%]">
                <h1 className="justify-self-left " style={{ fontSize: "3rem" }}>
                  Skills
                </h1>
              </div>
              <h1 style={{ fontSize: "1.5rem" }}>Computer Science</h1>
              <div className="skills lil">
                {csskills.map((skill) => {
                  return (
                    <div
                      className={`skill sm ${skill} text-[4vw] md:text-[3vw] lg:text-[1.8vw] `}
                      key={skill}
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>
              <h1 style={{ fontSize: "1.5rem" }}>Design</h1>
              <div className="skills lil">
                {designskills.map((skill) => {
                  return (
                    <div
                      className={`skill sm ${skill} text-[4vw] md:text-[3vw] lg:text-[1.8vw] `}
                      key={skill}
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>
              <h1 style={{ fontSize: "1.5rem" }}>Visual Arts</h1>
              <div className="skills lil">
                {artskills.map((skill) => {
                  return (
                    <div
                      className={`skill sm ${skill} text-[4vw] md:text-[3vw] lg:text-[1.8vw] `}
                      key={skill}
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function NotFound() {
  return <h1>Not Found</h1>;
}

export default App;
