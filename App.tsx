
import React, { useState } from 'react';
import Header from './components/Header';
import NegotiationParty from './components/NegotiationParty';
import ResultDisplay from './components/ResultDisplay';
import { PartyInput } from './types';
import { mediateNegotiation } from './services/geminiService';

const App: React.FC = () => {
  const [partyAInput, setPartyAInput] = useState<PartyInput>({
    position: '',
    interests: '',
    constraints: '',
  });

  const [partyBInput, setPartyBInput] = useState<PartyInput>({
    position: '',
    interests: '',
    constraints: '',
  });

  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleNegotiate = async () => {
    if (!partyAInput.position || !partyAInput.interests || !partyBInput.position || !partyBInput.interests) {
      setError("Please ensure both parties have filled out at least their 'Position' and 'Interests'.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await mediateNegotiation(partyAInput, partyBInput);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <NegotiationParty
              partyName="A"
              input={partyAInput}
              setInput={setPartyAInput}
              color="border-blue-500"
            />
            <NegotiationParty
              partyName="B"
              input={partyBInput}
              setInput={setPartyBInput}
              color="border-teal-500"
            />
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleNegotiate}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 px-10 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
            >
              {isLoading ? 'Mediating...' : 'Find Solution'}
            </button>
          </div>
          
          <div className="mt-6">
             <ResultDisplay result={result} isLoading={isLoading} error={error} />
          </div>
        </main>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Negotiation Mediator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
