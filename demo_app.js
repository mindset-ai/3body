
const app = Vue.createApp({
    template: `
        <button @click="printMessage">Click me</button>
    `,
    methods: {
        printMessage() {
            console.log('Click from Vue');
        }
    }
});

