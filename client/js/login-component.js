Vue.component('login-comp', {
    template: `
    <div class="container">
        <form class="form-horizontal" role="form" method="POST" action="/login">
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <h2>Please Login</h2>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group has-danger">
                        <label class="sr-only" for="email">E-Mail Address</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-at"></i></div>
                            <input type="text" name="email" class="form-control" id="email"
                                   placeholder="you@example.com" required autofocus v-model="email">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="sr-only" for="password">Password</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-key"></i></div>
                            <input type="password" name="password" class="form-control" id="password"
                                   placeholder="Password" required v-model="password">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <p class="regis" data-toggle="modal" href="#registerModal">Create new user</p>
                </div>
            </div>
        </form>
        <div class="form-button">
            <button class="btn btn-success" @click="login()">Login</button>
            <div onlogin="checkLoginState();" class="fb-login-button login-btn" data-max-rows="1" data-size="medium" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false">
                Facebook login
            </div>
        </div>
    </div>
    `,

    data: function() {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        login () {
            axios.post('http://localhost:3000/login', {
                    email: this.email,
                    password: this.password
                })
                .then(({data}) => {
                    localStorage.setItem('apptoken', data.token)
                    window.location.href='index.html'
                })
        }
    }
})