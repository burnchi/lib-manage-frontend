const url = process.env.API_URL || "http://localhost:3000/";
const route = "book";

export async function findBooks({
  page = 1,
  pageSize = 3,
  search = "",
  author = "",
  category = "",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  author?: string;
  category?: string;
}) {
  const response = await fetch(
    url +
      route +
      `?page=${page}&pageSize=${pageSize}&search=${search}&author=${author}&category=${category}`,
  );
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

export async function deleteBook(id: number) {
  const response = await fetch(url + route + `/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
export async function updateBook(id: number, book: Book) {
  const response = await fetch(url + route + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return response.json();
}
