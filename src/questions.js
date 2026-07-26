// The whole guided flow lives here. Screens render from this, so adding or
// rewording a question is a one-line change.

export const SECTIONS = [
  {
    id: 'profile',
    title: 'Who They Are',
    emoji: '👤',
    heading: 'Paint a picture of the exact person you serve.',
  },
  {
    id: 'dreams',
    title: 'What They Want',
    emoji: '✨',
    heading: 'What does your person desperately want their life to look like?',
  },
  {
    id: 'pains',
    title: "What's In The Way",
    emoji: '🪨',
    heading: "What's the gap between where they are and where they want to be?",
  },
  {
    id: 'solutions',
    title: 'How You Help',
    emoji: '🌉',
    heading: 'Now show them the bridge.',
  },
];

export const STEPS = [
  // ---------- Profile ----------
  {
    id: 'name',
    section: 'profile',
    headline: "What's their name?",
    help: "Give them a real name. “Steve” works better than “my target customer.”",
    fields: [{ key: 'name', label: 'Name or nickname', placeholder: 'Steve', type: 'text' }],
  },
  {
    id: 'basics',
    section: 'profile',
    headline: 'Tell me the basics.',
    help: 'Rough is fine. You are sketching, not filling out a form.',
    fields: [
      { key: 'age', label: 'How old are they?', placeholder: '34', type: 'text' },
      { key: 'gender', label: 'Man or woman?', placeholder: 'Man', type: 'text' },
      {
        key: 'background',
        label: 'Where did they come from?',
        placeholder: 'Grew up middle class, first in his family to start a business...',
        rows: 3,
      },
    ],
  },
  {
    id: 'life',
    section: 'profile',
    headline: 'What does a normal day look like for them?',
    help: 'Where they live, what they do all day, what they do for fun.',
    fields: [
      { key: 'location', label: 'Where do they live?', placeholder: 'Suburb outside Dallas', type: 'text' },
      {
        key: 'dailyLife',
        label: 'Walk me through their day',
        placeholder: 'Up at 5:30, gym, school run, at the shop by 8, home late, scrolls in bed...',
        rows: 4,
      },
      { key: 'hobbies', label: 'What do they do for fun?', placeholder: 'Fishing, college football, smoking meat', type: 'text' },
    ],
  },
  {
    id: 'personality',
    section: 'profile',
    headline: 'Describe them in three words.',
    help: 'Then paint a fuller picture of who they are.',
    fields: [
      { key: 'personalityWords', label: 'Three words', placeholder: 'Stubborn, loyal, tired', type: 'text' },
      {
        key: 'personality',
        label: 'What they are like (optional)',
        placeholder: 'A short sketch of who this person is...',
        rows: 5,
      },
    ],
  },
  {
    id: 'situation',
    section: 'profile',
    headline: "What's going on in their life right now?",
    help: 'Their work, their money, the people around them. The real version, not the highlight reel.',
    fields: [
      {
        key: 'situation',
        label: 'Where they are today',
        placeholder: 'Business does $180k but he pays himself last. Marriage is fine but quiet...',
        rows: 6,
      },
    ],
  },
  {
    id: 'beliefs',
    section: 'profile',
    headline: 'What do they believe in?',
    help: 'The rules they live by. What they would never do. What they think success means.',
    fields: [
      {
        key: 'beliefs',
        label: 'What matters most to them',
        placeholder: 'Hard work should pay off. You take care of your family first...',
        rows: 5,
      },
    ],
  },

  // ---------- Dreams ----------
  {
    id: 'dream-mental',
    section: 'dreams',
    headline: 'What does their ideal mind feel like?',
    help: 'Not their goals. The feeling of waking up in the life they want.',
    fields: [{ key: 'mentalDream', label: 'Their dream headspace', placeholder: 'Calm. Not checking his phone at 11pm...', rows: 5 }],
  },
  {
    id: 'dream-physical',
    section: 'dreams',
    headline: 'What does their body look like in their dream?',
    help: 'Energy, strength, health, how they feel in the mirror.',
    fields: [{ key: 'physicalDream', label: 'Their dream body', placeholder: 'Can play with his kids without getting winded...', rows: 5 }],
  },
  {
    id: 'dream-spiritual',
    section: 'dreams',
    headline: 'What does peace or purpose look like for them?',
    help: 'Faith, meaning, feeling like their life adds up to something.',
    fields: [{ key: 'spiritualDream', label: 'Their dream peace', placeholder: 'Feels like the work means something beyond the money...', rows: 5 }],
  },
  {
    id: 'dream-wealth',
    section: 'dreams',
    headline: 'What do they want their work and money to look like?',
    help: 'Real numbers help. What does the bank account say in the dream?',
    fields: [{ key: 'wealthDream', label: 'Their dream work and money', placeholder: '$40k months, a team that runs it without him...', rows: 5 }],
  },
  {
    id: 'dream-freedom',
    section: 'dreams',
    headline: 'What does freedom look like for them?',
    help: 'Freedom with their time, where they live, and their money.',
    fields: [{ key: 'freedomDream', label: 'Their dream freedom', placeholder: 'Takes Fridays off. Two real vacations a year...', rows: 5 }],
  },
  {
    id: 'dream-relationships',
    section: 'dreams',
    headline: 'What do they want their family and friendships to look like?',
    help: 'Marriage, kids, friends, the people they want in their corner.',
    fields: [{ key: 'relationshipsDream', label: 'Their dream relationships', placeholder: 'His wife looks at him the way she used to...', rows: 5 }],
  },

  // ---------- Pains ----------
  {
    id: 'pain-health',
    section: 'pains',
    headline: "Health: what's stopping them?",
    help: 'The big obvious problem, then the real one underneath it.',
    fields: [
      { key: 'healthMajorPain', label: 'The problem they talk about', placeholder: "“I'm just tired all the time.”", rows: 3 },
      { key: 'healthMinorPain', label: "The real one they won't say out loud", placeholder: 'He thinks it is too late for him to change.', rows: 3 },
    ],
  },
  {
    id: 'pain-wealth',
    section: 'pains',
    headline: "Money and work: what's stopping them?",
    help: 'What have they already tried that did not work?',
    fields: [
      { key: 'wealthMajorPain', label: 'The problem they talk about', placeholder: "“I can't find good people.”", rows: 3 },
      { key: 'wealthMinorPain', label: "The real one they won't say out loud", placeholder: 'He is scared that without him the whole thing falls apart.', rows: 3 },
    ],
  },
  {
    id: 'pain-relationships',
    section: 'pains',
    headline: "The people in their life: what's stopping them?",
    help: 'What does this cost them at home?',
    fields: [
      { key: 'relationshipsMajorPain', label: 'The problem they talk about', placeholder: '"We just never get time together."', rows: 3 },
      { key: 'relationshipsMinorPain', label: "The real one they won't say out loud", placeholder: 'He is afraid his kids will remember him as the guy who was never there.', rows: 3 },
    ],
  },

  // ---------- Solutions ----------
  {
    id: 'sol-health',
    section: 'solutions',
    headline: 'How do you fix the health problem?',
    help: 'What changes for them once they work with you?',
    fields: [{ key: 'healthSolution', label: 'What you do about it', placeholder: 'We build a routine that survives a 60 hour week...', rows: 5 }],
  },
  {
    id: 'sol-wealth',
    section: 'solutions',
    headline: 'How do you fix the money and work problem?',
    help: 'Be specific. What is different 90 days in?',
    fields: [{ key: 'wealthSolution', label: 'What you do about it', placeholder: 'We replace him in the two roles eating his week...', rows: 5 }],
  },
  {
    id: 'sol-relationships',
    section: 'solutions',
    headline: 'How do you fix the relationship problem?',
    help: 'Even if it happens as a side effect of the other work, say so.',
    fields: [{ key: 'relationshipsSolution', label: 'What you do about it', placeholder: 'Getting his Fridays back gives him his family back...', rows: 5 }],
  },
  {
    id: 'sol-mechanism',
    section: 'solutions',
    headline: 'What makes your way different?',
    help: 'The thing you do that nobody else in your space does.',
    fields: [{ key: 'mechanism', label: 'Your way of doing it', placeholder: 'Most coaches start with the funnel. We start with the calendar...', rows: 5 }],
  },
  {
    id: 'sol-proof',
    section: 'solutions',
    headline: 'What proof do you have that it works?',
    help: 'Numbers, names, results, your own story. Anything real.',
    fields: [{ key: 'proof', label: 'Your proof', placeholder: '11 clients past $1M. My own shop went from 70 hours to 30...', rows: 5 }],
  },
];

export const STEPS_BY_SECTION = SECTIONS.map((section) => ({
  ...section,
  steps: STEPS.filter((step) => step.section === section.id),
}));

export const ALL_FIELD_KEYS = STEPS.flatMap((step) => step.fields.map((f) => f.key));
