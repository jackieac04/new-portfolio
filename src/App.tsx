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
import main from "/main/main.png";
import darkbg from "/main/bgdark.png";
import lightbg from "/main/bglight.png";

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
          <div className="left-links">
            {/* TODO replace with logo */}
            <Link to={"/"} className=" mr-[2%]">
              JAC
            </Link>
            <button
              className={(dark ? "darkbtn" : "lightbtn") + " w-6 h-6"}
              style={{ transform: "translateY(20%)" }}
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
          </div>
        </nav>
        <div className="dropdowns">
          <div className="art-links"></div>
          <div className="uiux-links">
            <p>Responsive Redesign</p>
          </div>
          <div className="cs-links"></div>
        </div>

        <Routes>
          <Route path="/" element={<Home dark={dark} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/art" element={<Art />} />
          <Route path="/uiux" element={<UIUX />}>
            <Route index element={<UIUX />} />
          </Route>
          <Route path="/respred" element={<ResponsiveRedesign />} />
          <Route path="/abtest" element={<AB />} />
          <Route path="/dev" element={<Development />} />
          <Route path="/cs" element={<CS />} />
          <Route path="/iter" element={<Iterative />} />
        </Routes>
      </article>
      <footer
        className={
          (dark ? "d" : "l") + " h-[5vh] px-[10%] m-0 flex justify-between"
        }
      >
        <div className="z-10 ">Links</div>
        <div className="z-10 ">
          {" "}
          <p>Made with love</p>{" "}
        </div>
      </footer>
    </>
  );
}

interface HomeProps {
  dark: boolean;
}

function Home({ dark }: HomeProps) {
  return (
    <>
      <main className={dark ? "darktop" : "lighttop"}>
        <div className="h-[95vh] overflow-hidden w-screen relative grid">
          {dark ? (
            <div className="w-screen max-h-full flex justify-center absolute">
              <img
                src={darkbg}
                alt=""
                className="w-[80%] object-cover shadow-none"
              />
            </div>
          ) : (
            <div className="w-screen max-h-full flex justify-center absolute">
              <img
                src={lightbg}
                alt=""
                className="w-[80%] object-cover shadow-none"
              />
            </div>
          )}

          <div className="w-screen max-h-full flex justify-center absolute">
            <img
              src={main}
              alt=""
              className="w-[80%] object-cover shadow-none"
            />
          </div>
        </div>
        <Link
          className="imgtxt"
          style={{
            transform: "translate(-180%, 50%)",
            animation: "fadeIn .9s",
          }}
          to={"/art"}
        >
          <h1>Artist</h1>
        </Link>
        <Link
          className="imgtxt"
          style={{
            transform: "translate(200%, 250%)",
            animation: "fadeIn 1.8s",
          }}
          to={"/uiux"}
        >
          <h1>Designer</h1>
        </Link>
        <Link
          className="imgtxt"
          style={{
            transform: "translate(-170%, 450%)",
            animation: "fadeIn 2.7s",
          }}
          to={"/cs"}
        >
          <h1>Developer</h1>
        </Link>
        <h1
          className="absolute text-8xl justify-self-center opacity-80"
          style={{ transform: "translateY(510%)", animation: "fadeIn 3.6s" }}
        >
          Jaclyn Cohen
        </h1>
        {/* ABOUT ME */}
        <section
          className={
            (dark ? "darkme" : "lightme") + " relative w-screen h-screen"
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
          <div className="title mt-[5%] mb-[2%]">
            <h1 className="text-6xl justify-self-left pl-[5%] ">About Me</h1>
          </div>
          <div className="w-[60%]">
            <p className="mx-[5%] text-large">
              Hi! My name is Jaclyn Cohen, I'm originally from South Florida but
              I'm currently a sophomore at <b> Brown University</b> studying{" "}
              <b>Computer Science </b> and <b>Visual Arts.</b> I love both
              topics seperately- having done my fair share of software projects
              and traditional paintings, but I'm especially interested in
              intersections between the two from <b>graphics</b> to{" "}
              <b>computer vision </b>to <b>frontend development </b>
              to <b>UIUX</b> and everything inbetween.
            </p>
          </div>
        </section>
      </main>
      <footer
        className={
          (dark ? "dex" : "lex") +
          " h-[5vh] px-[10%] m-0 flex absolute justify-between w-screen bottom-0"
        }
      ></footer>
    </>
  );
}

function NotFound() {
  return <h1>Not Found</h1>;
}

export default App;
