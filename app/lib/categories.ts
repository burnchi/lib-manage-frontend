const url = process.env.API_URL || "http://localhost:3000/";
const route = "category";

export async function fetchCategories() {
  const response = await fetch(url + route);
  return response.json();
}

export async function fetchCategoryByName(name: string) {
  const response = await fetch(url + route + `/${name}`);
  return response.json();
}

export async function addCategory(category: Category) {
  const response = await fetch(url + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  return response.json();
}

export async function deleteCategory(id: number) {
  const response = await fetch(url + route + `/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function updateCategory(id: number, category: Category) {
  const response = await fetch(url + route + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  return response.json();
}
