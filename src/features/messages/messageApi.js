export const fetchUsers = async () => {
  const users = await fetch("http://localhost:8000/users")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return users;
};

export const addUsers = async (data) => {
  await fetch("http://localhost:8000/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export const updateUsers = async (id, data) => {
  await fetch("http://localhost:8000/users" + id, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export const removeUsers = async (id) => {
  await fetch("http://localhost:8000/users" + id, {
    method: "DELETE",
  });
};

export const fetchMessages = async () => {
  const messages = await fetch("http://localhost:8000/messages")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return messages;
};

export const addMessages = async (data) => {
  await fetch("http://localhost:8000/messages", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export const updateMessages = async (id, data) => {
  await fetch("http://localhost:8000/messages/" + id, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteMessages = async (id) => {
  await fetch("http://localhost:8000/messages/" + id, {
    method: "DELETE",
  });
};
