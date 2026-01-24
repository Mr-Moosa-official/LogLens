import { LogDashboard } from '@/components/log-dashboard';
import { generateLog } from '@/lib/mock-logs';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Home() {
  const initialLogs = Array.from({ length: 50 }, generateLog).sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <SidebarProvider>
      <LogDashboard initialLogs={initialLogs} />
    </SidebarProvider>
  );
}
