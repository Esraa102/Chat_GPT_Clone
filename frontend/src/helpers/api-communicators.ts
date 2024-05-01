import toast from "react-hot-toast";

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
    console.log(data);
    return data;
  } else {
    toast.error(data.message);
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
    console.log(data);
    return data;
  } else {
    toast.error(data.message);
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
    console.log(data);
    return data;
  } else {
    toast.error(data.message);
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
    console.log(data);
    return data;
  } else {
    toast.error(data.message);
    throw new Error(data.message);
  }
};

export { logInUser, registerUser, logOutUser, checkAuthStatus };
