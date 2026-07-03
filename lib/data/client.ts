/**
 * Data-access seam.
 *
 * Every screen reads/writes through the `lib/data/*` modules instead of holding
 * its own state. Today these are stubs: reads resolve to empty results so the UI
 * renders its empty/loading states, and writes throw `notImplemented(...)`.
 *
 * This is the single place to wire a real backend later (Next Route Handlers +
 * Postgres, or a separate API). Replace the function bodies — the call sites and
 * types stay the same.
 */

export class NotImplementedError extends Error {
  constructor(operation: string) {
    super(
      `"${operation}" is not implemented yet. Wire it to the backend in lib/data/. ` +
        `See ARCHITECTURE.md.`,
    )
    this.name = "NotImplementedError"
  }
}

/** Throw from any mutation/endpoint that has no backend yet. */
export function notImplemented(operation: string): never {
  throw new NotImplementedError(operation)
}
