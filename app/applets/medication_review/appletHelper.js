define(["backbone","marionette","underscore"],function(e,t,a){var r={isPRN:function(e){return e.sig&&-1!=e.sig.toUpperCase().indexOf("AS NEEDED")?!0:"PRN"==e.scheduleType?!0:e.scheduleName&&-1!=e.scheduleName.indexOf("PRN")?!0:!1},hasFillDetail:function(e){return("O"==e.vaType||e.supply)&&e.orders[0].fillsAllowed?!0:!1},hasScheduledTimes:function(e){return"I"==e.vaType?!0:!1},hasDailyDoseInfo:function(e){return e.scheduleFreq&&e.dose&&("O"==e.vaType||"N"==e.vaType)?!0:!1},getDailyOrScheduledDosePrefix:function(e){return this.hasScheduledTimes(e)?"Scheduled Times":this.hasDailyDoseInfo(e)?"Total Daily":!1},getDailyOrScheduledDose:function(e){return this.hasScheduledTimes(e)?"No Data":this.hasDailyDoseInfo(e)?1440/e.scheduleFreq*parseInt(e.dose)+" "+e.units:!1},isExpiredSetter:function(e){if(e.vaStatus)switch(e.vaStatus.toUpperCase()){case"ACTIVE":return moment(e.overallStop,"YYYYMMDDHHmmssSSS")<moment().format("YYYYMMDD")?"Expired":moment(e.stopped,"YYYYMMDDHHmmssSSS")<moment().format("YYYYMMDD")?"Expired":e.vaStatus;default:return e.vaStatus}},getExpirationLabel:function(e){if(!e.vaStatus)return"";switch(e.vaStatus.toUpperCase()){case"PENDING":return"";case"ACTIVE":return"Expires";case"SUSPEND":return"Ordered";case"HOLD":return"Ordered";case"EXPIRED":return"Expired";case"UNRELEASED":return"";case"DISCONTINUED":return"Discontinued";case"DISCONTINUED/EDIT":return"Discontinued";default:return""}},getLastDatePrefix:function(e){return"N"==e.vaType?!1:"I"==e.vaType?"Last admin":e.lastFilled||e.supply?"Last filled":!1},getLastDate:function(e){return"N"==e.vaType?"":"I"==e.vaType?e.lastAdmin:"O"==e.vaType||e.supply?e.lastFilled:""},getLastFillStyle:function(e){return this.hasFillDetail(e)?0===e.orders[0].fillsRemaining?"noFillsRemain":e.orders[0].fillsRemaining<=3?"fewFillsRemain":"":""},getLastFillDetails:function(e){return"O"!=e.vaType||e.supply?"":this.hasFillDetail(e)?e.orders[0].fillsRemaining+" Refills ("+e.orders[0].daysSupply+" days each)":""},getPickUpType:function(e){return"W"==e.routing?"Window":"M"==e.routing?"Mail":!1},getStandarizedFacilityCode:function(e){return"DOD"==e.facilityCode?"DOD":"500"==e.facilityCode?"NCH":""},getStandardizedVaStatus:function(e){var t;return e.vaStatus?(t=this.isExpiredSetter(e).toUpperCase(),"DISCONTINUED/EDIT"==t&&(t="DISCONTINUED"),t):""},getSubcategory:function(e){return this.isPRN(e)?"PRN":"V"==e.vaType?"IV":!1},getSummaryViewDate:function(e){var t=this.getExpirationLabel(e);if(!t)return!1;switch(t){case"Expired":return e.overallStop;case"Expires":return e.overallStop;case"Discontinued":return e.stopped;case"Ordered":return e.orders[0].ordered;default:return!1}},getGroupByName:function(e){if(e.qualifiedName)return e.qualifiedName;var t=e.name.split(",")[0];return t.split(" ")[0]},getGroupByField:function(e){return e.qualifiedName?"qualifiedName":"name"},sliceString:function(e){return e.slice(e.lastIndexOf(":")+1,-1)},sortCollection:function(e,t,a,r,s){if(r){var i=!1;if(e.at(0).attributes[t])i=!0;else if(e.at(e.length-1).attributes[t])i=!0;else for(var l=1,u=e.length;u-1>l;l++)if(e.at(l).attributes[t]){i=!0;break}var n=!1;if(e.at(0).attributes[a])n=!0;else if(e.at(e.length-1).attributes[a])n=!0;else for(var d=1,o=e.length;o-1>d;d++)if(e.at(d).attributes[a]){n=!0;break}i&&(e.comparator=function(e,i){var l;l=s?1:-1;var u=e.get(t),d=i.get(t),o=e.get(a),p=i.get(a);if("alphanumerical"===r||"numeric"===r||"date"===r||"alphabetical"===r){if(u===d){if(n){if(o>p||void 0===p)return-1;if(p>o)return 1}return 0}return d>u||void 0===d?-1*l:1*l}},e.sort())}},parseMedResponse:function(e){if(e.supply?e.groupType="Supplies":e.IMO?e.groupType="Clinic Orders":(e.groupType=e.vaType,"V"==e.groupType&&(e.groupType="I")),e.name&&(e.name=e.name.toLowerCase()),e.products[0]&&e.products[0].ingredientName&&(e.ingredientName=e.products[0].ingredientName),e.dosages&&e.dosages[0]&&(e.dosages[0].dose&&(e.dose=e.dosages[0].dose),e.dosages[0].units&&(e.dosagesUnits=e.dosages[0].units),e.dosages[0].routeName&&(e.routeName=e.dosages[0].routeName),e.dosages[0].scheduleName&&(e.scheduleName=e.dosages[0].scheduleName),e.dosages[0].start&&(e.start=e.dosages[0].start),e.dosages[0].scheduleFreq&&(e.scheduleFreq=e.dosages[0].scheduleFreq),e.dosages[0].scheduleType&&(e.scheduleType=e.dosages[0].scheduleType),e.dosages[0].instructions&&(e.instructions=e.dosages[0].instructions)),e.orders&&e.orders[0]&&(e.orders[0].fillsAllowed&&(e.fillsAllowed=e.orders[0].fillsAllowed),e.orders[0].daysSupply&&(e.daysSupply=e.orders[0].daysSupply),e.orders[0].orderUid&&(e.orderUid=this.sliceString(' "'+e.orders[0].orderUid+' "'))),e.fills&&e.fills[0]&&e.fills[0].dispenseDate&&(e.dispenseDate=e.fills[0].dispenseDate,e.routing=e.fills[0].routing),e.medStatusName&&(e.medStatusName=e.medStatusName.toUpperCase()),e.uid)try{e.detailId=e.uid.replace(/[:|.]/g,"_")}catch(t){console.log("detailId unable to be created")}return e.dailyOrScheduledDosePrefix=r.getDailyOrScheduledDosePrefix(e),e.dailyOrScheduledDose=r.getDailyOrScheduledDose(e),e.summaryViewDate=r.getSummaryViewDate(e),e.expirationLabel=r.getExpirationLabel(e),e.lastDate=r.getLastDate(e),e.lastDatePrefix=r.getLastDatePrefix(e),e.lastFillStyle=r.getLastFillStyle(e),e.lastFillDetails=r.getLastFillDetails(e),e.pickUpType=r.getPickUpType(e),e.standardizedFacilityCode=r.getStandarizedFacilityCode(e),e.standardizedVaStatus=r.getStandardizedVaStatus(e),e.subcategory=r.getSubcategory(e),e.groupbyField=r.getGroupByField(e),e.groupbyValue=r.getGroupByName(e),e.facilityName&&(e.groupbyFacility=e.facilityName),e},getMedicationGroupbyData:function(e){return{groupbyValue:e.get("groupbyValue"),groupbyField:e.get("groupbyField"),groupbyFacility:e.get("groupbyFacility")}}};return r});