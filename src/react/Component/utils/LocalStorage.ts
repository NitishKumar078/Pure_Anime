export function getItem(key: string) {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function setItem(key: string, value: any) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.log("error", error);
  }
}
