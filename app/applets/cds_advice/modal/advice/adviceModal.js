define(["backbone","marionette","underscore","hbs!app/applets/cds_advice/modal/advice/adviceBodyTpl","hbs!app/applets/cds_advice/modal/advice/adviceFooterTpl"],function(e,t,n,a,i){"use strict";function o(t){var n=t?{model:t}:null,i=e.Marionette.ItemView.extend({template:a});return new i(n)}function d(t){var n=e.Marionette.ItemView.extend({template:i});return n}return{show:function(e){var t=o(e),n=d(e),a={title:"Advice",footerView:n},i=new ADK.UI.Modal({view:t,options:a});i.show()}}});