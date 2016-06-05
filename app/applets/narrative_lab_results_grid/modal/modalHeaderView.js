define(["backbone","marionette","underscore","hbs!app/applets/narrative_lab_results_grid/modal/headerTemplate","app/applets/narrative_lab_results_grid/modal/modalView","app/applets/narrative_lab_results_grid/appletUiHelpers"],function(e,t,a,r,i,l){"use strict";var s,n,o=[];return n=e.Marionette.ItemView.extend({events:{"click #labss-previous, #labss-next":"navigateModal","click #sm-close":"closeModal"},closeModal:function(e){i.resetSharedModalDateRangeOptions()},initialize:function(){s=this.dataCollection,this.getModals()},navigateModal:function(e){var t=$(e.currentTarget),a=t.attr("id");"labss-previous"===a?this.getPrevModal():this.getNextModal()},template:r,getNextModal:function(e){var t=a.indexOf(o,this.model)+1;t>=o.length&&(this.getModals(),t=0);var r=o[t];this.setNextPrevModal(r)},getPrevModal:function(e){var t=a.indexOf(o,this.model)-1;0>t&&(this.getModals(),t=o.length-1);var r=o[t];this.setNextPrevModal(r)},getModals:function(){o=[],a.each(s.models,function(e,t){if(e.get("labs")){var r=s.indexOf(e);a.each(e.get("labs").models,function(t,a){t.set({inAPanel:!0,parentIndex:r,parentModel:e}),o.push(t)})}else o.push(e)})},setNextPrevModal:function(e){if(this.showNavHeader&&(e.attributes.navHeader=!0),e.get("inAPanel")){var t=$("#data-grid-narrative_lab_results_grid > tbody>tr.selectable").eq(e.get("parentIndex"));t.data("isOpen")||t.trigger("click"),$("#data-grid-narrative_lab_results_grid > tbody>tr.selectable").not(t).each(function(){var e=$(this);e.data("isOpen")&&e.trigger("click")})}var a=require("app/applets/narrative_lab_results_grid/appletUiHelpers");a.getDetailView(e,null,s,!0,a.showModal,a.showErrorModal)}})});