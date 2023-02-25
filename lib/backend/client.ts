import axios from "axios";

const devBackendBaseUri = "http://localhost:8000";
// console.log(backendBaseUri);

const backendClient = axios.create({
  baseURL: `${devBackendBaseUri}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default backendClient;
