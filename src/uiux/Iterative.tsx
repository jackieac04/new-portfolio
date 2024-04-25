import iter from "/iter/iter.png";

export default function Iterative() {
  return (
    <main>
      {" "}
      <div className="top">
        <h1 className="text-5xl">Iterative Design: MiFonda Storefront</h1>
        <div className="skillswrap">
          <img src={iter} alt="An image of the final hifi desktop." />
          <div className=""></div>
          <div className="skills">
            <div className="skill Figma">Figma</div>
            <div className="skill Responsive">Responsive Design</div>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>The Problem</h3>{" "}
        <p className="btm">
          <a href="https://mifonda.io/">MiFonda</a> is a technology startup
          focused on helping small restaurants grow by helping them manage their
          online presence, providing ordering, pickup, and delivery service.
          They tasked us to create a <b>visually-focused, gamified</b>{" "}
          storefront for both mobile and desktop users to order their food, and
          have fun while doing it.
        </p>
        <h3>Sketches</h3>
        <p className="btm">
          Each member of our four person group seperately began by completing
          sketches of our initial ideas for mobile and/or desktop flows.
        </p>
        <div className="mocks">
          <img src="/iter/sketches.png" alt="" />
        </div>
        <p className="btm">
          Upper left: my sketches, upper right: Anna's sketches, bottom left:
          Brooke's sketches, bottom right: Pranavi's sketches.
        </p>
        <h3>First Wireframes</h3>
        <div className="mocks">
          <img src="/iter/mobile1.png" alt="" />
          <img src="/iter/desktop1.png" alt="" />
        </div>
        <p className="btm">
          After careful consideration, we combined the different sketches into
          an initial wireframe. One of our primary goals was maintaining a
          balance between visual creativity and an intuitive user experience. We
          agreed the horizontal video carousels were a positive media-centric
          implementation that wasn't visually overwhelming. We also decided to
          pursue a liking system, and thought it was a great way to engage users
          and promote interaction with the application, alongside communicate
          popular orders. We used the idea of a meal plate reward, as we wanted
          to fulfill the founder's requests for gamification in a clear way that
          added to the design rather than overcomplicated it. Pulling from the
          various designs for further ideas of popups, symbols, sorting, and
          customization, we integrated these into one low-fi prototype for
          evaluation.
        </p>
        <h3>Initial Feedback</h3>
        <p className="btm">
          In a round of critique with our peers, the main area noted for
          improvement was in ensuring consistent design across our mobile and
          desktop platforms. We wanted to ensure, moving forward, that the two
          versions were aligned for memorability and unification. Peers also
          encouraged us to think carefully about what elements were truly
          necessary, how the video carousel might operate with autoplay or
          pausing, and where we place certain features in relation to the
          purchase and checkout processes.
        </p>
        <p className="btm">
          <ul>
            {" "}
            When we sent our wireframes to our founder, some things they wanted
            us to change were:
            <li>
              Removing the ability to see food from multiple restaurants and
              instead just focusing on one restaurant,
            </li>
            <li>Make the featured foods carosel specifc to a restaurant,</li>
            <li>Change the "category" label to say modifier, and </li>
            <li>Accomodate the feautured items and menu on a single screen</li>
          </ul>
        </p>
        <h3>Revised Wireframes</h3>
        <p>Given this feedback, we revised our wireframes accordingly:</p>
        <div className="mockst">
          {" "}
          <img src="/iter/mobile2.png" alt="" />
          <img src="/iter/desktop2.png" alt="" />
        </div>
        <p className="btm">
          We incorporated all of the feedback into our new designs; each page is
          specific to a store, their is more consideration of similar placement
          between the mobile and desktop versions, and the unique features were
          displayed prominently, among other smaller changes.
        </p>
        <h3>Hi-Fi Prototyping</h3>
        <p className="btm">
          We built on the visual style guide provided and developed our hi-fi
          prototype. Fonda sent us a preliminary style guide containing the
          typography and color scheme. The Roboto font was clear and legible,
          while the blue, yellow, and pink offered a professional yet vibrant
          palette to work with. The founders gave us free reign over any style
          guide edits, so we also developed various elements and symbols,
          including the drop-down menus, buttons, and banners. We also wanted to
          ensure accessibility in the usage of keyboard-navigable features and
          high-contrast colors.{" "}
        </p>
        <div className="mocks">
          <img src="/iter/designsys.png" alt="" />
        </div>
        <p>
          Based on their feedback, the design system, and our revised lofis, we
          created these mobile and desktop hifis:
        </p>
        <div className="mocks">
          <img src="/iter/mobilehifi1.png" alt="" />
        </div>
        <div className="mocks">
          {" "}
          <img src="/iter/desktophifi1.png" alt="" />
        </div>
        <p className="btm">
          Our hifis are designed with similar food delivery platforms in mind,
          with the intent to be both a fast experience for users and a fun one.
        </p>
        <h3>Founder Feedback</h3>
        <p className="btm">
          The founders expressed a lot of positive feedback! They praised our
          design as “super innovative” and appreciated the visual-forward
          implementation, especially the videos. We discussed a few scenarios
          that might stretch the limitations of our design, such as multiple
          promo codes, or the potential of longer videos such as hearing from
          chefs. While they liked the meal plan feature, we talked through its
          status then as only on the desktop feature and agreed that consistency
          across versions was more important than the potential crowding of
          information, so we have since updated the mobile version to include
          the meal plate. Overall, it was valuable to work with and hear from
          founders in a startup environment, and we are all extremely
          appreciative of the opportunity to practice our design and development
          skills in a more professional setting.
        </p>
        <p className="btm">
          Because of their feedback, we revised our hifis again to look like
          this:
        </p>
        <div className="mocks">
          <img src="/iter/mobilehifi2.png" alt="" />
        </div>
        <div className="mocks">
          {" "}
          <img src="/iter/desktophifi2.png" alt="" />
        </div>
        <p className="btm">
          We made sure the meal plate was predominantly displayed in both
          desktop and mobile and changed the layout of the cart page.
        </p>
      </div>
    </main>
  );
}
