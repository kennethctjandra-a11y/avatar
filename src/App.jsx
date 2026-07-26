import { useEffect, useState } from 'react';
import { STEPS } from './questions';
import { load, save, clear, EMPTY } from './utils/storage';
import ProgressBar from './components/ProgressBar';
import AvatarForm from './components/AvatarForm';
import Welcome from './screens/Welcome';
import ExportView from './screens/ExportView';

export default function App() {
  const [saved] = useState(load);
  const [owner, setOwner] = useState(saved.owner);
  const [answers, setAnswers] = useState(saved.answers);
  const [stepIndex, setStepIndex] = useState(saved.stepIndex || 0);
  const [screen, setScreen] = useState('welcome');

  // Autosave. Debounced so typing doesn't hit localStorage on every keystroke.
  useEffect(() => {
    const id = setTimeout(
      () => save({ owner, answers, stepIndex, startedAt: saved.startedAt || Date.now() }),
      400,
    );
    return () => clearTimeout(id);
  }, [owner, answers, stepIndex, saved.startedAt]);

  // New question, new screenful — start at the top of it.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [screen, stepIndex]);

  const setField = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }));

  const hasProgress = Object.values(saved.answers || {}).some((v) => v?.trim?.());

  function next() {
    if (stepIndex + 1 < STEPS.length) setStepIndex(stepIndex + 1);
    else setScreen('export');
  }

  function back() {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
    else setScreen('welcome');
  }

  function startOver() {
    if (!window.confirm('This erases the avatar you just built. Are you sure?')) return;
    clear();
    setOwner({ ...EMPTY.owner });
    setAnswers({});
    setStepIndex(0);
    setScreen('welcome');
  }

  if (screen === 'welcome') {
    return (
      <Welcome
        owner={owner}
        setOwner={setOwner}
        hasProgress={hasProgress}
        onStart={() => {
          setStepIndex(0);
          setScreen('steps');
        }}
        onResume={() => setScreen('steps')}
      />
    );
  }

  const step = STEPS[stepIndex];

  return (
    <div className="min-h-dvh">
      {screen === 'steps' && (
        <>
          <ProgressBar sectionId={step.section} stepIndex={stepIndex} totalSteps={STEPS.length} />
          <AvatarForm
            step={step}
            stepIndex={stepIndex}
            totalSteps={STEPS.length}
            answers={answers}
            onChange={setField}
            onBack={back}
            onNext={next}
          />
        </>
      )}

      {screen === 'export' && (
        <ExportView
          answers={answers}
          owner={owner}
          onBack={() => {
            setStepIndex(STEPS.length - 1);
            setScreen('steps');
          }}
          onStartOver={startOver}
        />
      )}
    </div>
  );
}
