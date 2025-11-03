import { useRouteError } from "react-router-dom";

//Função responsável por retornar uma página de erro, exibindo o código de status de erro,
//juntamente com uma mensagem de erro
export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}