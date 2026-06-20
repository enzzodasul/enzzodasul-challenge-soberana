import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { backendApi } from "../../services/api";

import "./EditProduct.css";

export default function EditProduct() {

  // pega o id que veio pela url
  const { id } = useParams();

  // usado para trocar de página depois
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const { isLoading } = useQuery({

    queryKey: ["product-edit", id],

    queryFn: async () => {

      // busca os dados do produto para preencher o formulário
      const response = await backendApi.get(`/products/${id}`);

      reset({
        name: response.data.name,
        price: response.data.price,
        stock: response.data.stock,
        description: response.data.description
      });

      return response.data;
    },
  });

  async function onSubmit(data) {

    try {

      // envia os novos dados para atualizar o produto
      await backendApi.put(`/products/${id}`, {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock)
      });

      alert("Produto atualizado!");

      // volta para tela de dashboard
      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Erro ao atualizar produto");

    }
  }

  // enquanto carrega os dados do produto
  if (isLoading) {
    return <h2>Carregando...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>Editar Produto</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div>

          <label>Nome</label>

          <br />

          <input
            {...register("name", {
              required: "Nome obrigatório"
            })}
          />

          <p>{errors.name?.message}</p>

        </div>

        <br />

        <div>

          <label>Preço</label>

          <br />

          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Preço obrigatório"
            })}
          />

        </div>

        <br />

        <div>

          <label>Quantidade</label>

          <br />

          <input
            type="number"
            {...register("stock", {
              required: "Quantidade obrigatória"
            })}
          />

        </div>

        <br />

        <div>

          <label>Descrição</label>

          <br />

          {/* campo opcional */}
          <textarea
            {...register("description")}
          />

        </div>

        <br />

        <button className="btn-atualizar-produto" type="submit">
          Atualizar Produto
        </button>

      </form>

    </div>
  );
}