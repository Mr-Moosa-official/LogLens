"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { LogEntry, LogLevel, LogSource } from '@/lib/types';
import { generateLog } from '@/lib/mock-logs';
import { LogList } from '@/components/log-list';
import { LogFilters } from '@/components/log-filters';
import { LogDetailDialog } from '@/components/log-detail-dialog';
import { LogLayout } from '@/components/log-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, ListX } from 'lucide-react';

const ALL_LEVELS: LogLevel[] = ['INFO', 'WARNING', 'ERROR', 'DEBUG'];
const ALL_SOURCES: LogSource[] = ['frontend', 'backend', 'database', 'system'];

export function LogDashboard({ initialLogs }: { initialLogs: LogEntry[] }) {
  const [logs, setLogs] = useState<LogEntry[]>(() => 
    initialLogs.map(log => ({...log, timestamp: new Date(log.timestamp)}))
  );
  const [isStreaming, setIsStreaming] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<LogLevel[]>([]);
  const [selectedSources, setSelectedSources] = useState<LogSource[]>([]);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setLogs((prevLogs) => [generateLog(), ...prevLogs].slice(0, 200));
    }, 1500);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const levelMatch = selectedLevels.length === 0 || selectedLevels.includes(log.level);
      const sourceMatch = selectedSources.length === 0 || selectedSources.includes(log.source);
      const searchMatch = searchTerm === '' || 
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
        log.source.toLowerCase().includes(searchTerm.toLowerCase());
      return levelMatch && sourceMatch && searchMatch;
    });
  }, [logs, selectedLevels, selectedSources, searchTerm]);

  const handleClearLogs = () => setLogs([]);

  const handleLevelChange = useCallback((level: LogLevel, checked: boolean) => {
    setSelectedLevels(prev => 
      checked ? [...prev, level] : prev.filter(l => l !== level)
    );
  }, []);

  const handleSourceChange = useCallback((source: LogSource, checked: boolean) => {
    setSelectedSources(prev => 
      checked ? [...prev, source] : prev.filter(s => s !== source)
    );
  }, []);

  const sidebarContent = (
    <>
      <LogFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        allLevels={ALL_LEVELS}
        selectedLevels={selectedLevels}
        onLevelChange={handleLevelChange}
        allSources={ALL_SOURCES}
        selectedSources={selectedSources}
        onSourceChange={handleSourceChange}
      />
      <div className="mt-auto space-y-2 pt-6">
        <Button onClick={() => setIsStreaming(!isStreaming)} variant="secondary" className="w-full">
          {isStreaming ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isStreaming ? 'Pause Stream' : 'Resume Stream'}
        </Button>
        <Button onClick={handleClearLogs} variant="destructive" className="w-full">
          <ListX className="mr-2 h-4 w-4" />
          Clear Logs
        </Button>
      </div>
    </>
  );

  const headerContent = (
    <div className="flex items-center justify-between w-full">
      <h2 className="text-lg font-semibold">Live Log Stream</h2>
      <div className="text-sm text-muted-foreground">
        Displaying {filteredLogs.length} of {logs.length} logs
      </div>
    </div>
  );
  
  return (
    <LogLayout sidebarContent={sidebarContent} headerContent={headerContent}>
      {filteredLogs.length > 0 ? (
        <LogList logs={filteredLogs} onLogSelect={setSelectedLog} />
      ) : (
         <div className="flex items-center justify-center h-full p-4">
            <Card className="w-full max-w-md text-center bg-card/50">
                <CardContent className="p-8">
                    <p className="text-lg text-muted-foreground">No logs match your current filters.</p>
                </CardContent>
            </Card>
        </div>
      )}
      <LogDetailDialog 
        log={selectedLog}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedLog(null);
        }}
      />
    </LogLayout>
  );
}
