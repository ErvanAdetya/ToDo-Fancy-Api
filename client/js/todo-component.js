Vue.component('todo-comp', {
    template: `
    <div class="row todo">
        <div class="col-md-9" data-toggle="modal" href="#todo-modal" @click='selecttodo'>
            <h5 class="todo-title">{{title}}</h5>
        </div>
        <div class="col-md-1">
            <button type="button" class="btn btn-success"  v-if="status" v-on:click="changeStatus()"><i class="fas fa-check"></i></button>
            <button type="button" class="btn btn-outline-success"  v-else v-on:click="changeStatus()"><i class="fas fa-check"></i></button>
        </div>
        <div class="col-md-1">
            <button type="button" class="btn btn-danger" v-on:click="deleteTodo()"><i class="far fa-trash-alt"></i></button>
        </div>
    </div>
    `,
     
    props: ['id', 'title', 'description', 'status'],

    methods: {
        deleteTodo: function() {
            axios.delete(`http://localhost:3000/todos`, {headers: {
                apptoken: localStorage.getItem('apptoken'),
                todoid: this.id
            }})
            .then((response) => {
                this.$emit('delete-todo', this.id);
            })
            .catch((err) => {
                console.log(err);
            });
        },

        changeStatus: function() {
            axios.put(`http://localhost:3000/todos/changestatus`, {
                status:this.status,
                todoid: this.id
            }, {
                headers: {
                    apptoken: localStorage.getItem('apptoken'),
                    fbtoken: localStorage.getItem('fbtoken')
                }
            })
            .then((response) => {
                this.$emit('change-status', this.id);
            })
            .catch((err) => {
                console.log(err);
            });
        },

        selecttodo: function() {
             this.$emit('select-todo', {
                 _id: this.id,
                 title: this.title,
                 description: this.description,
                 status: this.status
             });
        }
    }
})