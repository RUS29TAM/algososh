import {defineConfig} from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000/',
        viewportHeight: 1000,
        viewportWidth: 1800,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },

    component: {
        devServer: {
            framework: "create-react-app",
            bundler: "webpack",
        },
    },
});
