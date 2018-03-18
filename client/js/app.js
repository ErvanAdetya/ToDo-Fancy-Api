new Vue({
    el: '#app',
    data: {
        todos: [],
    },

    created: function() {
        axios.post('http://localhost:3000/todos/', {},
        {headers: {apptoken: localStorage.getItem('apptoken')}})
        .then((response) => {
            this.todos = response.data.todos;
        })
        .catch((err) => {
            console.log(err)
        })
    }
})