"use client";

import React from 'react';
import type { LogEntry } from '@/lib/types';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LogLevelBadge } from '@/components/log-level-badge';

interface LogDetailDialogProps {
  log: LogEntry | null;
  onOpenChange: (open: boolean) => void;
}

export function LogDetailDialog({ log, onOpenChange }: LogDetailDialogProps) {
  if (!log) return null;

  return (
    <Dialog open={!!log} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center flex-wrap gap-4">
            <span>Log Details</span>
            <LogLevelBadge level={log.level} />
            <Badge variant="outline">{log.source}</Badge>
          </DialogTitle>
          <DialogDescription>
            {format(new Date(log.timestamp), 'MMMM dd, yyyy HH:mm:ss.SSS')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-[100px_1fr] items-start gap-4">
            <span className="text-right font-semibold text-muted-foreground mt-1">Message</span>
            <p className="font-code text-base leading-relaxed">{log.message}</p>
          </div>
          <div className="grid grid-cols-[100px_1fr] items-start gap-4">
             <span className="text-right font-semibold text-muted-foreground mt-2">Metadata</span>
             <ScrollArea className="h-64 rounded-md border bg-muted/20">
                <pre className="p-4 text-sm font-code">
                    <code>{JSON.stringify(log.metadata, null, 2)}</code>
                </pre>
             </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
