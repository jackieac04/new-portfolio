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
      <article className={`route-content h-fit ${dark ? "dark" : "light"}`}>
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
  "Git/GitHub",
  "Azure",
  "MongoDB",
  "APIs",
  "React",
  "Fullstack Development",
];
const designskills: string[] = [
  "Figma",
  "Responsive Design",
  "Personas",
  "A/B Testing",
  "UX research",
  "Adobe Indesign",
];

const artskills: string[] = [
  "Acrylic Painting",
  "Digital Illustration",
  "Lithography",
  "Linocut",
  "Bookarts",
  "Mural Painting",
  "Oil Painting",
  "Lasercutter",
  "Graphic Design",
  "Woodblock Printing",
  "Adobe Illustrator",
  "Adobe Photoshop",
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
      <main className={dark ? "darktop relative" : "lighttop relative"}>
        <div className="bgimg w-screen min-h-[333vh] bg-cover bg-no-repeat grid grid-rows-3">
          <div className="pink w-full flex flex-col lg:flex-row justify-start items-center lg:justify-between">
            <div className="flex flex-col mt-[5vh] lg:mt-0">
              {" "}
              <h1 className="text-6xl pl-[4vw] lg:!mt-[5vh] ">Jaclyn Cohen</h1>
              <h3 className="lg:block hidden pl-[3vw]">
                Artist, Designer, Developer
              </h3>
            </div>

            <div className="face w-full lg:w-[65vw] lg:self-start lg-translate-[4vh]">
              <img src={face} alt="" className="w-full" />
            </div>
            <h3 className="block lg:hidden pl-[3vw] self-center">
              Artist, Designer, Developer
            </h3>
          </div>
          <div className="orange flex flex-col lg:flex-row">
            <div className=" lg:max-w-[45%] bg-orange-200/20 rounded mx-[2.5%] mt-[5vh]">
              <div className="title mt-[5vh] mb-[2%]">
                <h1
                  className="justify-self-left pl-[5%] "
                  style={{ fontSize: "5vw" }}
                >
                  About Me
                </h1>
              </div>

              <p className="mx-[5%] text-[3vw] md:text-[2.5vw] lg:text-[1.8vw] btm">
                Hi! My name is Jaclyn Cohen, I'm a junior at{" "}
                <b> Brown University</b> (but originally from South Florida!)
                studying <b>Computer Science </b> and <b>Visual Arts.</b> I love
                both topics separately- having done my fair share of software
                projects and paintings, but I'm especially interested in
                intersections between the two from <b>graphics</b> to{" "}
                <b>computer vision </b>to <b>frontend development </b>
                to <b>UIUX</b> and everything inbetween.
              </p>
              <p className="btm mx-[5%] text-[3vw] md:text-[2.5vw] lg:text-[1.8vw]">
                This summer I'm a <b>Frontend Engineering Intern</b> at{" "}
                <b>Hexagon's Manufacturing Intelligence Division</b>, but I also
                have experience as an undergraduate teaching assistant for
                introductory computer science courses and as a research
                assistant doing frontend and graphic design work for{" "}
                <b>The Brown Language and Thought Lab</b>.
              </p>
            </div>
            <div className="  lg:max-w-[45%] bg-orange-200/20 rounded mx-[2.5%] mt-[5vh] px-[2.5%]">
              <div className="title mt-[5vh] mb-[2%]">
                <h1 className="justify-self-left " style={{ fontSize: "5vw" }}>
                  Skills
                </h1>
              </div>
              <h3>Computer Science</h3>
              <div className="skills lil">
                {csskills.map((skill) => {
                  return (
                    <div className={`skill sm ${skill}`} key={skill}>
                      {skill}
                    </div>
                  );
                })}
              </div>
              <h3>Design</h3>
              <div className="skills lil">
                {designskills.map((skill) => {
                  return (
                    <div className={`skill sm ${skill}`} key={skill}>
                      {skill}
                    </div>
                  );
                })}
              </div>
              <h3>Visual Arts</h3>
              <div className="skills lil">
                {artskills.map((skill) => {
                  return (
                    <div className={`skill sm ${skill}`} key={skill}>
                      {skill}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="yellow"></div>
        </div>
        <Footer dark={dark} />
        {/* <div
          className="w-screen relative flex justify-center flex-column "
          style={{ transform: "translateY(-4vh)" }}
        >
          {dark ? (
            <img
              src={darkbg}
              alt=""
              className="mx-auto border-0 my-0 object-cover shadow-none w-[1100px] -top-10 "
            />
          ) : (
            <img
              src={lightbg}
              alt=""
              className="mx-auto border-0 my-0 object-cover shadow-none w-[1100px] "
            />
          )}
          <img
            src={main}
            alt=""
            className="mx-auto border-0 my-0 w-[1100px] object-cover shadow-none absolute  left-0 right-0 bottom-0"
          />
        </div>

        <Link
          className="imgtxt"
          style={{
            transform: "translate(-180%, 150%)",
            animation: "fadeIn .9s",
          }}
          to={"/art"}
        >
          <h1>Artist</h1>
        </Link>
        <Link
          className="imgtxt"
          style={{
            transform: "translate(200%, 350%)",
            animation: "fadeIn 1.8s",
          }}
          to={"/uiux"}
        >
          <h1>Designer</h1>
        </Link>
        <Link
          className="imgtxt"
          style={{
            transform: "translate(-170%, 550%)",
            animation: "fadeIn 2.7s",
          }}
          to={"/cs"}
        >
          <h1>Developer</h1>
        </Link>
        <h1
          className="absolute justify-self-center opacity-90"
          style={{
            transform: "translateY(500%)",
            animation: "fadeIn 3.6s",
            fontSize: "6vw",
          }}
        >
          Jaclyn Cohen
        </h1>
        {/* ABOUT ME 
        <section
          className={
            (dark ? "darkme" : "lightme") + " relative w-screen h-fit-content "
          }
        >
          <div
            className={
              (dark ? "darksvg" : "lightsvg") +
              " custom-shape-divider-top-1714497700"
            }
          >
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className={(dark ? "darksvg" : "lightsvg") + " shape-fill"}
              ></path>
            </svg>
          </div>
          <div className="about w-full h-full flex flex-row pt-[5%]">
            <div className=" max-w-[50%]">
            
            <div
              className={
                (hovered ? "hoverimg " : "nothoverimg ") + "relative w-50%"
              }
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            ></div>
          </div>
        </section> */}
      </main>
      {/* <footer
        className={
          (dark ? "dex" : "lex") +
          " h-[8.1vh]  px-[10%] m-0 flex absolute justify-between w-screen bottom-0"
        }
      ></footer> */}
    </>
  );
}

function NotFound() {
  return <h1>Not Found</h1>;
}

export default App;
