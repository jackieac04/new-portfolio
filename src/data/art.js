import artOrder from './art-order.json';

/*
  Gallery images come from src/assets/art-web/, not src/assets/art/.

  The masters are 250 MB of camera JPEGs and full-res PNGs -- right to keep,
  wrong to serve. `npm run art` (wired to predev/prebuild) re-encodes each one
  into a 1000px .thumb.webp and a 2200px .full.webp, named

      <Folder>__<file>.<variant>.webp

  so nothing under assets/art/ is ever bundled. If a folder comes back empty,
  the derivatives haven't been built -- run `npm run art`.
*/
const artWebModules = import.meta.glob('../assets/art-web/*.webp', {
  eager: true,
  import: 'default',
});

// Images run in filename order. `lead` names a file (without extension) to
// pull to the front -- the first image is the card's cover.
function variants(folderName, variant, lead) {
  const prefix = `../assets/art-web/${folderName}__`;
  const suffix = `.${variant}.webp`;
  const leadPath = lead && `${prefix}${lead}${suffix}`;
  return Object.entries(artWebModules)
    .filter(([path]) => path.startsWith(prefix) && path.endsWith(suffix))
    .sort(([a], [b]) => (b === leadPath) - (a === leadPath) || a.localeCompare(b))
    .map(([, url]) => url);
}

/** Full-size images for lightboxes and detail views. */
function getImages(folderName, lead) {
  return variants(folderName, 'full', lead);
}

/** Matching grid-sized images, index-for-index with getImages(). */
function getThumbs(folderName, lead) {
  return variants(folderName, 'thumb', lead);
}

