import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { backendApi } from "../../services/api";

import "./CreateProduct.css";

export default function CreateProduct() {

  // usado para redirecionar o usuário depois de salvar
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  async function onSubmit(data) {

    try {

      // envia os dados para o backend criar o produto
      await backendApi.post("/products", {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock)
      });

      alert("Produto cadastrado com sucesso!");

      // volta para dashboard
      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Erro ao criar produto");

    }
  }

  return (
    <div className="form-container">

      <h1>Criar Produto</h1>

      {/* formulário de cadastro */}
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">

          <label>Nome</label>

          <input
            {...register("name", {
              required: "Nome obrigatório"
            })}
          />

          {errors.name && (
            <p className="error-message">
              {errors.name.message}
            </p>
          )}

        </div>

        <div className="form-group">

          <label>Preço</label>

          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Preço obrigatório",
              min: {
                value: 0.01,
                message: "Preço deve ser maior que zero"
              }
            })}
          />

          {errors.price && (
            <p className="error-message">
              {errors.price.message}
            </p>
          )}

        </div>

        <div className="form-group">

          <label>Quantidade</label>

          <input
            type="number"
            {...register("stock", {
              required: "Quantidade obrigatória",
              min: {
                value: 0,
                message: "Quantidade inválida"
              }
            })}
          />

          {errors.stock && (
            <p className="error-message">
              {errors.stock.message}
            </p>
          )}

        </div>

        <div className="form-group">

          <label>Descrição</label>

          {/* descrição é opcional */}
          <textarea
            rows="4"
            {...register("description")}
          />

        </div>

        <button
          type="submit"
          className="save-button"
        >
          Salvar Produto
        </button>

      </form>

    </div>
  );
}