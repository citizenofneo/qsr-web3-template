import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';
import connector from '../../helpers/web3connector';

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  account() {
    return connector.state
    // your code
  },
};

export default getters;
