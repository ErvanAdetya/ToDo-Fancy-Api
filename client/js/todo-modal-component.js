Vue.component('todo-modal-comp', {
    template: `
    <div class="modal fade" id="todo-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">To~Do</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="newtitle">
                        <textarea name="user-message" id="user-message" class="form-control" cols="20" rows="10" v-model="newdescription"></textarea>
                    </div>
                </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="updateTodo()" data-dismiss="modal">Update Todo</button>
                </div>
            </div>
        </div>
    </div>
    `,
     
    props: ['id', 'title', 'description', 'status'],
    data: function() {
        return {
            newtitle: '',
            newdescription: ''
        }
    },
    methods: {
        submit: function(e) {
            if (e.keyCode == 13) {
                console.log()
            }
        },

        updateTodo: function() {
            axios.put(`http://localhost:3000/todos`, {
                title: this.newtitle,
                description: this.newdescription,
            }, {
                headers: {
                    todoid: this.id,
                    apptoken: localStorage.getItem('apptoken'),
                    fbtoken: localStorage.getItem('fbtoken')
                }
            })
            .then((response) => {
                this.$emit('update-status', this.id, this.newtitle, this.newdescription);
            })
            .catch((err) => {
                console.log(err);
            });
        },
    },

    watch: {
        id: function () {
            this.newtitle = this.title
            this.newdescription = this.description
        }
    }
})