/*
  `medium` is the full description shown on each card; `tags` are the broader
  groups behind the filter buttons on the visual art tab.
*/
const visualArtEntries = [
  {
    id: 1,
    title: 'Moving On',
    medium: 'Embroidery, Dye, Paint, Old Letters on Button Up',
    tags: ['Textile', 'Mixed Media'],
    year: '2025',
    dimensions: '25" x 55" x 1"',
    description: 'Reimagining an item gifted to me by someone I once loved, with new hope for who I can become without them. An acceptance of the slow process of healing from a traumatic event, and a reflection on the ways we carry our past selves as we move forward.',
    images: getImages('Moving On'),
    thumbs: getThumbs('Moving On'),
    color: '#bcb0dc',
    size: 'tall',
  },
  {
    id: 14,
    title: 'Pigeons',
    medium: 'Silkscreen and Digital',
    tags: ['Silkscreen', 'Digital'],
    year: '2025',
    dimensions: '9" x 12"',
    description: 'My first full CMYK silkscreen print, two pigeons grab hands, gushing out connected arteries.',
    images: getImages('Pigeons', 'IMG_3159'),
    thumbs: getThumbs('Pigeons', 'IMG_3159'),
    color: '#cbd4a4',
    size: 'tall',
  },
  {
    id: 3,
    title: 'Becoming',
    medium: 'Watercolor',
    tags: ['Painting'],
    year: '2025',
    dimensions: '40" x 56"',
    description: 'A triple self-portrait reflecting on the interconnectedness of the past, present, and future self, and the cyclical nature of life and artistic growth, a part two to my high school senior piece "Entangled".',
    images: getImages('Becoming', 'IMG_4188'),
    thumbs: getThumbs('Becoming', 'IMG_4188'),
    color: '#e5a893',
    size: 'tall',
  },
  {
    id: 16,
    title: 'Sketches',
    medium: 'Pencil, Colored Pencil, Watercolor',
    tags: ['Drawing'],
    year: '2026',
    dimensions: '8" x 10"',
    description: 'A collection of sketches exploring various themes and techniques.',
    images: getImages('Sketches', 'IMG_6761'),
    thumbs: getThumbs('Sketches', 'IMG_6761'),
    color: '#d98b83',
    size: 'wide',
  },
  {
    id: 2,
    title: 'Acrylic Paintings',
    medium: 'Acrylic',
    tags: ['Painting'],
    year: '2023',
    dimensions: 'around 6" - 12"',
    description: 'Various practice paintings.',
    images: getImages('Acrylic Paintings'),
    thumbs: getThumbs('Acrylic Paintings'),
    color: '#d98b83',
    size: 'tall',
  },
  {
    id: 4,
    title: 'By the Pond',
    medium: 'Digital and Paper Tunnel Book',
    tags: ['Digital', 'Book Arts'],
    year: '2025',
    dimensions: '12" x 12" x 3" and 12" x 12"',
    description: 'A sweet painting of a girl sitting in a pond, used to create a tunnel book of the same scene to explore the image with depth.',
    images: getImages('By the Pond'),
    thumbs: getThumbs('By the Pond'),
    color: '#9dc2d4',
    size: 'square',
  },
  {
    id: 11,
    title: 'Monoprints',
    medium: 'Silkscreen',
    tags: ['Silkscreen'],
    year: '2026',
    dimensions: '8"x10"',
    description: 'A fun experiment in monoprints and ghost monoprints.',
    images: getImages('Monoprints'),
    thumbs: getThumbs('Monoprints'),
    color: '#a8b78d',
    size: 'wide',
  },
  {
    id: 19,
    title: 'Digital Paintings',
    medium: 'Digital',
    tags: ['Digital', 'Painting'],
    year: '2025',
    dimensions: 'Various',
    description: 'An ongoing set of digital paintings — friends, pets, and quiet domestic scenes painted between larger projects.',
    images: getImages('Digital Paintings'),
    thumbs: getThumbs('Digital Paintings'),
    color: '#8e8ad4',
    size: 'tall',
  },
  {
    id: 12,
    title: 'A Handful',
    medium: 'Ceramics',
    tags: ['Sculpture'],
    year: '2026',
    dimensions: '6" x 2" x 3"',
    description: 'A quick exercise in hand-building (in both ways) to create a piece reflecting on my struggle with carpal tunnel.',
    images: getImages('A Handful'),
    thumbs: getThumbs('A Handful'),
    color: '#efc98d',
    size: 'wide',
  },
  {
    id: 5,
    title: 'Egghunt',
    medium: 'Silkscreen',
    tags: ['Silkscreen'],
    year: '2026',
    dimensions: '8" x 10"',
    description: 'A silkscreen print about searching, and about what we are willing to turn over to find something small and hidden.',
    images: getImages('Egghunt'),
    thumbs: getThumbs('Egghunt'),
    color: '#cbd4a4',
    size: 'tall',
  },
  {
    id: 6,
    title: 'Fireflies',
    medium: 'Silkscreen',
    tags: ['Silkscreen'],
    year: '2026',
    dimensions: '8" x 10"',
    description: 'A print companion to the poem of the same name — an evening of blinking leaves, roadside dust, and flecks of gold.',
    images: getImages('Fireflies'),
    thumbs: getThumbs('Fireflies'),
    color: '#a8b78d',
    size: 'square',
  },
  {
    id: 7,
    title: 'Geese',
    medium: 'Silkscreen',
    tags: ['Silkscreen'],
    year: '2026',
    dimensions: '6" x 4"',
    description: 'Many geese.',
    images: getImages('Geese'),
    thumbs: getThumbs('Geese'),
    color: '#bcb0dc',
    size: 'wide',
  },
  {
    id: 8,
    title: "Heart's Content",
    medium: 'Silkscreen',
    year: '2026',
    dimensions: '10"x14"',
    description: 'A common motif in my work, now in silkscreen form, a woman gouges her heart out and eats it.',
    images: getImages("Heart's Content", 'IMG_4272'),
    thumbs: getThumbs("Heart's Content", 'IMG_4272'),
    color: '#e5a893',
    size: 'tall',
  },
  {
    id: 9,
    title: 'Little Home',
    medium: 'Sculpture',
    tags: ['Sculpture'],
    year: '2025',
    dimensions: '12"x12"x12"',
    description: 'A miniature house designed for Mary Oliver, complete with a floor made of leaves, tiny readable poetry books, soft warm colors, and small birds.',
    images: getImages('Little Home'),
    thumbs: getThumbs('Little Home'),
    color: '#efc98d',
    size: 'square',
  },
  {
    id: 10,
    title: 'Little Things I Love About Humans',
    medium: 'Wood, Clay, Paint, Thread, Mixed Media',
    tags: ['Sculpture', 'Mixed Media'],
    year: '2025',
    dimensions: '6"x12"x6"',
    description: 'A celebration of the people who make my life special, each wrapped in a note that reminds me of them, created with laser cut slabs of wood, designed in Illustrator and hand-painted.',
    images: getImages('Little Things I Love About Humans', 'IMG_3058'),
    thumbs: getThumbs('Little Things I Love About Humans', 'IMG_3058'),
    color: '#a7bad6',
    size: 'wide',
  },
  {
    id: 13,
    title: 'Passengers',
    medium: 'Paper and Clay Sculpture',
    tags: ['Sculpture'],
    year: '2026',
    dimensions: '36" x 36" x 24"',
    description: 'A piece about exploitation, based on the extinction of the passenger pigeon. While passenger pigeons were not cognizant or powerful enough to escape human violence, often we have the power to choose our own safety. I chose to create a fragile, ephemeral sculpture of my own proportions with a gaping center to recreate how I have denied myself agency in times of vulnerability, and vow to value self-determination.',
    images: getImages('Passengers'),
    thumbs: getThumbs('Passengers'),
    color: '#9dc2d4',
    size: 'wide',
  },
  {
    id: 15,
    title: 'Scraps',
    medium: 'Silkscreen and Cyanotype',
    tags: ['Silkscreen'],
    year: '2026',
    dimensions: '60" x 66"',
    description: 'Using pieces of my previous artwork, I created a large-scale silkscreen and cyanotype print to repurpose old materials.',
    images: getImages('Scraps'),
    thumbs: getThumbs('Scraps'),
    color: '#efc98d',
    size: 'square',
  },
  {
    id: 17,
    title: 'Thank You',
    medium: 'Silkscreen',
    tags: ['Silkscreen', 'Book Arts'],
    year: '2026',
    dimensions: '5.5" x 7"',
    description: 'An edition of 16 books, each page contains a poem I wrote in the last year, printed with silkscreen.',
    images: getImages('Thank You'),
    thumbs: getThumbs('Thank You'),
    color: '#e5a893',
    size: 'tall',
  },
  {
    id: 18,
    title: 'Open-Hearted: Thesis Setup',
    medium: 'Silkscreen, Photography, Handbound Book',
    tags: ['Silkscreen', 'Book Arts'],
    year: '2026',
    dimensions: '',
    description: 'The front corner of my thesis setup, featuring my first silkscreen this semester, a daily sketchbook that I handbound, and using a wall from my Little House as a backdrop.',
    images: getImages('Thesis Setup'),
    thumbs: getThumbs('Thesis Setup'),
    color: '#a7bad6',
    size: 'square',
  },
  {
    id: 20,
    title: '(F)light',
    medium: 'Cut Translucent Acrylic Installation',
    tags: ['Installation'],
    year: '2023',
    dimensions: '10\' x 10\'',
    description: 'An experiment with the laser cutter to create work that interacts with light and space.',
    images: getImages('(F)light', 'B5A1CA0F-9253-460B-8ACD-8DFBD921A9F3'),
    thumbs: getThumbs('(F)light', 'B5A1CA0F-9253-460B-8ACD-8DFBD921A9F3'),
    color: '#e9a6c8',
    size: 'tall',
  },
  {
    id: 21,
    title: 'Feeling Blue',
    medium: 'Cyanotype Collage',
    tags: ['Mixed Media'],
    year: '2024',
    dimensions: '3\' x 2\'',
    description: 'An experiment with cyanotype collage techniques.',
    images: getImages('Feeling Blue'),
    thumbs: getThumbs('Feeling Blue'),
    color: '#a7bad6',
    size: 'tall',
  },
  {
    id: 22,
    title: 'Finch In the Park',
    medium: 'Linocut',
    tags: ['Printmaking'],
    year: '2024',
    dimensions: '12" x 12"',
    description: 'A piece about the many symbols I associate with people I hold dear, as a repeating wallpaper.',
    images: getImages('Finch In the Park', 'IMG_2190'),
    thumbs: getThumbs('Finch In the Park', 'IMG_2190'),
    color: '#9dc2d4',
    size: 'square',
  },
  {
    id: 23,
    title: 'In the Forest',
    medium: 'Lithograph',
    tags: ['Printmaking'],
    year: '2023',
    dimensions: '16" x 12"',
    description: 'A wooded area I stumbled upon during a trip to Ireland as a teenager.',
    images: getImages('In the Forest'),
    thumbs: getThumbs('In the Forest'),
    color: '#cbd4a4',
    size: 'wide',
  },
  {
    id: 24,
    title: 'Jack and Zoe',
    medium: 'Lithograph',
    tags: ['Printmaking'],
    year: '2023',
    dimensions: '12" x 12"',
    description: 'A tender moment of my friends, Jack and Zoe, sleeping peacefully on my dorm floor.',
    images: getImages('Jack and Zoe'),
    thumbs: getThumbs('Jack and Zoe'),
    color: '#d8c3a5',
    size: 'square',
  },
  {
    id: 25,
    title: 'Love Comes Naturally Mural',
    medium: 'Mural',
    tags: ['Painting'],
    year: '2021',
    dimensions: '70\' x 10\'',
    description: 'A collaborative mural project exploring themes of love and community, painted with Gyöngy Szászvárosi and Kyra Kramer.',
    images: getImages('Love Comes Naturally Mural'),
    thumbs: getThumbs('Love Comes Naturally Mural'),
    color: '#a3c4bc',
    size: 'wide',
  },
];

