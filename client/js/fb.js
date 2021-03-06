function statusChangeCallback(response) {
    let path = window.location.pathname;
    if (response.status === 'connected') {
        if(path == '/login.html') {
            axios.post('http://localhost:3000/facebook',{}, {headers: {fbtoken: response.authResponse.accessToken}})
            .then((res) => {
                localStorage.setItem('fbtoken', response.authResponse.accessToken);
                localStorage.setItem('apptoken', res.data.apptoken);
                if(path == '/login.html') {
                    window.location.href='index.html'      
                }
            })
        }
    } else {
        let apptoken = localStorage.getItem('apptoken');
        if(apptoken) {
            if(path == '/login.html') {
                window.location.href='index.html'      
            }
        } else {        
            if(path !== '/login.html') {      
                window.location.href='./login.html'
            }
        }
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '142361553260316',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.8'
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function logout() {
    let fbtoken = localStorage.getItem('fbtoken')
    if(fbtoken) {           
        FB.logout(function (response) {
            statusChangeCallback(response)
            localStorage.clear();
            window.location.href='login.html'
        })
    } else {
        localStorage.clear();
        window.location.href='login.html'        
    }
}