<template>
  <q-layout view="lHh Lpr fff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title color="grey">
          <q-icon name="blur_on" size="1.5em" color="blue"></q-icon> NFT App
        </q-toolbar-title>

        <div>
          <Connector />
        </div>
        <q-toggle v-model="isDarkMode" color="yellow" icon="brightness_4" />
      </q-toolbar>
    </q-header>

    <q-footer reveal elevated>
      <q-toolbar>
        <!-- <q-toolbar-title justify-center>NFT port</q-toolbar-title> -->
        <div class="row fit justify-center">
          <q-icon
            v-for="link in essentialLinks"
            :key="link.title"
            size="2rem"
            class="q-ml-sm"
            :name="link.icon"
          ></q-icon>
        </div>
      </q-toolbar>
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';
import Connector from 'components/Connector.vue';
import linksList from './mainMenuLinks';
import { defineComponent, ref, watchEffect } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    Connector,
  },

  setup() {
    const $q = useQuasar();
    const isDarkMode = ref(false);
    watchEffect(() => $q.dark.set(!isDarkMode.value));

    const leftDrawerOpen = ref(false);

    return {
      isDarkMode,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
