
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center w-full max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
        ImageStory AI
      </h1>
      <p className="mt-2 text-lg text-slate-400">
        Upload an image and let Gemini's magic weave a tale.
      </p>
    </header>
  );
};
