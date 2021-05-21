import axios from "axios";

let isRefreshing = false;
const queue = [];

const processQueue = (token, error) => {
  for (const promise of queue) {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  }
};

const createClient = (token) => {
  console.log("token", token);
  const client = axios.create({
    baseURL: "http://localhost:1433",
    headers: { Authorization: "Bearer " + token },
  });
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log("IM HERE", error);
      if (
        !error.response ||
        error.response.status !== 401 ||
        error.config.retry ||
        error.config.queued
      ) {
        return Promise.reject(error);
      }

      const { config } = error;

      if (isRefreshing) {
        error.config.queued = true;

        try {
          const token = await new Promise((resolve, reject) => {
            return queue.push({ reject, resolve });
          });
          config.headers.Authorization = `Bearer ${token}`;

          return axios(config);
        } catch (error) {
          return Promise.reject(error);
        }
      }

      isRefreshing = true;
      config.retry = true;

      try {
        const data = JSON.parse(localStorage.getItem("userData"));
        console.log("data", data);
        const response = await axios.post(`http://localhost:1433/auth/token/`, {
          refreshToken: data.refreshToken,
        });
        console.log("axx", response);
        const { accessToken } = response.data.payload;
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...data, token: accessToken })
        );
        config.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(accessToken, undefined);

        return axios(config);
      } catch (error) {
        localStorage.removeItem("userData");
        processQueue(undefined, error);

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
  );
  return client;
};

const request = async function (options, isHeader = true) {
  let authHeader = null;
  if (isHeader) {
    authHeader = JSON.parse(localStorage.getItem("userData"));
  }

  const client = createClient(authHeader?.token);

  const onSuccess = function (response) {
    //console.debug('Request Successful!', response);
    return response.data;
  };

  const onError = function (error) {
    console.debug("Request Failed:", error.config);

    if (error.response) {
      // console.debug('Status:', error.response.status);
      // console.debug('Data:', error.response.data);
      // console.debug('Headers:', error.response.headers);
    } else {
      // console.debug('Error Message:', error.message);
    }
    return Promise.reject(error.response?.data || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
