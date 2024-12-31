export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
