
function userRegister(){
    document.querySelector('.form-signin-heading').innerHTML='请注册';
    $('.form-signin').attr('action','http://'+MyURL.Server+'/myssm/user/userRegister');
    if(nameAndPassNotNull()){
        $(".form-signin").ajaxSubmit(function (data) {
            if(data){
                showMessageInfo('注册成功');
                document.querySelector('.form-signin-heading').innerHTML='请登录';
            }else{
                showMessageInfo('用户已存在');
            }
        });
    }else{
        showMessageInfo('密码或用户名不能为空');
    }
}
function userLogin(){
    document.querySelector('.form-signin-heading').innerHTML='请登录';
    $('.form-signin').attr('action','http://'+MyURL.Server+'/myssm/user/userLogin');
    if(nameAndPassNotNull()){

        //服务已关闭
        // sessionStorage.setItem("logined","true");
        // sessionStorage.setItem("username",$('#inputUsername').val());
        // window.location.href='http://'+MyURL.Web+'/index.html';


        $(".form-signin").ajaxSubmit(function (data) {
            if(data){
                showMessageInfo('登录成功!');
                //获取cookid未知原因不能获取暂用sessionStorage代替
                sessionStorage.setItem("logined","true");
                sessionStorage.setItem("username",$('#inputUsername').val());
                window.location.href='http://'+MyURL.Web+'/index.html';
            }else{
                //获取cookid未知原因不能获取暂用sessionStorage代替
                sessionStorage.setItem("logined","false");
                //sessionStorage.setItem("username","tourists");
                showMessageInfo('用户或密码不正确');
            }
        });
    }else{
        showMessageInfo('密码或用户名不能为空');
    }
    
}
function nameAndPassNotNull(){
    var username=$('#inputUsername').val();
    var password=$('#inputPassword').val();
    if(username!=''&&password!==''){
        return true;
    }else{
        return false;
    }
}
$(function(){
    $('.userRegister').click(function(){
        userRegister();
    });
    $('.userLogin').click(function(){
        userLogin();
    });
});