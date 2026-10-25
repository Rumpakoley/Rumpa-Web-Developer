import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Volume2, Monitor } from 'lucide-react';
import { DeveloperProfile, Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface GarageCLIProps {
  profile: DeveloperProfile;
  soundEnabled: boolean;
  onToggleSound: () => void;
  crtEnabled: boolean;
  onToggleCRT: () => void;
  onSelectProject: (project: Project) => void;
  onOpenContact: (note?: string) => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const GarageCLI: React.FC<GarageCLIProps> = ({
  profile,
  soundEnabled,
  onToggleSound,
  crtEnabled,
  onToggleCRT,
  onSelectProject,
  onOpenContact,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const initialLogs: CommandLog[] = [
    {
      id: 'init-1',
      command: 'boot --garage-os',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-amber-400 font-semibold">GARAGE OS v1.8 (x86_64-pc-none-elf) [AI Garage Station]</p>
          <p className="text-slate-400">All subsystems nominal. Type <span className="text-amber-400 font-mono font-bold">help</span> to view available terminal routines.</p>
        </div>
      ),
      timestamp: '00:01:14',
    },
    {
      id: 'init-2',
      command: 'showcase --3d-timeline',
      output: (
        <p className="text-amber-300">
          ✓ Dual-axis 3D timeline online (10 glass cards active). Explore side projects above and commercial works below.
        </p>
      ),
      timestamp: '00:01:15',
    },
  ];

  const [logs, setLogs] = useState<CommandLog[]>(initialLogs);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    sound.playTerminalSuccess();
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let outputNode: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-amber-400 font-bold mb-1">AVAILABLE GARAGE ROUTINES:</p>
            <p><span className="text-amber-400 font-mono w-28 inline-block">showcase</span> Jump to 3D Timeline Chain</p>
            <p><span className="text-amber-400 font-mono w-28 inline-block">projects</span> List all 10 projects and experiments</p>
            <p><span className="text-amber-400 font-mono w-28 inline-block">inspect &lt;id&gt;</span> Open architecture modal for a project</p>
            <p><span className="text-amber-400 font-mono w-28 inline-block">cat profile</span> Display developer credentials and bio</p>
            <p><span className="text-amber-400 font-mono w-28 inline-block">skills</span> Print engineering competency matrix</p>
            <p><span className="text-amber-400 font-mono w-28 inline-block">contact</span> Launch inquiry dispatch sequence</p>
            <p><span className="text-amber-400 font-mono w-28 inline-block">sound</span> Toggle synthesized audio feedback ({soundEnabled ? 'ON' : 'OFF'})</p>
            <p><span className="text-amber-400 font-mono w-28 inline-block">crt</span> Toggle CRT scanline shader ({crtEnabled ? 'ON' : 'OFF'})</p>
            <p><span className="text-amber-400 font-mono w-28 inline-block">clear</span> Clear terminal buffer</p>
          </div>
        );
        break;

      case 'showcase':
      case 'timeline':
        outputNode = (
          <p className="text-amber-300">
            Navigating to 3D Timeline Chain...
          </p>
        );
        document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'projects':
      case 'ls':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-slate-400 font-semibold mb-1">INDEX OF 10 PROJECTS & EXPERIMENTS:</p>
            {PROJECTS.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-slate-500 font-mono">{p.completionYear}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${p.track === 'side_project' ? 'bg-amber-950 text-amber-400' : 'bg-orange-950 text-orange-400'}`}>
                  {p.track === 'side_project' ? 'LAB' : 'PROD'}
                </span>
                <button
                  onClick={() => onSelectProject(p)}
                  className="text-white hover:text-amber-300 underline font-mono text-left"
                >
                  {p.id}
                </button>
                <span className="text-slate-400 truncate text-[11px]">— {p.title.split('—')[0]}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'inspect':
        if (!arg) {
          outputNode = <p className="text-amber-400">Usage: inspect &lt;project-id&gt; (e.g. inspect pixelmatrix-ai)</p>;
        } else {
          const found = PROJECTS.find((p) => p.id.toLowerCase() === arg || p.id.toLowerCase().includes(arg));
          if (found) {
            outputNode = <p className="text-amber-400">Opening architecture inspector for {found.title}...</p>;
            onSelectProject(found);
          } else {
            outputNode = <p className="text-rose-400">Error: Project '{arg}' not found. Run 'projects' to see valid IDs.</p>;
          }
        }
        break;

      case 'cat':
      case 'profile':
      case 'bio':
        outputNode = (
          <div className="space-y-1.5 text-xs text-slate-300 border-l-2 border-amber-500 pl-3">
            <p className="text-white font-bold text-sm">{profile.name} — {profile.role}</p>
            <p className="text-slate-300">{profile.bio}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono text-amber-300">
              <div>XP: {profile.yearsExperience} Years</div>
              <div>SHIPPED: {profile.projectsCompleted} Projects</div>
              <div>SATISFACTION: {profile.satisfactionRate}</div>
              <div>LOCATION: {profile.location}</div>
            </div>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-amber-400 font-bold mb-1">ENGINEERING STACK:</p>
            <div>React 19 & Next.js     [████████████████████] 99% EXPERT</div>
            <div>TypeScript & Node.js    [██████████████████░░] 94% ADVANCED</div>
            <div>Tailwind CSS & Canvas   [████████████████████] 98% EXPERT</div>
            <div>Core Web Vitals Tuning  [████████████████████] 100% MASTER</div>
            <div>REST / WebSockets / AI  [█████████████████░░░] 91% ADVANCED</div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <p className="text-amber-300">
            Routing packet to intake dispatch console...
          </p>
        );
        onOpenContact("Initiated via Garage CLI prompt");
        break;

      case 'sound':
        onToggleSound();
        outputNode = (
          <p className="text-amber-300">
            Synthesized Web Audio SFX toggled. Current state: {!soundEnabled ? 'ONLINE 🔊' : 'MUTED 🔇'}
          </p>
        );
        break;

      case 'crt':
        onToggleCRT();
        outputNode = (
          <p className="text-amber-300">
            CRT Phosphor scanline filter toggled. Current state: {!crtEnabled ? 'ACTIVE 📺' : 'DISABLED'}
          </p>
        );
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      default:
        outputNode = (
          <p className="text-rose-400">
            Command not recognized: '{cmd}'. Type <span className="text-amber-400 font-mono font-bold">help</span> for valid routines.
          </p>
        );
        break;
    }

    const newLog: CommandLog = {
      id: Date.now().toString(),
      command: cmd,
      output: outputNode,
      timestamp: new Date().toLocaleTimeString(),
    };

    setLogs((prev) => [...prev, newLog]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKey();
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(history[nextIdx]);
        }
      }
    }
  };

  const quickCommands = ['showcase', 'projects', 'cat profile', 'skills', 'contact', 'sound', 'crt', 'clear'];

  return (
    <section id="terminal" className="py-16 md:py-24 border-t border-amber-500/20 relative bg-black/80 bg-garage-scanlines">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Terminal Header Bar */}
        <div className="bg-[#181921] border border-amber-500/40 rounded-t-2xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-orange-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-700/80" />
            <span className="text-xs font-mono text-slate-400 ml-2">
              rumpa@garage: ~/portfolio (sh)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="hidden sm:inline text-amber-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              ONLINE
            </span>
            <button
              onClick={onToggleSound}
              className={`px-2 py-0.5 rounded border text-[11px] ${
                soundEnabled ? 'bg-amber-950 text-amber-300 border-amber-500/40' : 'bg-black text-slate-400 border-white/10'
              }`}
              title="Toggle sound"
            >
              {soundEnabled ? 'SFX ON' : 'SFX MUTED'}
            </button>
            <button
              onClick={onToggleCRT}
              className={`px-2 py-0.5 rounded border text-[11px] ${
                crtEnabled ? 'bg-amber-950 text-amber-300 border-amber-500/40' : 'bg-black text-slate-400 border-white/10'
              }`}
              title="Toggle CRT Mode"
            >
              {crtEnabled ? 'CRT ON' : 'CRT OFF'}
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="bg-[#0b0c10] border-x border-b border-amber-500/40 rounded-b-2xl p-4 sm:p-6 font-mono text-xs shadow-2xl min-h-[360px] max-h-[500px] overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-amber-400 font-semibold">rumpa@garage:~$</span>
                  <span className="text-white font-bold">{log.command}</span>
                  <span className="text-[10px] text-slate-600 ml-auto">{log.timestamp}</span>
                </div>
                <div className="pl-4 border-l border-white/10">{log.output}</div>
              </div>
            ))}
            <div ref={terminalBottomRef} />
          </div>

          {/* Input & Quick Chips */}
          <div className="pt-6 border-t border-white/10 mt-6">
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <span className="text-[11px] text-slate-500 mr-1">QUICK ACTIONS:</span>
              {quickCommands.map((qc) => (
                <button
                  key={qc}
                  onClick={() => handleCommand(qc)}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-white/10 text-[11px] transition-all"
                >
                  {qc}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-black/70 border border-amber-500/40 rounded-xl px-3 py-2">
              <span className="text-amber-400 font-bold font-mono">rumpa@garage:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command... (e.g. 'showcase', 'projects', 'help')"
                className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
              />
              <button
                onClick={() => handleCommand(inputVal)}
                className="p-1 rounded bg-amber-600/30 hover:bg-amber-600/60 text-amber-300 transition-colors"
                title="Execute command"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
