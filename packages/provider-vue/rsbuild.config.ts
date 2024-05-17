import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 3001,
  },
  dev: {
    assetPrefix: 'http://localhost:3001',
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = 'providerVue';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'providerVue',
          exposes: {
            './VueButton': './src/components/ProviderButton.vue',
          },
          shared: ['vue'],
        }),
      ]);
    },
  },
  plugins: [pluginVue()],
});
