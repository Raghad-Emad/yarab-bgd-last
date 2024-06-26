import { hostAddress } from "../../config/hostAddress";
import { checkTokenCorrect } from "../userRequests";

export const getClassRequestsByClass = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/classRequests/teacher/class`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const createClassRequest = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/classRequests/teacher`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const removeClassRequest = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/classRequests/teacher`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};
