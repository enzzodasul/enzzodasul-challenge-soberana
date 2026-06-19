



import { useEffect,useState } from "react";
import { backendApi } from "../../services/api";

export default function Dashboard() {


const [produtos, setProdutos] = useState([]);


useEffect(() => {

async function carregarProdutos() {

  try {
    const response = await backendApi.get("/products");
   
    console.log(response.data);
    setProdutos(response.data);
   
  } catch (error){
    console.error(error);
  }
}

carregarProdutos();

  console.log("Dashboard carregou");
}, []);

console.log(produtos);

  return (
    <div>
      
      <h1>Dashboard</h1>
      
      
      <p>Quantidade de Produtos: {produtos.length}</p>
      
      
      
      
    </div>
  );
}


