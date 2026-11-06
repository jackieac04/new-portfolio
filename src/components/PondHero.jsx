import { useEffect, useRef, useState } from 'react';
import introWebm from '../assets/home/pond-intro.webm';
import introMp4 from '../assets/home/pond-intro.mp4';
import loopWebm from '../assets/home/pond-loop.webm';
import loopMp4 from '../assets/home/pond-loop.mp4';
import posterSrc from '../assets/home/pond-poster.webp';
import './PondHero.css';

/*
  "By the Pond" plays as two clips: an intro that runs once, then a loop that
  runs forever. They are <video> rather than animated GIF/WebP because the
  painting needs a lot of pixels to stay crisp -- VP9 carries 2400px for about
  the same bytes animated WebP needed for 1600px -- and because a video tells
  us exactly when it has finished, so the handoff needs no timer.

  The loop <video> is mounted underneath the intro from the start, so it is
  already buffered when the intro ends. Swapping one element for another
  (the old approach) showed the poster -- the intro's *first* frame, the calm
  painting -- for a beat while the new element loaded, so the art visibly
  jumped back to the start. Now the intro holds its last frame on top until
  the loop has painted its first one, and only then is removed.
*/

// Module scope, not state: a real page load replays the intro, but moving
// between routes inside one session drops straight into the loop.
let introSeen = false;

const SOURCES = {
  intro: [introWebm, introMp4],
  loop: [loopWebm, loopMp4],
};

export default function PondHero({ children }) {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const [phase, setPhase] = useState(() =>
    reduced ? 'still' : introSeen ? 'loop' : 'intro',
  );
  const introRef = useRef(null);
  const loopRef = useRef(null);
  // Only a page that starts on the loop needs a placeholder on it. Fixed at
  // mount: adding the poster after the handoff would let the calm painting
  // show through whenever the loop briefly has no frame (e.g. as it wraps).
  const [loopPoster] = useState(phase === 'loop' ? posterSrc : undefined);

  // Autoplay can be refused (battery saver, some mobile data-saver modes).
  // Nudge whichever clip is showing, and fall back from the intro to the loop
  // so the hero is never a frozen frame.
  useEffect(() => {
    const v = phase === 'intro' ? introRef.current : loopRef.current;
    if (!v) return;
    v.play?.().catch(() => {
      if (phase === 'intro') {
        introSeen = true;
        setPhase('loop');
      }
    });
  }, [phase]);

  const handleIntroEnded = () => {
    introSeen = true;
    const loop = loopRef.current;
    const reveal = () => setPhase('loop');
    if (!loop) return reveal();
    // Start the loop from its first frame and wait until that frame is
    // actually on screen before uncovering it; the ended intro keeps showing
    // its last frame in the meantime.
    loop.currentTime = 0;
    loop.play().then(() => {
      if (loop.requestVideoFrameCallback) loop.requestVideoFrameCallback(reveal);
      else reveal();
    }, reveal);
  };

  const sources = (clip) =>
    SOURCES[clip].map((src) => (
      <source
        key={src}
        src={src}
        type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
      />
    ));

  const alt =
    'By the Pond — a painting of a figure crouched at the edge of a pond, ' +
    'trailing a hand through the water as ripples of light bloom outward.';

  return (
    <section className="pond-hero">
      <div className="pond-hero__stage">
        <div className="pond-hero__frame">
          {phase === 'still' ? (
            <img className="pond-hero__art" src={posterSrc} alt={alt} />
          ) : (
            <>
              <video
                ref={loopRef}
                className="pond-hero__art"
                poster={loopPoster}
                autoPlay={phase === 'loop'}
                muted
                playsInline
                loop
                preload="auto"
                aria-label={alt}
                aria-hidden={phase === 'intro' || undefined}
              >
                {sources('loop')}
              </video>
              {phase === 'intro' && (
                <video
                  ref={introRef}
                  className="pond-hero__art pond-hero__art--over"
                  poster={posterSrc}
                  onEnded={handleIntroEnded}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  aria-label={alt}
                >
                  {sources('intro')}
                </video>
              )}
            </>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}
