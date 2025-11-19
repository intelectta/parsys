import React, { useState, useEffect } from 'react';
import './App.css';

const TOKENS = {
  "AI": "Artificial Intelligence",
  "ML": "Machine Learning",
  "LLM": "Large Language Model",
  "AGI": "Artificial General Intelligence",
  "RAG": "Retrieval Augmented Generation",
  "DAO": "Decentralized Autonomous Organization",
  "Web3": "Web 3.0",
  "NEXA": "Next Era",
  "QUARK": "Quantum Architecture",
  "VANTA": "Visionary AI Neural Technology Alliance",
  "AETHER": "Autonomous Emergent Thinking Hyper-Engine",
  "SYNAPSE": "Synthetic Neural Architecture",
  "B4": "Before",
  "CU2": "See You Too",
  "GR8": "Great",
  "L8R": "Later",
  "IMY": "I Miss You",
  "143": "I Love You",
  "YOLO": "You Only Live Once",
  "BRB": "Be Right Back",
  "XOXO": "Hugs and Kisses"
  // Add all 400+ tokens here or keep minimal
};

const HISTORY_KEY = "parsys_history";

function App() {
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('menu');

  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const log = (text) => {
    const entry = `[${new Date().toLocaleString()}] ${text}`;
    const newHistory = [entry, ...history].slice(0, 500);
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const decode = (code) => {
    const parts = code.toUpperCase().match(/[A-Z0-9]+/g) || [];
    return parts.map(p => TOKENS[p] || p).join(' ');
  };

  const genTech = () => {
    const prefixes = ["Open", "Deep", "Neural", "Quantum", "Meta", "Hyper", "Apex", "Nexus", "Helix", "Aether", "Grok", "Flux", "Arc"];
    const middles = ["AI", "ML", "LLM", "AGI", "RAG", "Web3", "DeFi", "DAO", "Labs", "Mind", "Core"];
    const suffixes = ["Labs", "Systems", "Institute", "Research", "Engine", "Protocol", "Foundation"];
    const parts = [];
    if (Math.random() > 0.3) parts.push(prefixes[Math.floor(Math.random() * prefixes.length)]);
    parts.push(middles[Math.floor(Math.random() * middles.length)]);
    parts.push(suffixes[Math.floor(Math.random() * suffixes.length)]);
    return parts.join('');
  };

  const genStartup = () => {
    const names = ["QuarkMind", "SynapseOS", "AetherMind", "NovaSpark", "OrionCortex", "VantaAI", "HelixCore", "LyraMind", "NeuraNest", "CortexWave"];
    const tags = ["The last AI company", "Intelligence without limits", "Awakening the machine soul", "One model to rule them all", "Reality, reimagined"];
    const stages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Series D"];
    return {
      name: names[Math.floor(Math.random() * names.length)],
      tagline: tags[Math.floor(Math.random() * tags.length)],
      stage: stages[Math.floor(Math.random() * stages.length)]
    };
  };

  const genBusiness = () => {
    const len = Math.floor(Math.random() * 3) + 3;
    let acr = '';
    let words = '';
    for (let i = 0; i < len; i++) {
      const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const word = ["Visionary", "Autonomous", "Neural", "Quantum", "Hyper", "Emergent", "Infinite", "Cognitive"][Math.floor(Math.random() * 8)];
      acr += letter;
      words += word + " ";
    }
    const suffix = ["Labs", "Systems", "Intelligence", "Technologies", "Alliance", "Engine"][Math.floor(Math.random() * 6)];
    return { acr, full: words + suffix };
  };

  const generate = (type, count = 20) => {
    log(`\nGENERATED ${count} ${type.toUpperCase()} NAMES:`);
    const results = [];
    const seen = new Set();

    for (let i = 0; i < count * 3; i++) {
      let item;
      if (type === 'tech') item = genTech();
      else if (type === 'startup') item = genStartup();
      else if (type === 'business') item = genBusiness();

      const key = typeof item === 'object' ? (item.name || item.acr) : item;
      if (!seen.has(key)) {
        seen.add(key);
        results.push(item);
        if (results.length >= count) break;
      }
    }

    results.forEach(item => {
      if (type === 'startup') {
        log(` ${item.name.padEnd(22)} ${item.tagline.padEnd(40)} ${item.stage}`);
      } else if (type === 'business') {
        log(` ${item.acr.padEnd(8)} → ${item.full}`);
      } else {
        log(` ${item}`);
      }
    });
  };

  return (
    <div className="App">
      <header className="header">
        <h1>PARSYS WEB</h1>
        <p>The legendary Parsys generator — now in your browser</p>
      </header>

      <div className="container">
        <div className="menu">
          <button onClick={() => setActiveTab('menu')} className="big-btn">Menu</button>
          <button onClick={() => { generate('tech', 20); setActiveTab('history'); }} className="big-btn">7 Gen Tech Names</button>
          <button onClick={() => { generate('startup', 15); setActiveTab('history'); }} className="big-btn">9 Gen Startup Ideas</button>
          <button onClick={() => { generate('business', 20); setActiveTab('history'); }} className="big-btn">6 Gen Business Acronyms</button>
          <button onClick={() => setActiveTab('history')} className="big-btn">0 History ({history.length})</button>
          <button onClick={() => setActiveTab('samples')} className="big-btn">8 Screenshot Samples</button>
        </div>

        {activeTab === 'menu' && (
          <div className="grid">
            <div className="card" onClick={() => { generate('tech', 30); setActiveTab('history'); }}>
              <h2>Gen Tech Names</h2>
              <p>OpenAI • DeepMind • Grok style</p>
            </div>
            <div className="card" onClick={() => { generate('startup', 15); setActiveTab('history'); }}>
              <h2>Gen Startup Ideas</h2>
              <p>Fundable names + taglines</p>
            </div>
            <div className="card" onClick={() => { generate('business', 25); setActiveTab('history'); }}>
              <h2>Gen Business Acronyms</h2>
              <p>VANTA • HELIX • IBM-style</p>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history">
            <h2>Generation History</h2>
            <pre>{history.join('\n') || 'No history yet — generate something!'}</pre>
          </div>
        )}

        {activeTab === 'samples' && (
          <div className="samples">
            <h2>Screenshot-Ready Samples</h2>
            <pre>{`gen-tech
NeuralLinkLabs     QuantumCortexInstitute     OpenAIEngine
DeepMindSystems    GrokXResearch              HelixProtocol

gen-startup
QuarkMind          The last AI company                  Seed → Series D
SynapseOS          Intelligence without limits          Pre-seed
AetherReasoning    From neurons to knowledge            Series A

gen-business
VANTA → Visionary Autonomous Neural Technology Alliance
HELIX → Hyper Emergent Learning Intelligence X
AETHER → Autonomous Emergent Thinking Hyper-Engine Labs`}</pre>
          </div>
        )}
      </div>

      <footer>
        <p>Made with ❤️ by the Parsys Legacy • All names saved forever</p>
      </footer>
    </div>
  );
}

export default App;
