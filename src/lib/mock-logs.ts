import type { LogEntry, LogLevel, LogSource } from '@/lib/types';

const levels: LogLevel[] = ['INFO', 'WARNING', 'ERROR', 'DEBUG'];
const sources: LogSource[] = ['frontend', 'backend', 'database', 'system'];
const messages = [
  'User logged in successfully',
  'Failed to connect to database: Connection refused',
  'API request to /users/123 timed out',
  'Data processing job completed in 2.5s',
  'Invalid input for field `email`: not a valid email address',
  'Server started on port 3000',
  'Unexpected error occurred: null pointer exception in user service',
  'Payment of $29.99 processed for user_id: 456',
  'New user registered: test@example.com',
  'Cache cleared for `product_list`',
  'Database query executed in 150ms: SELECT * FROM orders',
  'Frontend component `UserProfile` rendered in 15ms',
];

const generateRandomId = () => Math.random().toString(36).substring(2, 15);

export const generateLog = (): LogEntry => {
  const level = levels[Math.floor(Math.random() * levels.length)];
  return {
    id: generateRandomId(),
    timestamp: new Date(),
    level,
    source: sources[Math.floor(Math.random() * sources.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    metadata: {
      traceId: `trace-${generateRandomId()}`,
      userId: `user-${Math.floor(Math.random() * 1000)}`,
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      ...(level === 'ERROR' && { stack: 'Error: Something went wrong\n at /app/services/api.js:123:45\n at /app/controllers/user.js:56:7' }),
      ...(Math.random() > 0.5 && { environment: 'production' }),
      ...(Math.random() > 0.7 && { requestMethod: 'GET', requestPath: '/api/data' }),
    }
  };
};
