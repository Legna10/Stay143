import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from '../../firebase';
import './Stay.css';

const challenges = [
  {
    title: "BlackPinkScanner",
    description:
      "The BlackPink manager found a mysterious image — fans whisper it hides their next comeback script. Can you uncover it?\n\n💡Some messages aren’t seen — they’re described, abstracted, or quietly commented.",
    file: "/stay/CB.jpg",
  },
  {
    title: "SKZMessage^",
    description:
      "Stray Kids sent you a strange image. It looks normal — but they’re known for hiding things deep. Can you find the full message?\n\n 💡Look closer. Some secrets are hidden softly, not loudly. Layers matter.",
    file: "/stay/fromskz.jpg"
  },
  {
    title: "an unforgettable concert",
    description:
      "Someone captured this unforgettable concert — but there's more hidden than just memories.\n\n 💡Don't forget the date and who showed up. Sometimes, digital traces say more than words.",
    file: "/stay/unforgettable_concert.jpg"
  }
];

const Stay = () => {
  const [status, setStatus] = useState({});
  const [loadingChallenge, setLoadingChallenge] = useState(null);

  useEffect(() => {
    const fetchSolved = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const solvedStatus = {};
      for (const c of challenges) {
        const docRef = doc(db, 'users', user.uid, 'solved', c.title);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          solvedStatus[c.title] = 'solved';
        }
      }
      setStatus(solvedStatus);
    };

    fetchSolved();
  }, []);

  const handleSubmit = async (e, title) => {
    e.preventDefault();
    const input = e.target.elements.flag.value;
    const user = auth.currentUser;

    if (!user) return;

    setLoadingChallenge(title);

    const res = await fetch('/.netlify/functions/validate-flag', {
      method: 'POST',
      body: JSON.stringify({ title, flag: input }),
    });

    const data = await res.json();

    if (data.success) {
      await setDoc(doc(db, 'users', user.uid, 'solved', title), {
        solvedAt: new Date(),
      });
      setStatus((prev) => ({ ...prev, [title]: 'solved' }));
    } else {
      setStatus((prev) => ({ ...prev, [title]: 'wrong' }));
    }

    setLoadingChallenge(null);
  };

  return (
    <div className="stay-container">
      <h1 className="stay-title">Stay Challenge</h1>
      <div className="stay-grid">
        {challenges.map((challenge, index) => (
          <div className="stay-card" key={index}>
            <h2 className="title-card">{challenge.title}</h2>
            <p className="description-card">
              {challenge.description.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <a href={challenge.file} download className="attach-file">📎 Attach File</a>

            <form onSubmit={(e) => handleSubmit(e, challenge.title)} className="flag-form">
              {status[challenge.title] === 'solved' ? (
                <button type="button" disabled>Submitted</button>
              ) : loadingChallenge === challenge.title ? (
                <button type="button" disabled>⏳ Submitting...</button>
              ) : (
                <>
                  <input type="text" name="flag" placeholder="Stay{}" required />
                  <button type="submit">Submit</button>
                </>
              )}
              {status[challenge.title] === 'wrong' && (
                <p style={{ color: 'red', marginTop: '8px' }}>❌ Wrong flag!</p>
              )}
            </form>
          </div>
        ))}

        <div className="stay-card coming-soon">
          <h2 className="title-card">More to come</h2>
          <p className="description-card"></p>
        </div>
      </div>
    </div>
  );
};

export default Stay;
