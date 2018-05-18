//工具类
// 网络

//信息提示
/**
 * 显示提示信息 依赖bootstrop
 * @param {string} info 
 * @param {string } type -枚举类型[success,danger,info]
 */
function showMessageInfo(info,type="info"){
    var opacity=1;
    var infoStyle=" style='position:fixed;right:50%;top:10%;min-width:250px;text-align:center;' ";
    var messageDiv=$("<div"+infoStyle+">"+info+"</div>");
    switch(type){
        case 'success':
            messageDiv.addClass("alert alert-success");
            break;
        case 'danger':
            messageDiv.addClass("alert alert-danger");
            break;
        case 'info':
            messageDiv.addClass("alert alert-info");
            break;
        default:
            break;
    }

    $('body').append(messageDiv);
    //删除提示信息
     var fader=setInterval(function(){
        opacity -=0.02;
        if(opacity>=0){
            messageDiv.css('opacity',opacity);
        }else{
            messageDiv.remove();
            clearInterval(fader);
        }
     },50);
}
/**
 * 在这里简化
 */
class Login{
    constructor(){
        
    }
    static IsLogin(){
        return sessionStorage.getItem('logined');
    }
    static UserName(){
        return sessionStorage.getItem('username');
    }
}