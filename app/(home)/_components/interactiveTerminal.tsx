'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalCommand {
  command: string;
  output: string;
}

interface CommandDefinition {
  name: string;
  description: string;
  action: () => string;
}

export function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Define available commands
  const commands: { [key: string]: CommandDefinition } = {
    help: {
      name: 'help',
      description: 'List all available commands',
      action: () => `Available commands:
        help - Show this help message
        about - Learn about me
        skills - View my technical skills
        experience - See my work experience
        contact - Get my contact information
        clear - Clear the terminal`,
    },
    about: {
      name: 'about',
      description: 'Learn about me',
      action: () => `Hi! I'm Mayank Sarasiya 👋
        Frontend Developer with 2.5+ years of experience
        Passionate about creating beautiful and functional web experiences
        MBA in Business Analytics turned developer`,
    },
    skills: {
      name: 'skills',
      description: 'View technical skills',
      action: () => `Technical Skills:
        • Frontend: React, Next.js, TypeScript, JavaScript
        • Styling: Tailwind CSS, Material-UI, CSS3
        • Tools: Git, VS Code, npm
        • Other: Responsive Design, Web Performance`,
    },
    experience: {
      name: 'experience',
      description: 'View work experience',
      action: () => `Work Experience:
        • TechStuff - Frontend Developer (2022-2024)
        • Mindnerves - React Developer (2021-2022)
        Key achievements:
        - Led development of 3 major web applications
        - Reduced load times by 40%
        - Mentored junior developers`,
    },
    contact: {
      name: 'contact',
      description: 'Get contact information',
      action: () => `Let's connect!
        Email: mayanks365@gmail.com
        LinkedIn: linkedin.com/in/knight03
        GitHub: github.com/Kkknight-12`,
    },
    clear: {
      name: 'clear',
      description: 'Clear terminal',
      action: () => {
        setHistory([]);
        return '';
      },
    },
  };

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle command execution
  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === '') return;

    // Add command to history
    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Find and execute command
    const command = commands[trimmedCmd];

    const output = command
      ? command.action()
      : `Command not found: ${trimmedCmd}. Type 'help' for available commands.`;

    if (command === undefined || command.name !== 'clear') {
      setHistory((prev) => [...prev, { command: cmd, output }]);
    }

    setInput('');
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='bg-[#1a1625]/80 backdrop-blur-lg rounded-lg border border-white/10 w-full max-w-2xl'
    >
      {/* Terminal Header */}
      <div className='flex items-center gap-2 p-3 border-b border-white/10'>
        <div className='flex gap-1.5'>
          <div className='w-3 h-3 rounded-full bg-red-500' />
          <div className='w-3 h-3 rounded-full bg-yellow-500' />
          <div className='w-3 h-3 rounded-full bg-green-500' />
        </div>
        <div className='flex-1 text-center text-sm text-gray-400'>
          knight@portfolio ~
        </div>
      </div>

      {/* Terminal Content */}
      <div className='p-4 font-mono text-sm overflow-auto max-h-[342px]'>
        <div className='text-green-400 mb-4'>
          Welcome! Type &apos;help&apos; to see available commands.
        </div>

        {/* Command History */}
        {history.map((entry, index) => (
          <div key={index} className='mb-4'>
            <div className='flex gap-2'>
              <span className='text-green-400'>~</span>
              <span className='text-purple-400'>{entry.command}</span>
            </div>
            <div className='text-gray-300 whitespace-pre-line pl-4 mt-2'>
              {entry.output}
            </div>
          </div>
        ))}

        {/* Input Line */}
        <div className='flex gap-2 items-center'>
          <span className='text-green-400'>~</span>
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className='flex-1 bg-transparent outline-none text-purple-400'
            spellCheck={false}
            autoComplete='off'
          />
        </div>
      </div>
    </motion.div>
  );
}
