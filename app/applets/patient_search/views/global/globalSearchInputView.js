define(["jquery","jquery.inputmask","backbone","marionette","app/applets/patient_search/utils/globalSearchParametersValidator","hbs!app/applets/patient_search/templates/global/globalSearchInputTemplate"],function(e,a,t,l,r,i){var s=13,n=32,o="global",h=t.Marionette.ItemView.extend({template:i,events:{"keyup #globalSearchInputGroup":"updateSearchInputView","keydown #globalSearchInputGroup":"updateGlobalSearchParameters","click #globalSearchButton":"updateGlobalSearchParameters","keydown #globalSearchButton":"updateGlobalSearchParameters"},onRender:function(){this.$el.find(".input-group").focusin(function(){e(this).addClass("hasFocus")}).focusout(function(){e(this).removeClass("hasFocus")}),this.applyInputMasking(),this.$el.find("#mySite a").attr("tabindex","0")},applyInputMasking:function(){this.$el.find("#globalSearchLastName").inputmask("Regex",{regex:'[^^"\\\\`~!@#$%&*()_+=|}{/?:;.<>0-9\\[\\]]+'}),this.$el.find("#globalSearchFirstName").inputmask("Regex",{regex:'[^^"\\\\`~!@#$%&*()_+=|}{/?:;.<>0-9\\[\\]]+'}),this.$el.find("#globalSearchDob").inputmask("m/d/y"),this.$el.find("#globalSearchSsn").inputmask("999[-]99[-]9999")},updateSearchInputView:function(){this.updateRequiredSearchFieldMarkers(),this.updateGlobalSearchButtonStatus()},updateRequiredSearchFieldMarkers:function(){var e=this.$el.find("#globalSearchLastName").val(),a=this.$el.find("#globalSearchFirstName").val(),t=this.$el.find("#globalSearchDob").val(),l=this.$el.find("#globalSearchSsn").val(),r=[];if(""!==e){if(""===a&&""===t&&""===l)r.push(this.$el.find("#globalSearchFirstName")),r.push(this.$el.find("#globalSearchDob")),r.push(this.$el.find("#globalSearchSsn"));else{var i=t.replace(/\D/g,"").length,s=l.replace(/\D/g,"").length;8!==i&&0!==i&&r.push(this.$el.find("#globalSearchDob")),9!==s&&0!==s&&r.push(this.$el.find("#globalSearchSsn"))}r.length>0?this.markInvalidInputFields(r):this.markAllInputFieldsValid()}else this.markInvalidInputFields([this.$el.find("#globalSearchLastName")])},updateGlobalSearchButtonStatus:function(){var e=this.retrieveGlobalSearchParameters(),a=r.validateGlobalSearchParameterConfiguration(e);"lastNameRequiredFailure"===a||"twoFieldsRequiredFailure"===a?this.disableGlobalSearchButton():this.enableGlobalSearchButton()},disableGlobalSearchButton:function(){this.$el.find("#globalSearchButton").addClass("disabled"),this.$el.find("#globalSearchButton").attr("disabled","disabled")},enableGlobalSearchButton:function(){this.$el.find("#globalSearchButton").removeClass("disabled"),this.$el.find("#globalSearchButton").removeAttr("disabled")},updateGlobalSearchParameters:function(e){if((void 0===e.keyCode||e.keyCode==s||e.keyCode==n)&&!this.$el.find("#globalSearchButton").attr("disabled")){this.triggerNewGlobalSearchEvent();var a=this.retrieveGlobalSearchParameters(),t=r.validateGlobalSearchParameterConfiguration(a);if("lastNameRequiredFailure"===t)return this.triggerErrorMessage(o,"Error: The patient's last name is a required field."),void this.markInvalidInputFields([this.$el.find("#globalSearchLastName")]);if("twoFieldsRequiredFailure"===t)return this.triggerErrorMessage(o,"Error: Enter the patient's last name and at least one other field to display results."),void this.markInvalidInputFields([this.$el.find("#globalSearchFirstName"),this.$el.find("#globalSearchDob"),this.$el.find("#globalSearchSsn")]);var l=r.validateGlobalSearchParameterFormatting(a);return"nameFormatFailure"===l?(this.triggerErrorMessage(o,"Error: Names may not contain numbers or special characters other than commas, apostrophes, or hyphens."),void this.markInvalidInputFields([this.$el.find("#globalSearchLastName"),this.$el.find("#globalSearchFirstName")])):"dobFormatFailure"===l?(this.triggerErrorMessage(o,"Error: DOB must be entered in MM/DD/YYYY format."),void this.markInvalidInputFields([this.$el.find("#globalSearchDob")])):"ssnFormatFailure"===l?(this.triggerErrorMessage(o,"Error: SSN must match the format: 123-45-6789 or 123456789."),void this.markInvalidInputFields([this.$el.find("#globalSearchSsn")])):void this.model.set({globalSearchParameters:a})}},retrieveGlobalSearchParameters:function(){var e={"name.last":this.$el.find("#globalSearchLastName").val().trim().toUpperCase(),"name.first":this.$el.find("#globalSearchFirstName").val().trim().toUpperCase(),"date.birth":this.$el.find("#globalSearchDob").val(),ssn:this.$el.find("#globalSearchSsn").val()};return e},validateGlobalSearchParameters:function(e){return this.markAllInputFieldsValid(),r.validateGlobalSearchParameterConfiguration(e)?!0:!1},triggerErrorMessage:function(e,a){this.model.trigger("errorMessage",[e,a]),this.model.set("isGlobalSearchErrorMessageDisplayed",!0)},triggerNewGlobalSearchEvent:function(){this.model.trigger("newGlobalSearch")},markAllInputFieldsValid:function(){this.$el.find("#globalSearchLastName").removeClass("alert-danger aria-invalid"),this.$el.find("#globalSearchFirstName").removeClass("alert-danger aria-invalid"),this.$el.find("#globalSearchDob").removeClass("alert-danger aria-invalid"),this.$el.find("#globalSearchSsn").removeClass("alert-danger aria-invalid")},markInvalidInputFields:function(e){this.markAllInputFieldsValid(),e.forEach(function(e){e.addClass("alert-danger aria-invalid")})}});return h});