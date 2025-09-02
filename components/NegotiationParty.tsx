
import React from 'react';
import { PartyInput } from '../types';

interface NegotiationPartyProps {
  partyName: 'A' | 'B';
  input: PartyInput;
  setInput: (input: PartyInput) => void;
  color: string;
}

const NegotiationParty: React.FC<NegotiationPartyProps> = ({ partyName, input, setInput, color }) => {
  const handleInputChange = <K extends keyof PartyInput,>(
    field: K,
    value: PartyInput[K]
  ) => {
    setInput({ ...input, [field]: value });
  };

  const placeholders = {
    A: {
      position: `e.g., "I am asking for an annual salary of $110,000."`,
      interests: `e.g., "To match my market value, cover increased living costs, and reflect my new responsibilities."`,
      constraints: `e.g., "My goal is to also secure a comprehensive benefits package and a clear path for promotion."`,
    },
    B: {
      position: `e.g., "We are offering a starting salary of $95,000."`,
      interests: `e.g., "We need to stay within our Q3 budget for this role while attracting top talent."`,
      constraints: `e.g., "The maximum salary for this pay band is $105,000, but we can offer a significant performance bonus and a professional development budget."`,
    },
  };

  const currentPlaceholders = placeholders[partyName];

  return (
    <div className={`bg-slate-800 rounded-lg shadow-lg w-full border-t-4 ${color}`}>
      <div className="p-6">
        <h2 className={`text-2xl font-semibold text-white mb-4`}>Party {partyName}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor={`position-${partyName}`} className="block text-sm font-medium text-slate-300 mb-1">
              Position (What you want)
            </label>
            <textarea
              id={`position-${partyName}`}
              rows={3}
              className="w-full bg-slate-700 text-white rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2 transition"
              placeholder={currentPlaceholders.position}
              value={input.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`interests-${partyName}`} className="block text-sm font-medium text-slate-300 mb-1">
              Interests (Why you want it) - <span className="text-yellow-400 font-bold">Confidential</span>
            </label>
            <textarea
              id={`interests-${partyName}`}
              rows={4}
              className="w-full bg-slate-700 text-white rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2 transition"
              placeholder={currentPlaceholders.interests}
              value={input.interests}
              onChange={(e) => handleInputChange('interests', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`constraints-${partyName}`} className="block text-sm font-medium text-slate-300 mb-1">
              Constraints & Goals - <span className="text-yellow-400 font-bold">Confidential</span>
            </label>
            <textarea
              id={`constraints-${partyName}`}
              rows={3}
              className="w-full bg-slate-700 text-white rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2 transition"
              placeholder={currentPlaceholders.constraints}
              value={input.constraints}
              onChange={(e) => handleInputChange('constraints', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegotiationParty;
