import { useParams } from "react-router-dom";

export default function ResolverQuestoes() {
  const { listaId } = useParams();
  return (
    <div className="p-8">
      <h1>Resolver Questões - Lista {listaId}</h1>
    </div>
  );
}
