export default async function deleteRequest(id: string) {
  const res = await fetch("/api/request/delete", {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
    }),
  });
  const data = await res.json();
  return data;
}
