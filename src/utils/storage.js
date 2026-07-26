const KEY = 'dream-avatar-v1';

const EMPTY = {
  owner: { name: '', instagram: '' },
  answers: {},
  stepIndex: 0,
  startedAt: null,
};

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const saved = JSON.parse(raw);
    // Merge rather than replace, so a saved file from an older version of the
    // app still opens after new fields are added.
    return {
      ...EMPTY,
      ...saved,
      owner: { ...EMPTY.owner, ...(saved.owner || {}) },
      answers: { ...(saved.answers || {}) },
    };
  } catch {
    return { ...EMPTY };
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    // Private browsing or a full quota. Not worth interrupting the user over.
    return false;
  }
}

export function clear() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* nothing to do */
  }
}

export { EMPTY };
