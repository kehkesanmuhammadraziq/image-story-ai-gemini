
import React from 'react';

export const CloudRunDeploy: React.FC = () => {
    const repoUrl = 'https://github.com/GoogleCloudPlatform/generative-ai-docs-samples';
    const dir = 'gemini/sample-apps/image-story-app-react-ts';
    const deployUrl = `https://deploy.cloud.run/?git_repo=${encodeURIComponent(repoUrl)}&dir=${encodeURIComponent(dir)}`;

  return (
    <div className="w-full max-w-4xl mt-12 text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
      <h3 className="text-xl font-bold text-slate-100">Deploy Your Own Version</h3>
      <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
        Want to run this application yourself? Click the button below to deploy this app to Google Cloud Run with a single click.
      </p>
      <a
        href={deployUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-ml-1 mr-2 h-5 w-5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="M12 11.13c-2.28.46-4.5 2.39-4.5 4.87 0 0 .14 1.5 2.5 2.5"></path>
        </svg>
        Deploy to Cloud Run
      </a>
    </div>
  );
};
