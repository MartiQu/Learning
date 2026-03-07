import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import type { DragSortData } from '../../types';
import { Button } from '../ui/Button';

interface SortableItemProps {
  id: string;
  text: string;
  index: number;
  revealed: boolean;
  correct: boolean;
}

function SortableItem({ id, text, index, revealed, correct }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const borderColor = revealed
    ? correct
      ? 'border-teal bg-teal/10 text-teal'
      : 'border-red-500 bg-red-500/10 text-red-400'
    : 'border-white/10 hover:border-white/25 text-white/80';

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.06 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors duration-200 select-none ${borderColor} ${!revealed ? 'cursor-grab active:cursor-grabbing' : ''}`}
      >
        <span className="text-white/30 font-mono text-sm w-6 shrink-0">{index + 1}.</span>
        <span className="flex-1">{text}</span>
        {!revealed && <span className="text-white/25">⠿</span>}
        {revealed && (correct ? <span className="text-teal">✓</span> : <span className="text-red-400">✗</span>)}
      </motion.div>
    </div>
  );
}

interface Props {
  data: DragSortData;
  onAnswer: (answer: string[]) => void;
  disabled?: boolean;
  revealed?: string[] | null;
}

export function DragSort({ data, onAnswer, disabled, revealed }: Props) {
  const [items, setItems] = useState(() => [...data.items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-white/50 text-sm">Velc elementus pareizajā secībā</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((item, index) => (
              <SortableItem
                key={item.id}
                id={item.id}
                text={item.text}
                index={index}
                revealed={!!revealed}
                correct={revealed ? revealed[index] === item.id : false}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {!revealed && (
        <div className="pt-2">
          <Button onClick={() => onAnswer(items.map((i) => i.id))} disabled={disabled} fullWidth size="lg">
            Iesniegt secību
          </Button>
        </div>
      )}
    </div>
  );
}
