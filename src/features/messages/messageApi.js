const baseUrl = "https://my-json-server.typicode.com/samrat-ghosh-13/json-server/";

export const fetchUsers = async () => {
  const users = await fetch(`${baseUrl}users`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return users;
};

export const addUsers = async (data) => {
  await fetch(`${baseUrl}users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export const fetchMessages = async () => {
  const messages = await fetch(`${baseUrl}messages`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return messages;
};

export const addMessages = async (data) => {
  await fetch(`${baseUrl}messages`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export const updateMessages = async (id, data) => {
  await fetch(`${baseUrl}messages/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteMessages = async (id) => {
  await fetch(`${baseUrl}messages/${id}`, {
    method: "DELETE",
  });
};
