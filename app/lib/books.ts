const url = process.env.API_URL || "http://localhost:3000/";
const route = "book";

export async function fetchTodos() {
  const response = await fetch(url + route);
  return response.json();
}

export async function addBook(book: Book) {
  const response = await fetch(url + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return response.json();
}
