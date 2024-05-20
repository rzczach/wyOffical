import { StatesType, ActionsType, createStore } from './reduxMini';
import home from '../models/home.ts';
import use from '../models/use.ts';
import cms from '../models/cms.ts';
import cart from '../models/cart.ts';

const store = {
    home,
    use,
    cms,
    cart
};

declare global {
    // eslint-disable-next-line no-undef
    type State = StatesType<typeof store>;
    // eslint-disable-next-line no-undef
    type Actions = ActionsType<typeof store>;
}

export default createStore(store);
