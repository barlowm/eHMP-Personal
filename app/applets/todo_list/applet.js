define(["backbone","marionette","underscore","app/applets/todo_list/views/todoListView"],function(e,t,i,o){var n={id:"todo_list",getRootView:function(e){return ADK.Views.AppletControllerView.extend({viewType:e})},viewTypes:[{type:"expanded",view:o,chromeEnabled:!0}],defaultViewType:"expanded"};return n});