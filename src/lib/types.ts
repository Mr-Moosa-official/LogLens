export type LogLevel = 'INFO' | 'WARNING' | 'ERROR' | 'DEBUG';
export type LogSource = 'frontend' | 'backend' | 'database' | 'system';

export type LogEntry = {
  id: string;
  timestamp: Date;
  level: LogLevel;
  source: LogSource;
  message: string;
  metadata: Record<string, any>;
};
