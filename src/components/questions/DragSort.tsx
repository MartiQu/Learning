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
import type { DragSortData } from '../../types';
import { Button } from '../ui/Button';

// ─── Drop slot (numbered target zone) ────────────────────────────────────────

function DropSlot({
  index,
  slotId,
  items,
  revealed,
  correctId,
}: {
  index: number;
  slotId: string | null;
  items: DragSortData['items'];
  revealed: boolean;
  correctId: string | null;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: `slot-${index}` });
  const itemText = slotId ? items.find((i) => i.id === slotId)?.text : null;
  const isCorrect = revealed && slotId === correctId;

  let borderStyle: string;
  if (revealed) {
    borderStyle = isCorrect
      ? 'border-teal/50 bg-teal/10'
      : 'border-red-500/50 bg-red-500/10';
  } else if (isOver) {
    borderStyle = 'border-purple/60 bg-purple/10';
  } else if (slotId) {
    borderStyle = 'border-white/25 bg-white/5';
  } else {
    borderStyle = 'border-white/15 border-dashed bg-transparent';
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border min-h-[52px] transition-all duration-150 ${borderStyle}`}
    >
      <span className="text-white/40 font-mono text-sm w-5 shrink-0 font-bold">{index + 1}</span>
      <span
        className={`flex-1 text-sm ${
          revealed
            ? isCorrect
              ? 'text-teal'
              : 'text-red-400'
            : slotId
            ? 'text-white/80'
            : 'text-white/20 italic'
        }`}
      >
        {itemText ?? 'Ievilkt šeit...'}
      </span>
      {revealed && (
        <span className="text-base">{isCorrect ? '✓' : '✗'}</span>
      )}
    </div>
  );
}

// ─── Draggable pool card ──────────────────────────────────────────────────────

function PoolCard({ id, text }: { id: string; text: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`px-4 py-2.5 rounded-xl border border-white/15 bg-surface text-white/80 text-sm cursor-grab active:cursor-grabbing select-none transition-all ${
        isDragging ? 'opacity-20' : 'hover:border-white/30 hover:bg-white/5'
      }`}
    >
      {text}
    </div>
  );
}

// ─── Pool area (droppable) ────────────────────────────────────────────────────

function PoolArea({
  pool,
  items,
}: {
  pool: string[];
  items: DragSortData['items'];
}) {
  const { isOver, setNodeRef } = useDroppable({ id: 'pool-area' });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[72px] rounded-xl border-2 border-dashed p-3 transition-colors ${
        isOver ? 'border-white/30 bg-white/5' : 'border-white/10'
      }`}
    >
      <p className="text-white/30 text-xs mb-2">Kartes</p>
      <div className="flex flex-wrap gap-2">
        {pool.map((id) => (
          <PoolCard
            key={id}
            id={id}
            text={items.find((i) => i.id === id)?.text ?? ''}
          />
        ))}
        {pool.length === 0 && (
          <p className="text-white/20 text-sm italic w-full text-center py-1">
            Visas kartes izvietotas
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  data: DragSortData;
  onAnswer: (answer: string[]) => void;
  disabled?: boolean;
  revealed?: string[] | null;
}

export function DragSort({ data, onAnswer, disabled = false, revealed }: Props) {
  const [slots, setSlots] = useState<(string | null)[]>(() =>
    Array(data.items.length).fill(null)
  );
  const [pool, setPool] = useState<string[]>(() => {
    const ids = data.items.map((i) => i.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids;
  });
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const draggedId = active.id as string;
    const overId = over.id as string;
    const slotMatch = overId.match(/^slot-(\d+)$/);

    if (slotMatch) {
      const toIndex = parseInt(slotMatch[1]);
      const displaced = slots[toIndex];
      const fromPool = pool.includes(draggedId);
      const fromSlotIndex = slots.findIndex((s) => s === draggedId);

      if (fromPool) {
        // Pool → Slot
        setPool((p) => {
          const next = p.filter((id) => id !== draggedId);
          if (displaced !== null) next.push(displaced);
          return next;
        });
        setSlots((prev) => {
          const next = [...prev];
          next[toIndex] = draggedId;
          return next;
        });
      } else if (fromSlotIndex !== -1 && fromSlotIndex !== toIndex) {
        // Slot → Different slot (swap)
        setSlots((prev) => {
          const next = [...prev];
          next[toIndex] = draggedId;
          next[fromSlotIndex] = displaced;
          return next;
        });
      }
    } else if (overId === 'pool-area') {
      // Slot → Pool
      const fromSlotIndex = slots.findIndex((s) => s === draggedId);
      if (fromSlotIndex !== -1) {
        setSlots((prev) => {
          const next = [...prev];
          next[fromSlotIndex] = null;
          return next;
        });
        setPool((p) => [...p, draggedId]);
      }
    }
  }

  const reset = () => {
    setSlots(Array(data.items.length).fill(null));
    setPool(data.items.map((i) => i.id));
  };

  // When revealed, show user's slots colored by correctness
  const displaySlots = revealed
    ? (slots.every((s) => s !== null) ? slots : revealed.map((_, i) => slots[i] ?? null))
    : slots;

  const allFilled = slots.every((s) => s !== null);
  const activeItemText = activeId ? data.items.find((i) => i.id === activeId)?.text : null;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="space-y-4">
        <p className="text-white/50 text-sm">Velc kartes pareizajā secībā</p>

        {/* Numbered slots */}
        <div className="space-y-2">
          {displaySlots.map((slotId, i) => (
            <DropSlot
              key={i}
              index={i}
              slotId={slotId}
              items={data.items}
              revealed={!!revealed}
              correctId={revealed ? revealed[i] : null}
            />
          ))}
        </div>

        {/* Pool */}
        {!revealed && <PoolArea pool={pool} items={data.items} />}

        {/* Actions */}
        {!revealed && (
          <div className="flex gap-2 pt-1">
            <button
              onClick={reset}
              className="px-4 py-2 rounded-xl border border-white/15 text-white/50 hover:text-white/80 text-sm transition-colors shrink-0"
            >
              Sākt no jauna
            </button>
            <Button
              onClick={() => onAnswer(slots.filter((s): s is string => s !== null))}
              disabled={!allFilled || disabled}
              fullWidth
              size="lg"
            >
              Iesniegt secību
            </Button>
          </div>
        )}
      </div>

      <DragOverlay>
        {activeItemText ? (
          <div className="px-4 py-2.5 rounded-xl border border-white/40 bg-surface shadow-xl text-white/90 text-sm cursor-grabbing">
            {activeItemText}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
