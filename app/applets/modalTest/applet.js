define(["underscore","hbs!app/applets/modalTest/assets/modalTestTemplate"],function(e,t){var a={id:"modalTest",getRootView:function(){return Backbone.Marionette.LayoutView.extend({events:{"click button":"showModal"},showModal:function(e){e.preventDefault();var t,a=$("#appletPath").val();a=a.split(" "),t=a.splice(1).join(" "),a=a[0],require(["app/applets/"+a+"/applet"],function(a){var o,n=a.getRootView(),p=new n;try{o=JSON.parse(t)}catch(l){o={}}p.showModal(e,o)})},template:t})}};return a});