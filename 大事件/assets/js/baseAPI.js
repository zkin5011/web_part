// 调用$,get或$.post $.ajax 先调用
$.ajaxPrefilter(function(options){
   options.url='http://www.liulongbin.top:3007' + options.url
})