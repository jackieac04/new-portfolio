import iter from "/iter/iter.png";
import sketches from "/iter/sketches.png";
import designsys from "/iter/designsys.png";
import desktop1 from "/iter/desktop1.png";
import desktop2 from "/iter/desktop2.png";
import desktophifi1 from "/iter/desktophifi1.png";
import desktophifi2 from "/iter/desktophifi2.png";
import mobile1 from "/iter/mobile1.png";
import mobile2 from "/iter/mobile2.png";
import mobilehifi1 from "/iter/mobilehifi1.png";
import mobilehifi2 from "/iter/mobilehifi2.png";

export default function Iterative() {
  return (
    <main className="pt-[5vh] pb-[9vh]">
      <div className="outer">
        <div className="top">
          <h1 className="text-[5vw]">MiFonda Storefront</h1>
          <div className="skillswrap">
            <img
              className="imgg"
              src={iter}
              alt="An image of the final hifi desktop."
            />
            <div className=""></div>
            <div className="skills">
              <div className="skill Figma">Figma</div>
              <div className="skill Responsive">Responsive Design</div>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div
          className="lightsvg custom-shape-divider-top-1714497700 relative w-screen"
          style={{ transform: "translateY(-5.02vh)" }}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="lightsvg shape-fill"
            ></path>
          </svg>
        </div>
        <div className="text grid">
          <div className="grid  md:grid-cols-9 lg:grid-cols-9 w-full justify-center text-center sm:grid-flow-row md:grid-flow-column lg:grid-flow-column">
            <div className="lef justify-self-end col-span-4 mb-[1vw]">
              <h3 className="justify-self-center">The People</h3>
              <p className="btm">
                <a href="https://mifonda.io/">MiFonda</a> is a technology
                startup focused on helping small restaurants grow by helping
                them manage their online presence, providing ordering, pickup,
                and delivery service.
              </p>
            </div>
            <div></div>
            <div className="righ justify-self-start col-span-4">
              <h3 className="justify-self-center">The Problem</h3>
              <p className="btm">
                They tasked our group of four (myself,{" "}
                <a href="https://anna-wang.dev/">Anna Wang,</a> Pranavi
                Lakshminarayanan, and Brooke Wangenheim) to create a{" "}
                <b>visually-focused, gamified</b> storefront for both mobile and
                desktop users to order their food, and have fun while doing it.
              </p>
            </div>
          </div>

          <h3>Sketches</h3>
          <p className="btm">
            Each member of our four person group seperately began by completing
            sketches of our initial ideas for mobile and/or desktop flows.
          </p>
          <div className="mockst">
            <img className="imgg" src={sketches} alt="" />
          </div>
          <p className="btm">
            Upper left: my sketches, upper right: Anna's sketches, bottom left:
            Brooke's sketches, bottom right: Pranavi's sketches.
          </p>
          <p className="btm">
            The sketches helped us work through our initial ideas and see where
            we had the most in common and the most different concepts for the
            layout.
          </p>
          <h3>First Wireframes</h3>
          <div className="mockst flex flex-col justify-center items-center">
            <img className="imgg" src={mobile1} alt="" />
            <img className="imgg" src={desktop1} alt="" />
          </div>
          <p className="btm">
            After careful consideration, we combined the different sketches into
            an initial wireframe. One of our primary goals was maintaining a
            balance between <b>visual creativity</b> and an{" "}
            <b>intuitive user experience</b>. We agreed the{" "}
            <b>horizontal video carousels</b> were a positive media-centric
            implementation that wasn't visually overwhelming. We also decided to
            pursue a <b>liking system</b>, and thought it was a great way to
            engage users and promote interaction with the application, alongside
            communicate popular orders. We used the idea of a{" "}
            <b>meal plate reward</b>, as we wanted to fulfill the founder's
            requests for gamification in a clear way that added to the design
            rather than overcomplicated it. Pulling from the various designs for
            further ideas of popups, symbols, sorting, and customization, we
            integrated these into one low-fi prototype for evaluation.
          </p>
          <h3>Initial Feedback</h3>
          <p className="btm">
            In a round of critique with our peers, the main area noted for
            improvement was in ensuring consistent design across our mobile and
            desktop platforms. We wanted to ensure, moving forward, that the two
            versions were aligned for <b>memorability and unification</b>. Peers
            also encouraged us to think carefully about what elements were truly
            necessary, how the video carousel might operate with autoplay or
            pausing, and where we place certain features in relation to the
            purchase and checkout processes.
          </p>
          <p className="btm">
            <ul>
              {" "}
              When we sent our wireframes to our founder, some things they
              wanted us to change were:
              <li>
                Removing the ability to see food from multiple restaurants and
                instead just focusing on one restaurant,
              </li>
              <li>Make the featured foods carosel specifc to a restaurant,</li>
              <li>Change the "category" label to say "modifier", and </li>
              <li>
                Accomodate the feautured items and menu on a single screen
              </li>
            </ul>
          </p>
          <h3>Revised Wireframes</h3>
          <p>Given this feedback, we revised our wireframes accordingly:</p>
          <div className="mockst">
            {" "}
            <img className="imgg" src={mobile2} alt="" />
          </div>
          <div className="mockst">
            <img className="imgg" src={desktop2} alt="" />
          </div>
          <p className="btm">
            We incorporated all of the feedback into our new designs; each page
            is specific to a store, there is more consideration of similar
            placement between the mobile and desktop versions, and the unique
            features were displayed prominently, among other smaller changes.
          </p>
          <h3>Hi-Fi Prototyping</h3>
          <p className="btm">
            We built on the visual style guide provided and developed our hi-fi
            prototype. Fonda sent us a preliminary style guide containing the
            typography and color scheme. The Roboto font was clear and legible,
            while the blue, yellow, and pink offered a professional yet vibrant
            palette to work with. The founders gave us free reign over any style
            guide edits, so we also developed various elements and symbols,
            including the drop-down menus, buttons, and banners. We also wanted
            to ensure <b>accessibility</b> in the usage of keyboard-navigable
            features and high-contrast colors.{" "}
          </p>
          <div className="mocks">
            <img className="imgg" src={designsys} alt="" />
          </div>
          <p>
            Based on their feedback, the design system, and our revised lofis we
            became more confident in the layout of our design and created these
            mobile and desktop hifis:
          </p>
          <div className="mocks"></div>
          <div className="mocks">
            {" "}
            <a
              className="grid grid-rows-2"
              href="https://www.figma.com/file/iRwhq0w4NT9zuXu6B2jSnr/Iterative-Design?type=design&node-id=500-2143&mode=design&t=IFa4YjEIk4EbJqBE-0"
            >
              <img
                className="imgg pt-[2vh] max-h-screen justify-self-center"
                src={mobilehifi1}
                alt=""
              />{" "}
              <img
                className="imgg max-h-screen justify-self-center self-center"
                src={desktophifi1}
                alt=""
              />
            </a>
          </div>
          <p className="btm">
            Our hifis are designed with similar food delivery platforms in mind,
            with the intent to be both a fast experience for users and a fun
            one.
          </p>
          <h3>Founder Feedback</h3>
          <p className="btm">
            The founders expressed a lot of positive feedback! They praised our
            design as <b>“super innovative”</b> and appreciated the
            visual-forward implementation, especially the videos. We discussed a
            few scenarios that might stretch the limitations of our design, such
            as multiple promo codes, or the potential of longer videos such as
            hearing from chefs. While they liked the meal plan feature, we
            talked through its status then as only on the desktop feature and
            agreed that consistency across versions was more important than the
            potential crowding of information, so we have since updated the
            mobile version to include the meal plate. Overall, it was valuable
            to work with and hear from founders in a startup environment, and we
            are all extremely appreciative of the opportunity to practice our
            design and development skills in a more professional setting.
          </p>
          <p className="btm">
            Because of their feedback, we revised our hifis again to look like
            this:
          </p>
          <div className="mocks">
            <a
              href="https://www.figma.com/file/iRwhq0w4NT9zuXu6B2jSnr/Iterative-Design?type=design&node-id=724-999&mode=design&t=IFa4YjEIk4EbJqBE-0"
              className="grid grid-rows-2"
            >
              <img
                src={mobilehifi2}
                alt=""
                className="imgg pt-[2vh] max-h-[90vh] justify-self-center"
              />{" "}
              <img
                src={desktophifi2}
                alt=""
                className="imgg max-h-[90vh] self-center justify-self-center"
              />
            </a>
          </div>

          <p className="btm">
            We made sure the meal plate was predominantly displayed in both
            desktop and mobile and changed the layout of the cart page.
          </p>
          <p className="btm">
            {" "}
            You can find our Figma files, with all of our designs from start to
            finish{" "}
            <a href="https://www.figma.com/file/iRwhq0w4NT9zuXu6B2jSnr/Iterative-Design?type=design&node-id=724-999&mode=design&t=GggHXxQvJ5USIhrZ-0">
              here.
            </a>
          </p>

          <div className="bottom grid justify-self-center max-w-[70vw] my-[4vh]">
            <h3 className="justify-self-center">Final Thoughts</h3>
            <p className="btm">
              This project taught me how to best work as a team- both with other
              designers and with a company to meet the needs of everyone
              involved. Each designer pitched some great ideas that came
              together to create the final product, contributing to a
              synchronous design in both aesthetics and functionality.
            </p>
            <p>
              Personally, I put the most effort into the initial mobile lofis,
              round 2 of the desktop lofis, and the desktop hifis. Working on
              each of these different components allowed me to get a taste for
              different aspects of the design process, while also considering
              what needs fit best for others.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
