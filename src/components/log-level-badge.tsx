"use client";

import React from 'react';
import type { LogLevel } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const levelStyles: Record<LogLevel, string> = {
    INFO: 'bg-chart-2/20 text-chart-2 border-chart-2/30',
    WARNING: 'bg-chart-4/20 text-chart-4 border-chart-4/30',
    ERROR: 'bg-destructive/20 text-destructive border-destructive/30',
    DEBUG: 'bg-chart-5/20 text-chart-5 border-chart-5/30',
}

export function LogLevelBadge({ level }: { level: LogLevel }) {
    return (
        <Badge variant="outline" className={cn('font-semibold capitalize', levelStyles[level])}>
            {level.toLowerCase()}
        </Badge>
    )
}
