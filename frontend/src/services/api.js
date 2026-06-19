


import axios from "axios";

export const backendApi = axios.create({
  baseURL: "http://localhost:3000",
});

//importando aqui a baixo a biblioteca axios
//para fazer requisições http
//centraliza toda comunicação com o backend.
// Sem ele:
//axios.get("http://localhost:3000/products")
// com ele :
// backendApi.get("/products")