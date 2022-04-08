<template>
  <q-btn
    @click="handler"
    rounded
    :color="connect.isConnect ? 'blue-8' : 'grey-7'"
    :icon-right="connect.isConnect ? 'logout' : 'signal_wifi_off'"
    :label="
      connect.isConnect ? shortAddress(connect.account) : 'Connect wallet'
    "
  >
    <q-chip v-show="connect.isConnect" size="md"
      >{{ nativeBalance }}
      <div class="text-grey-5 q-ml-sm">ETH</div></q-chip
    >
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import web3connector from '../helpers/web3connector';
import { nativeBalance, updNativeBalance } from '../Store';
import { useStore } from 'vuex';

const handler = async () => {
  const store = useStore();
  if (web3connector.state.value.isConnect) {
    return web3connector.disconnect();
  }
  await web3connector.connect();
  await updNativeBalance();
  console.log('Acc>', store);
};
const shortAddress = (addr: string) =>
  addr.slice(0, 6) + ' . . . ' + addr.substr(addr.length - 6);

export default defineComponent({
  name: 'Connector',
  setup() {
    updNativeBalance();
    return {
      connect: web3connector.state,
      nativeBalance,
      handler,
      shortAddress,
    };
  },
});
</script>
