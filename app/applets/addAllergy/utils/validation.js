define(["underscore","moment"],function(e,r){"use strict";return{initializeValidation:function(){this.on("change",this.validateModel)},defaultValidationMessages:{required:"Required Field.",error:"Error."},validateModel:function(r){if(void 0!==this.validation){this.hideClientErrors(),this.errors=[];var i=this,t=r.attributes;e.each(Object.getOwnPropertyNames(this.validation),function(e){var r,n,s,o,a,l,d,u;e&&(r=i.validation[e],s=e.split("."),o=s[s.length-1],"undefined"!=typeof r&&(n=i.validation[e].fn,a=r.required||!1,l=a.fn||function(e,r){return a?e?!0:!1:!0},d=e.split(".").reduce(function(e,r){return e=e||{},e[r]},t),u="function"==typeof r.selector?r.selector(i)||"#"+o:r.selector||"#"+o,n&&"function"==typeof n&&(n(d,i)||i.errors.push({name:o,message:r.message||i.defaultValidationMessages.error,selector:u})),"function"!=typeof l||l(d,i)||i.errors.push({name:o,message:"undefined"==typeof a.message?i.defaultValidationMessages.required:a.message,selector:u})))}),console.log("Client Validation"),console.log(i.errors),this.showClientErrors()}},isValid:function(){return"undefined"==typeof this.errors&&(this.errors=[]),this.errors.length>0?!1:!0},showClientErrors:function(){e.each(this.errors,function(e){var r=$(e.selector);r.addClass("error"),r.attr("aria-invalid",!0),r.parent().find(".help-inline").text(e.message)},this)},hideClientErrors:function(){e.each(this.errors,function(e){var r=$(e.selector);r.removeClass("error"),r.attr("aria-invalid",!1),r.parent().find(".help-inline").text("")},this)}}});