define(["backbone","marionette","underscore","hbs!app/applets/addLabOrder/templates/addLabOrderTemplate","hbs!app/applets/addLabOrder/templates/footerTemplate"],function(e,t,a,s,d){"use strict";var r,n=(ADK.Messaging.getChannel("addLabOrder"),ADK.Messaging.getChannel("visit"),e.Marionette.ItemView.extend({template:d}));return e.Marionette.LayoutView.extend({className:"add-lab-order-styles",template:s,showModal:function(e,t){r=t;var a={title:"Lab",size:"medium",footerView:n},s=new ADK.UI.Modal({view:this,options:a});s.show()}})});