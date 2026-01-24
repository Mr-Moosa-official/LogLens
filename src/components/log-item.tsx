"use client";

import React, { useState, useEffect } from 'react';
import type { LogEntry, LogLevel } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Info, AlertTriangle, XCircle, Bug } from 'lucide-react';

interface LogItemProps {
  log: LogEntry;
  onSelect: () => void;
}

const levelConfig: Record<LogLevel, { icon: React.ElementType; className: string }> = {
  INFO: { icon: Info, className: 'text-chart-2' },
  WARNING: { icon: AlertTriangle, className: 'text-chart-4' },
  ERROR: { icon: XCircle, className: 'text-destructive' },
  DEBUG: { icon: Bug, className: 'text-chart-5' },
};

export function LogItem({ log, onSelect }: LogItemProps) {
  const { icon: Icon, className } = levelConfig[log.level];
  const [formattedTimestamp, setFormattedTimestamp] = useState('');

  useEffect(() => {
    setFormattedTimestamp(format(new Date(log.timestamp), 'MMM dd, HH:mm:ss.SSS'));
  }, [log.timestamp]);

  const hoverBgClass = {
    'INFO': 'hover:bg-chart-2/10',
    'WARNING': 'hover:bg-chart-4/10',
    'ERROR': 'hover:bg-destructive/10',
    'DEBUG': 'hover:bg-chart-5/10',
  }[log.level];

  return (
    <div
      onClick={onSelect}
      className={cn(
        'grid grid-cols-[150px_100px_1fr] gap-4 items-center p-2 rounded-md cursor-pointer transition-colors font-code text-sm',
        'animate-in fade-in-0 slide-in-from-top-2 duration-300',
        hoverBgClass
      )}
    >
      <span className="text-muted-foreground whitespace-nowrap">
        {formattedTimestamp}
      </span>
      <span className={cn('font-semibold flex items-center gap-2', className)}>
        <Icon className="h-4 w-4" />
        {log.level}
      </span>
      <p className="truncate text-foreground">{log.message}</p>
    </div>
  );
}
