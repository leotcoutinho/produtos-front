interface TituloProps {
  desc: string;
}

function Titulo(props: TituloProps) {
  return (
    <h1 className="text-2xl font-bold text-slate-800 text-center mt-5">
      {props.desc}
    </h1>
  );
}

export default Titulo;
