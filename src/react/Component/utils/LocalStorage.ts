export function getItem(key: string) {
  return localStorage.getItem(key);
}

export function setItem(key: string, value: any) {
  localStorage.setItem(key, value);
}
