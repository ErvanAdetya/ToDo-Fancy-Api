Vue.component('register-comp', {
    template: `
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create New User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body mt-1">
                    <div class="row">
                        <div class="col-md-3">
                            Name
                        </div>
                        <div class="col-md-1">
                            :
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="form-control" id="first_name-input" v-model="name" placeholder="Name">
                        </div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-md-3">
                            Email
                        </div>
                        <div class="col-md-1">
                            :
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="form-control" id="email-input" v-model="email" placeholder="email">
                        </div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-md-3">
                            Paswword
                        </div>
                        <div class="col-md-1">
                            :
                        </div>
                        <div class="col-md-8">
                            <input type="password" class="form-control" id="password-input" v-model="password" placeholder="password">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" v-on:click="register()">
                        Register
                    </button>
                </div>
            </div>
        </div>
    </div>
    `,

    data: function() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },

    methods: {
        register () {
            axios.post('http://localhost:3000/users', {
                name: this.name,
                email: this.email,
                password: this.password
            })
            .then((response) => {
                console.log(response)
                axios.post('http://localhost:3000/login', {
                    email: this.email,
                    password: this.password
                })
                .then(({data}) => {
                    // data.user
                    localStorage.setItem('apptoken', data.token)
                    window.location.href='index.html'
                })
                // this.$emit('add-todo', response.data.todo);
            });
        }
    }
})