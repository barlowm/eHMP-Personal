define(["backbone","marionette","underscore","app/applets/search/searchView","hbs!app/applets/search/templates/searchTemplate","app/applets/search/eventHandlers"],function(e,a,t,n,i,s){var p=e.Model.extend({defaults:{}}),r=new p,o=e.Marionette.LayoutView.extend({initialize:function(){this.searchView=new n},onRender:function(){this.appletMain.show(this.searchView)},template:i,model:r,regions:{appletMain:"#search-applet-main"}}),c={id:"search",getRootView:function(){return o}};return c});