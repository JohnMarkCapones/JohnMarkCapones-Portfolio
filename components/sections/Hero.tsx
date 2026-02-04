/**
 * Hero Section Component
 * Landing section with terminal and introduction
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal } from './Terminal';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Badge } from '@/components/ui/badge';
import { personalInfo } from '@/data/personal';
import { LaserFlowToTerminal } from '@/components/animations';
import { cn } from '@/lib/utils';

/**
 * Boot Sequence Component
 */
function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('Initializing...');

  const messages = [
    'Initializing portfolio systems...',
    'Loading creative modules...',
    'Compiling projects database...',
    'Mounting skill trees...',
    'Establishing connection...',
    'System ready.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        const currentIndex = messages.indexOf(prev);
        const nextIndex = currentIndex + 1;
        if (nextIndex >= messages.length) {
          clearInterval(messageInterval);
          return messages[messages.length - 1] || prev;
        }
        return messages[nextIndex] || prev;
      });
    }, 500);

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-mono">
            <span className="text-text-secondary">{currentMessage}</span>
            <span className="text-primary">{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-tertiary">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent-green transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading Messages */}
        <div className="space-y-1 font-mono text-xs text-text-tertiary">
          {messages.slice(0, Math.floor(progress / 20)).map((msg, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span>{msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Hero Section Props
 */
export interface HeroProps {
  /**
   * Show boot sequence
   */
  showBootSequence?: boolean;

  /**
   * Custom className
   */
  className?: string;
}

/**
 * Hero Section Component
 *
 * @example
 * ```tsx
 * <Hero showBootSequence={true} />
 * ```
 */
export function Hero({ showBootSequence = false, className }: HeroProps) {
  const [showContent, setShowContent] = useState(!showBootSequence);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    if (showContent) {
      // Delay terminal appearance for smooth transition
      const timeout = setTimeout(() => setShowTerminal(true), 300);
      return () => clearTimeout(timeout);
    }
  }, [showContent]);

  if (!showContent && showBootSequence) {
    return <BootSequence onComplete={() => setShowContent(true)} />;
  }

  return (
    <section
      className={cn(
        'relative flex min-h-screen flex-col items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      {/* Laser Flow to Terminal - only show when terminal is visible */}
      {showTerminal && <LaserFlowToTerminal color="#00D9FF" />}

      <div className="container-custom relative z-10 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-6 animate-fade-in">
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="success" dot>
                Available for opportunities
              </Badge>
              <Badge variant="outline">
                <span className="font-mono text-xs">4th Year BSIT</span>
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-gradient">{personalInfo.name}</span>
              </h1>

              <p className="text-lg text-text-secondary sm:text-xl md:text-2xl">
                {personalInfo.title.split('|').slice(0, 2).join(' | ')}
              </p>

              <p className="max-w-lg text-sm text-text-tertiary md:text-base">
                {personalInfo.bio}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">3,000+</p>
                <p className="text-xs text-text-tertiary">Users Served</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">50+</p>
                <p className="text-xs text-text-tertiary">Technologies</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">4-5</p>
                <p className="text-xs text-text-tertiary">Years Experience</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link href="/projects">
                <AnimatedButton variant="primary" size="md" className="group sm:px-6 sm:py-3 sm:text-lg">
                  View Projects
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </AnimatedButton>
              </Link>
              <a href="/resume/John-Mark-Capones-Resume.pdf" download="John-Mark-Capones-Resume.pdf">
                <AnimatedButton variant="outline" size="md" className="sm:px-6 sm:py-3 sm:text-lg">
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </AnimatedButton>
              </a>
              <a href="https://github.com/JohnMarkCapones" target="_blank" rel="noopener noreferrer">
                <AnimatedButton variant="ghost" size="md" className="sm:px-6 sm:py-3 sm:text-lg">
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </AnimatedButton>
              </a>
            </div>
          </div>

          {/* Right Column - Terminal */}
          <div
            className={cn(
              'flex items-center justify-center transition-all duration-700',
              showTerminal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Terminal
              className="w-full max-w-2xl overflow-x-hidden"
              interactive={true}
              initialLines={[
                '┌─────────────────────────────────────────────────────────┐',
                '│        Welcome to John Mark Capones Portfolio           │',
                '│                   Terminal Interface v1.0                │',
                '└─────────────────────────────────────────────────────────┘',
                '',
                '> Building systems that scale...',
                '> Solving problems that matter...',
                '',
                'Type "help" to explore available commands.',
                'Type "whoami" to learn more about me.',
                '',
              ]}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <p className="font-mono text-xs text-text-tertiary">Scroll to explore</p>
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
