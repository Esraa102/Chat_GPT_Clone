const baseURL = "http://localhost:5000/api/v1";

const logInUser = async (email: string, password: string) => {
  const res = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (data.status === "OK") {
    return data;
  } else {
    console.log(data);
    throw new Error(data.message);
  }
};

const registerUser = async (
  username: string,
  email: string,
  password: string,
  imgProfile?: string
) => {
  const res = await fetch(`${baseURL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username, imgProfile }),
  });
  const data = await res.json();
  if (data.status === "OK") {
    return data;
  } else {
    console.log(data);
    throw new Error(data.message);
  }
};

const logOutUser = async () => {
  const res = await fetch(`${baseURL}/auth/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status === "OK") {
    return data;
  } else {
    console.log(data);
    throw new Error(data.message);
  }
};

const checkAuthStatus = async () => {
  const res = await fetch(`${baseURL}/auth/auth-status`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status === "OK") {
    return data;
  } else {
    console.log(data);
    throw new Error(data.message);
  }
};

const sendMessage = async (content: string) => {
  const res = await fetch(`${baseURL}/chats/new`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messageContent: content }),
  });
  const data = await res.json();
  if (data.status === "OK") {
    return data;
  } else {
    console.log(data);
    throw new Error();
  }
};

const getAllChats = async () => {
  const res = await fetch(`${baseURL}/chats/all-chats`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status === "OK") {
    return data;
  } else {
    console.log(data);
    throw new Error(data.message);
  }
};

const deleteAllChats = async () => {
  const res = await fetch(`${baseURL}/chats/delete-chats`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status === "OK") {
    return data;
  } else {
    console.log(data);
    throw new Error(data.message);
  }
};
export {
  logInUser,
  registerUser,
  logOutUser,
  checkAuthStatus,
  sendMessage,
  getAllChats,
  deleteAllChats,
};
