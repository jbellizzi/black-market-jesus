(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{158:function(e){e.exports={PERSON:"person",Date:"date","LOCATION 1":"city",Latitude:"lat",Longitude:"lon",NOTES:"notes"}},159:function(e){e.exports={Date:"dateString","Destination City":"destinationCity","Destination Latitude":"destinationLatitude","Destination Longitude":"destinationLongitude","End Date":"endDateString",Notes:"notes","Origin City":"originCity","Origin Latitude":"originLatitude","Origin Longitude":"originLongitude",Recipient:"recipient",Sender:"sender","Start Date":"startDateString"}},241:function(e,t,n){e.exports=n(398)},374:function(e,t,n){},375:function(e,t,n){},381:function(e,t,n){},382:function(e,t,n){},398:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(24),o=n.n(r),l=n(32),c=n(67),u=n(5),s=n(47),d=n(36),f=n(6),p=n(162),m=n(25),b=n(23),g=n(163),h=n(399),j=n(156),O=n(400),y=n(401),v=n(164),E=n(402),L=function(e){var t=e.source,n=e.headerMap,i=function(e){var t=e.rawData,n=e.headerMap,i=Object(a.useState)(null),r=Object(u.a)(i,2),o=r[0],l=r[1];return Object(a.useEffect)(function(){if(null!==t){var e=t.map(function(e){return Object.keys(e).reduce(function(t,a){return n[a]?Object(b.a)({},t,Object(m.a)({},n[a],e[a])):Object(b.a)({},t,Object(m.a)({},a,e[a]))},{})});e.columns=t.columns.map(function(e){return n[e]?n[e]:e}),l(e)}},[t]),o}({rawData:function(e){var t=Object(a.useState)(null),n=Object(u.a)(t,2),i=n[0],r=n[1];return Object(a.useEffect)(function(){Object(p.a)(e).then(r)},[]),i}(t),headerMap:n}),r=function(e){var t=Object(a.useState)(null),n=Object(u.a)(t,2),i=n[0],r=n[1];return Object(a.useEffect)(function(){null!==e&&Object(g.a)(e.columns).pipe(Object(h.a)(function(t){return Object(g.a)(e).pipe(Object(j.a)(function(e){return{value:e[t],selected:!1}}),Object(O.a)(function(e){return e.value}),Object(y.a)(),Object(j.a)(function(e){return Object(m.a)({},t,{selections:[],values:e})}))}),Object(v.a)(function(e,t){return Object(b.a)({},e,Object(m.a)({},Object.keys(t)[0],t[Object.keys(t)[0]]))},{})).subscribe(r)},[e]),{fields:i,setFields:r}}(i),o=r.fields,l=r.setFields,c=function(e){var t=e.fields,n=e.setFields;return null!==t?function(e,a){var i=t[e].values.map(function(e){return e.value===a?{value:e.value,selected:!e.selected}:e});n(Object(b.a)({},t,Object(m.a)({},e,{selections:i.filter(function(e){return e.selected}).map(function(e){return e.value}),values:i})))}:function(){}}({fields:o,setFields:l}),s=function(e){var t=e.fields,n=e.setFields;return null!==t?function(e){var a=t[e].values.map(function(e){return{value:e.value,selected:!1}});n(Object(b.a)({},t,Object(m.a)({},e,{selections:[],values:a})))}:function(){}}({fields:o,setFields:l});return{data:function(e){var t=e.transformedData,n=e.fields,i=Object(a.useState)(null),r=Object(u.a)(i,2),o=r[0],l=r[1];return Object(a.useEffect)(function(){null!==t&&null!==n&&Object(g.a)(t).pipe(Object(E.a)(function(e){for(var t=Object.keys(e),a=!0,i=0;i<t.length;i++)if(n[t[i]].selections.length&&-1===n[t[i]].selections.indexOf(e[t[i]])){a=!1;break}return a}),Object(y.a)()).subscribe(l)},[t,n]),o}({transformedData:i,fields:o}),fields:o,selectFieldValue:c,clearFieldValues:s}},S=Object(l.withStyles)(function(e){return{root:{marginTop:3*e.spacing.unit,marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit,display:"inline-block",verticalAlign:"top"},formControl:{margin:e.spacing.unit},select:{color:"#fff"},textField:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit,width:200,outline:"none"},button:{marginTop:e.spacing.unit,marginRight:e.spacing.unit,marginBottom:e.spacing.unit,color:"#fff"}}})(function(e){var t=e.classes,n=e.fields,r=e.fieldName,o=e.placeholder,l=e.select,c=e.clear,s=n[r],d=Object(a.useState)(s.values),p=Object(u.a)(d,2),m=p[0],b=p[1],g=Object(a.useState)(""),h=Object(u.a)(g,2),j=h[0],O=h[1];Object(a.useEffect)(function(){b(""===j?s.values:s.values.filter(function(e){return e.value.toUpperCase().indexOf(j.toUpperCase())>-1}))},[j]);var y=Object(a.useState)(!1),v=Object(u.a)(y,2),E=v[0],L=v[1];return i.a.createElement("div",{className:t.root},i.a.createElement(f.c,{className:t.formControl},i.a.createElement(f.j,{className:t.select,multiple:!0,displayEmpty:!0,value:s.selections,onChange:function(e){l(r,e.nativeEvent.target.textContent)},input:i.a.createElement(f.e,{id:"select-multiple-placeholder"}),renderValue:function(e){return 0===e.length?i.a.createElement("em",null,o):e.join(", ")},open:E,onOpen:function(){L(!0)},onClose:function(){L(!1),O("")}},i.a.createElement(f.m,{placeholder:"Search",className:t.textField,onChange:function(e){O(e.target.value)}}),m.map(function(e){return i.a.createElement(f.i,{key:e.value,value:e.value},e.value)}))),i.a.createElement(f.b,{variant:"outlined",size:"small",className:t.button,onClick:function(){c(r)}},"Clear"))}),C=Object(l.withStyles)(function(e){return{root:{marginTop:3*e.spacing.unit,marginLeft:3*e.spacing.unit,display:"inline-block",verticalAlign:"top"},TextField:{width:200},TextFieldInput:{color:"#fff"}}})(function(e){var t=e.classes,n=e.label,a=e.defaultValue,r=e.setDate;return i.a.createElement("div",{className:t.root},i.a.createElement("form",null,i.a.createElement(f.m,{id:"date",label:n,type:"date",defaultValue:a,className:t.TextField,InputLabelProps:{shrink:!0,className:t.TextFieldInput},InputProps:{className:t.TextFieldInput},onChange:function(e){r(new Date("".concat(e.target.value," GMT-0500")))}})))}),D=n(46),w=n.n(D),x=n(79);n(374);w.a.accessToken="pk.eyJ1IjoiamJlbGxpenppIiwiYSI6ImNqb3Z6eHZreTFzZ3IzcHBia214M250cncifQ.562aUOGz7HteIUdtCdzDtA";var N=function(e){var t=e.data,n=e.setNotes,r=Object(a.useRef)(null),o=Object(a.useState)(void 0),l=Object(u.a)(o,2),c=l[0],s=l[1],d=Object(a.useState)(!1),f=Object(u.a)(d,2),p=f[0],m=f[1];return Object(a.useEffect)(function(){null!==r&&setTimeout(function(){var e=new w.a.Map({container:"map",style:"mapbox://styles/jbellizzi/cjow0pxqu41im2rqya3q7zazt",center:[12,48],zoom:4.1});s(e),e.on("load",function(){return m(!0)})},1e3)},[r]),Object(a.useEffect)(function(){p&&(c.addSource("point",{type:"geojson",data:{type:"FeatureCollection",features:[]}}),c.addLayer({id:"point",source:"point",type:"circle",paint:{"circle-radius":4,"circle-color":"#D6F0FF"}}),c.addSource("line",{type:"geojson",lineMetrics:!0,data:{type:"FeatureCollection",features:[]}}),c.addLayer({id:"line",type:"line",source:"line",paint:{"line-width":["get","lineWidth"],"line-gradient":["interpolate",["linear"],["line-progress"],0,"#e0f7fa",.5,"#e0f7fa",1,"#0097a7"]},layout:{"line-join":"round","line-cap":"round"}}),c.on("mouseenter","point",function(e){n(e.features.map(function(e){return e.properties}))}))},[p]),Object(a.useEffect)(function(){if(null!==t&&p){var e={type:"FeatureCollection",features:t.map(function(e){return e.cities.map(function(t){return{type:"Feature",geometry:{type:"Point",coordinates:[t.lon,t.lat]},properties:{name:e.name,date:t.dateString,city:t.name,notes:t.notes}}})}).flat()};c.getSource("point").setData(e);var n={type:"FeatureCollection",features:t.filter(function(e){return e.paths.length}).map(function(e){return e.paths.map(function(e){return Object(x.bezierSpline)({type:"Feature",properties:{lineWidth:2},geometry:{type:"LineString",coordinates:[[e.originLon,e.originLat],[e.originLon+(e.destinationLon-e.originLon)*(2/3),e.destinationLat+(e.originLat-e.destinationLat)*(2/3)],[e.destinationLon,e.destinationLat]]}})})}).flat()};c.getSource("line").setData(n)}},[p,t]),i.a.createElement("div",{id:"map",ref:r})},F=n(37),T=n(158),k=Object(l.withStyles)(function(e){return{ListItemText:{color:"#fff"},List:{height:800,overflow:"auto"}}})(function(e){var t=e.classes,n=Object(a.useState)([]),r=Object(u.a)(n,2),o=r[0],l=r[1],c=L({source:"./data/people.csv",headerMap:T}),s=c.data,d=c.fields,p=c.selectFieldValue,m=c.clearFieldValues,g=function(e){var t=Object(a.useState)(null),n=Object(u.a)(t,2),i=n[0],r=n[1],o=Object(a.useState)(null),l=Object(u.a)(o,2),c=l[0],s=l[1];Object(a.useEffect)(function(){if(null!==e){var t=e.map(function(e){return e.date});r(Math.min.apply(null,t)),s(Math.max.apply(null,t))}},[e]);var d=Object(a.useState)(null),f=Object(u.a)(d,2),p=f[0],m=f[1];return Object(a.useEffect)(function(){null!==i&&null!==c&&m(e.filter(function(e){return e.date>=i&&e.date<=c}))},[i,c,e]),{data:p,setMinDate:r,setMaxDate:s}}(function(e){var t=Object(a.useState)(null),n=Object(u.a)(t,2),i=n[0],r=n[1];return Object(a.useEffect)(function(){null!==e&&r(e.map(function(e){return Object(b.a)({},e,{lat:+e.lat,lon:+e.lon,dateString:e.date,date:new Date("".concat(e.date," GMT-0457"))})}))},[e]),i}(s)),h=g.data,j=g.setMinDate,O=g.setMaxDate,y=function(e){var t=Object(a.useState)(null),n=Object(u.a)(t,2),i=n[0],r=n[1];return Object(a.useEffect)(function(){null!==e&&r(Object(F.b)().key(function(e){return e.person}).entries(e).map(function(e){return{name:e.key,cities:e.values.map(function(e){return{name:e.city,dateString:e.dateString,date:e.date,lat:e.lat,lon:e.lon,notes:e.notes}}),paths:e.values.filter(function(e,t,n){return 0===t?null:e.city!==n[t-1].city}).map(function(e,t,n){return 0===t?null:{originCity:n[t-1].city,originLat:n[t-1].lat,originLon:n[t-1].lon,destinationCity:e.city,destinationLat:e.lat,destinationLon:e.lon}}).filter(function(e){return null!==e})}}))},[e]),i}(h);return i.a.createElement("div",null,i.a.createElement(f.d,{container:!0,spacing:24},i.a.createElement(f.d,{item:!0,xs:12},null!==d?i.a.createElement(i.a.Fragment,null,i.a.createElement(S,{fields:d,fieldName:"person",placeholder:"Person",select:p,clear:m}),i.a.createElement(S,{fields:d,fieldName:"city",placeholder:"City",select:p,clear:m})):null,i.a.createElement(C,{label:"Start Date",defaultValue:"1660-01-01",setDate:j}),i.a.createElement(C,{label:"End Date",defaultValue:"1699-12-31",setDate:O})),i.a.createElement(f.d,{item:!0,xs:9},i.a.createElement(N,{data:y,setNotes:l})),i.a.createElement(f.d,{item:!0,xs:3},i.a.createElement(f.f,{component:"nav",className:t.List},o.map(function(e,n){return i.a.createElement(f.g,{key:n},i.a.createElement(f.h,{classes:{primary:t.ListItemText,secondary:t.ListItemText},style:{whiteSpace:"pre-line"},primary:"".concat(e.name," (").concat(e.date,")"),secondary:"".concat(e.city," ").concat(e.notes.length?"\nnotes: ".concat(e.notes):"")}))})))))}),M=n(11),I=n(161);n(375);w.a.accessToken="pk.eyJ1IjoiamJlbGxpenppIiwiYSI6ImNqb3Z6eHZreTFzZ3IzcHBia214M250cncifQ.562aUOGz7HteIUdtCdzDtA";var z=function(e){var t=e.data,n=e.setNotes,r=Object(a.useRef)(null),o=Object(a.useState)(null),l=Object(u.a)(o,2),c=l[0],s=l[1],d=Object(a.useState)(!1),f=Object(u.a)(d,2),p=f[0],m=f[1];return Object(a.useEffect)(function(){null!==r&&setTimeout(function(){var e=new w.a.Map({container:"map",style:"mapbox://styles/jbellizzi/cjow0pxqu41im2rqya3q7zazt",center:[12,48],zoom:4.1});s(e),e.on("load",function(){return m(!0)})})},[r]),Object(a.useEffect)(function(){p&&(c.addSource("line",{type:"geojson",lineMetrics:!0,data:{type:"FeatureCollection",features:[]}}),c.addLayer({id:"line",type:"line",source:"line",paint:{"line-width":["get","lineWidth"],"line-gradient":["interpolate",["linear"],["line-progress"],0,"#e0f7fa",.5,"#e0f7fa",1,"#0097a7"]},layout:{"line-join":"round","line-cap":"round"}}),c.on("mouseenter","line",function(e){var t=e.features[0].properties,a={path:t.path,letterCount:t.letterCount,letters:JSON.parse(t.letters)};n(a)}))},[p]),Object(a.useEffect)(function(){if(p&&null!==t){var e=Object(I.a)().domain(Object(M.d)(t,function(e){return e.letterCount})).range([1,15]),n={type:"FeatureCollection",features:t.filter(function(e){return!isNaN(e.originLatitude)&&!isNaN(e.originLongitude)&&!isNaN(e.destinationLatitude)&&!isNaN(e.destinationLongitude)}).map(function(t){return Object(x.bezierSpline)({type:"Feature",properties:{lineWidth:e(t.letterCount),path:t.path,letterCount:t.letterCount,letters:t.letters.map(function(e){return{dateString:e.dateString,sender:e.sender,recipient:e.recipient,notes:e.notes}})},geometry:{type:"LineString",coordinates:[[t.originLongitude,t.originLatitude],[t.originLongitude+(t.destinationLongitude-t.originLongitude)*(2/3),t.destinationLatitude+(t.originLatitude-t.destinationLatitude)*(2/3)],[t.destinationLongitude,t.destinationLatitude]]}})})};c.getSource("line").setData(n)}},[p,t]),i.a.createElement("div",{id:"map",ref:r})},A=n(159),V=Object(l.withStyles)(function(e){return{List:{height:800,overflow:"auto"},ListItemText:{color:"#fff"},Typography:{color:"#fff"}}})(function(e){var t=e.classes,n=Object(a.useState)(null),r=Object(u.a)(n,2),o=r[0],l=r[1],c=L({source:"./data/letters.csv",headerMap:A}),s=c.data,d=c.fields,p=c.selectFieldValue,m=c.clearFieldValues,g=function(e){var t=Object(a.useState)(null),n=Object(u.a)(t,2),i=n[0],r=n[1],o=Object(a.useState)(null),l=Object(u.a)(o,2),c=l[0],s=l[1];Object(a.useEffect)(function(){if(null!==e){var t=e.map(function(e){return e.startDate}),n=e.map(function(e){return e.endDate});r(Math.min.apply(null,t)),s(Math.max.apply(null,n))}},[e]);var d=Object(a.useState)(null),f=Object(u.a)(d,2),p=f[0],m=f[1];return Object(a.useEffect)(function(){null!==i&&null!==c&&m(e.filter(function(e){return!(e.startDate>c||e.endDate<i)}))},[i,c]),{data:p,setMinDate:r,setMaxDate:s}}(function(e){var t=Object(a.useState)(null),n=Object(u.a)(t,2),i=n[0],r=n[1];return Object(a.useEffect)(function(){null!==e&&r(e.map(function(e){return Object(b.a)({},e,{path:"".concat(e.originCity," -> ").concat(e.destinationCity),originLatitude:+e.originLatitude,originLongitude:+e.originLongitude,destinationLatitude:+e.destinationLatitude,destinationLongitude:+e.destinationLongitude,startDate:new Date("".concat(e.startDateString," GMT-0457")),endDate:new Date("".concat(e.endDateString," GMT-0457"))})}))},[e]),i}(s)),h=g.data,j=g.setMinDate,O=g.setMaxDate,y=function(e){var t=Object(a.useState)(null),n=Object(u.a)(t,2),i=n[0],r=n[1];return Object(a.useEffect)(function(){null!==e&&r(Object(F.b)().key(function(e){return e.path}).rollup(function(e){return{letterCount:e.length,originLatitude:e[0].originLatitude,originLongitude:e[0].originLongitude,destinationLatitude:e[0].destinationLatitude,destinationLongitude:e[0].destinationLongitude,letters:e}}).entries(e).map(function(e){return{path:e.key,originLatitude:e.value.originLatitude,originLongitude:e.value.originLongitude,destinationLatitude:e.value.destinationLatitude,destinationLongitude:e.value.destinationLongitude,letterCount:e.value.letterCount,letters:e.value.letters}}))},[e]),i}(h);return i.a.createElement("div",null,i.a.createElement(f.d,{container:!0,spacing:24},i.a.createElement(f.d,{item:!0,xs:12},i.a.createElement(C,{label:"Start Date",defaultValue:"1600-01-01",setDate:j}),i.a.createElement(C,{label:"End Date",defaultValue:"1699-12-31",setDate:O}),null!==d?[{fieldName:"originCity",placeholder:"Origin City"},{fieldName:"destinationCity",placeholder:"Destination City"},{fieldName:"sender",placeholder:"Sender"},{fieldName:"recipient",placeholder:"Recipient"}].map(function(e,t){return i.a.createElement(S,{key:t,fields:d,fieldName:e.fieldName,placeholder:e.placeholder,select:p,clear:m})}):null),i.a.createElement(f.d,{item:!0,xs:9},i.a.createElement(z,{data:y,setNotes:l})),i.a.createElement(f.d,{item:!0,xs:3},null!==o?i.a.createElement("div",null,i.a.createElement(f.n,{variant:"h5",color:"textPrimary",classes:{colorTextPrimary:t.Typography}},o.path," (",o.letterCount,")"),i.a.createElement(f.f,{component:"nav",className:t.List},o.letters.map(function(e,n){return i.a.createElement(f.g,{key:n},i.a.createElement(f.h,{classes:{primary:t.ListItemText,secondary:t.ListItemText},style:{whiteSpace:"pre-line"},primary:"".concat(e.dateString,"\n").concat(e.sender," -> ").concat(e.recipient),secondary:e.notes.length?"\nnotes: ".concat(e.notes):""}))}))):null)))}),B=function(){return i.a.createElement("div",{className:"about"},i.a.createElement("p",null,"This website was created by John Bellizzi, Solutions Architect at Axis Group, LLC in conjunction with Kelsey Champagne's doctoral thesis,"," ",i.a.createElement("span",{className:"title"},"Migration, Exile and Absence: Catholicism on the British Atlantic Frontier, 1634-1699 (Yale, 2021)"),"."),i.a.createElement("p",null,"Drawing on over three thousand letters from the Blairs Letters and Scots Missions collections of the Scottish Catholic Archives at the University of Aberdeen, the maps on this interactive site track the movement of letters and individuals connected to Scottish Catholicism between 1640 and 1699. Facing persecution for their faith in the British Isles, many Scots Catholics chose temporary or permanent exile in Catholic Europe where they could openly practice their faith. Many of the men featured in the SCA collections became ordained secular priests and returned to Scotland as missionaries, where they provided catechism to the country\u2019s practicing Catholics and converted more. Their mission flowed from institutions in Europe that trained priests and equipped them with the resources necessary to embark on missionary work back to Scotland. The maps on this site show the mechanisms of the networks they created in the tumultuous period of the seventeenth century."),i.a.createElement("p",null,"Please enjoy moving through this digital visualization of Scottish Catholicism in exile. For further information, please contact ",i.a.createElement("a",{href:"mailto:kelsey.champagne@yale.edu"},"Kelsey Champagne"),"."))},P=Object(d.d)(Object(l.withStyles)(function(e){return{Tabs:{backgroundColor:"#3c5f7b",color:e.palette.getContrastText("#3c5f7b")}}})(function(e){var t=e.location.pathname,n=e.classes,r=Object(a.useState)({"/":0,"/letters":1}[t]),o=Object(u.a)(r,2),l=o[0],c=o[1];return i.a.createElement("div",null,i.a.createElement(f.a,{position:"static"},i.a.createElement(f.l,{className:n.Tabs,value:l,variant:"fullWidth",indicatorColor:"primary",onChange:function(e,t){return c(t)}},i.a.createElement(f.k,{label:"People",component:s.b,to:"/"}),i.a.createElement(f.k,{label:"Letters",component:s.b,to:"/letters"}),i.a.createElement(f.k,{label:"About",component:s.b,to:"/about"}))),i.a.createElement(d.a,{path:"/",exact:!0,component:k}),i.a.createElement(d.a,{path:"/letters",component:V}),i.a.createElement(d.a,{path:"/about",component:B}))})),q=(n(381),function(){var e=Object(a.useState)(void 0),t=Object(u.a)(e,2),n=(t[0],t[1],Object(a.useState)(void 0)),r=Object(u.a)(n,2),o=(r[0],r[1],Object(a.useState)(0)),l=Object(u.a)(o,2);l[0],l[1];return i.a.createElement("div",{className:"App"},i.a.createElement(s.a,null,i.a.createElement(P,null)))});n(382),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var G=Object(l.createMuiTheme)({palette:{primary:c.lightBlue},typography:{useNextVariants:!0}});o.a.render(i.a.createElement(l.MuiThemeProvider,{theme:G},i.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[241,1,2]]]);
//# sourceMappingURL=main.e6cf8437.chunk.js.map