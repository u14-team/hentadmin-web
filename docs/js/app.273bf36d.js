(function(e){function t(t){for(var n,a,s=t[0],u=t[1],d=t[2],c=0,l=[];c<s.length;c++)a=s[c],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);v&&v(t);while(l.length)l.shift()();return i.push.apply(i,d||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,a=1;a<r.length;a++){var s=r[a];0!==o[s]&&(n=!1)}n&&(i.splice(t--,1),e=u(u.s=r[0]))}return e}var n={},a={app:0},o={app:0},i=[];function s(e){return u.p+"js/"+({"auth~dashboard~overview":"auth~dashboard~overview",auth:"auth","dashboard~overview":"dashboard~overview",dashboard:"dashboard",overview:"overview"}[e]||e)+"."+{"auth~dashboard~overview":"892e0cd4",auth:"51633e8d","dashboard~overview":"0741eb53",dashboard:"a1fa8034",overview:"868cf6f0"}[e]+".js"}function u(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.e=function(e){var t=[],r={"auth~dashboard~overview":1,auth:1,"dashboard~overview":1,dashboard:1,overview:1};a[e]?t.push(a[e]):0!==a[e]&&r[e]&&t.push(a[e]=new Promise((function(t,r){for(var n="css/"+({"auth~dashboard~overview":"auth~dashboard~overview",auth:"auth","dashboard~overview":"dashboard~overview",dashboard:"dashboard",overview:"overview"}[e]||e)+"."+{"auth~dashboard~overview":"7d9a0a83",auth:"a0a11c71","dashboard~overview":"2e231b93",dashboard:"4e2cb65e",overview:"56917a6d"}[e]+".css",o=u.p+n,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var d=i[s],c=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(c===n||c===o))return t()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){d=l[s],c=d.getAttribute("data-href");if(c===n||c===o)return t()}var v=document.createElement("link");v.rel="stylesheet",v.type="text/css",v.onload=t,v.onerror=function(t){var n=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=n,delete a[e],v.parentNode.removeChild(v),r(i)},v.href=o;var h=document.getElementsByTagName("head")[0];h.appendChild(v)})).then((function(){a[e]=0})));var n=o[e];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=i);var d,c=document.createElement("script");c.charset="utf-8",c.timeout=120,u.nc&&c.setAttribute("nonce",u.nc),c.src=s(e);var l=new Error;d=function(t){c.onerror=c.onload=null,clearTimeout(v);var r=o[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+n+": "+a+")",l.name="ChunkLoadError",l.type=n,l.request=a,r[1](l)}o[e]=void 0}};var v=setTimeout((function(){d({type:"timeout",target:c})}),12e4);c.onerror=c.onload=d,document.head.appendChild(c)}return Promise.all(t)},u.m=e,u.c=n,u.d=function(e,t,r){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)u.d(r,n,function(t){return e[t]}.bind(null,n));return r},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/hentadmin-web/",u.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],c=d.push.bind(d);d.push=t,d=d.slice();for(var l=0;l<d.length;l++)t(d[l]);var v=c;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var n=r("8a23"),a=r.n(n);a.a},"0bd0":function(e){e.exports=JSON.parse('{"languageSelfName":"🇷🇺 Русский","errors":{"internal_error":"Произошла внутренняя ошибка сервера.","invalid_auth":"Неверный логин или пароль","invalid_token":"Токен некорректен или время его жизни истекло","invalid_token_ip":"Токен принадлежит другому IP","invalid_method":"Неправильный метод","invalid_param":"Неправильный параметр"},"botStatuses":{"enabled":"Работает","disabled":"Остановлен","failed":"Произошла ошибка","reloading":"Перезапускается","disabling":"Останавливается","enabling":"Запускается"},"auth":{"languageSelector":{"title":"Выберите язык"},"serverSelect":{"title":"Введите адрес сервера","continue":"Продолжить","errors":{"empty":"Введите адрес","invalid":"Введите корректный URL"}},"authForm":{"title":"Введите данные для авторизации","login":"Логин","password":"Пароль","signin":"Войти","back":"Назад","errors":{"empty":"Это поле обязательно","invalid":"Введите корректный логин (A-z, 0-9 и _)"}}},"toolbar":{"signedAs":"Выполнен вход","server":"Адрес сервера","language":"Язык панели","themeSwitch":"Тёмная/светлая тема","settings":"Настройки панели","signout":"Выйти из аккаунта"},"overview":{"title":"Мониторинг","add":"Добавить бота","cards":{"infoUnknown":"Информация недоступна","status":"Статус","enable":"Запустить","restart":"Перезапустить","disable":"Остановить","gotoVk":"Группа ВКонтакте"}},"dashboard":{"sidebar":{"overview":"Обзор","console":"Консоль","errors":"Журнал ошибок","plugins":"Плагины","files":"Файлы","settings":"Настройки"}}}')},1:function(e,t){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("router-view")],1)},o=[],i={name:"HentAdmin",created:function(){var e=this.$store.state.persist,t=e.dark,r=e.token;this.$vuetify.theme.dark=t,r&&this.api.openWS()}},s=i,u=(r("034f"),r("2877")),d=r("6544"),c=r.n(d),l=r("7496"),v=Object(u["a"])(s,a,o,!1,null,null,null),h=v.exports;c()(v,{VApp:l["a"]});r("d3b7");var p=r("8c4f");n["a"].use(p["a"]);var f=[{path:"/",name:"Auth",component:function(){return Promise.all([r.e("auth~dashboard~overview"),r.e("auth")]).then(r.bind(null,"2fef"))}},{path:"/overview",name:"Overview",component:function(){return Promise.all([r.e("auth~dashboard~overview"),r.e("dashboard~overview"),r.e("overview")]).then(r.bind(null,"2226"))}},{path:"/dashboard",redirect:"/overview"},{path:"/dashboard/:id",name:"Dashboard",component:function(){return Promise.all([r.e("auth~dashboard~overview"),r.e("dashboard~overview"),r.e("dashboard")]).then(r.bind(null,"7277"))},children:[{path:"",redirect:"overview"},{path:"overview",component:function(){return Promise.all([r.e("auth~dashboard~overview"),r.e("dashboard~overview"),r.e("dashboard")]).then(r.bind(null,"5dcc"))}},{path:"console",component:function(){return Promise.all([r.e("auth~dashboard~overview"),r.e("dashboard~overview"),r.e("dashboard")]).then(r.bind(null,"2644"))}},{path:"errors",component:function(){return Promise.all([r.e("auth~dashboard~overview"),r.e("dashboard~overview"),r.e("dashboard")]).then(r.bind(null,"5747"))}}]}],b=new p["a"]({routes:f,mode:"history"}),m=(r("c740"),r("15fd")),g=r("2f62"),w=r("0e44"),y={state:{selectedBot:null},mutations:{selectBot:function(e,t){var r=t.bot;e.selectedBot=r},updateSelectedBot:function(e,t){var r=t.status,n=t.info;r&&(e.selectedBot.status=r),n&&(e.selectedBot.info=n)}}},k=(r("a434"),{state:{id:0,list:[]},mutations:{notify:function(e,t){var r=t.text;e.list.push({id:e.id++,text:r})},closeNotification:function(e,t){var r=t.id,n=e.list.findIndex((function(e){return e.id===r}));n&&e.list.splice(n,1)}}});n["a"].use(g["a"]);var O=new g["a"].Store({plugins:[Object(w["a"])({paths:["persist"]})],state:{persist:{server:null,token:null,login:null,dark:!1,serverHistory:[]},botList:[]},mutations:{saveServer:function(e,t){var r=t.address;e.persist.server=r},auth:function(e,t){var r=t.token;e.persist.token=r},updateBotList:function(e,t){var r=t.botList;e.botList=r},updateLogin:function(e,t){var r=t.login;e.persist.login=r},updateBot:function(e,t){var r=t.id,n=Object(m["a"])(t,["id"]),a=e.botList.findIndex((function(e){return e.id===r}));-1!==a&&(e.botList[a]=Object.assign(e.botList[a],n))},updateTheme:function(e,t){var r=t.isDark;e.persist.dark=r},logout:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{saveToken:!0},r=t.saveToken,n=e.persist,a=n.server,o=n.token;r||(o=void 0),e.persist.serverHistory.push({server:a,token:o}),e.persist.serverHistory.length>3&&e.persist.serverHistory.shift(),e.persist.server=null,e.persist.login=null,e.persist.token=null},clearHistory:function(e){e.persist.serverHistory=[]}},modules:{dashboard:y,notifications:k}}),S=r("f309");n["a"].use(S["a"]);var x=new S["a"]({theme:{themes:{light:{accent:"#000000"},dark:{accent:"#ffffff"}}}}),j=r("d3a4"),_=(r("4160"),r("4fad"),r("159b"),r("3835")),P=r("5530"),L=(r("96cf"),r("1da1")),T=r("bc3a"),A=r.n(T),B=r("8055"),E=r.n(B),N={};N.checkServer=function(){var e=Object(L["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,A.a.get(t,{params:{method:"test"}});case 3:if(r=e.sent,n=r.data,!n||"ok"!==n.response){e.next=9;break}return O.commit({type:"saveServer",address:t}),N.ws=E()(t,{autoConnect:!1,path:"/rtc"}),e.abrupt("return",!0);case 9:return e.abrupt("return","Указанный адрес не является сервером HentAdmin.");case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return","Ошибка: ".concat(e.t0.message,"."));case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}(),N.execMethod=function(){var e=Object(L["a"])(regeneratorRuntime.mark((function e(t,r){var n,a,o,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=O.state.persist,a=n.server,o=n.token,e.prev=1,e.next=4,A.a.get(a,{params:Object(P["a"])({method:t,token:o},r),responseType:"json"});case 4:if(i=e.sent,s=i.data,!s.error){e.next=13;break}e.t0=s.error.slug,e.next="invalid_token_ip"===e.t0||"invalid_token"===e.t0?10:13;break;case 10:return O.commit("logout",{saveToken:!1}),b.push("/"),e.abrupt("break",13);case 13:return e.abrupt("return",s);case 16:e.prev=16,e.t1=e["catch"](1);case 18:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(t,r){return e.apply(this,arguments)}}(),N.ws=E()(O.state.persist.server||window.location.href,{autoConnect:!1,path:"/rtc"});var C={};N.ws.on("reconnect",(function(){Object.entries(C).forEach((function(e){var t=Object(_["a"])(e,2),r=t[0],n=t[1];N.ws.emit("state",{slug:r,data:n})}))})),N.openWS=function(){var e=O.state.persist.token;N.ws.io.opts.query={token:e},console.log(N.ws.io),N.ws.open()},N.setRtcState=function(e,t){N.ws.emit("state",{slug:e,data:t}),C[e]=t},N.ws.on("connect_error",console.log),N.ws.on("connecting",console.log),n["a"].mixin({data:function(){return{api:N}}});var H=r("7bb1"),R=r("487a"),M=r.n(R);Object(H["d"])("eager"),n["a"].use(M.a),n["a"].config.productionTip=!1,new n["a"]({router:b,store:O,vuetify:x,i18n:j["a"],render:function(e){return e(h)}}).$mount("#app")},"8a23":function(e,t,r){},a540:function(e){e.exports=JSON.parse('{"languageSelfName":"🗿 debug"}')},d3a4:function(e,t,r){"use strict";r("b64b");var n=r("2b0e"),a=r("a925"),o=r("0bd0"),i=r("a540"),s={ru:o,debug:i};delete s.debug,n["a"].use(a["a"]);var u=new a["a"]({messages:s,locale:"ru",fallbackLocale:"ru"});n["a"].mixin({data:function(){return{languages:Object.keys(s)}},methods:{changeLanguage:function(e){u.locale=e}}}),t["a"]=u}});
//# sourceMappingURL=app.273bf36d.js.map