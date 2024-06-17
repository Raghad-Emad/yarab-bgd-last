import { hostAddress } from "../config/hostAddress";
import { checkTokenCorrect } from "./userRequests";

export const getOperationsDetails = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/operations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const editOperations = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/operations/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const editPasswordOperations = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/operations/update/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const deleteOperation = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/operations/update`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const getOperationsClasses = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/classes/operations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const allStudents = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/operations/students/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const searchStudents = (searchTerm) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/operations/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({ searchTerm: searchTerm }),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const addStudentToClass = (details) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/operations/classes/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const removeStudentFromClass = (details) => {
  console.log(details);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/operations/classes/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const createClass = (details) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const updateClass = (details) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/classes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const deleteClass = (details) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/classes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const getStudentsInClass = (classID) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/operations/class`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(classID),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const createTheQuiz = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/quiz/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const deleteTheQuiz = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/quiz/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const viewOperationsQuizzes = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/quiz/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const viewOperationsQuizzesByClass = (credentials) => {
  console.log("aaa", credentials);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(
    `${hostAddress()}/quiz/all/class/?classID=${credentials}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  ).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const viewOperationsModules = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/module/view`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const createModule = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`${hostAddress()}/module/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};
