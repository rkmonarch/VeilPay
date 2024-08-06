export default async function getRequests(username: string) {
    const res = await fetch("/api/request/get-requests", {
        method: "POST",
        body: JSON.stringify({
            username: username
        }),
    });
    const data = await res.json();
    return data;
}
