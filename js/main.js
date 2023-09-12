let eventBus = new Vue();

Vue.component('container', {
    data() {
        return {
            firstCol: [],
            secondCol: [],
            thirdCol: [],
        }
    },
    methods: {
        save() {
            localStorage.firstCol = JSON.stringify(this.firstCol)
            localStorage.secondCol = JSON.stringify(this.secondCol)
            localStorage.thirdCol = JSON.stringify(this.thirdCol)
        },
        time(idNote) {
            let timeData = new Date();
            this.secondCol[idNote].time = timeData.getHours() + ':' + timeData.getMinutes();
            this.secondCol[idNote].date = timeData.getDate() + '.' + timeData.getMonth() + '.' + timeData.getFullYear();
        },
    },
    mounted() {
        if (localStorage.firstCol) {
            this.firstCol = JSON.parse(localStorage.firstCol)
        }
        if (localStorage.secondCol) {
            this.secondCol = JSON.parse(localStorage.secondCol)
        }
        if (localStorage.thirdCol) {
            this.thirdCol = JSON.parse(localStorage.thirdCol)
        }

    },
    template: `
    <div>
        <create-form></create-form>
        <div class="container">
            <column1 :class="{ disabled: secondCol.length === 5 }" class="column column1" :firstCol="firstCol"></column1>
            <column2 class="column column2" :secondCol="secondCol"></column2>
            <column3 class="column column3" :thirdCol="thirdCol"></column3>
        </div>
    </div>
    `,
})


Vue.component('task', {
    props: {
        task: {
            type: Object
        },
        idNote: {
            type: Number,
        },
    },
    data() {
        return {}
    },
    methods: {
        updateCounter() {
            this.task.isDone = !this.task.isDone
            eventBus.$emit('update-checkbox', this.idNote)
        }
    },
    mounted() {

    },
    template: `
    <div class="task">
        <span class="task-title">{{ task.taskTitle }}</span>
        <button :class="{done: task.isDone}" 
        class="done-btn"
        :disabled="task.isDone"
        @click="updateCounter()">Добавить</button>
    </div>`,
})







































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