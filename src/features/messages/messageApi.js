const baseUrl = "http://localhost:8000/";

/**
 * @name fetchUsers
 * @description method to fetch users from JSON Server
 * @returns users
 */
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

/**
 * @name addUsers
 * @description method to add users to the JSON Server
 * @returns none
 */
export const addUsers = async (data) => {
  await fetch(`${baseUrl}users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

/**
 * @name fetchMessages
 * @description method to fetch messages from JSON Server
 * @returns messages
 */
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

/**
 * @name addMessages
 * @description method to add messages to the JSON Server
 * @returns none
 */
export const addMessages = async (data) => {
  await fetch(`${baseUrl}messages`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

/**
 * @name updateMessages
 * @description method to update messages in the JSON Server
 * @returns none
 */
export const updateMessages = async (id, data) => {
  await fetch(`${baseUrl}messages/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

/**
 * @name deleteMessages
 * @description method to delete messages in the JSON Server
 * @returns none
 */
export const deleteMessages = async (id) => {
  await fetch(`${baseUrl}messages/${id}`, {
    method: "DELETE",
  });
};
