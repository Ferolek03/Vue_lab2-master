let eventBus = new Vue();


Vue.component('create-form', {
    data() {
        return {
            title: null,
            taskTitle1: null,
            taskTitle2: null,
            taskTitle3: null,
            isDone: null,
            status: 0,
        };
    },
    methods: {
        onSubmit() {
            if (this.title && this.taskTitle1 && this.taskTitle2 && this.taskTitle3) {
                let createNote = {
                    title: this.title,
                    tasks: [
                        {
                            taskTitle: this.taskTitle1,
                            isDone: false
                        },
                        {
                            taskTitle: this.taskTitle2,
                            isDone: false
                        },
                        {
                            taskTitle: this.taskTitle3,
                            isDone: false
                        },
                    ],
                    status: 1,
                }
                eventBus.$emit('on-submit', createNote);
                this.title = '';
                this.taskTitle1 = '';
                this.taskTitle2 = '';
                this.taskTitle3 = '';
            }
        },
    },
    template: `
    <form class="create-form" @submit.prevent="onSubmit">
        <label>Создать заметику</label>
        <input v-model="title" type="text" placeholder="Название">
        <input v-model="taskTitle1" type="text" placeholder="Заметка 1">
        <input v-model="taskTitle2" type="text" placeholder="Заметка 2">
        <input v-model="taskTitle3" type="text" placeholder="Заметка 3">
        <input type="submit" value="Создать">
    </form>
    `,
})

let app = new Vue({
    el: '#app',
    data: {},
})