import { createApp } from 'vue';

function vueIntegration(element, vueApp) {
    const app = createApp(vueApp);
    app.mount(element)
    return app;
};

export default vueIntegration;