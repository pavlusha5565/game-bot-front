export function applyObject<T extends object>(source: T, data: Partial<T>): T {
  for (const key in data) {
    const value = data[key] as T[Extract<keyof T, string>];

    if (Array.isArray(value)) {
      source[key] = value;
    }
    if (typeof value === "object") {
      applyObject(source[key] as object, data[key] as object);
    }

    source[key] = value;
  }
  return source;
}
