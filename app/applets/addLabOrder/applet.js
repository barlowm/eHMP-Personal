define(["app/applets/addLabOrder/views/addLabOrderView"],function(e){var r={id:"addLabOrder",getRootView:function(){return e}};return function(){var e=ADK.Messaging.getChannel("addALabOrderRequestChannel");e.reply("addLabOrderModal",function(){var e=r.getRootView(),a=$.Deferred();return a.resolve({view:new e}),a.promise()})}(),r});