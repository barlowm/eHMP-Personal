define(["backbone","hbs!app/applets/ssoLogon/main"],function(n,e){"use strict";var t=function(){var n={id:"ssoLogon",getRootView:function(){return a}};return n},o=ADK.SessionStorage.getModel("ccow"),a=n.Marionette.LayoutView.extend({onDomRefresh:function(){o&&"Connected"===o.get("status")?$("span#banner").html("Patient Syncing In Progress..."):o&&"NotConnected"===o.get("status")&&($("span#banner").html("Auto SignIn Failed...Redirecting to Login Page"),ADK.Navigation.navigate("logon-screen"))},template:e});return t()});