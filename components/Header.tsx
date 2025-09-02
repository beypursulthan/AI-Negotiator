
import React from 'react';
import ScaleIcon from './icons/ScaleIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 text-white">
      <div className="flex justify-center items-center gap-4 mb-4">
        <ScaleIcon className="w-12 h-12 text-indigo-400" />
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          AI Negotiation Mediator
        </h1>
      </div>
      <p className="max-w-3xl mx-auto text-slate-300">
        Enter your positions and confidential interests below. The AI will analyze both sides
        to propose a fair, mutually beneficial solution without revealing secrets.
      </p>
    </header>
  );
};

export default Header;