/*
  Gallery order lives in art-order.json, a list of titles. Run `npm run dev`
  and use "arrange" on the art page to drag pieces around and save -- that
  rewrites the file. Anything missing from it lands at the end.
*/
const rank = (piece) => {
  const i = artOrder.indexOf(piece.title);
  return i === -1 ? artOrder.length : i;
};
export const visualArt = [...visualArtEntries].sort((a, b) => rank(a) - rank(b));

/*
  Writing is listed newest first. Dates are "Month YYYY"; poems from the same
  month fall back to id, so a later addition sits above an earlier one. The
  writing grid and the prev/next links on each poem both follow this order.
  `tags` drive the filter buttons on the writing tab.

  Poems can also carry an optional `layout`:
    align:   'center' to centre the poem (and its header) on the page
    columns: groups of stanzas to set side by side, each named by the
             stanza's first line, e.g. [['4a.', '4b.']]
    right:   stanzas to set right-aligned, each named by its first line
*/
const writingEntries = [
  {
    id: 1,
    title: 'Something Will Rise',
    genre: 'Poetry',
    tags: ['Nature', 'Acceptance', 'Lyric'],
    date: 'January 2026',
    excerpt: 'When you give yourself over to living / the days will break, bake, fold themselves over.',
    readTime: '1 min read',
    color: '#e5a893',
    content: `Some days,\nthe world will not want you,\nor you will not want the world—\nthere isn't much difference\nto shivering arms.\nOn those days,\nthe earth will still feel your wrinkled hands,\nwarm with water from the river,\nand keep its course.\n\nSome days,\nthe cold will ask for something you cannot give.\nSnow will fall, blanket itself.\nSpring will arrive,\ncolor the grass in pickerelweed and pusley\nwithout asking for permission.\n\nThere will come a morning of still air\ndense with breath that may not be yours.\nWhen you give yourself over to living\nthe days will break, bake, fold themselves over.\nWhether or not you join\nthe worms, the bread, the sun—\n
`,
  },
  {
    id: 2,
    title: 'Forgetful (A Florida Mouse)',
    genre: 'Poetry',
    tags: [ 'Abuse', 'Allegory', 'Lyric'],
    date: 'January 2026',
    excerpt: 'It is only safe to forage under the cover of stars.',
    readTime: '1 min read',
    color: '#bcb0dc',
    content: `It is only safe to forage under the cover of stars.\nYes—when He awakens, a fact I cannot escape.\nYes, each night I leave scrawny footprints, I find His precious, tufted wings.\nI know His comings, His goings. Once we were entwined in pointed\nnests, full of acorns, full of His great warmth. He gave fewer feathers,\npecked more fur from my skin. In the spoils He asked for, kept asking for.\nSometimes, I can give. Sometimes, your tail becomes a nest.\nEvery time, He will need. And He said He loved me, so it was true.\nI lost balance, then my shallow meat, but I gained something—\nHe said—so it was true. No. Even though He left my cold bones,\nI still need acorns. Under the faint light, I fill my mouth—\ntwo beady eyes open to darkness. I drop just one.
 ` },
  {
    id: 3,
    title: 'Fireflies',
    genre: 'Poetry',
    tags: ['Nature', 'Loss', 'Lyric'],
    date: 'January 2026',
    excerpt: 'Another night, you said, / another night.',
    readTime: '1 min read',
    color: '#a8b78d',
    content: `I saw the face of forever that night.
In the sticky air you hated,
in pine straw melting into
waxy puddles,
they took turns lighting, bruising,
resisting dusk.

Can I have this dance?

They whispered, hummed
waltzing around oaks, swaying
between blinking leaves, exchanging
roadside dust
for flecks of gold.

One arm stretched by groceries,
one linked with mine, you
tugged towards the big light
drawing our return to the hotel
at my plea, softening only
for just a little
longer.

Can I keep this, hold it, call it mine?

Another night, you said,
another night.

The air turned cold as you got smaller
brighter, vanished behind a sliding door.
Each tiny body dimmed,
grew sluggish, laid to rest.

The lobby went dark.
`
  },
  {
    id: 4,
    title: 'Dream Home',
    genre: 'Poetry',
    tags: ['Intimacy', 'Lyric'],
    date: 'January 2026',
    excerpt: 'It has a yellow door / that becomes a window to the sea / in the early sunrise.',
    readTime: '1 min read',
    color: '#efc98d',
    content: `
It has a yellow door\nthat becomes a window to the sea\nin the early sunrise.\nThere are papers strewn about, of what kind\nit doesn't matter,\nI paint in piles and you leave ink stains\nin quiet scratches\nthe kind that are alive\nthat are gently breathing.\n\nI can't say there is no pain\nbut it's smaller than the grapefruit\nI split in half\nand chew, slowly,\nas pink juice drips down my chin\nyou pour the rest, squeezed\ninto iced tea.\n\nWhat is sorrow anyway?\nIf it isn't something I can swallow,\nplace neatly between aging postcards and crumpled receipts,\ntuck in gently each night,\nand fold at the sides.\n\nI think the only things worth keeping fit neatly\nbetween our shoes, strewn near the door,\nin the sock drawer, unpaired,\nand in the lilt between breaths\ntraded in silence.\n\nI spent my whole life waiting\nfor the world to burst with seeds,\nto reveal its secrets of love and longing.\nWading into shores to watch them open\nthen close around me,\nsearching for a way to make myself wanted.\nBut somehow, in all my wandering\nI found the dishes in the sink,\nbathed in soap, juice, ink.
`,
  },
  {
    id: 5,
    title: 'A Week After My Birthday',
    genre: 'Poetry',
    tags: ['Loss', 'Memory', 'Minimalism', 'Lyric' ],
    date: 'January 2026',
    excerpt: `i know you love me. / Its just that i cried the whole day— / No.`,
    readTime: '1 min read',
    color: '#cbd4a4',
    content: `i know you love me.\nIt's just that i cried the whole day—\nNo.

i know you're busy. i know you have a lot going on—
What i mean to say is, i opened a pomelo this morning and
seeds spilled, tried to grip the edges of the plate,
juice dripped everywhere, my pants stained—
you would have laughed and
i would have remembered.

i'm not sure—
it's been a while, but
you're having a good day.
i hope`},
{
    id: 6,
    title: 'The Last Day',
    genre: 'Poetry',
    tags: ['Nature', 'Transformation', 'Mortality', 'Surrealism'],
    date: 'January 2026',
    excerpt: 'the fish / take the reeds, / take the oats, / and swim upstream again.',
    readTime: '1 min read',
    color: '#a6cee0',
    content: `Tonight the red sun
slithers around the river
to pry its way into my skull
and spill out its fiery guts.

What can I do when the sky presses from above? When
the soil pushes at my feet?
First: take my sore limbs,
bundle them, twist them into reeds,
let the stream weave oats into my legs.
Herons stretch winding necks
towards the swirling expanse,
dip their feathers in the water, emerge
blending with air.

The ground opens its great
muddy mouth
chews me gently,
washes with water,
melts with my raveled arms.
When the biting, seeking sun
crawls over the land
the fish
take the reeds,
take the oats,
and swim upstream again.
`,
  },
{
    id: 7,
    title: 'On the Way to Queens',
    genre: 'Poetry',
    tags: ['Belonging', 'Memory', 'Contemporary', 'Lyric'],
    date: 'June 2026',
    excerpt: `one of us ripping the other's tender flesh / into strings between teeth.`,
    readTime: '1 min read',
    color: '#9aa1c8',
    content: `The guy on the corner of 45th and 6th sold me three mangoes for five dollars.

I'd never paid for them before
never pulled one from a stand
only falling from lime green trees
as if swimming through thick air
tossed from hands smaller than fruit
nails caked with dirt.

Waiting for the 7, me and them
picking at itchy, reddish skin
one of us ripping the other's tender flesh
into strings between teeth.
Strangers pushing through strangers
or sleeping back-pressed to pillars
while a man's voice over the speaker drowns
in dripping juice
staining my button down
and wailing trains.
In my palm sits a sour, hard pit
the 7 stops to let us on
I toss what's left to hungry pigeons.
`},
{
    id: 8,
    title: 'Deus Ex Machina',
    genre: 'Poetry',
    tags: ['Attachment', 'Transformation', 'Humor', 'Fable', 'Prose'],
    date: 'July 2026',
    excerpt: `The pig plushie I took from the dumpster has one long tear right where its heart should be.`,
    readTime: '2 min read',
    color: '#c2a7e0',
    content: `The pig plushie I took from the dumpster
has one long tear
right where its heart should be.
Even so, it retains the sort of peace you only get
from a permanently sewn-on smile.
I saw it from across the quad—
perched on the corner,
on a journey like Odysseus on the sea.
I couldn't help but snatch it
from its tragic fate, play god, what have you,
and I brought it safely to my bed.
Examining it, I found a bag embroidered under each eye
and faded pinkish-gray cotton down.
I spent my whole afternoon sewing it shut
with some gloriously shiny, red thread.
When I finally tied up the last knot,
I asked it,
“Do you feel better now? Do you feel

whole?” It didn't respond, just smiled its little smile,
sat itself tall and dignified on the same curly tail.
Tenderly I looked at my uneven stitches,
a scar on the flesh

just as fixed as its face.
But even when I placed it on my nightstand,
it seemed to be staring
out my dorm window towards
the dumpster from whence it came.

Each night I steal a glance before
bed, expecting
something to change, but it's always
sitting there,
a perfectly stoic form. Last night I wanted
to pick it up, turn it over in my hands.
Maybe even sit myself down on the dresser
and look out the window
just to see what could be so special
about a hunk of trash and metal.
Instead, I just looked at it,

looking.
Then I turned over and went to sleep.
`},
  {
    id: 9,
    title: 'Someone’s',
    genre: 'Poetry',
    tags: ['Abuse', 'Identity','Transformation', 'Surrealism', 'Experimental'],
    date: 'September 2026',
    excerpt: 'My body wasn’t mine before you, either.',
    readTime: '1 min read',
    color: '#d9a5b3',
    content: `My body wasn’t mine before you, either.

It was long, unruly hair too beautiful to cut
too dense to run hands through—
even when it started crawling
sprouted from my arms, my chin, my chest
sprouted two legs and tried to walk away
tried to yank, unknot, cut away
her warm skin.

She covered us in this way,
wove limbs together
didn’t make me make any decisions and
held my—no—our
eyelids open to the tangles, pulled our
mouth long ways

sweetly.
It had been a while
before an our,
when I was—
when you
found us.
Coaxed her away
held us
gathered each strand neatly into place,
named us
yours.
Took a hand,
lifted legs onto feet,
kissed the skin
gently.

"But i don't remember how to walk."

"Nevermind then", you
said,
"I’ll carry."
`,
  },
  {
    id: 10,
    title: 'Still, Warm',
    genre: 'Poetry',
    tags: ['Tragedy', 'Contemporary', 'Lyric'],
    date: 'September 2026',
    excerpt: 'I took a silver train, and remembered / the soft, clinging snow',
    readTime: '1 min read',
    color: '#b5c7a3',
    content: `Along rows of company computers,
someone on another team chats about
the light blue, far-right crawling
across Germany,
while red pours over my screen—
from test failures, from token limits—
on this too warm September morning
I took a silver train, and remembered
the soft, clinging snow
that dragged me through,
dropped into my still warm hands,
staining pink as I cried
on the half-mile walk back to bed—8am—
after nine students were shot, two

dead in class.
At my desk: a fancy ergonomic keyboard
and still I save
all my money.
On the tv, a man in a crisp dark suit
tells my office
thousands of people drowned in Nepal
through grainy, gray footage and
crunchy audio until
my boss flicks it off.
`,
  },
  {
    id: 11,
    title: 'Open-Mouthed',
    genre: 'Poetry',
    tags: [ 'Nature','Vulnerability', 'Transformation', 'Philosophical', 'Lyric'],
    date: 'September 2026',
    excerpt: 'I eat and I give / I give.',
    readTime: '1 min read',
    color: '#a3c4bc',
    content: `I fed a flock of mallards at the park today.
The first cool day of fall, I saw them:
beaks tucked backwards into themselves
floating with the pushing wind
blinking ferociously.
My hands open
and close, open and close
around fallen nuts
as they take, swim away, and return again
with wide, expecting mouths
asking—no—confessing
for acorns, flitting their tails
exposing their tender underbellies
for only a morsel.
I get to my knees, dig for more,
lower my face to the gravel and dirt
press my nails into seeds, into water
open my mouth for acorns
I eat and I give
I give.
`,
  },
  {
    id: 12,
    title: 'My Supposed “Dream Home”',
    genre: 'Poetry',
    tags: ['Intimacy', 'Humor', 'Transformation', 'Experimental'],
    layout: { align: 'center', columns: [['4a.', '4b.']] },
    date: 'October 2026',
    excerpt: 'It has a yellow door / with a creak that laughs / every time the shower stops / just when I’ve added the conditioner.',
    readTime: '1 min read',
    color: '#f0b98a',
    content: `1.
It has a yellow door
with a creak that laughs
every time the shower stops
just when I’ve added the conditioner.

2.
This afternoon
I baked a pumpkin pie,
a squash pie
and I bravely wiped its vomited excess
from the oven over and over until again, that sound crinkled
from your mouth
into the walls.

3.
I can hear it even when we’re not in the same room, when I’m here, holding pie guts, and you’re
ten feet away in the bed-bath-living room, giving me that mischievous smile,
the kind you only bring out for those big dogs wearing tiny shoes
and my persistently orange hands.

4a.
I mop the floor before even thinking about washing my hands
you glance over, say
“You missed a spot”
I glare at your empty hands
at the smug way you put down your bowl of late-afternoon berries
and dip a paper towel gently to the ground until it comes up

4b.
I go to the sink, scrubbing my skin until it resembles something that once was pink
and with a raised eyebrow you
dump a handful of berries in your mouth
and spread the mess around until the floors, the furniture, the door, it’s all


5.
orange.
`,
  },
  {
    id: 13,
    title: 'The Fly in My Apartment',
    genre: 'Poetry',
    tags: ['Mortality', 'Humor', 'Minimalism'],
    date: 'October 2026',
    excerpt: 'Do you think he waited for the elevator / or flew with the wind / and felt the air on his tiny, fly chest?',
    readTime: '1 min read',
    color: '#c9b8e8',
    content: `Must've flown seven floors
just to twirl around my desk lamp
looking for a sun on these
flat, white walls.
Do you think he waited for the elevator
or flew with the wind
and felt the air on his tiny, fly chest?

I watch him fly
out of the lamp,
into the kitchen,
into the fly trap.
`,
  },
  {
    id: 14,
    title: 'Listening',
    genre: 'Poetry',
    tags: ['Loss', 'Memory', 'Intimacy', 'Lyric'],
    date: 'October 2026',
    excerpt: 'each color splayed on the water / you knew / we knew',
    readTime: '1 min read',
    color: '#9fc3d6',
    content: `You broke up with me a week later
told me you didn’t love me
maybe never had
but at Niagara
a night bus, my head in your lap
each color splayed on the water
you knew
we knew
just a trick of the light
and you told the bartender you were old enough
and he believed you,
and I believed you,
on the floor of your bedroom
with two roommates listening,
that I could still see those colors
on your face
on your hands
on your bed.
`,
  },
  {
    id: 15,
    title: 'Strange Bird',
    genre: 'Poetry',
    tags: ['Belonging', 'Identity', 'Allegory', 'Fable'],
    date: 'October 2026',
    excerpt: 'Strange bird, strange bird / they all still say',
    readTime: '1 min read',
    color: '#d8c3a5',
    content: `In winter’s white plush,
a bird arrived
“Too early! Too small!”
the flock screeched all night.

As nests emptied out,
birds chattered above,
and baby bird burrowed
herself underground.

When hatchlings paired off,
she called out “Coo, coo!”
but they said “Who’s that?
I don’t know you.”

“Please can we be friends?”
baby bird tried,
but “strange bird,” they called
and flew right by.

As wings whipped away,
baby begged, “Why, why?”
but none would tell
so she ripped at the sky.

She clawed at the bark
to pull at its seams
then baby bird vanished
into thickets of trees.

“Strange bird, strange bird”
they all still say
but baby bird smiles,
and alone, she stays.
`,
  },
  {
    id: 16,
    title: 'Patient Reports',
    genre: 'Poetry',
    tags: ['Pain', 'Art-Making', 'Experimental'],
    date: 'October 2026',
    excerpt: 'you’re made of strands and knots',
    readTime: '1 min read',
    color: '#c7a3c9',
    layout: {
      right: [
        'A dull ache in both hands that steadily increases in severity through the day.',
        'Stiffness and cracking, left wrist, prominent in the thumb.',
        'Typing, texting, and lifting a pencil are painful, so she uses speech-to-text for most daily tasks.',
        'She reports wearing wrist braces on both arms every night, but still waking up each morning in pain.',
        'Duration of pain: approximately five years. Ranked 7/10 on the scale. This is the third time she has sought care, previous scans inconclusive.',
      ],
    },
    content: `A dull ache in both hands that steadily increases in severity through the day.

You pull the needle through one hour each day, an inch of purple at the right ventricle, follow the curve up until the right atrium, then switch to light blue thread.

Stiffness and cracking, left wrist, prominent in the thumb.

The aorta tails off at the top, stretches along the arm into arteries. Connect them to the fabric at the wrist, so when you lift your arms it stretches, tangles, reminds you that…

Typing, texting, and lifting a pencil are painful, so she uses speech-to-text for most daily tasks.

you’re made of strands and knots and any day you could become too wound to move or too frayed to keep lifting, or your needle could get stuck and then you’d have to start over—

She reports wearing wrist braces on both arms every night, but still waking up each morning in pain.

on the painted section, and you don’t want to do that because you’ve already spent twenty hours making sure each thread is in the right place and

Duration of pain: approximately five years. Ranked 7/10 on the scale. This is the third time she has sought care, previous scans inconclusive.

you’re tired.
`,
  },
];

/*
  Writing tags are either about what a piece is about (theme) or how it is
  built (structure, form and register). Anything not listed here is a theme;
  the writing tab colours the two kinds differently.
*/
const STRUCTURE_TAGS = new Set([
  'Allegory', 'Contemporary', 'Experimental', 'Fable', 'Humor', 'Lyric',
  'Minimalism', 'Philosophical', 'Prose', 'Surrealism',
]);
export const writingTagKind = (tag) => (STRUCTURE_TAGS.has(tag) ? 'structure' : 'theme');

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
  'august', 'september', 'october', 'november', 'december'];

// "September 2026" -> 202608, sortable as a plain number.
function monthValue(date) {
  const [month, year] = date.toLowerCase().split(' ');
  return Number(year) * 100 + MONTHS.indexOf(month);
}

export const writing = [...writingEntries].sort(
  (a, b) => monthValue(b.date) - monthValue(a.date) || b.id - a.id,
);
