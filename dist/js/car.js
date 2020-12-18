"use strict";function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var container=document.querySelector(".containers"),login=localStorage.getItem("login");function render(e){var t,n,a;e.length?(t=e.every(function(e){return 1==e.is_select}),n=shopNum(e),a='<div class="panel panel-default">\n        <div class="panel-heading">\n            <div class="content">\n                <label for="" class="checkbox">\n                    <input type="checkbox" id="all" '+(t?"checked":"")+'>\n                    <span>全选</span>\n                </label>\n                <label for="" class="type">\n                    <span>商品种类：</span>\n                    <span>'+e.length+'</span>\n                </label>\n                <label for="" class="qty">\n                    <span>所选商品数量：</span>\n                    <span>'+n.totalNum+'</span>\n                </label>\n                <label for="" class="price">\n                    <span>所选商品价格：</span>\n                    <span>'+n.totalPrice+'</span>\n                </label>\n                <label for="">\n                    <button class="btn btn-warning btn-xs count">结算</button>\n                    <button class="btn btn-info btn-xs clear">清空购物车</button>\n                </label>\n            </div>\n        </div>',a+='<div class="panel-body"><ul>',e.forEach(function(e){a+=' <li>\n                <div class="media">\n                    <div class="media-left media-middle">\n                        <input type="checkbox" class="check" '+(1==e.is_select?"checked":"")+' goods_id="'+e.pid+'">\n                        <a href="#">\n                            <img class="media-object"\n                                src="'+e.simg+'"\n                                alt="">\n                        </a>\n                    </div>\n                    <div class="media-body">\n                        <h4 class="media-heading">'+e.name+'</h4>\n                        <div class="price">\n                            <i class="glyphicon glyphicon-yen"></i>\n                            <span>'+e.price+'</span>\n                        </div>\n                        <div class="btn">\n                            <p>\n                                <butto class="btn btn-danger del" goods_id="'+e.pid+'">删除商品</butto>\n                            </p>\n                            <div class="btn-group" goods_id="'+e.pid+'" role="group" aria-label="...">\n                                <button class="btn btn-default cut">-</button>\n                                <button class="btn btn-default">'+e.cart_number+'</button>\n                                <button class="btn btn-default add">+</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </li>'}),a+=" </ul></div></div> ",container.innerHTML=a):container.innerHTML='<div class="jumbotron">\n            <h1>亲爱的用户</h1>\n            <p>您购物空空如也，请到列表页选购你商品</p>\n            <p><a class="btn btn-primary btn-lg" href="../html/list.html" role="button">点击去到列表页</a></p>\n        </div>'}function shopNum(e){e=e.filter(function(e){return 1==e.is_select});return{totalNum:e.reduce(function(e,t){return e+ +t.cart_number},0),totalPrice:e.reduce(function(e,t){return e+t.price*t.cart_number},0)}}login||(location.href="../html/login.html"),pAjax({url:"../api/getCarData.php",data:{username:login}}).then(function(e){localStorage.setItem("nike",JSON.stringify(e)),render(e),console.log(e)}),container.onclick=function(){var t,e,n,a,i,r,l,s,o,c,d,u=window.event;"all"==u.target.id&&((e=JSON.parse(localStorage.getItem("nike"))).forEach(function(e){u.target.checked?e.is_select=1:e.is_select=0}),localStorage.setItem("nike",JSON.stringify(e)),render(e)),"check"==u.target.className&&(t=u.target.getAttribute("goods_id"),(e=JSON.parse(localStorage.getItem("nike"))).forEach(function(e){e.pid==t&&(e.is_select=u.target.checked?1:0)}),localStorage.setItem("nike",JSON.stringify(e)),render(e)),u.target.classList.contains("del")&&(n=u.target.getAttribute("goods_id"),pAjax({url:"../api/removeCarData.php",data:{username:login,goods_id:n}}).then(function(e){e.code&&(e=JSON.parse(localStorage.getItem("nike")).filter(function(e){return e.pid!=n}),localStorage.setItem("nike",JSON.stringify(e)),render(e))})),u.target.classList.contains("cut")&&(a=JSON.parse(localStorage.getItem("nike")),i=u.target.parentNode.getAttribute("goods_id"),r=a.filter(function(e){return e.pid==i})[0],(l=+r.cart_number)<=1?l=1:l--,pAjax({url:"../api/updCarData.php",data:{username:login,goods_id:i,goods_num:l}}).then(function(e){e.code&&(r.cart_number=l,localStorage.setItem("nike",JSON.stringify(a)),render(a))})),u.target.classList.contains("add")&&(s=JSON.parse(localStorage.getItem("nike")),o=u.target.parentNode.getAttribute("goods_id"),c=s.filter(function(e){return e.pid==o})[0],d=+c.cart_number,d++,pAjax({url:"../api/addCarData.php",data:{username:login,goods_id:o,goods_num:d}}).then(function(e){e.code&&(c.cart_number=d,localStorage.setItem("nike",JSON.stringify(s)),render(s))})),u.target.classList.contains("count")&&pAjax({url:"../api/removeCarData.php",data:{username:login,is_select:1}}).then(function(e){e.code&&(e=JSON.parse(localStorage.getItem("nike")).filter(function(e){return 1!=e.is_select}),localStorage.setItem("nike",JSON.stringify(e)),render(e))}),u.target.classList.contains("clear")&&pAjax({url:"../api/removeCarData.php",data:_defineProperty({username:login,is_select:1},"is_select",0)}).then(function(e){e.code&&(JSON.parse(localStorage.getItem("nike")).filter(function(e){if(1==e.is_select||0==e.is_select)return 1==e.is_select||0==e.is_select}),localStorage.setItem("nike",JSON.stringify(e)),render(e))})};