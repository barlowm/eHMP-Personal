define(["backbone","marionette","underscore","app/applets/problems/util","hbs!app/applets/problems/modalView/modalTemplate","app/applets/problems/modalView/modalHeaderView","app/applets/problems/modalView/modalFooterView"],function(e,t,o,i,l,a,s){"use strict";var r,d=[],n=e.Marionette.ItemView.extend({template:l,initialize:function(e){this.model=e.model,this.collection=e.collection,r=e.collection,this.getModals()},events:{"click .ccdNext":"getNextModal","click .ccdPrev":"getPrevModal"},getNextModal:function(e){var t=o.indexOf(d,this.model)+1;t>=d.length&&(this.getModals(),t=0);var i=d[t];this.setNextPrevModal(i)},getPrevModal:function(e){var t=o.indexOf(d,this.model)-1;0>t&&(this.getModals(),t=d.length-1);var i=d[t];this.setNextPrevModal(i)},getModals:function(){d=r.models},setNextPrevModal:function(e){this.showNavHeader&&(e.attributes.navHeader=!0);var t,o=new n({model:e,collection:r}),l=ADK.UserService.getUserSession().get("site"),d=e.get("pid")?e.get("pid").split(";")[0]:"";t={title:i.getModalTitle(e),size:"normal",headerView:a.extend({model:e,theView:o}),footerView:s.extend({model:e,templateHelpers:function(){return(ADK.UserService.hasPermission("edit-patient-problem")||ADK.UserService.hasPermission("remove-patient-problem"))&&d===l?{data:!0}:{data:!1}}})};var p=new ADK.UI.Modal({view:o,options:t});p.show()}});return n});