define(["backbone","marionette","underscore","app/applets/vitals/utilParse"],function(t,e,s,i){"use strict";return i.defaults={BPS:{descriptionColumn:"BPS",observationType:"vitals"},BPD:{descriptionColumn:"BPD",observationType:"vitals"},BP:{descriptionColumn:"BP",observationType:"vitals"},T:{descriptionColumn:"Temp",observationType:"vitals"},PO2:{descriptionColumn:"SpO<sub>2</sub>",observationType:"vitals"},PN:{descriptionColumn:"Pain",observationType:"vitals"},BMI:{descriptionColumn:"BMI",observationType:"vitals"},WT:{descriptionColumn:"Wt",observationType:"vitals"},P:{descriptionColumn:"Pulse",observationType:"vitals"},R:{descriptionColumn:"RR",observationType:"vitals"},HT:{descriptionColumn:"Ht",observationType:"vitals"},CG:{descriptionColumn:"Circum/Girth",observationType:"Vitals"}},i.getNumericDate=function(t){return t.observed&&(t.numericDate=ADK.utils.formatDate(t.observed,"YYYYMMDD")),t},i.getObservedFormatted=function(t){return t.observedFormatted="",t.observed&&(t.observedFormatted=ADK.utils.formatDate(t.observed,ADK.utils.dateUtils.defaultOptions().placeholder+" - HH:mm")),t},i.getObservedFormattedCover=function(t){return t.observedFormattedCover="",t.observed&&(t.observedFormattedCover=ADK.utils.formatDate(t.observed,ADK.utils.dateUtils.defaultOptions().placeholder)),t},i.getResultedFormatted=function(t){return t.resultedFormatted="",t.resulted&&(t.resultedFormatted=ADK.utils.formatDate(t.resulted,ADK.utils.dateUtils.defaultOptions().placeholder+" - HH:mm")),t},i.splitCollection=function(t,e){for(var s,i=t.models,r=i.length,a=r/e|0,u=[],l=0;a>l;++l)for(s=l;r>s;)u.push(i[s]),s+=a;return t.reset(u,{reindex:!0}),t},i.buildCollection=function(t,e){var s=ADK.Messaging.request("get:current:screen"),r=(!s.config.predefined,i.splitBloodPressure(t,e));return r.each(function(t){t.attributes.normalizedName=t.attributes.displayName.replace(/\W/g,"_"),t.attributes.descriptionColumn=i.defaults.hasOwnProperty(t.attributes.displayName)?i.defaults[t.attributes.displayName].descriptionColumn:t.attributes.displayName,t.attributes.isValid=t.attributes.result?i.checkValidResult(t.attributes.result,t.attributes.displayName):!1,"BMI"===t.attributes.displayName&&(t.attributes.result<=18.5?t.attributes.interpretationField="underweight":t.attributes.result>18.5&&t.attributes.result<=24.9?t.attributes.interpretationField="normal":t.attributes.result>24.9&&t.attributes.result<=29.9?t.attributes.interpretationField="overweight":t.attributes.interpretationField="obese"),"T"===t.attributes.displayName&&(t.attributes.resultAndUnitsMerged=!0,t.attributes.finalResult=t.attributes.resultUnitsMetricResultUnits||t.attributes.result),"WT"===t.attributes.displayName&&(t.attributes.resultAndUnitsMerged=!0,t.attributes.finalResult=t.attributes.resultUnitsMetricResultUnits||t.attributes.result),t.attributes.timeSince=i.setTimeSince(t.attributes.observed),t.attributes.numericTime=i.getNumericTime(t.attributes.timeSince),t.attributes.observationType="vitals",t.attributes.vitalColumns=!0}),t.reset(r.models),t},i.splitBloodPressure=function(e,s){var i=new t.Collection,r=e.where({displayName:"BP"});return r.length>0&&r.forEach(function(t){if(s){var e=t.clone(),r=t.clone();r.attributes.qualifiedName+=" Systolic",r.attributes.typeName+=" Systolic",e.attributes.qualifiedName+=" Diastolic",e.attributes.typeName+=" Diastolic",r.attributes.displayName="BPS",r.attributes.name+=" S",r.attributes.tooltipName="Blood Pressure",e.attributes.displayName="BPD",e.attributes.name+=" D",e.attributes.tooltipName="Blood Pressure",r.attributes.low=t.attributes.low.split("/")[0],e.attributes.low=3===t.attributes.low.split("/").length?t.attributes.low.split("/")[2]:t.attributes.low.split("/")[1],r.attributes.high=t.attributes.high.split("/")[0],e.attributes.high=3===t.attributes.high.split("/").length?t.attributes.high.split("/")[2]:t.attributes.high.split("/")[1],t.attributes.result&&(r.attributes.result=t.attributes.result.split("/")[0],e.attributes.result=3===t.attributes.result.split("/").length?t.attributes.result.split("/")[2]:t.attributes.result.split("/")[1],r.attributes.finalResult=r.attributes.result+" mm",r.attributes.finalUnits="mm",e.attributes.finalResult=e.attributes.result+" mm",e.attributes.finalUnits="mm",r.attributes.resultUnitsMetricResultUnits=r.attributes.result+" mm[Hg]",e.attributes.resultUnitsMetricResultUnits=e.attributes.result+" mm[Hg]",r.attributes.resultUnits=r.attributes.result+" mm[Hg]",e.attributes.resultUnits=e.attributes.result+" mm[Hg]"),t.attributes.previousResult&&(r.attributes.previousResult=t.attributes.previousResult.split("/")[0],e.attributes.previousResult=3===t.attributes.previousResult.split("/").length?t.attributes.previousResult.split("/")[2]:t.attributes.previousResult.split("/")[1]),i.add([r,e])}else t.set("displayName","BP")}),i.add(e.models),i},i.findNearestRange=function(t,e){return isNaN(t[e])||void 0===t[e]?void s.each(t,function(t,e){return isNaN(e)||void 0===e?void 0:e}):t[e]},i.setNoRecords=function(t,e,s){return e.forEach(function(e){t[s.indexOf(e)]={vitalColumns:!0,descriptionColumn:i.defaults.hasOwnProperty(e)?i.defaults[e].descriptionColumn:e,displayName:e,name:e,resultUnitsMetricResultUnits:"No Record",resultUnits:"No Record",summary:"No Record",metricResultUnits:"No Record",typeName:e,observed:"",observationType:i.defaults.hasOwnProperty(e)?i.defaults[e].observationType:"vitals"}}),t},i.setTimeSince=function(t){if(void 0!==t&&""!==t){var e=moment(t,"YYYYMMDDHHmmssSSS"),s=moment(),i=moment.duration(s.diff(e)),r=parseFloat(i.asYears()),a=parseFloat(i.asDays()),u=parseFloat(i.asMonths()),l=parseFloat(i.asHours()),o=parseFloat(i.asMinutes());o>0&&60>o&&(l=1);var n="y",d="m",b="d",m="h",p="";return u>=24?p=Math.round(r)+n:24>u&&a>60?p=Math.round(u)+d:a>=2&&60>=a?p=Math.round(a)+b:2>a&&(p=Math.round(l)+m),p}},i.checkValidResult=function(t,e){return"BP"===e?!0:!isNaN(t)},i});