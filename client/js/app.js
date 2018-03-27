new Vue({
    el: '#app',
    data: {
        user: null,
        todos: [],
        selectedtodo: {}
    },

    methods: {
        addtodo: function(todo) {
            this.todos.push(todo);
        },

        changestatus: function(id) {
            for(let i in this.todos) {
                if(this.todos[i]._id == id) {
                    this.todos[i].status = !this.todos[i].status;
                }
            }
        },

        updatestatus: function(id, title, description) {
            for(let i in this.todos) {
                if(this.todos[i]._id == id) {
                    this.todos[i].title = title
                    this.todos[i].description = description               
                }
            }
        },

        deletetodo: function(id) {
            let index;
            for(let i in this.todos) {
                if(this.todos[i]._id == id) {
                    index = i;
                    i = this.todos.length;
                }
            }
            this.todos.splice(index,1);
        },
        
        selecttodo: function(todo) {
            this.selectedtodo = todo
        }
    },

    created: function() {
        let path = window.location.pathname;
        let apptoken = localStorage.getItem('apptoken')
        if(path !== '/login.html' || apptoken) {
            axios.get('http://localhost:3000/verify/', {headers: {apptoken: apptoken}})
            .then(({data}) => {
                if(data) {
                    axios.get('http://localhost:3000/todos/', {headers: {apptoken: apptoken}})
                    .then((response) => {
                        this.todos = response.data.todos;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
                } else {
                    localStorage.clear();
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },

    // updated: function() {
    //     let apptoken = localStorage.getItem('apptoken')
    //     axios.get('http://localhost:3000/todos/', {headers: {apptoken: apptoken}})
    //     .then((response) => {
    //         this.todos = response.data.todos;
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     });
    // },
})