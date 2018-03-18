Vue.component('todo-comp', {
    template: `
    <div class="row todo">
        <div class="col-md-11">
            <h5>{{title}}</h5>
        </div>
        <div class="col-md-1">
            <button type="button" class="btn btn-danger" v-on:click="deleteTodo()">Delete</button>
        </div>
    </div>
    `,
    props: ['id', 'title', 'description'],
    // data: function() {
    //     return {
    //     }
    // },

    methods: {
        deleteTodo: function() {
            axios.delete(`http://localhost:3000/todos/${this.id}`)
            .then((response) => {
                console.log(response);
                window.location.href="index.html";
            });
        },
    }
})