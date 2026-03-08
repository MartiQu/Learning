import type { ReactNode } from 'react';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { ZONE_ORDER, ZONE_META } from '../data';
import type { ZoneId } from '../types';

interface ZoneShellProps {
  zoneId: ZoneId;
  children: ReactNode;
}

export function ZoneShell({ zoneId, children }: ZoneShellProps) {
  const zoneIndex = ZONE_ORDER.indexOf(zoneId);
  const zoneNumber = zoneIndex + 1;
  const meta = ZONE_META[zoneId];
  const progress = (zoneNumber / 7) * 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      {/* Zone header */}
      <div
        className="px-4 pt-6 pb-4 border-b border-white/6"
        style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, transparent 100%)' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{meta.icon}</span>
              <div>
                <div className="text-white/40 text-xs font-medium tracking-wide uppercase">
                  Zona {zoneNumber} / 7
                </div>
                <div className="text-white font-bold text-lg leading-tight">{meta.label}</div>
              </div>
            </div>
            <div
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316' }}
            >
              7S Darba Vietas Glābējs
            </div>
          </div>
          <ProgressBar value={progress} color="#f97316" height={4} />
        </div>
      </div>

      {/* Zone content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6">{children}</div>
      </div>
    </div>
  );
}
