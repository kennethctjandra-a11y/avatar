import { PROGRAM, CREDIT } from '../brand';

// Turns raw answers into the finished, readable document. The on-screen
// preview, the PDF, and the clipboard copy all render from this, so they can
// never drift apart.

function line(label, value) {
  const text = (value || '').trim();
  return text ? { label, text } : null;
}

export function buildDocument(answers = {}) {
  const name = answers.name?.trim() || 'Your Person';

  const sections = [
    {
      id: 'profile',
      heading: 'Who They Are',
      lines: [
        line('Name', answers.name),
        line('Age', answers.age),
        line('Man or woman', answers.gender),
        line('Where they live', answers.location),
        line('Where they came from', answers.background),
        line('A normal day', answers.dailyLife),
        line('What they do for fun', answers.hobbies),
        line('In three words', answers.personalityWords),
        line('What they are like', answers.personality),
        line('Where they are today', answers.situation),
        line('What matters most to them', answers.beliefs),
      ].filter(Boolean),
    },
    {
      id: 'dreams',
      heading: `What ${name} Wants`,
      lines: [
        line('A clear mind', answers.mentalDream),
        line('A body that works', answers.physicalDream),
        line('Peace and purpose', answers.spiritualDream),
        line('Work and money', answers.wealthDream),
        line('Freedom', answers.freedomDream),
        line('Family and friends', answers.relationshipsDream),
      ].filter(Boolean),
    },
    {
      id: 'pains',
      heading: "What's In The Way",
      lines: [
        line('Health — what they say', answers.healthMajorPain),
        line('Health — the real problem', answers.healthMinorPain),
        line('Money and work — what they say', answers.wealthMajorPain),
        line('Money and work — the real problem', answers.wealthMinorPain),
        line('Family — what they say', answers.relationshipsMajorPain),
        line('Family — the real problem', answers.relationshipsMinorPain),
      ].filter(Boolean),
    },
    {
      id: 'solutions',
      heading: 'How You Help',
      lines: [
        line('For their health', answers.healthSolution),
        line('For their money and work', answers.wealthSolution),
        line('For their family', answers.relationshipsSolution),
        line('What makes your way different', answers.mechanism),
        line('Your proof', answers.proof),
      ].filter(Boolean),
    },
  ].filter((section) => section.lines.length > 0);

  return { name, sections };
}

export function toPlainText(doc, owner = {}) {
  const out = [`${PROGRAM.toUpperCase()} · AVATAR — ${doc.name.toUpperCase()}`];
  const by = [owner.name, owner.instagram && `@${owner.instagram.replace(/^@/, '')}`]
    .filter(Boolean)
    .join('  ');
  if (by) out.push(`Built by ${by}`);
  out.push('');

  for (const section of doc.sections) {
    out.push(section.heading.toUpperCase());
    out.push('');
    for (const { label, text } of section.lines) {
      out.push(`${label}:`, text, '');
    }
  }
  out.push('', `— ${CREDIT}`);
  return out.join('\n').trim();
}
