define([],function(){var e={modalButtonsOnClick:function(e){e.preventDefault()},taskListViewOnClickRow:function(e,n,t){var i=new ADK.UI.Modal({view:new t({model:e,navHeader:!1}),options:{size:"large",title:"Task - "+e.get("name")}});i.show()}};return e});