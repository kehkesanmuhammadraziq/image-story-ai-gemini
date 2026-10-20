
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StoryDisplay } from './components/StoryDisplay';
import { Loader } from './components/Loader';
import { generateStoryFromImage } from './services/geminiService';
import { toBase64 } from './utils/imageUtils';

export default function App(): React.ReactNode {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [story, setStory] = useState<{ english: string; urdu: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    resetState();
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const resetState = () => {
    setImageFile(null);
    setImageUrl(null);
    setStory(null);
    setError(null);
    setIsLoading(false);
  };
  
  const handleGenerateStory = useCallback(async () => {
    if (!imageFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setStory(null);
    setError(null);

    try {
      const base64Image = await toBase64(imageFile);
      const generatedStory = await generateStoryFromImage(base64Image, imageFile.type);
      setStory(generatedStory);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {isLoading && <Loader />}
      <Header />
      <main className="w-full max-w-4xl mx-auto flex-grow flex flex-col items-center">
        <div className="w-full bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-700 p-8 mt-8 space-y-6">
          {!story && (
            <>
              <ImageUploader onImageUpload={handleImageUpload} imageUrl={imageUrl} />
              {error && <p className="text-center text-red-400 font-medium">{error}</p>}
              <button
                onClick={handleGenerateStory}
                disabled={!imageFile || isLoading}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center text-lg"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Generate Story
              </button>
            </>
          )}

          {story && imageUrl && (
            <StoryDisplay story={story} imageUrl={imageUrl} onReset={resetState} />
          )}
        </div>
      </main>
    </div>
  );
}
