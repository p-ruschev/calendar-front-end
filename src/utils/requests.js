export const settings = {
  host: "",
};

async function request(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.ok === false) {
      const error = await response.json();
      throw error;
    }
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

function createOptions(method = "get", body, user) {
  const options = {
    method,
    headers: {},
  };
  if (user?.token) {
    options.headers["X-Authorization"] = user.token;
  }
  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }
  return options;
}
export async function get(url, user) {
  return await request(url, createOptions("get", null, user));
}

export function post(url, data, user) {
  return request(url, createOptions("post", data, user));
}

export async function put(url, data, user) {
  return await request(url, createOptions("put", data, user));
}

export async function del(url, user) {
  return await request(url, createOptions("delete", null, user));
}


export async function login(email, password) {
  const result = await post(settings.host + "/users/login", {
    email,
    password,
  });
  return result;
}

export async function register(email, password) {
  const result = await post(settings.host + "/users/register", {
    email,
    password,
  });
  return result;
}

export function logout() {
  const result = get(settings.host + "/users/logout");
  return result;
}
