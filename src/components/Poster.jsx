import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Poster.css';

/*
  Every card on the site is something stuck to a wall: paper stock, a shadow
  cast behind it, and a fastener -- a pushpin, a strip of washi tape across
  the top, or tape over both corners. Some have a corner that has curled away
  from the wall, some have a torn bottom edge, and some carry a sticky note
  with a snapshot of whatever the card is about.

  Clicking one takes it off the wall -- the pin pops or the tape peels, the
  sheet straightens and lifts toward you -- and only then does the route
  change, so the page transition reads as the poster being carried away.
*/

const LIFT_MS = 380;

/*
  Variations are indexed by position rather than randomised, so a card keeps
  the same fastener and the same lean across re-renders and refilters. The
  cycle lengths are coprime-ish so the combinations don't visibly repeat.
*/
const FASTENERS = ['pin', 'tape', 'pin', 'tape-corners', 'pin', 'tape'];
const PIN_COLORS = ['coral', 'gold', 'blue', 'green'];
const TAPE_COLORS = ['washi-gold', 'washi-blue', 'washi-rose', 'washi-green'];
const STICKY_COLORS = ['yellow', 'pink', 'mint', 'blue'];
const TILTS = [-1.4, 0.9, -0.6, 1.5, -1.1, 0.5, -0.3, 1.2];
const PIN_SHIFTS = ['0%', '-14%', '11%', '-7%', '16%'];
const TAPE_ANGLES = [-4, 3, -2, 5, -6, 2];
const STICKY_ANGLES = [4, -5, 6, -3, 5, -4];

const pick = (list, i) => list[i % list.length];

export default function Poster({
  index = 0,
  to,
  onActivate,
  curl,
  torn,
  fastener,
  sticky,
  className = '',
  style,
  children,
  ...rest
}) {
  const navigate = useNavigate();
  const [lifting, setLifting] = useState(false);
  const timer = useRef(null);

  const hold = fastener ?? pick(FASTENERS, index);
  // Curl, tear and sticky note all want the bottom corners, so they are
  // mutually exclusive: a note wins over a curl, and a tear only shows on a
  // sheet that has neither.
  const hasCurl = curl ?? (!sticky?.src && index % 3 === 1);
  const hasTorn = torn ?? (!hasCurl && !sticky?.src && index % 5 === 3);

  const finish = useCallback(() => {
    if (to) {
      // Navigating unmounts this poster, so it can stay in the lifted state.
      navigate(to);
      return;
    }
    // An onActivate poster (an art tile opening a modal) stays mounted, so it
    // has to be put back on the wall -- otherwise it sits scaled up forever
    // and the `lifting` guard below blocks every later click.
    onActivate?.();
    setLifting(false);
  }, [to, onActivate, navigate]);

  const activate = useCallback(
    (event) => {
      // Links and buttons inside the poster keep their own behaviour.
      if (event.target.closest('a[href], button')) return;
      event.preventDefault();
      if (lifting) return;

      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        finish();
        return;
      }
      setLifting(true);
      timer.current = setTimeout(finish, LIFT_MS);
    },
    [lifting, finish],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') activate(event);
  };

  return (
    <div
      className={[
        'poster',
        hasCurl ? 'poster--curl' : '',
        hasTorn ? 'poster--torn' : '',
        lifting ? 'poster--lifting' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        '--tilt': `${pick(TILTS, index)}deg`,
        '--pin-shift': pick(PIN_SHIFTS, index),
        '--tape-angle': `${pick(TAPE_ANGLES, index)}deg`,
        '--sticky-angle': `${pick(STICKY_ANGLES, index)}deg`,
        ...style,
      }}
      role="link"
      tabIndex={0}
      onClick={activate}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {hold === 'pin' && (
        <span
          className={`poster__pin poster__pin--${pick(PIN_COLORS, index)}`}
          aria-hidden="true"
        />
      )}
      {hold === 'tape' && (
        <span
          className={`poster__tape poster__tape--top poster__tape--${pick(TAPE_COLORS, index)}`}
          aria-hidden="true"
        />
      )}
      {hold === 'tape-corners' && (
        <>
          <span
            className={`poster__tape poster__tape--tl poster__tape--${pick(TAPE_COLORS, index)}`}
            aria-hidden="true"
          />
          <span
            className={`poster__tape poster__tape--tr poster__tape--${pick(TAPE_COLORS, index + 1)}`}
            aria-hidden="true"
          />
        </>
      )}

      <div className="poster__paper">
        <div className="poster__sheet">{children}</div>
        {hasCurl && <span className="poster__curl" aria-hidden="true" />}
      </div>

      {sticky?.src && (
        <span
          className={`poster__sticky poster__sticky--${pick(STICKY_COLORS, index)}`}
          aria-hidden="true"
        >
          <img src={sticky.src} alt="" loading="lazy" />
        </span>
      )}
    </div>
  );
}
