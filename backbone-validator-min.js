(function(F){"function"==typeof define&&define.amd?define(["backbone","underscore"],F):"object"==typeof exports?module.exports=F(require("backbone"),require("underscore")):F(window.Backbone,window._)})(function(F,u){"use strict";var t=F.Validator={version:"0.1.1",validate:function(F,t,i){var e={};return u.chain(F).each(function(F,a){var n=t[a],d=this._validateAll(n,F,i);d.length&&(e[a]=u.uniq(d))},this),u.size(e)?e:null},_validateAll:function(F,t,i){return u.inject(u.flatten([F||[]]),function(F,e){return u.chain(e).omit("message").each(function(u,a){var n=this._validators[a];if(!n)throw Error("Missed validator: "+a);var d=n.fn.apply(i||this,[t,u]);d!==!0&&F.push(e.message||n.message||d||"Invalid")},this),F},[],this)},add:function(F,u,t){this._validators[F]={fn:u,message:t}},_validators:{}};t.Extensions={View:{bindValidation:function(F,i){if(F=F||this.model,!F)throw"Model is not provided";this.listenTo(F,"validated",function(F,e,a){var n=u.extend({},t.ViewCallbacks,u.pick(this,"onInvalidField","onValidField"),i);a=a||{},u.each(e,function(u,t){var i=a[t];i&&i.length?n.onInvalidField.call(this,t,u,i,F):n.onValidField.call(this,t,u,F)},this)})}},Model:{validate:function(F,i){var a=this.validation||{},n=e(F,this.attributes,this.validation),d=t.validate(n,a,this);return i=i||{},i.silent||u.defer(u.bind(this.triggerValidated,this),n,d),i&&i.suppress?null:d},_validate:function(F,u){if(!u.validate||!this.validate)return!0;F=e(F,this.attributes,this.validation);var t=this.validationError=this.validate(F,u)||null;return t&&this.trigger("invalid",this,t,u||{}),!t},triggerValidated:function(F,u){this.trigger("validated",this,F,u),this.trigger("validated:"+(u?"invalid":"valid"),this,F,u)},isValid:function(F,u){var t=e(F,this.attributes,this.validation);return!this.validate||!this.validate(t,u)}}};var i=function(F,t){return u.inject(u.flatten([t]),function(u,t){return u[t]=F[t],u},{})},e=function(F,t,e){var a,n;return u.isArray(F)||u.isString(F)?a=i(t,F):F?a=F:(n=u.extend({},t,e||{}),a=i(t,u.keys(n))),a};t.ViewCallbacks={onValidField:function(F){var u=this.$('input[name="'+F+'"]');u.removeClass("error"),u.next(".error-text").remove()},onInvalidField:function(F,u,t){var i=this.$('input[name="'+F+'"]');i.next(".error-text").remove(),i.addClass("error").after('<div class="error-text">'+t.join(", ")+"</div>")}};var a=[{name:"required",message:"Is required",fn:function(F){return!!F}},{name:"collection",fn:function(F){var t=F.models||F,i=u.inject(t,function(F,u,t){var i=u.validate();return i&&F.push([t,i]),F},[]);return i.length?i:!0}},{name:"minLength",message:"Is too short",fn:function(F,u){return F&&F.length>=u}},{name:"maxLength",message:"Is too long",fn:function(F,u){return F&&u>=F.length}},{name:"format",message:"Does not match format",fn:function(F,u){return!F||!!F.match(t.formats[u]||u)}},{name:"fn",fn:function(F,u){return u.call(this,F)}}];return t.formats={digits:/^\d+$/,number:/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i},u.each(a,function(F){t.add(F.name,F.fn,F.message)}),u.extend(F.Model.prototype,t.Extensions.Model),u.extend(F.View.prototype,t.Extensions.View),t});