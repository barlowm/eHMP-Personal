define(["backbone","marionette","underscore"],function(e,t,n){function c(){this.callback&&this.callback(this.allDocs)}var i={hasDocIdRecord:function(e,t){var c=!1;return e&&t?(n.each(e,function(e){var i=n.values(e);return n.contains(i,t)?c=!0:void 0}),c):c},getSummaryModelText:function(e){var t=e.get("text"),c=t&&n.pluck(t,"content");return c&&c.length&&c[0]},getDocModelFromUid:function(t,i){var r=new e.Model;if(!t||!i||!n.isFunction(i))return r;this.callback=i;var o={};o.pid=ADK.PatientRecordService.getCurrentPatient(),o.uid=t,o.criteria={uid:t},o.resourceTitle="uid",this.allDocs=ADK.PatientRecordService.fetchCollection(o),this.allDocs.on("sync",c,this)}};return i});