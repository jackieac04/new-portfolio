import { Link } from "react-router-dom";
interface HomeProps {
  dark: boolean;
}
export default function Footer({ dark }: HomeProps) {
  return (
    <footer
      className={
        (dark ? "d" : "l") +
        " px-[4rem] mt-[1rem] flex justify-between bottom-[2rem]"
      }
    >
      <div
        className="z-10 w-[30%] flex justify-between "
        style={{ transform: "translateY(-25%)" }}
      >
        <Link to={"mailto: jaclyn_cohen@brown.edu"} target="_blank">
          <div
            className={
              (dark ? "d" : "l") +
              "email w-[4vw] h-[4vw] py-[1vh] object-contain bg-no-repeat"
            }
          />
        </Link>
        <Link to={"https://github.com/jackieac04"} target="_blank">
          <div
            className={
              (dark ? "d" : "l") +
              "git w-[4vw] h-[4vw] py-[1vh] object-contain bg-no-repeat"
            }
          />
        </Link>
        <Link
          to={"https://www.linkedin.com/in/jaclyn-a-cohen/"}
          target="_blank"
        >
          <div
            className={
              (dark ? "d" : "l") +
              "linked  w-[4vw] h-[4vw] py-[1vh] object-contain bg-no-repeat"
            }
            style={{ transform: "translateY(-.5vh)" }}
          />
        </Link>
        <Link to={"https://discordapp.com/users/leafysheepy/"} target="_blank">
          <div
            className={
              (dark ? "d" : "l") +
              "discord w-[4vw] h-[4vw] py-[1vh] object-contain bg-no-repeat"
            }
          />
        </Link>

        <Link to={"https://instagram.com/leafysheepy/"} target="_blank">
          <div
            className={
              (dark ? "d" : "l") +
              "inst w-[4vw] h-[4vw] py-[1vh] object-contain bg-no-repeat"
            }
          />
        </Link>
      </div>
      <div className="z-10">
        <p>Made with leafy sheepy</p>
      </div>
    </footer>
  );
}
