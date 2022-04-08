
import { providers } from 'ethers'
import { ref } from 'vue';

const fieldName = 'lastAccount'
const lastAccount = localStorage.getItem(fieldName)
export const state = ref({
    isConnect: !!lastAccount,
    account: String(lastAccount),
});



// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any
export default {
    state,
    get provider() {
        return new providers.Web3Provider(window.ethereum)
    },
    get signer() {
        return new providers.Web3Provider(window.ethereum).getSigner()
    },
    disconnect() {
        localStorage.removeItem(fieldName)
        state.value = {
            isConnect: false,
            account: ''
        }
    },
    async connect() {
        try {
            const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            state.value = {
                isConnect: true,
                account: accounts[0]
            }
            localStorage.setItem(fieldName, accounts[0]);
        } catch (error) {
            console.log('Error connect', error)
            return false
        }
    },
}