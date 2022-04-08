import { ref } from 'vue';
import web3connector from './helpers/web3connector'

export const nativeBalance = ref(0)
export const updNativeBalance = async () => {
    nativeBalance.value = +((+(await web3connector.provider.getBalance(web3connector.state.value.account)) || 0) / 10 ** 18).toFixed(3)
}