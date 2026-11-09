"use client";

import { useState, type ReactNode } from "react";
import { RichInline } from "@/components/Rich";
import { fmt } from "./vec";

/**
 * Wrapper for every interactive figure: the figure, a live readout that ties the picture to the
 * formula, and "Try this" tasks in Predict → Manipulate → Explain form.
 */
export function VizFrame({
  title,
  hint,
  figure,
  readout,
  tasks,
  controls,
  onReset,
}: {
  title: string;
  /** How to interact, e.g. "Drag the dots. Drag empty space to rotate." */
  hint: string;
  figure: ReactNode;
  /** Live numbers/formula (rich-text strings or nodes). */
  readout?: ReactNode;
  /** "Try this" tasks; each may start with "Predict:" to encourage guessing before dragging. */
  tasks?: string[];
  controls?: ReactNode;
  onReset?: () => void;
}) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  return (
    <div className="viz">
      <div className="viz-head">
        <span className="callout-title" style={{ margin: 0 }}>
          See it · {title}
        </span>
        <span className="spacer" />
        {onReset && (
          <button className="btn small" onClick={onReset}>
            Reset
          </button>
        )}
      </div>
      <div className="viz-body">
        <div className="viz-fig">
          {figure}
          <div className="small muted viz-hint">{hint}</div>
        </div>
        <div className="viz-side">
          {controls && <div className="viz-controls">{controls}</div>}
          {readout && <div className="viz-readout">{readout}</div>}
          {tasks && tasks.length > 0 && (
            <div className="viz-tasks">
              <div className="callout-title">Try this</div>
              {tasks.map((t, i) => (
                <label key={i} className={`viz-task ${done[i] ? "done" : ""}`}>
                  <input type="checkbox" checked={!!done[i]} onChange={(e) => setDone({ ...done, [i]: e.target.checked })} />
                  <span>
                    <RichInline text={t} />
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** One line of the readout: label + rich text value. */
export function Read({ label, tex, tone }: { label?: string; tex: string; tone?: "good" | "bad" | "warn" }) {
  return (
    <div className={`viz-read ${tone ?? ""}`}>
      {label && <span className="viz-read-label">{label}</span>}
      <RichInline text={tex} />
    </div>
  );
}

export function Slider({ label, value, min, max, step = 0.1, onChange, format }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; format?: (v: number) => string }) {
  return (
    <label className="viz-slider">
      <span>
        <RichInline text={label} /> <strong>{format ? format(value) : fmt(value)}</strong>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

/** Editable vector components (for precise entry alongside dragging). */
export function VecInput({ label, value, onChange, step = 0.5 }: { label: string; value: number[]; onChange: (v: number[]) => void; step?: number }) {
  return (
    <div className="viz-vec">
      <span>
        <RichInline text={label} />
      </span>
      {value.map((x, i) => (
        <input
          key={i}
          type="number"
          step={step}
          value={Number(x.toFixed(2))}
          onChange={(e) => onChange(value.map((y, j) => (j === i ? Number(e.target.value) || 0 : y)))}
          aria-label={`${label} component ${i + 1}`}
        />
      ))}
    </div>
  );
}

export function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="viz-toggle">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} /> <RichInline text={label} />
    </label>
  );
}

export function Choice<T extends string | number>({ value, options, onChange }: { value: T; options: { v: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="row" style={{ gap: 6 }}>
      {options.map((o) => (
        <button key={String(o.v)} className={`chip ${o.v === value ? "on" : ""}`} onClick={() => onChange(o.v)}>
          <RichInline text={o.label} />
        </button>
      ))}
    </div>
  );
}
