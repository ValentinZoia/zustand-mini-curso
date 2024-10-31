import { useBearStore } from '../stores/bears/bears.store';
import { WhiteCard } from './index';



export default function PandaBears() {
  const pandaBears = useBearStore(state => state.pandaBears);

  const increasePandaBears = useBearStore(state => state.increasePandaBears);

  return (
    <WhiteCard centered>
          <h2>Osos Pandas</h2>

          <div className="flex flex-col md:flex-row">
            <button onClick={() => increasePandaBears(+1)}> +1</button>
            <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
            <button onClick={() => increasePandaBears(-1)}>-1</button>
          </div>

        </WhiteCard>
  )
}
