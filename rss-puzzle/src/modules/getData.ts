export default function getData<T>(url: string): Promise<T> {
  const urlData = url;
  return fetch(urlData)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
