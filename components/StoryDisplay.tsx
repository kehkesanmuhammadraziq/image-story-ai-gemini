
import React, { useState } from 'react';

interface StoryDisplayProps {
  story: {
    english: string;
    urdu: string;
  };
  imageUrl: string;
  onReset: () => void;
}

type Language = 'english' | 'urdu';

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, imageUrl, onReset }) => {
  const [activeTab, setActiveTab] = useState<Language>('english');

  const tabButtonClasses = (lang: Language) => 
    `px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors duration-200 ${
      activeTab === lang
        ? 'bg-indigo-600 text-white shadow'
        : 'text-slate-300 hover:bg-slate-700/50'
    }`;
    
  return (
    <div className="w-full animate-fade-in space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="w-full h-80 rounded-lg overflow-hidden shadow-lg">
          <img src={imageUrl} alt="Generated story subject" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col h-80">
            <div className="flex-shrink-0 mb-4 p-1 space-x-1 bg-slate-700/50 rounded-lg self-start">
                <button className={tabButtonClasses('english')} onClick={() => setActiveTab('english')}>
                    English
                </button>
                <button className={tabButtonClasses('urdu')} onClick={() => setActiveTab('urdu')}>
                    اردو
                </button>
            </div>
            <div className="bg-slate-700/50 p-6 rounded-lg overflow-y-auto flex-grow">
              <h2 className="text-xl font-bold text-indigo-400 mb-3">The Story Unfolds...</h2>
              {activeTab === 'english' && (
                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {story.english}
                </p>
              )}
              {activeTab === 'urdu' && (
                <p dir="rtl" lang="ur" className="text-slate-300 whitespace-pre-wrap leading-relaxed text-right">
                  {story.urdu}
                </p>
              )}
            </div>
        </div>

      </div>
      <button
        onClick={onReset}
        className="w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-600 transition-colors duration-300 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9a9 9 0 0114.13-4.13M20 15a9 9 0 01-14.13 4.13" />
        </svg>
        Start Over with a New Image
      </button>
    </div>
  );
};
