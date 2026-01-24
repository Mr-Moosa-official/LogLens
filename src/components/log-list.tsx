"use client";

import React from 'react';
import type { LogEntry } from '@/lib/types';
import { LogItem } from '@/components/log-item';

interface LogListProps {
  logs: LogEntry[];
  onLogSelect: (log: LogEntry) => void;
}

export function LogList({ logs, onLogSelect }: LogListProps) {
  return (
    <div className="p-2 md:p-4 space-y-1">
      {logs.map((log) => (
        <LogItem key={log.id} log={log} onSelect={() => onLogSelect(log)} />
      ))}
    </div>
  );
}
