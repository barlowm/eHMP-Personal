define(["backbone","marionette"],function(e,i){"use strict";var t=!0,n=e.Marionette.ItemView.extend({template:_.template("<div>A detail view for this domain is not yet implemented.</div>")}),a={immunization:"immunizations"},o={id:"immunization-gist",contentRegionLayout:"gridOne",appletHeader:"navigation",appLeft:"patientInfo",applets:[{id:"ImmunizationGist",title:"Immunizations",region:"center"}],detailApplets:[{id:"immunizations"}],started:!1,onStart:function(){if(this.started)return void(t&&console.log("already executed onStart; skipping"));var e=ADK.Messaging.getChannel("igv_applet");e.on("resultClicked",function(e){t&&console.log(e);var i=e.uid.split(":")[2],o=a[i]||e.channelName;if(o){var s=new ADK.UI.Modal({view:ADK.Views.Loading.create(),options:{size:"large",title:"Loading..."}});s.show();var l=ADK.Messaging.getChannel(o),r=l.request("detailView",e);r.done(function(e){var i=new ADK.UI.Modal({view:e.view,options:{size:"large",title:e.title}});i.show()})}else{var d=new ADK.UI.Modal({view:new n,options:{size:"large",title:"Detail - Placeholder"}});d.show()}}),this.started=!0},patientRequired:!0};return o});