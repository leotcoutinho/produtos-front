interface DetalhesProps {
  produtos: Array<{ nome: string; valor: number }>;
}

function Detalhes(props: DetalhesProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700">Cadastros</h3>
      <hr />
      <br></br>
      <ul>
        {props.produtos.map((p, i) => (
          <li key={i}>
            {p.nome} - R$ {p.valor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Detalhes;
