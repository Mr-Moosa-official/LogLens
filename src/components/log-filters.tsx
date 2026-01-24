"use client";

import React from 'react';
import type { LogLevel, LogSource } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Search } from 'lucide-react';
import { Separator } from './ui/separator';

interface LogFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  allLevels: LogLevel[];
  selectedLevels: LogLevel[];
  onLevelChange: (level: LogLevel, checked: boolean) => void;
  allSources: LogSource[];
  selectedSources: LogSource[];
  onSourceChange: (source: LogSource, checked: boolean) => void;
}

export function LogFilters({
  searchTerm,
  setSearchTerm,
  allLevels,
  selectedLevels,
  onLevelChange,
  allSources,
  selectedSources,
  onSourceChange,
}: LogFiltersProps) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <Separator />

      <div>
        <Label className="text-base font-semibold">Log Level</Label>
        <div className="mt-3 space-y-3">
          {allLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`level-${level}`}
                checked={selectedLevels.includes(level)}
                onCheckedChange={(checked) => onLevelChange(level, !!checked)}
              />
              <Label htmlFor={`level-${level}`} className="font-normal capitalize text-sm text-foreground/80 cursor-pointer">
                {level.toLowerCase()}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-base font-semibold">Source</Label>
        <div className="mt-3 space-y-3">
          {allSources.map((source) => (
            <div key={source} className="flex items-center space-x-2">
              <Checkbox
                id={`source-${source}`}
                checked={selectedSources.includes(source)}
                onCheckedChange={(checked) => onSourceChange(source, !!checked)}
              />
              <Label htmlFor={`source-${source}`} className="font-normal capitalize text-sm text-foreground/80 cursor-pointer">
                {source.toLowerCase()}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
