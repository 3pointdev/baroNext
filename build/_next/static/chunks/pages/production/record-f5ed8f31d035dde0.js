(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[280],{7667:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var o=n(9521),a=n(5893);function r(e){var t=e.style,n=e.children;return(0,a.jsx)(i,{style:t,children:n})}var i=o.ZP.div.withConfig({displayName:"pageContainer__Container",componentId:"sc-sctx8k-0"})(["margin:0 auto;width:calc(100vw - 32px);height:calc(100vh - 176px);background:#f7f7f9;padding:24px 16px;display:flex;flex-direction:column;gap:32px;min-width:604px;"])},208:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var o=n(9521),a=n(9417),r=n(9603),i=n(9198),d=n.n(i);n(459);var c=n(3006),s=n(4288),l=n(5981),p=n(5893);function h(e){var t=e.start,n=e.end,o=e.onChange,i=["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],d=function(e){return e.toLocaleDateString("ko-KR",{weekday:"long"}).substr(0,1)},h=function(e){return new Date(new Date(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0))};return(0,p.jsxs)(u,{children:[(0,p.jsx)(f,{icon:s.fT7}),(0,p.jsx)(w,{selectsStart:!0,endDate:new Date(n),dateFormat:"yyyy-MM-dd",onKeyDown:function(e){return e.preventDefault()},locale:c.Z,showPopperArrow:!1,fixedHeight:!0,selected:new Date(t),onChange:function(e){o(e,l.wg.START)},maxDate:new Date,dayClassName:function(e){var t=d(h(e));return"토"===t?"saturday":"일"===t?"sunday":""},renderCustomHeader:function(e){var t=e.date,n=e.decreaseMonth,o=e.increaseMonth,d=e.prevMonthButtonDisabled,c=e.nextMonthButtonDisabled;return(0,p.jsxs)(y.Header,{children:[(0,p.jsx)(y.Button,{onClick:n,disabled:d,children:(0,p.jsx)(r.G,{icon:a.EyR})}),(0,p.jsxs)("div",{className:"custom-month",children:[t.getFullYear(),"년 ",i[t.getMonth()]]}),(0,p.jsx)(y.Button,{onClick:o,disabled:c,children:(0,p.jsx)(r.G,{icon:a.yOZ})})]})}}),(0,p.jsx)("p",{children:"~"}),(0,p.jsx)(x,{icon:s.fT7}),(0,p.jsx)(w,{selectsEnd:!0,startDate:new Date(t),minDate:new Date(t),dateFormat:"yyyy-MM-dd",onKeyDown:function(e){return e.preventDefault()},locale:c.Z,showPopperArrow:!1,fixedHeight:!0,selected:new Date(n),onChange:function(e){o(e,l.wg.END)},maxDate:new Date,dayClassName:function(e){var t=d(h(e));return"토"===t?"saturday":"일"===t?"sunday":""},renderCustomHeader:function(e){var t=e.date,n=e.decreaseMonth,o=e.increaseMonth,d=e.prevMonthButtonDisabled,c=e.nextMonthButtonDisabled;return(0,p.jsxs)(y.Header,{children:[(0,p.jsx)(y.Button,{onClick:n,disabled:d,children:(0,p.jsx)(r.G,{icon:a.EyR})}),(0,p.jsxs)("div",{className:"custom-month",children:[t.getFullYear(),"년 ",i[t.getMonth()]]}),(0,p.jsx)(y.Button,{onClick:o,disabled:c,children:(0,p.jsx)(r.G,{icon:a.yOZ})})]})}})]})}var u=o.ZP.div.withConfig({displayName:"rangeDatePicker__Container",componentId:"sc-1o94o81-0"})(['position:relative;display:flex;gap:16px;align-items:center;& .react-datepicker__tab-loop{z-index:101;position:absolute;& .react-datepicker{box-shadow:0 2px 8px rgba(76,78,100,0.22);border:0;}}& .react-datepicker__header{background:none;border:0;height:52px;& .react-datepicker__day-names{height:36px;display:flex;align-items:end;justify-content:center;}}& .react-datepicker__day-names *{color:gray;}& .react-datepicker__day{&.saturday{color:blue;}&.sunday{color:red;}&[aria-disabled="true"]{opacity:0.5;}&.react-datepicker__day--outside-month{color:lightgray !important;}}']),g=(0,o.ZP)(r.G).withConfig({displayName:"rangeDatePicker__IconSetting",componentId:"sc-1o94o81-1"})(["z-index:1;position:absolute;top:50%;width:16px;height:16px;font-size:16px;transform:translate(0,-50%);"]),f=(0,o.ZP)(g).withConfig({displayName:"rangeDatePicker__StartCalendarIcon",componentId:"sc-1o94o81-2"})(["left:8px;"]),x=(0,o.ZP)(g).withConfig({displayName:"rangeDatePicker__EndCalendarIcon",componentId:"sc-1o94o81-3"})(["right:156px;"]),w=(0,o.ZP)(d()).withConfig({displayName:"rangeDatePicker__Picker",componentId:"sc-1o94o81-4"})(["border:1px solid #d8d8dd;border-radius:8px;padding:6px 10px;height:28px;width:160px;background:#f2f2f2;font-size:16px;font-weight:400;line-height:24px;cursor:pointer;outline:none;caret-color:transparent;text-align:right;"]),y={Header:o.ZP.div.withConfig({displayName:"rangeDatePicker__Header",componentId:"sc-1o94o81-5"})(["display:flex;align-items:center;justify-content:space-around;font-size:16px;height:32px;"]),Button:o.ZP.button.withConfig({displayName:"rangeDatePicker__Button",componentId:"sc-1o94o81-6"})(["background:0;border:0;font-size:16px;cursor:pointer;&:disabled *{color:lightgray;cursor:default;}"])};function m(e){var t=e.start,n=e.end,o=e.onChange,a=e.title,r=e.children,i=e.style,d=e.childrenStyle;return(0,p.jsxs)(b,{style:i,children:[(0,p.jsx)(_.Wrap,{children:(0,p.jsx)(h,{start:t,end:n,onChange:o})}),a&&(0,p.jsx)(v,{children:a}),(0,p.jsx)(C.Wrap,{style:d,children:r})]})}var b=o.ZP.div.withConfig({displayName:"rangeDatePickHeader__Container",componentId:"sc-9gw5yh-0"})(["position:relative;flex-shrink:0;width:calc(100% - 32px);background:#fff;box-shadow:0 2px 8px rgba(76,78,100,0.22);border-radius:8px;height:70px;padding:0 16px;display:flex;align-items:center;justify-content:space-between;"]),_={Wrap:o.ZP.div.withConfig({displayName:"rangeDatePickHeader__Wrap",componentId:"sc-9gw5yh-1"})(["height:100%;display:flex;align-items:center;& span{text-align:center;width:110px;font-size:20px;font-weight:600;color:#4c4e64;}"])},C={Wrap:o.ZP.div.withConfig({displayName:"rangeDatePickHeader__Wrap",componentId:"sc-9gw5yh-2"})(["display:flex;gap:16px;"])},v=o.ZP.h2.withConfig({displayName:"rangeDatePickHeader__Title",componentId:"sc-9gw5yh-3"})(["position:absolute;transform:translate(-50%,-50%);left:50%;top:50%;"])},8491:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var o=n(7294),a=n(9521),r=n(5893);function i(e){var t=e.header,n=e.data,a=e.recordRef,i=e.isRowSpan,s=void 0===i||i,l=e.resultCount,p=(0,o.useState)([]),h=p[0],u=p[1],g=function(e){for(var t=[],o=1,a=n.length-1;a>0;a--)n[a][e]===n[a-1][e]?(o++,t.push(0)):(t.push(o),o=1);return t.push(o),t};return((0,o.useEffect)(function(){s&&u(g(t[0].column))},[n]),n.length<1)?(0,r.jsx)(r.Fragment,{}):(0,r.jsxs)(d.Container,{ref:a,children:[(0,r.jsxs)(d.Head,{children:[(0,r.jsx)("tr",{children:t.map(function(e,t){return(0,r.jsx)("th",{align:e.align,style:{width:e.size},children:e.title},"table_header_".concat(e.title,"_").concat(t))})}),l&&(0,r.jsx)(c,{children:(0,r.jsx)("td",{children:l})})]}),(0,r.jsx)(d.Body,{children:n.map(function(e,n){return(0,r.jsx)("tr",{children:t.map(function(o,a){var i=o.column===t[0].column,d=h[h.length-1-n];if(!(i&&0===d))return(0,r.jsx)("td",{align:o.align,rowSpan:s&&i&&d>0?d:1,className:o.column===t[0].column?"first_child":"",children:"".concat(e[o.column])},"table_body_row_data_".concat(a))})},"table_body_rows_".concat(n))})})]})}var d={Container:a.ZP.table.withConfig({displayName:"defaultTable__Container",componentId:"sc-1cwgrwt-0"})(["border-collapse:collapse;width:100%;height:100%;"]),Head:a.ZP.thead.withConfig({displayName:"defaultTable__Head",componentId:"sc-1cwgrwt-1"})(["position:sticky;top:0;z-index:100;& tr{height:48px;background:rgb(216,228,251);font-size:14px;color:black;}& tr th{padding:0 16px;}"]),Body:a.ZP.tbody.withConfig({displayName:"defaultTable__Body",componentId:"sc-1cwgrwt-2"})(["& tr{height:38px;border-bottom:thin solid rgba(0,0,0,0.12);font-size:14px;font-weight:400;&:hover{background:rgb(230,230,230);font-weight:600;& td.first_child{background:rgb(213,220,233);}}}& tr td{padding:0 16px;}& tr:last-child{border-bottom:0;}& tr td.first_child{background:rgb(235,242,253);}"])},c=a.ZP.tr.withConfig({displayName:"defaultTable__ChildrenWrap",componentId:"sc-1cwgrwt-3"})(["background:none !important;position:absolute;right:16px;top:4px;z-index:111;font-weight:600;font-size:16px;line-height:42px;"])},2980:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return x}});var o=n(7294),a=n(7667),r=n(4851),i=n(9521),d=n(208),c=n(7173),s=n(5893);function l(e){var t=e.size;return(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 50 50",width:"".concat(t,"px"),height:"".concat(t,"px"),children:(0,s.jsx)("path",{d:"M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 34 13 L 34 15 L 32 15 L 32 20 L 34 20 L 34 22 L 32 22 L 32 27 L 34 27 L 34 29 L 32 29 L 32 35 L 34 35 L 34 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 36 13 L 44 13 L 44 15 L 36 15 Z M 6.6875 15.6875 L 11.8125 15.6875 L 14.5 21.28125 C 14.710938 21.722656 14.898438 22.265625 15.0625 22.875 L 15.09375 22.875 C 15.199219 22.511719 15.402344 21.941406 15.6875 21.21875 L 18.65625 15.6875 L 23.34375 15.6875 L 17.75 24.9375 L 23.5 34.375 L 18.53125 34.375 L 15.28125 28.28125 C 15.160156 28.054688 15.035156 27.636719 14.90625 27.03125 L 14.875 27.03125 C 14.8125 27.316406 14.664063 27.761719 14.4375 28.34375 L 11.1875 34.375 L 6.1875 34.375 L 12.15625 25.03125 Z M 36 20 L 44 20 L 44 22 L 36 22 Z M 36 27 L 44 27 L 44 29 L 36 29 Z M 36 35 L 44 35 L 44 37 L 36 37 Z"})})}var p=n(8491),h=n(2777),u=n(2262),g=n(4105),f=new(function(){function e(){(0,h.Z)(this,e)}return(0,u.Z)(e,[{key:"tableToDownload",value:function(e){var t=e.targetRef,n=e.fileName,o=e.fileType,a=e.sheetName,r=e.columnWidth;e.columnStyle;var i=g.ZP.utils.table_to_book(t.current,{sheet:a,raw:!0});i.Sheets[a]["!cols"]=Object.keys(r).map(function(e){return{wch:r[e]}}),g.ZP.write(i,{bookType:o,bookSST:!0,type:"base64",ignoreEC:!1}),g.ZP.writeFile(i,n+o)}}]),e}()),x=(0,r.f3)("recordViewModel")((0,r.Pi)(function(e){var t=e.recordViewModel,n=(0,o.useRef)(null);return(0,o.useEffect)(function(){return t.getList(),function(){}},[]),(0,s.jsxs)(a.Z,{style:{gap:"16px"},children:[(0,s.jsx)(d.Z,{start:t.recordModel.startDay,end:t.recordModel.endDay,onChange:t.handleChangeDay,title:"생산이력",children:(0,s.jsx)(c.Z,{title:(0,s.jsxs)(w,{children:[(0,s.jsx)(l,{size:18}),"다운로드"]}),onClick:function(){f.tableToDownload({targetRef:n,fileName:"productionRecord",fileType:"xlsx",sheetName:"".concat(t.recordModel.startDay," ~ ").concat(t.recordModel.endDay),columnWidth:{A:24,B:48,C:24}})},style:{width:"auto",padding:"0 8px",border:"0",color:"#000",fontSize:"16px"},activeColor:"#E0E0E0"})}),(0,s.jsx)(y,{children:(0,s.jsx)(m,{children:(0,s.jsx)(p.Z,{header:t.tableHeader,data:t.list,recordRef:n})})})]})})),w=i.ZP.p.withConfig({displayName:"record__ButtonText",componentId:"sc-971cvc-0"})(["display:flex;align-items:center;gap:8px;"]),y=i.ZP.section.withConfig({displayName:"record__TableLayout",componentId:"sc-971cvc-1"})(["overflow:hidden;background:#fff;padding:16px;border-radius:8px;box-shadow:0 2px 8px rgba(76,78,100,0.22);"]),m=i.ZP.div.withConfig({displayName:"record__TablePadding",componentId:"sc-971cvc-2"})(["width:100%;height:100%;position:relative;overflow:auto;"])},927:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/production/record",function(){return n(2980)}])},67:function(){},2061:function(){}},function(e){e.O(0,[251,138,774,888,179],function(){return e(e.s=927)}),_N_E=e.O()}]);