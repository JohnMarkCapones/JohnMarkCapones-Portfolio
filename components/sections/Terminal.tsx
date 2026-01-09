/**
 * Terminal Component
 * Interactive terminal with typing effect and command system
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { TerminalWelcome } from './TerminalWelcome';
import { cn } from '@/lib/utils';

/**
 * Terminal Command Definition
 */
interface TerminalCommand {
  command: string;
  output: string | string[];
  action?: () => void;
}

/**
 * Available terminal commands
 */
const COMMANDS: Record<string, TerminalCommand> = {
  help: {
    command: 'help',
    output: [
      'Available commands:',
      '  whoami      - About me',
      '  ls          - List projects',
      '  skills      - View technical skills',
      '  contact     - Get in touch',
      '  clear       - Clear terminal',
      '  github      - Open GitHub profile',
      '  linkedin    - Open LinkedIn profile',
      '',
      'Type any command and press Enter.',
    ],
  },
  whoami: {
    command: 'whoami',
    output: [
      'John Mark Capones',
      'Aspiring Developer | DevOps & Cloud Engineer',
      '4th Year BSIT Student @ Colegio De Montalban',
      '',
      'Building systems that scale and solutions that matter.',
      '3,000+ users served through CampusConnect.',
      '',
      'Type "skills" to see my technical expertise.',
    ],
  },
  ls: {
    command: 'ls',
    output: [
      'Projects:',
      '  📁 CampusConnect/          - LMS/CMS serving 3,000+ users',
      '  📁 Xiraya/                 - E-commerce platform',
      '  📁 PharmacySystem/         - Hybrid management system',
      '  📁 CloudMediaPlatform/     - AWS-based media solution',
      '',
      'Type "projects" or scroll down to see more details.',
    ],
  },
  skills: {
    command: 'skills',
    output: [
      'Core Technologies:',
      '  ▓▓▓▓▓▓▓▓▓▓ Supabase (100%)    - Backend-as-a-Service',
      '  ▓▓▓▓▓▓▓▓▓░ PostgreSQL (90%)   - Relational database',
      '  ▓▓▓▓▓▓▓▓▓░ Git (90%)          - Version control',
      '  ▓▓▓▓▓▓▓▓░░ TailwindCSS (80%)  - Utility-first CSS',
      '  ▓▓▓▓▓▓▓░░░ Laravel (75%)      - PHP framework',
      '  ▓▓▓▓▓▓▓░░░ JavaScript (70%)   - Full-stack language',
      '',
      '50+ technologies mastered across frontend, backend, cloud, and DevOps.',
      'Navigate to /system-info for complete breakdown.',
    ],
  },
  contact: {
    command: 'contact',
    output: [
      'Get in touch:',
      '  📧 Email:    johnmarkcapones1@gmail.com',
      '  🐙 GitHub:   github.com/JohnMarkCapones',
      '  💼 LinkedIn: linkedin.com/in/john-mark-capones',
      '  🌐 Website:  CapDev.tech',
      '',
      'Open to freelance opportunities (15-20 hrs/week).',
      'Expected graduation: June 2026',
    ],
  },
  github: {
    command: 'github',
    output: 'Opening GitHub profile...',
    action: () => window.open('https://github.com/JohnMarkCapones', '_blank'),
  },
  linkedin: {
    command: 'linkedin',
    output: 'Opening LinkedIn profile...',
    action: () =>
      window.open('https://www.linkedin.com/in/john-mark-capones-66b6b8255/', '_blank'),
  },
  projects: {
    command: 'projects',
    output: 'Scrolling to projects section...',
    action: () => {
      const projectsSection = document.getElementById('projects');
      projectsSection?.scrollIntoView({ behavior: 'smooth' });
    },
  },
  // Easter egg commands
  sudo: {
    command: 'sudo',
    output: [
      'john-mark is not in the sudoers file.',
      'This incident will be reported.',
      '',
      '...just kidding! 😄',
      '',
      'But seriously, you found a secret command!',
      'Try: matrix, hack, secret',
    ],
  },
  hack: {
    command: 'hack',
    output: [
      'Initializing hack sequence...',
      'Bypassing firewall... ████████████ 100%',
      'Accessing mainframe... ████████████ 100%',
      'Downloading files... ████████████ 100%',
      '',
      'ERROR: Just kidding! This is a portfolio, not a hacking simulator.',
      '',
      '🎮 Achievement Unlocked: Script Kiddie',
    ],
  },
  matrix: {
    command: 'matrix',
    output: [
      'Wake up, Neo...',
      'The Matrix has you...',
      'Follow the white rabbit.',
      '',
      'Knock, knock, Neo.',
      '',
      '💚 Try the Konami Code (↑↑↓↓←→←→BA) for something special...',
    ],
  },
  secret: {
    command: 'secret',
    output: [
      '🔍 You found the secret command!',
      '',
      'Here\'s a secret: I built this entire portfolio from scratch.',
      'Every component, every animation, every easter egg.',
      '',
      'Tech Stack:',
      '  • Next.js 16 (App Router)',
      '  • TypeScript 5.9',
      '  • Tailwind CSS 3',
      '  • Framer Motion 12',
      '',
      'Want to see the code? Check out my GitHub!',
    ],
  },
  '42': {
    command: '42',
    output: [
      'The Answer to the Ultimate Question of Life,',
      'The Universe, and Everything is...',
      '',
      '42',
      '',
      '🎉 You know your Douglas Adams!',
    ],
  },
  coffee: {
    command: 'coffee',
    output: [
      '☕ Brewing fresh coffee...',
      '',
      'HTTP 418: I\'m a teapot',
      '',
      'Sorry, I\'m a portfolio, not a coffee machine!',
      'But I do run on coffee. Lots of it.',
    ],
  },
};

