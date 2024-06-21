import { StateCreator, StoreMutatorIdentifier } from 'zustand'

export type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    if (process.env.NODE_ENV === 'production') {
      set(...a)
      return
    }
    console.group(
      `%cZustand store update${name ? ` - ${name}` : ''}`,
      'color: #03A9F4; font-weight: bold;'
    )
    const before = get() as Record<string, unknown>
    set(...a)
    const after = get() as Record<string, unknown>
    let changed = false
    Object.keys(before).forEach(key => {
      if (before[key] !== after[key]) {
        console.log(
          `%c${key}:`,
          'color: #4CAF50; font-weight: bold;',
          before[key],
          '->',
          after[key]
        )
        changed = true
      }
    })
    if (!changed) {
      console.log('%c(nothing changed)', 'color: #9E9E9E;')
    }
    console.groupEnd()
  }
  store.setState = loggedSet

  return f(loggedSet, get, store)
}

const logger = loggerImpl as unknown as Logger

export default logger
