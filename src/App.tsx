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
            <a href={"/main/JaclynCohenResume0224.pdf"} target="_blank">
              Resumé
            </a>
          </div>
        </nav>

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
          (dark ? "d" : "l") +
          " h-[5vh] py-[2vh] px-[10%] m-0 flex justify-between"
        }
      >
        <div
          className="z-10 w-[25%] flex justify-between"
          style={{ transform: "translateY(-25%)" }}
        >
          <Link to={"mailto: jaclyn_cohen@brown.edu"} target="_blank">
            <div className={(dark ? "d" : "l") + "email w-10 h-10"} />
          </Link>
          <Link to={"https://github.com/jackieac04"} target="_blank">
            <div className={(dark ? "d" : "l") + "git w-10 h-10"} />
          </Link>
          <Link
            to={"https://www.linkedin.com/in/jaclyn-a-cohen/"}
            target="_blank"
          >
            <div className={(dark ? "d" : "l") + "linked w-10 h-10"} />
          </Link>
          <Link
            to={"https://discordapp.com/users/leafysheepy/"}
            target="_blank"
          >
            <div className={(dark ? "d" : "l") + "discord w-10 h-10"} />
          </Link>

          <Link to={"https://instagram.com/leafysheepy/"} target="_blank">
            <div className={(dark ? "d" : "l") + "inst w-10 h-10"} />
          </Link>
        </div>
        <div className="z-10">
          <p>Made with leafy sheepy</p>
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
        <div
          className="w-screen relative flex justify-center "
          style={{ transform: "translateY(-8vh)" }}
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
            transform: "translateY(450%)",
            animation: "fadeIn 3.6s",
            fontSize: "6vw",
          }}
        >
          Jaclyn Cohen
        </h1>
        {/* ABOUT ME */}
        <section
          className={
            (dark ? "darkme" : "lightme") +
            " relative w-screen min-h-[95vh] pb-[5vw]"
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
          <div className="title mt-[10vh] mb-[2%]">
            <h1
              className="justify-self-left pl-[5%] "
              style={{ fontSize: "5vw" }}
            >
              About Me
            </h1>
          </div>
          <div className="w-[60%]">
            <p className="mx-[5%] text-[2.5vh]">
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
          " h-[8.1vh]  px-[10%] m-0 flex absolute justify-between w-screen bottom-0"
        }
      ></footer>
    </>
  );
}

function NotFound() {
  return <h1>Not Found</h1>;
}

export default App;
