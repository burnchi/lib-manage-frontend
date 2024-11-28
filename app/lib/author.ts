const url = process.env.API_URL || "http://localhost:3000/";
const route = "author";

export async function fetchAuthors() {
  const response = await fetch(url + route);
  return response.json();
}

export async function fetchAuthorByName(name: string) {
  const response = await fetch(url + route + `/${name}`);
  return response.json();
}

export async function addAuthor(author: Author) {
  const response = await fetch(url + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(author),
  });
  return response.json();
}

export async function deleteAuthor(id: number) {
  const response = await fetch(url + route + `/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function updateAuthor(id: number, author: Author) {
  const response = await fetch(url + route + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(author),
  });
  return response.json();
}