/**
 * Terminal Line Component
 */
interface TerminalLineProps {
  prompt?: boolean;
  command?: string;
  output?: string;
  typing?: boolean;
  className?: string;
}

function TerminalLine({ prompt, command, output, typing, className }: TerminalLineProps) {
  const { displayText } = useTypingEffect({
    text: output || '',
    speed: typing ? 10 : 0,
    delay: 0,
  });

  if (prompt && command) {
    return (
      <div className={cn('flex gap-2 font-mono text-xs sm:text-sm whitespace-nowrap', className)}>
        <span className="text-accent-green">$</span>
        <span className="text-text-primary">{command}</span>
      </div>
    );
  }

  return (
    <div className={cn('font-mono text-xs sm:text-sm text-text-secondary whitespace-nowrap', className)}>
      {typing ? displayText : output}
      {typing && <span className="animate-pulse">▊</span>}
    </div>
  );
}

/**
 * Terminal Component Props
 */
export interface TerminalProps {
  /**
   * Initial lines to display
   */
  initialLines?: string[];

  /**
   * Enable interactive mode
   */
  interactive?: boolean;

  /**
   * Custom className
   */
  className?: string;
}

/**
 * Terminal Component
 *
 * @example
 * ```tsx
 * <Terminal
 *   initialLines={['Welcome!', 'Type "help" for commands.']}
 *   interactive={true}
 * />
 * ```
 */
export function Terminal({ initialLines, interactive = true, className }: TerminalProps) {
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output'; content: string }>>(
    []
  );
  const [input, setInput] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Welcome message
  const welcomeLines = initialLines || [
    '┌─────────────────────────────────────────────────────────┐',
    '│  Welcome to John Mark Capones Portfolio Terminal v1.0  │',
    '└─────────────────────────────────────────────────────────┘',
    '',
    'Type "help" to see available commands.',
    '',
  ];

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add command to history
    setHistory((prev) => [...prev, { type: 'command', content: cmd }]);

    // Clear command
    if (trimmedCmd === 'clear') {
      setHistory([]);
      setShowWelcome(false);
      return;
    }

    // Find and execute command
    const commandDef = COMMANDS[trimmedCmd];

    if (commandDef) {
      // Execute action if exists
      commandDef.action?.();

      // Add output to history
      const outputs = Array.isArray(commandDef.output)
        ? commandDef.output
        : [commandDef.output];

      outputs.forEach((output) => {
        setHistory((prev) => [...prev, { type: 'output', content: output }]);
      });
    } else if (trimmedCmd) {
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          content: `Command not found: ${trimmedCmd}. Type "help" for available commands.`,
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'relative overflow-x-auto rounded-lg border border-surface-border bg-code-bg p-2 sm:p-4 shadow-glow-sm',
        className
      )}
      onClick={handleTerminalClick}
    >
      {/* Terminal Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-accent-red"></div>
          <div className="h-3 w-3 rounded-full bg-accent-amber"></div>
          <div className="h-3 w-3 rounded-full bg-accent-green"></div>
        </div>
        <div className="ml-2 sm:ml-4 font-mono text-[10px] sm:text-xs text-text-tertiary whitespace-nowrap">
          portfolio@capdev:~$ <span className="animate-pulse">▊</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="max-h-[300px] overflow-y-auto overflow-x-auto scrollbar-hide md:max-h-[400px] lg:max-h-[500px]"
      >
        {/* Welcome Message */}
        {showWelcome && (
          <div className="mb-4">
            <TerminalWelcome lines={welcomeLines} speed={20} lineDelay={100} />
          </div>
        )}

        {/* Command History */}
        {history.map((item, index) => (
          <div key={`history-${index}`} className="mb-2">
            {item.type === 'command' ? (
              <TerminalLine prompt command={item.content} />
            ) : (
              <TerminalLine output={item.content} />
            )}
          </div>
        ))}

        {/* Input Line */}
        {interactive && (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="font-mono text-sm text-accent-green">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent font-mono text-sm text-text-primary outline-none"
              placeholder="Type a command..."
              autoFocus
            />
          </form>
        )}
      </div>

      {/* Hint */}
      {interactive && history.length === 0 && (
        <div className="mt-4 text-center">
          <p className="font-mono text-xs text-text-tertiary">
            💡 Tip: Try typing <span className="text-primary">&quot;help&quot;</span> to get
            started
          </p>
        </div>
      )}
    </div>
  );
}
