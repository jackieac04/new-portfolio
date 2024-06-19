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
import face from "/main/newface.png";
import BLT from "./uiux/BLT";
import JAC from "/main/logo.png";
import Bathrooms from "./cs/Bathrooms";
import Pab from "./cs/Pab";
import resume from "/main/JaclynCohenResume0224.pdf";
import Dreamweaver from "./cs/Dreamweaver";
import Footer from "./Footer";

function App() {
  const [dark, setDark] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDark((prev) => !prev);
    document.body.classList.toggle("dark-mode", !dark);
  };
  return (
    <>
      <article
        className={`route-content min-h-[105vh] ${dark ? "dark" : "light"}`}
      >
        <nav>
          <div className="left-links grid grid-cols-2 relative">
            <Link to={"/"} className="flex mr-[2%] w-[20%] absolute">
              <img
                className="justify-self-start self-start align-top !max-w-[100px]"
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
        <Footer dark={dark} />
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
        <div className="bgimg w-screen h-fit bg-cover bg-no-repeat flex flex-col">
          <div className="pink relative w-full flex flex-col lg:flex-row justify-start items-center lg:justify-between bg-cover bg-no-repeat h-fit relative">
            <div className="flex flex-col mt-[5vh] lg:mt-0">
              <h1 className="text-6xl pl-[4vw] lg:!mt-[5vh] ">Jaclyn Cohen</h1>
              <h3 className="lg:block hidden pl-[3vw]">
                Artist, Designer, Developer
              </h3>
            </div>

            <div className="face w-[95%] lg:w-[65vw] lg:self-start lg-translate-[4vh]">
              <img src={face} alt="" className="w-full" />
            </div>
            <h3 className="block lg:hidden pl-[3vw] self-center pb-[4vw]">
              Artist, Designer, Developer
            </h3>

            <div className="gradient-overlay"></div>
          </div>

          <div className="orange flex flex-col md:flex-row h-fit">
            <div className=" md:max-w-[45%] bg-orange-200/20 rounded mx-[2.5%] mt-[5vh]">
              <div className="title mt-[5vh] mb-[2%]">
                <h1
                  className="justify-self-left pl-[5%] "
                  style={{ fontSize: "6vw" }}
                >
                  About Me
                </h1>
              </div>

              <p className="mx-[5%] text-[4vw] md:text-[3vw] lg:text-[1.8vw] btm">
                Hi! My name is Jaclyn Cohen, I'm a junior at{" "}
                <b> Brown University</b> (originally from South Florida!)
                studying <b>Computer Science </b> and <b>Visual Arts.</b> I love
                both topics individually but I'm especially interested in
                intersections between the two from <b>graphics</b> to to{" "}
                <b>frontend development </b>
                to <b>UIUX</b> and everything inbetween.
              </p>
              <p className="btm mx-[5%] text-[4vw] md:text-[3vw] lg:text-[1.8vw]">
                This summer I'm a <b>Frontend Engineering Intern</b> at{" "}
                <b>Hexagon's Manufacturing Intelligence Division</b>, but I also
                have experience as an undergraduate teaching assistant for CSCI
                0150 and as a research assistant for{" "}
                <b>The Brown Language and Thought Lab</b>.
              </p>
            </div>
            <div className="  lg:max-w-[45%] bg-orange-200/20 rounded mx-[2.5%] mt-[5vh] px-[2.5%]">
              <div className="title mt-[5vh] mb-[2%]">
                <h1 className="justify-self-left " style={{ fontSize: "5vw" }}>
                  Skills
                </h1>
              </div>
              <h1 style={{ fontSize: "3vw" }}>Computer Science</h1>
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
              <h1 style={{ fontSize: "3vw" }}>Design</h1>
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
              <h1 style={{ fontSize: "3vw" }}>Visual Arts</h1>
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
          <div className="yellow min-h-[30vh]"></div>
        </div>
      </main>
    </>
  );
}

function NotFound() {
  return <h1>Not Found</h1>;
}

export default App;
