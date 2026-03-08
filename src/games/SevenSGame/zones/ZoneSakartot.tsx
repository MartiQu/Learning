import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { ZoneShell } from '../components/ZoneShell';
import { FeedbackOverlay } from '../components/FeedbackOverlay';
import type { ZoneResult } from '../types';
import { SAKARTOT_TOOLS, type SakartotZone } from '../data';

// ─── Draggable tool card ──────────────────────────────────────────────────────

function ToolCard({ id, icon, name, hint }: { id: string; icon: string; name: string; hint: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 cursor-grab active:cursor-grabbing select-none transition-all ${
        isDragging ? 'opacity-20' : 'hover:border-white/30 hover:bg-white/5'
      }`}
      style={{ background: isDragging ? 'transparent' : 'rgba(255,255,255,0.03)' }}
    >
      <span className="text-lg shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-white/80 text-xs font-medium leading-tight">{name}</div>
        <div className="text-white/30 text-xs">{hint}</div>
      </div>
    </div>
  );
}

// ─── Drop zone ────────────────────────────────────────────────────────────────

function DropZone({
  zoneKey,
  label,
  sublabel,
  toolIds,
  revealed,
}: {
  zoneKey: string;
  label: string;
  sublabel: string;
  toolIds: string[];
  revealed: boolean;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: zoneKey });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 rounded-xl border-2 border-dashed p-3 transition-all min-h-[140px] ${
        isOver ? 'border-orange-400/60 bg-orange-400/8' : 'border-white/12'
      }`}
      style={{ background: isOver ? 'rgba(249,115,22,0.06)' : 'rgba(255,255,255,0.02)' }}
    >
      <div className="mb-2">
        <div className="text-white/70 text-xs font-bold">{label}</div>
        <div className="text-white/30 text-xs">{sublabel}</div>
      </div>
      <div className="flex flex-col gap-1.5">
        {toolIds.map((id) => {
          const tool = SAKARTOT_TOOLS.find((t) => t.id === id)!;
          const isCorrect = tool.correctZone === (zoneKey as SakartotZone);
          return (
            <div
              key={id}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs ${
                revealed
                  ? isCorrect
                    ? 'border-teal-400/40 bg-teal-400/10 text-teal-300'
                    : 'border-red-400/40 bg-red-400/10 text-red-300'
                  : 'border-white/15 bg-white/5 text-white/70'
              }`}
            >
              <span>{tool.icon}</span>
              <span className="font-medium">{tool.name}</span>
              {revealed && <span className="ml-auto">{isCorrect ? '✓' : '✗'}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Pool area ────────────────────────────────────────────────────────────────

function PoolArea({ toolIds }: { toolIds: string[] }) {
  const { isOver, setNodeRef } = useDroppable({ id: 'pool' });
  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl border-2 border-dashed p-3 transition-all min-h-[60px] ${
        isOver ? 'border-white/30 bg-white/5' : 'border-white/8'
      }`}
    >
      <p className="text-white/30 text-xs mb-2">Rīku krājums — velc uz zonu</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {toolIds.map((id) => {
          const tool = SAKARTOT_TOOLS.find((t) => t.id === id)!;
          return <ToolCard key={id} id={id} icon={tool.icon} name={tool.name} hint={tool.hint} />;
        })}
        {toolIds.length === 0 && (
          <p className="text-white/20 text-xs italic col-span-2 py-1">
            Visi rīki izvietoti ✓
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  onDone: (result: ZoneResult) => void;
}

export function ZoneSakartot({ onDone }: Props) {
  const [pool, setPool] = useState<string[]>(SAKARTOT_TOOLS.map((t) => t.id));
  const [zones, setZones] = useState<Record<SakartotZone, string[]>>({
    primary: [],
    secondary: [],
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const allPlaced = pool.length === 0;

  function getSource(id: string): 'pool' | SakartotZone | null {
    if (pool.includes(id)) return 'pool';
    if (zones.primary.includes(id)) return 'primary';
    if (zones.secondary.includes(id)) return 'secondary';
    return null;
  }

  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id as string);
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setActiveId(null);
    if (!over) return;

    const draggedId = active.id as string;
    const dest = over.id as string;
    const src = getSource(draggedId);
    if (!src || src === dest) return;

    // Remove from source
    if (src === 'pool') {
      setPool((p) => p.filter((id) => id !== draggedId));
    } else {
      setZones((z) => ({
        ...z,
        [src]: z[src as SakartotZone].filter((id) => id !== draggedId),
      }));
    }

    // Add to destination
    if (dest === 'pool') {
      setPool((p) => [...p, draggedId]);
    } else if (dest === 'primary' || dest === 'secondary') {
      setZones((z) => ({
        ...z,
        [dest]: [...z[dest], draggedId],
      }));
    }
  }

  const handleSubmit = () => {
    let c = 0;
    for (const [zoneKey, ids] of Object.entries(zones) as [SakartotZone, string[]][]) {
      for (const id of ids) {
        const tool = SAKARTOT_TOOLS.find((t) => t.id === id)!;
        if (tool.correctZone === zoneKey) c++;
      }
    }
    const s = Math.round((c / SAKARTOT_TOOLS.length) * 100);
    setCorrect(c);
    setScore(s);
    setSubmitted(true);
  };

  const activeTool = activeId ? SAKARTOT_TOOLS.find((t) => t.id === activeId) : null;

  if (submitted) {
    const type = score >= 80 ? 'correct' : score >= 50 ? 'partial' : 'wrong';
    return (
      <ZoneShell zoneId="sakartot">
        <FeedbackOverlay
          type={type}
          message={`${correct} / ${SAKARTOT_TOOLS.length} rīki pareizi novietoti — ${score} punkti`}
          explanation="Sakārtošana (Set in Order) — ikdienas rīki (0–35 cm) jābūt primārajā zonā, lai tos varētu sasniegt bez kustības. Retāk lietojami rīki (35–60 cm) — sekundārajā zonā. Pareiza izvietošana samazina laika zudumus."
          onContinue={() => onDone({ zoneId: 'sakartot', score, label: 'Sakārtot' })}
        />
      </ZoneShell>
    );
  }

  return (
    <ZoneShell zoneId="sakartot">
      <div className="space-y-4">
        <div
          className="p-4 rounded-xl border border-white/8"
          style={{ background: 'rgba(249,115,22,0.06)' }}
        >
          <p className="text-white/80 text-sm font-medium mb-1">Uzdevums</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Velc rīkus pareizajā zonā pēc lietošanas biežuma. Ikdienas rīki → primārā zona
            (0–35 cm); retāk lietojami → sekundārā zona (35–60 cm).
          </p>
        </div>

        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <PoolArea toolIds={pool} />

          <div className="flex gap-3">
            <DropZone
              zoneKey="primary"
              label="Primārā zona"
              sublabel="0–35 cm · ikdienas rīki"
              toolIds={zones.primary}
              revealed={submitted}
            />
            <DropZone
              zoneKey="secondary"
              label="Sekundārā zona"
              sublabel="35–60 cm · reizi nedēļā"
              toolIds={zones.secondary}
              revealed={submitted}
            />
          </div>

          <DragOverlay>
            {activeTool ? (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/40 bg-surface shadow-xl text-white/90 text-xs cursor-grabbing">
                <span>{activeTool.icon}</span>
                <span>{activeTool.name}</span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {allPlaced && (
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 rounded-xl font-bold text-black text-sm transition-all hover:brightness-110"
            style={{ background: '#f97316' }}
          >
            Iesniegt izvietojumu →
          </button>
        )}

        {!allPlaced && (
          <p className="text-white/30 text-xs text-center">
            Izvietoti: {SAKARTOT_TOOLS.length - pool.length} / {SAKARTOT_TOOLS.length}
          </p>
        )}
      </div>
    </ZoneShell>
  );
}
