define(["app/applets/addOrder/helpers/searchMedsScrollEventHandler"],function(e,r){"use strict";var t,i,n=[],o=!1,a={resourceTitle:"write-back-outpatient-med-formulary",criteria:{},onError:function(e,r){$("#meds-loading-indicator").hide(),o=!1,i&&i.addError(r.responseText)},onSuccess:function(e,r){t.collection.reset(e.toJSON()),$("#meds-loading-indicator").hide(),n.length>0?c.medsEventHandler(void 0):o=!1}},c={fetchOptions:a,setView:function(e){t=e.medsView,i=e.errorView},getView:function(){return t},medsEventHandler:function(e){if(o&&"undefined"!=typeof e)n.push($(e.target).val());else{var r={count:"40"};n.length>0?r.search=n.shift():r.search=$(e.target).val(),o=!0,a.criteria.param=JSON.stringify(r),ADK.PatientRecordService.fetchCollection(a),$("#meds-loading-indicator").show(),i&&i.clearErrors()}}};return c});