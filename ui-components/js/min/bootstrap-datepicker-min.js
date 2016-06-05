!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function($,t){function e(){return new Date(Date.UTC.apply(Date,arguments))}function a(){var t=new Date;return e(t.getFullYear(),t.getMonth(),t.getDate())}function i(t,e){return t.getUTCFullYear()===e.getUTCFullYear()&&t.getUTCMonth()===e.getUTCMonth()&&t.getUTCDate()===e.getUTCDate()}function s(t){return function(){return this[t].apply(this,arguments)}}function n(t,e){function a(t,e){return e.toLowerCase()}var i=$(t).data(),s={},n,r=new RegExp("^"+e.toLowerCase()+"([A-Z])");e=new RegExp("^"+e.toLowerCase());for(var h in i)e.test(h)&&(n=h.replace(r,a),s[n]=i[h]);return s}function r(t){var e={};if(f[t]||(t=t.split("-")[0],f[t])){var a=f[t];return $.each(p,function(t,i){i in a&&(e[i]=a[i])}),e}}var h=function(){var t={get:function(t){return this.slice(t)[0]},contains:function(t){for(var e=t&&t.valueOf(),a=0,i=this.length;i>a;a++)if(this[a].valueOf()===e)return a;return-1},remove:function(t){this.splice(t,1)},replace:function(t){t&&($.isArray(t)||(t=[t]),this.clear(),this.push.apply(this,t))},clear:function(){this.length=0},copy:function(){var t=new h;return t.replace(this),t}};return function(){var e=[];return e.push.apply(e,arguments),$.extend(e,t),e}}(),o=function(t,e){this._process_options(e),this.dates=new h,this.viewDate=this.o.defaultViewDate,this.focusDate=null,this.element=$(t),this.isInline=!1,this.isInput=this.element.is("input"),this.component=this.element.hasClass("date")?this.element.find(".add-on, .input-group-addon, .btn"):!1,this.hasInput=this.component&&this.element.find("input").length,this.component&&0===this.component.length&&(this.component=!1),this.picker=$(g.template),this._buildEvents(),this._attachEvents(),this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.o.rtl&&this.picker.addClass("datepicker-rtl"),this.viewMode=this.o.startView,this.o.calendarWeeks&&this.picker.find("tfoot .today, tfoot .clear").attr("colspan",function(t,e){return parseInt(e)+1}),this._allow_update=!1,this.setStartDate(this._o.startDate),this.setEndDate(this._o.endDate),this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted),this.setDatesDisabled(this.o.datesDisabled),this.fillDow(),this.fillMonths(),this._allow_update=!0,this.update(),this.showMode(),this.isInline&&this.show()};o.prototype={constructor:o,_process_options:function(i){this._o=$.extend({},this._o,i);var s=this.o=$.extend({},this._o),n=s.language;switch(f[n]||(n=n.split("-")[0],f[n]||(n=u.language)),s.language=n,s.startView){case 2:case"decade":s.startView=2;break;case 1:case"year":s.startView=1;break;default:s.startView=0}switch(s.minViewMode){case 1:case"months":s.minViewMode=1;break;case 2:case"years":s.minViewMode=2;break;default:s.minViewMode=0}switch(s.maxViewMode){case 0:case"days":s.maxViewMode=0;break;case 1:case"months":s.maxViewMode=1;break;default:s.maxViewMode=2}s.startView=Math.min(s.startView,s.maxViewMode),s.startView=Math.max(s.startView,s.minViewMode),s.multidate!==!0&&(s.multidate=Number(s.multidate)||!1,s.multidate!==!1&&(s.multidate=Math.max(0,s.multidate))),s.multidateSeparator=String(s.multidateSeparator),s.weekStart%=7,s.weekEnd=(s.weekStart+6)%7;var r=g.parseFormat(s.format);if(s.startDate!==-(1/0)&&(s.startDate?s.startDate instanceof Date?s.startDate=this._local_to_utc(this._zero_time(s.startDate)):s.startDate=g.parseDate(s.startDate,r,s.language):s.startDate=-(1/0)),s.endDate!==1/0&&(s.endDate?s.endDate instanceof Date?s.endDate=this._local_to_utc(this._zero_time(s.endDate)):s.endDate=g.parseDate(s.endDate,r,s.language):s.endDate=1/0),s.daysOfWeekDisabled=s.daysOfWeekDisabled||[],$.isArray(s.daysOfWeekDisabled)||(s.daysOfWeekDisabled=s.daysOfWeekDisabled.split(/[,\s]*/)),s.daysOfWeekDisabled=$.map(s.daysOfWeekDisabled,function(t){return parseInt(t,10)}),s.daysOfWeekHighlighted=s.daysOfWeekHighlighted||[],$.isArray(s.daysOfWeekHighlighted)||(s.daysOfWeekHighlighted=s.daysOfWeekHighlighted.split(/[,\s]*/)),s.daysOfWeekHighlighted=$.map(s.daysOfWeekHighlighted,function(t){return parseInt(t,10)}),s.datesDisabled=s.datesDisabled||[],!$.isArray(s.datesDisabled)){var h=[];h.push(g.parseDate(s.datesDisabled,r,s.language)),s.datesDisabled=h}s.datesDisabled=$.map(s.datesDisabled,function(t){return g.parseDate(t,r,s.language)});var o=String(s.orientation).toLowerCase().split(/\s+/g),d=s.orientation.toLowerCase();if(o=$.grep(o,function(t){return/^auto|left|right|top|bottom$/.test(t)}),s.orientation={x:"auto",y:"auto"},d&&"auto"!==d)if(1===o.length)switch(o[0]){case"top":case"bottom":s.orientation.y=o[0];break;case"left":case"right":s.orientation.x=o[0]}else d=$.grep(o,function(t){return/^left|right$/.test(t)}),s.orientation.x=d[0]||"auto",d=$.grep(o,function(t){return/^top|bottom$/.test(t)}),s.orientation.y=d[0]||"auto";else;if(s.defaultViewDate){var l=s.defaultViewDate.year||(new Date).getFullYear(),c=s.defaultViewDate.month||0,p=s.defaultViewDate.day||1;s.defaultViewDate=e(l,c,p)}else s.defaultViewDate=a();s.showOnFocus=s.showOnFocus!==t?s.showOnFocus:!0},_events:[],_secondaryEvents:[],_applyEvents:function(e){for(var a=0,i,s,n;a<e.length;a++)i=e[a][0],2===e[a].length?(s=t,n=e[a][1]):3===e[a].length&&(s=e[a][1],n=e[a][2]),i.on(n,s)},_unapplyEvents:function(e){for(var a=0,i,s,n;a<e.length;a++)i=e[a][0],2===e[a].length?(n=t,s=e[a][1]):3===e[a].length&&(n=e[a][1],s=e[a][2]),i.off(s,n)},_buildEvents:function(){var t={keyup:$.proxy(function(t){-1===$.inArray(t.keyCode,[27,37,39,38,40,32,13,9])&&this.update()},this),keydown:$.proxy(this.keydown,this),paste:$.proxy(this.paste,this)};this.o.showOnFocus===!0&&(t.focus=$.proxy(this.show,this)),this.isInput?this._events=[[this.element,t]]:this.component&&this.hasInput?this._events=[[this.element.find("input"),t],[this.component,{click:$.proxy(this.show,this)}]]:this.element.is("div")?this.isInline=!0:this._events=[[this.element,{click:$.proxy(this.show,this)}]],this._events.push([this.element,"*",{blur:$.proxy(function(t){this._focused_from=t.target},this)}],[this.element,{blur:$.proxy(function(t){this._focused_from=t.target},this)}]),this.o.immediateUpdates&&this._events.push([this.element,{"changeYear changeMonth":$.proxy(function(t){this.update(t.date)},this)}]),this._secondaryEvents=[[this.picker,{click:$.proxy(this.click,this)}],[$(window),{resize:$.proxy(this.place,this)}],[$(document),{mousedown:$.proxy(function(t){this.element.is(t.target)||this.element.find(t.target).length||this.picker.is(t.target)||this.picker.find(t.target).length||this.picker.hasClass("datepicker-inline")||$(this.picker).hide()},this)}]]},_attachEvents:function(){this._detachEvents(),this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents(),this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(t,e){var a=e||this.dates.get(-1),i=this._utc_to_local(a);this.element.trigger({type:t,date:i,dates:$.map(this.dates,this._utc_to_local),format:$.proxy(function(t,e){0===arguments.length?(t=this.dates.length-1,e=this.o.format):"string"==typeof t&&(e=t,t=this.dates.length-1),e=e||this.o.format;var a=this.dates.get(t);return g.formatDate(a,e,this.o.language)},this)})},show:function(){return this.element.attr("readonly")&&this.o.enableOnReadonly===!1?void 0:(this.isInline||this.picker.appendTo(this.o.container),this.place(),this.picker.show(),this._attachSecondaryEvents(),this._trigger("show"),(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&this.o.disableTouchKeyboard&&$(this.element).blur(),this)},hide:function(){return this.isInline?this:this.picker.is(":visible")?(this.focusDate=null,this.picker.hide().detach(),this._detachSecondaryEvents(),this.viewMode=this.o.startView,this.showMode(),this.o.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())&&this.setValue(),this._trigger("hide"),this):this},remove:function(){return this.hide(),this._detachEvents(),this._detachSecondaryEvents(),this.picker.remove(),delete this.element.data().datepicker,this.isInput||delete this.element.data().date,this},paste:function(t){var e;if(t.originalEvent.clipboardData&&t.originalEvent.clipboardData.types&&-1!==$.inArray("text/plain",t.originalEvent.clipboardData.types))e=t.originalEvent.clipboardData.getData("text/plain");else{if(!window.clipboardData)return;e=window.clipboardData.getData("Text")}this.setDate(e),this.update(),t.preventDefault()},_utc_to_local:function(t){return t&&new Date(t.getTime()+6e4*t.getTimezoneOffset())},_local_to_utc:function(t){return t&&new Date(t.getTime()-6e4*t.getTimezoneOffset())},_zero_time:function(t){return t&&new Date(t.getFullYear(),t.getMonth(),t.getDate())},_zero_utc_time:function(t){return t&&new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()))},getDates:function(){return $.map(this.dates,this._utc_to_local)},getUTCDates:function(){return $.map(this.dates,function(t){return new Date(t)})},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){var t=this.dates.get(-1);return"undefined"!=typeof t?new Date(t):null},clearDates:function(){var t;this.isInput?t=this.element:this.component&&(t=this.element.find("input")),t&&t.val(""),this.update(),this._trigger("changeDate"),this.o.autoclose&&this.hide()},setDates:function(){var t=$.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,t),this._trigger("changeDate"),this.setValue(),this},setUTCDates:function(){var t=$.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,$.map(t,this._utc_to_local)),this._trigger("changeDate"),this.setValue(),this},setDate:s("setDates"),setUTCDate:s("setUTCDates"),setValue:function(){var t=this.getFormattedDate();return this.isInput?this.element.val(t):this.component&&this.element.find("input").val(t),this},getFormattedDate:function(e){e===t&&(e=this.o.format);var a=this.o.language;return $.map(this.dates,function(t){return g.formatDate(t,e,a)}).join(this.o.multidateSeparator)},setStartDate:function(t){return this._process_options({startDate:t}),this.update(),this.updateNavArrows(),this},setEndDate:function(t){return this._process_options({endDate:t}),this.update(),this.updateNavArrows(),this},setDaysOfWeekDisabled:function(t){return this._process_options({daysOfWeekDisabled:t}),this.update(),this.updateNavArrows(),this},setDaysOfWeekHighlighted:function(t){return this._process_options({daysOfWeekHighlighted:t}),this.update(),this},setDatesDisabled:function(t){this._process_options({datesDisabled:t}),this.update(),this.updateNavArrows()},place:function(){if(this.isInline)return this;var t=this.picker.outerWidth(),e=this.picker.outerHeight(),a=10,i=$(this.o.container),s=i.width(),n=i.height(),r=i.scrollTop(),h=i.offset(),o=[];this.element.parents().each(function(){var t=$(this).css("z-index");"auto"!==t&&0!==t&&o.push(parseInt(t))});var d=Math.max.apply(Math,o)+10,l=this.component?this.component.parent().offset():this.element.offset(),c=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),u=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),p=l.left-h.left,f=l.top-h.top;this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),"auto"!==this.o.orientation.x?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),"right"===this.o.orientation.x&&(p-=t-u)):l.left<0?(this.picker.addClass("datepicker-orient-left"),p-=l.left-a):p+t>s?(this.picker.addClass("datepicker-orient-right"),p=l.left+u-t):this.picker.addClass("datepicker-orient-left");var g=this.o.orientation.y,D,v;if("auto"===g&&(D=-r+f-e,v=r+n-(f+c+e),g=Math.max(D,v)===v?"top":"bottom"),this.picker.addClass("datepicker-orient-"+g),"top"===g?f+=c:f-=e+parseInt(this.picker.css("padding-top")),this.o.rtl){var m=s-(p+u);this.picker.css({top:f,right:m,zIndex:d})}else this.picker.css({top:f,left:p,zIndex:d});return this},_allow_update:!0,update:function(){if(!this._allow_update)return this;var t=this.dates.copy(),e=[],a=!1;return arguments.length?($.each(arguments,$.proxy(function(t,a){a instanceof Date&&(a=this._local_to_utc(a)),e.push(a)},this)),a=!0):(e=this.isInput?this.element.val():this.element.data("date")||this.element.find("input").val(),e=e&&this.o.multidate?e.split(this.o.multidateSeparator):[e],delete this.element.data().date),e=$.map(e,$.proxy(function(t){return g.parseDate(t,this.o.format,this.o.language)},this)),e=$.grep(e,$.proxy(function(t){return t<this.o.startDate||t>this.o.endDate||!t},this),!0),this.dates.replace(e),this.dates.length?this.viewDate=new Date(this.dates.get(-1)):this.viewDate<this.o.startDate?this.viewDate=new Date(this.o.startDate):this.viewDate>this.o.endDate?this.viewDate=new Date(this.o.endDate):this.viewDate=this.o.defaultViewDate,a?this.setValue():e.length&&String(t)!==String(this.dates)&&this._trigger("changeDate"),!this.dates.length&&t.length&&this._trigger("clearDate"),this.fill(),this.element.change(),this},fillDow:function(){var t=this.o.weekStart,e="<tr>";for(this.o.calendarWeeks&&(this.picker.find(".datepicker-days thead tr:first-child .datepicker-switch").attr("colspan",function(t,e){return parseInt(e)+1}),e+='<th class="cw">&#160;</th>');t<this.o.weekStart+7;)e+='<th class="dow">'+f[this.o.language].daysMin[t++%7]+"</th>";e+="</tr>",this.picker.find(".datepicker-days thead").append(e)},fillMonths:function(){for(var t="",e=0;12>e;)t+='<span class="month">'+f[this.o.language].monthsShort[e++]+"</span>";this.picker.find(".datepicker-months td").html(t)},setRange:function(t){t&&t.length?this.range=$.map(t,function(t){return t.valueOf()}):delete this.range,this.fill()},getClassNames:function(t){var e=[],a=this.viewDate.getUTCFullYear(),s=this.viewDate.getUTCMonth(),n=new Date;return t.getUTCFullYear()<a||t.getUTCFullYear()===a&&t.getUTCMonth()<s?e.push("old"):(t.getUTCFullYear()>a||t.getUTCFullYear()===a&&t.getUTCMonth()>s)&&e.push("new"),this.focusDate&&t.valueOf()===this.focusDate.valueOf()&&e.push("focused"),this.o.todayHighlight&&t.getUTCFullYear()===n.getFullYear()&&t.getUTCMonth()===n.getMonth()&&t.getUTCDate()===n.getDate()&&e.push("today"),-1!==this.dates.contains(t)&&e.push("active"),(t.valueOf()<this.o.startDate||t.valueOf()>this.o.endDate||-1!==$.inArray(t.getUTCDay(),this.o.daysOfWeekDisabled))&&e.push("disabled"),(t.valueOf()<this.o.startDate||t.valueOf()>this.o.endDate||-1!==$.inArray(t.getUTCDay(),this.o.daysOfWeekHighlighted))&&e.push("highlighted"),this.o.datesDisabled.length>0&&$.grep(this.o.datesDisabled,function(e){return i(t,e)}).length>0&&e.push("disabled","disabled-date"),this.range&&(t>this.range[0]&&t<this.range[this.range.length-1]&&e.push("range"),-1!==$.inArray(t.valueOf(),this.range)&&e.push("selected")),e},fill:function(){var a=new Date(this.viewDate),i=a.getUTCFullYear(),s=a.getUTCMonth(),n=this.o.startDate!==-(1/0)?this.o.startDate.getUTCFullYear():-(1/0),r=this.o.startDate!==-(1/0)?this.o.startDate.getUTCMonth():-(1/0),h=this.o.endDate!==1/0?this.o.endDate.getUTCFullYear():1/0,o=this.o.endDate!==1/0?this.o.endDate.getUTCMonth():1/0,d=f[this.o.language].today||f.en.today||"",l=f[this.o.language].clear||f.en.clear||"",c;if(!isNaN(i)&&!isNaN(s)){this.picker.find(".datepicker-days thead .datepicker-switch").text(f[this.o.language].months[s]+" "+(this.o.maxViewMode<2?"":i)),this.picker.find("tfoot .today").text(d).toggle(this.o.todayBtn!==!1),this.picker.find("tfoot .clear").text(l).toggle(this.o.clearBtn!==!1),this.updateNavArrows(),this.fillMonths();var u=e(i,s-1,28),p=g.getDaysInMonth(u.getUTCFullYear(),u.getUTCMonth());u.setUTCDate(p),u.setUTCDate(p-(u.getUTCDay()-this.o.weekStart+7)%7);var D=new Date(u);D.setUTCDate(D.getUTCDate()+42),D=D.valueOf();for(var v=[],m;u.valueOf()<D;){if(u.getUTCDay()===this.o.weekStart&&(v.push("<tr>"),this.o.calendarWeeks)){var y=new Date(+u+(this.o.weekStart-u.getUTCDay()-7)%7*864e5),w=new Date(Number(y)+(11-y.getUTCDay())%7*864e5),k=new Date(Number(k=e(w.getUTCFullYear(),0,1))+(11-k.getUTCDay())%7*864e5),C=(w-k)/864e5/7+1;v.push('<td class="cw">'+C+"</td>")}if(m=this.getClassNames(u),m.push("day"),this.o.beforeShowDay!==$.noop){var b=this.o.beforeShowDay(this._utc_to_local(u));b===t?b={}:"boolean"==typeof b?b={enabled:b}:"string"==typeof b&&(b={classes:b}),b.enabled===!1&&m.push("disabled"),b.classes&&(m=m.concat(b.classes.split(/\s+/))),b.tooltip&&(c=b.tooltip)}m=$.unique(m),v.push('<td class="'+m.join(" ")+'"'+(c?' title="'+c+'"':"")+">"+u.getUTCDate()+"</td>"),c=null,u.getUTCDay()===this.o.weekEnd&&v.push("</tr>"),u.setUTCDate(u.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(v.join(""));var T=this.picker.find(".datepicker-months").find("th:eq(1)").text(this.o.maxViewMode<2?"Months":i).end().find("span").removeClass("active");if($.each(this.dates,function(t,e){e.getUTCFullYear()===i&&T.eq(e.getUTCMonth()).addClass("active")}),(n>i||i>h)&&T.addClass("disabled"),i===n&&T.slice(0,r).addClass("disabled"),i===h&&T.slice(o+1).addClass("disabled"),this.o.beforeShowMonth!==$.noop){var _=this;$.each(T,function(t,e){if(!$(e).hasClass("disabled")){var a=new Date(i,t,1),s=_.o.beforeShowMonth(a);s===!1&&$(e).addClass("disabled")}})}v="",i=10*parseInt(i/10,10);var M=this.picker.find(".datepicker-years").find("th:eq(1)").text(i+"-"+(i+9)).end().find("td");i-=1;for(var U=$.map(this.dates,function(t){return t.getUTCFullYear()}),x,F=-1;11>F;F++)x=["year"],-1===F?x.push("old"):10===F&&x.push("new"),-1!==$.inArray(i,U)&&x.push("active"),(n>i||i>h)&&x.push("disabled"),v+='<span class="'+x.join(" ")+'">'+i+"</span>",i+=1;M.html(v)}},updateNavArrows:function(){if(this._allow_update){var t=new Date(this.viewDate),e=t.getUTCFullYear(),a=t.getUTCMonth();switch(this.viewMode){case 0:this.picker.find(".prev").css(this.o.startDate!==-(1/0)&&e<=this.o.startDate.getUTCFullYear()&&a<=this.o.startDate.getUTCMonth()?{visibility:"hidden"}:{visibility:"visible"}),this.picker.find(".next").css(this.o.endDate!==1/0&&e>=this.o.endDate.getUTCFullYear()&&a>=this.o.endDate.getUTCMonth()?{visibility:"hidden"}:{visibility:"visible"});break;case 1:case 2:this.picker.find(".prev").css(this.o.startDate!==-(1/0)&&e<=this.o.startDate.getUTCFullYear()||this.o.maxViewMode<2?{visibility:"hidden"}:{visibility:"visible"}),this.picker.find(".next").css(this.o.endDate!==1/0&&e>=this.o.endDate.getUTCFullYear()||this.o.maxViewMode<2?{visibility:"hidden"}:{visibility:"visible"})}}},click:function(t){t.preventDefault(),t.stopPropagation();var a=$(t.target).closest("span, td, th"),i,s,n;if(1===a.length)switch(a[0].nodeName.toLowerCase()){case"th":switch(a[0].className){case"datepicker-switch":this.showMode(1);break;case"prev":case"next":var r=g.modes[this.viewMode].navStep*("prev"===a[0].className?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,r),this._trigger("changeMonth",this.viewDate);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,r),1===this.viewMode&&this._trigger("changeYear",this.viewDate)}this.fill();break;case"today":var h=new Date;h=e(h.getFullYear(),h.getMonth(),h.getDate(),0,0,0),this.showMode(-2);var o="linked"===this.o.todayBtn?null:"view";this._setDate(h,o);break;case"clear":this.clearDates()}break;case"span":a.hasClass("disabled")||(this.viewDate.setUTCDate(1),a.hasClass("month")?(n=1,s=a.parent().find("span").index(a),i=this.viewDate.getUTCFullYear(),this.viewDate.setUTCMonth(s),this._trigger("changeMonth",this.viewDate),1===this.o.minViewMode?(this._setDate(e(i,s,n)),this.showMode()):this.showMode(-1)):(n=1,s=0,i=parseInt(a.text(),10)||0,this.viewDate.setUTCFullYear(i),this._trigger("changeYear",this.viewDate),2===this.o.minViewMode&&this._setDate(e(i,s,n)),this.showMode(-1)),this.fill());break;case"td":a.hasClass("day")&&!a.hasClass("disabled")&&(n=parseInt(a.text(),10)||1,i=this.viewDate.getUTCFullYear(),s=this.viewDate.getUTCMonth(),a.hasClass("old")?0===s?(s=11,i-=1):s-=1:a.hasClass("new")&&(11===s?(s=0,i+=1):s+=1),this._setDate(e(i,s,n)))}this.picker.is(":visible")&&this._focused_from&&$(this._focused_from).focus(),delete this._focused_from},_toggle_multidate:function(t){var e=this.dates.contains(t);if(t||this.dates.clear(),-1!==e?(this.o.multidate===!0||this.o.multidate>1||this.o.toggleActive)&&this.dates.remove(e):this.o.multidate===!1?(this.dates.clear(),this.dates.push(t)):this.dates.push(t),"number"==typeof this.o.multidate)for(;this.dates.length>this.o.multidate;)this.dates.remove(0)},_setDate:function(t,e){e&&"date"!==e||this._toggle_multidate(t&&new Date(t)),e&&"view"!==e||(this.viewDate=t&&new Date(t)),this.fill(),this.setValue(),e&&"view"===e||this._trigger("changeDate");var a;this.isInput?a=this.element:this.component&&(a=this.element.find("input")),a&&a.change(),!this.o.autoclose||e&&"date"!==e||this.hide()},moveMonth:function(e,a){if(!e)return t;if(!a)return e;var i=new Date(e.valueOf()),s=i.getUTCDate(),n=i.getUTCMonth(),r=Math.abs(a),h,o;if(a=a>0?1:-1,1===r)o=-1===a?function(){return i.getUTCMonth()===n}:function(){return i.getUTCMonth()!==h},h=n+a,i.setUTCMonth(h),(0>h||h>11)&&(h=(h+12)%12);else{for(var d=0;r>d;d++)i=this.moveMonth(i,a);h=i.getUTCMonth(),i.setUTCDate(s),o=function(){return h!==i.getUTCMonth()}}for(;o();)i.setUTCDate(--s),i.setUTCMonth(h);return i},moveYear:function(t,e){return this.moveMonth(t,12*e)},dateWithinRange:function(t){return t>=this.o.startDate&&t<=this.o.endDate},keydown:function(t){if(!this.picker.is(":visible"))return void((40===t.keyCode||27===t.keyCode)&&this.show());var e=!1,i,s,n,r=this.focusDate||this.viewDate;switch(t.keyCode){case 27:this.focusDate?(this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill()):this.hide(),t.preventDefault();break;case 37:case 39:if(!this.o.keyboardNavigation)break;i=37===t.keyCode?-1:1,t.ctrlKey?(s=this.moveYear(this.dates.get(-1)||a(),i),n=this.moveYear(r,i),this._trigger("changeYear",this.viewDate)):t.shiftKey?(s=this.moveMonth(this.dates.get(-1)||a(),i),n=this.moveMonth(r,i),this._trigger("changeMonth",this.viewDate)):(s=new Date(this.dates.get(-1)||a()),s.setUTCDate(s.getUTCDate()+i),n=new Date(r),n.setUTCDate(r.getUTCDate()+i)),this.dateWithinRange(n)&&(this.focusDate=this.viewDate=n,this.setValue(),this.fill(),t.preventDefault());break;case 38:case 40:if(!this.o.keyboardNavigation)break;i=38===t.keyCode?-1:1,t.ctrlKey?(s=this.moveYear(this.dates.get(-1)||a(),i),n=this.moveYear(r,i),this._trigger("changeYear",this.viewDate)):t.shiftKey?(s=this.moveMonth(this.dates.get(-1)||a(),i),n=this.moveMonth(r,i),this._trigger("changeMonth",this.viewDate)):(s=new Date(this.dates.get(-1)||a()),s.setUTCDate(s.getUTCDate()+7*i),n=new Date(r),n.setUTCDate(r.getUTCDate()+7*i)),this.dateWithinRange(n)&&(this.focusDate=this.viewDate=n,this.setValue(),this.fill(),t.preventDefault());break;case 32:break;case 13:r=this.focusDate||this.dates.get(-1)||this.viewDate,this.o.keyboardNavigation&&(this._toggle_multidate(r),e=!0),this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.setValue(),this.fill(),this.picker.is(":visible")&&(t.preventDefault(),"function"==typeof t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,this.o.autoclose&&this.hide());break;case 9:this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill(),this.hide()}if(e){this._trigger(this.dates.length?"changeDate":"clearDate");var h;this.isInput?h=this.element:this.component&&(h=this.element.find("input")),h&&h.change()}},showMode:function(t){t&&(this.viewMode=Math.max(this.o.minViewMode,Math.min(this.o.maxViewMode,this.viewMode+t))),this.picker.children("div").hide().filter(".datepicker-"+g.modes[this.viewMode].clsName).css("display","block"),this.updateNavArrows()}};var d=function(t,e){this.element=$(t),this.inputs=$.map(e.inputs,function(t){return t.jquery?t[0]:t}),delete e.inputs,c.call($(this.inputs),e).on("changeDate",$.proxy(this.dateUpdated,this)),this.pickers=$.map(this.inputs,function(t){return $(t).data("datepicker")}),this.updateDates()};d.prototype={updateDates:function(){this.dates=$.map(this.pickers,function(t){return t.getUTCDate()}),this.updateRanges()},updateRanges:function(){var t=$.map(this.dates,function(t){return t.valueOf()});$.each(this.pickers,function(e,a){a.setRange(t)})},dateUpdated:function(t){if(!this.updating){this.updating=!0;var e=$(t.target).data("datepicker"),a=e.getUTCDate(),i=$.inArray(t.target,this.inputs),s=i-1,n=i+1,r=this.inputs.length;if(-1!==i){if($.each(this.pickers,function(t,e){e.getUTCDate()||e.setUTCDate(a)}),a<this.dates[s])for(;s>=0&&a<this.dates[s];)this.pickers[s--].setUTCDate(a);else if(a>this.dates[n])for(;r>n&&a>this.dates[n];)this.pickers[n++].setUTCDate(a);this.updateDates(),delete this.updating}}},remove:function(){$.map(this.pickers,function(t){t.remove()}),delete this.element.data().datepicker}};var l=$.fn.datepicker,c=function(e){var a=Array.apply(null,arguments);a.shift();var i;return this.each(function(){var s=$(this),h=s.data("datepicker"),l="object"==typeof e&&e;if(!h){var c=n(this,"date"),p=$.extend({},u,c,l),f=r(p.language),g=$.extend({},u,f,c,l);if(s.hasClass("input-daterange")||g.inputs){var D={inputs:g.inputs||s.find("input").toArray()};s.data("datepicker",h=new d(this,$.extend(g,D)))}else s.data("datepicker",h=new o(this,g))}return"string"==typeof e&&"function"==typeof h[e]&&(i=h[e].apply(h,a),i!==t)?!1:void 0}),i!==t?i:this};$.fn.datepicker=c;var u=$.fn.datepicker.defaults={autoclose:!1,beforeShowDay:$.noop,beforeShowMonth:$.noop,calendarWeeks:!1,clearBtn:!1,toggleActive:!1,daysOfWeekDisabled:[],daysOfWeekHighlighted:[],datesDisabled:[],endDate:1/0,forceParse:!0,format:"mm/dd/yyyy",keyboardNavigation:!0,language:"en",minViewMode:0,maxViewMode:2,multidate:!1,multidateSeparator:",",orientation:"auto",rtl:!1,startDate:-(1/0),startView:0,todayBtn:!1,todayHighlight:!1,weekStart:0,disableTouchKeyboard:!1,enableOnReadonly:!0,container:"body",immediateUpdates:!1},p=$.fn.datepicker.locale_opts=["format","rtl","weekStart"];$.fn.datepicker.Constructor=o;var f=$.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear"}},g={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(t){return t%4===0&&t%100!==0||t%400===0},getDaysInMonth:function(t,e){return[31,g.isLeapYear(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,parseFormat:function(t){var e=t.replace(this.validParts,"\x00").split("\x00"),a=t.match(this.validParts);if(!e||!e.length||!a||0===a.length)throw new Error("Invalid date format.");return{separators:e,parts:a}},parseDate:function(a,i,s){function n(){var t=this.slice(0,h[c].length),e=h[c].slice(0,t.length);return t.toLowerCase()===e.toLowerCase()}if(!a)return t;if(a instanceof Date)return a;"string"==typeof i&&(i=g.parseFormat(i));var r=/([\-+]\d+)([dmwy])/,h=a.match(/([\-+]\d+)([dmwy])/g),d,l,c;if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(a)){for(a=new Date,c=0;c<h.length;c++)switch(d=r.exec(h[c]),l=parseInt(d[1]),d[2]){case"d":a.setUTCDate(a.getUTCDate()+l);break;case"m":a=o.prototype.moveMonth.call(o.prototype,a,l);break;case"w":a.setUTCDate(a.getUTCDate()+7*l);break;case"y":a=o.prototype.moveYear.call(o.prototype,a,l)}return e(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),0,0,0)}h=a&&a.match(this.nonpunctuation)||[],a=new Date;var u={},p=["yyyy","yy","M","MM","m","mm","d","dd"],D={yyyy:function(t,e){return t.setUTCFullYear(e)},yy:function(t,e){return t.setUTCFullYear(2e3+e)},m:function(t,e){if(isNaN(t))return t;for(e-=1;0>e;)e+=12;for(e%=12,t.setUTCMonth(e);t.getUTCMonth()!==e;)t.setUTCDate(t.getUTCDate()-1);return t},d:function(t,e){return t.setUTCDate(e)}},v,m;D.M=D.MM=D.mm=D.m,D.dd=D.d,a=e(a.getFullYear(),a.getMonth(),a.getDate(),0,0,0);var y=i.parts.slice();if(h.length!==y.length&&(y=$(y).filter(function(t,e){return-1!==$.inArray(e,p)}).toArray()),h.length===y.length){var w;for(c=0,w=y.length;w>c;c++){if(v=parseInt(h[c],10),d=y[c],isNaN(v))switch(d){case"MM":m=$(f[s].months).filter(n),v=$.inArray(m[0],f[s].months)+1;break;case"M":m=$(f[s].monthsShort).filter(n),v=$.inArray(m[0],f[s].monthsShort)+1}u[d]=v}var k,C;for(c=0;c<p.length;c++)C=p[c],C in u&&!isNaN(u[C])&&(k=new Date(a),D[C](k,u[C]),isNaN(k)||(a=k))}return a},formatDate:function(t,e,a){if(!t)return"";"string"==typeof e&&(e=g.parseFormat(e));var i={d:t.getUTCDate(),D:f[a].daysShort[t.getUTCDay()],DD:f[a].days[t.getUTCDay()],m:t.getUTCMonth()+1,M:f[a].monthsShort[t.getUTCMonth()],MM:f[a].months[t.getUTCMonth()],yy:t.getUTCFullYear().toString().substring(2),yyyy:t.getUTCFullYear()};i.dd=(i.d<10?"0":"")+i.d,i.mm=(i.m<10?"0":"")+i.m,t=[];for(var s=$.extend([],e.separators),n=0,r=e.parts.length;r>=n;n++)s.length&&t.push(s.shift()),t.push(i[e.parts[n]]);return t.join("")},headTemplate:'<thead><tr><th class="prev">&#171;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&#187;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};g.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+g.headTemplate+"<tbody></tbody>"+g.footTemplate+'</table></div><div class="datepicker-months"><table class="table-condensed">'+g.headTemplate+g.contTemplate+g.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+g.headTemplate+g.contTemplate+g.footTemplate+"</table></div></div>",$.fn.datepicker.DPGlobal=g,$.fn.datepicker.noConflict=function(){return $.fn.datepicker=l,this},$.fn.datepicker.version="1.4.1-dev",$(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(t){var e=$(this);e.data("datepicker")||(t.preventDefault(),c.call(e,"show"))}),$(function(){c.call($('[data-provide="datepicker-inline"]'))})});