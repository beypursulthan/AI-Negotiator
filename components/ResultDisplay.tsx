
import React from 'react';

interface ResultDisplayProps {
  result: string | null;
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-slate-300">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mb-4"></div>
          <p className="text-lg">AI mediator is analyzing the inputs...</p>
          <p className="text-sm text-slate-400">Please wait a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-400">
          <h3 className="text-xl font-semibold mb-2">An Error Occurred</h3>
          <p className="bg-red-900/50 p-3 rounded-md">{error}</p>
        </div>
      );
    }

    if (result) {
        // Simple markdown-like replacement for ### headers
        const formattedResult = result.replace(/### (.*)/g, '<h3 class="text-xl font-semibold text-white mb-3">$1</h3>');
        return (
            <div
            className="prose prose-invert prose-p:text-slate-300 prose-headings:text-indigo-300 max-w-none whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: formattedResult }}
            />
        );
    }

    return (
      <div className="text-center text-slate-400">
        <p>The proposed solution will appear here once both parties have submitted their information.</p>
      </div>
    );
  };

  return (
    <div className="w-full bg-slate-800/50 rounded-lg shadow-inner p-8 min-h-[200px] flex items-center justify-center border border-slate-700">
      {renderContent()}
    </div>
  );
};

export default ResultDisplay;
