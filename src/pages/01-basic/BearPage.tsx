import { useShallow } from "zustand/shallow";
import { WhiteCard } from "../../components";
import BlackBears from "../../components/BlackBears";
import PandaBears from "../../components/PandaBears";
import PolarBears from "../../components/PolarBears";
import { useBearStore } from "../../stores/bears/bears.store";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />

        <PolarBears />

        <PandaBears />

        <BearsDisplay />
      </div>
    </>
  );
};

export const BearsDisplay = () => {
  /*
    useShallow
    Cuando estemos trabajando con objetos anidados en la store,
    y estamos regresando un nuevo estado, podemos usar useShallow.
    Se encargara de analizar las propiedades del objeto, en este caso
    bears, y confirmar si realmente cambió, si cambia se renderizara, y si no
    no.
  */
  const bears = useBearStore(useShallow((state) => state.bears));
  const doNothing = useBearStore((state) => state.doNothing);
  const addBears = useBearStore(state => state.addBear);
  const clearBears = useBearStore(state => state.clearBears);


  return (
    <WhiteCard>
      <h1>Osos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <button onClick={doNothing}>Do Nothing</button>
      <button onClick={addBears}>Agregar Oso</button>
      <button onClick={clearBears}>Borrar osos</button>
      </div>
      
      {JSON.stringify(bears, null, 2)}
    </WhiteCard>
  );
};
