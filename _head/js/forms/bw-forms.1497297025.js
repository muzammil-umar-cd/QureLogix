/* BlackWater form utility object
 * Silly propriatory form value access system to save the programmer from worrying
 * about input type when accessing/setting values using jquery
 *
 * NOT totally complete here, only form inputs used are addressed, some legacy cruft lurking....
 *
 * SEQUENCE IS VITAL  do NOT mess with it lightly -YHBW
 *
 * Copyright 2007-2016 Blackwater-Pacific.com
 * All rights reserved.
 * This custom version used with permission by QureLogix.com
 */

var forms = {

  testme: function(){ console.log('to testme');},

  queryString: function ( formId ) {
    formId = formId ? formId : 'theForm';
    return $('#' + formId).serialize();
  },

   // return formdata as a data object
   formData: function( formId, elClass ) {
    formId = formId ? formId : 'theForm';
      //var data = {};
      //var list = [];
      //
      //if( elClass ) {  list = $('#'+formId).find('.'+ elClass);  }
      //else {   list = $('#'+formId).serializeArray();  }
      //
      //var noDup = {};  // will ONLY catch first named element, trap for the sloppy.....
      //$.each(list, function(junk, o ) {
      //   if ( noDup[o.name] ) { return true; }
      //   noDup[o.name] = 1;
      //   data[o.name] = o.value;
      //   return true;
      //});

    var formData = $('#' + formId).serializeArray();

    return formData;
   },

   getSessionID: function() {
      var sid = $.cookie(CV.sessid);
      if( sid ) { return sid; }
      return '';
   },
   getParentFormId: function( obj ) {
      var Me = $(obj).closest('form');
      return Me.attr('id');
   },
   getFormElements: function( obj ) {
      return $(obj).find('input,select,textarea');
   },
   getFormSubmit: function( formId ) {
      return  $('#'+formId).find('input[type=submit]');
   },
   getFormSubmitId: function( formId ) {
      var submit =  this.getFormSubmit( formId );
      return submit.attr('id');
   },

   clearForm: function( formId, args ) {
      //console.log('to clearForm for ' + formId );
      var withPrefix    = '';
      var without       = '';
      var regex    = '';
      if( args ){
         if( args.notprefix  ) {
            without = '^' + args.notprefix;
            regex = RegExp(without);
         }
         if( args.withprefix ) {
            withPrefix    = '^' + args.withprefix;
            regex = RegExp(withPrefix);
         }
      }
      var Me       = $('#'+formId);
      var elements = Me.find('.form-input');
      var that = this;
      $.each( elements , function( i, o ) {
         var id = o.id;

         if( regex ) {
            if( without    &&  id.match(regex) ) { return true; }
            if( withPrefix && !id.match(regex) ) { return true; }
         }
         var v    = '';
        // if( that.filters[id].D ) { v = that.filters[id].D }
         that.Set( formId, id, v);
         return true;
      });
      return false;
   },

   // because '0' values are a bitch otherwise
   Set: function( formId, id, val ) { return this.Value( formId, id, val );  },
   Get: function( formId, id      ) { return this.Value( formId, id, undefined ); },

   // easy way to copy across form elements, assuming I remember it's here
   setTo: function( formId, fromId, toId ) {
      var val  = this.Get( formId, fromId );
      this.Set( formId, toId, val );
   },

   Value: function( formId, id, val ){
      //console.log('looking at ' + formId + ' element ' + id );
      var et = this.getElType( formId, id );

      //console.log( 'type is ' + et.type );
      if ( et.el && et.type ) {
         var that = this;
         switch( et.type ) {  // oddballs first
            case 'radio':      val = that.RadioButton( formId,id,val ); break;
            case 'checkbox':   val = that.Checkbox(  et.el, id, val  ); break;
            case 'select':     val = that.SelectBox( et.el, id, val  ); break;
            case 'select-one': val = that.SelectBox( et.el, id, val  ); break;
            case 'textarea':   val = that.TextArea(  et.el, id, val  ); break;
            default:           val = that.TextBox(   et.el, id, val  ); break;
         }
         return val;
      }
      return '';
   },

   getElType: function( formId, id ) {
      var el = '';
      var type;
      el = $('#'+formId).find('#'+id);
      type = $(el).prop('type');
      if ( ! type  ) {
         nameStr =  '[name=' + id + ']';
         el = $('#'+formId).find(nameStr);
         type = $(el).attr('type');
      }
      return { 'el': el, 'type': type };
   },

   Label: function( formId, id ){
      var et = this.getElType( formId, id );
      var label = 'Label not found';
      if ( et.type === 'radio' ) {
         el = $('#'+formId + ' input:radio[name=' + id + ']:checked');
         id = $(el).attr('id');
      }
      if ( id ) {   label = $("label[for='"+ id +"']").text();  }
      return label;
   },

   // generic for text boxes, text areas
   TextBox: function( el, id, val ) {
      if( val !== undefined ) {  $(el).val(val); }
      else{  return $(el).val(); }
      return true;
   },

/*
 Note: At present, using .val() on textarea elements strips carriage return
 characters from the browser-reported value. When this value is sent to the
 server via XHR however, carriage returns are preserved (or added by browsers
 which do not include them in the raw value). A workaround for this issue can
 be achieved using a valHook as follows:

 $.valHooks.textarea = {
    get: function( elem ) {
        return elem.value.replace( /\r?\n/g, "\r\n" );
    }
};

*/

   TextArea: function( el, id, val ) {
      if( val !== undefined ) {  $(el).val(val); }
      else{  return $(el).val(); }
      return true;
   },

   RadioButton: function( formId, id, val ){
      if( val !== undefined ) { // setting val
         $('#'+formId + ' input:radio[name=' + id + ']').each(function(){ // radios MUST have different id's, the names are the same
            var obj = this;
            var ov = $(obj).val().toString();
            if( val === '' ) {  obj.checked = false; }
            else if( ov === val ){  obj.checked = true; }
            else{  obj.checked = false;  }
         });
      }
      return $('#'+formId + ' input:radio[name=' + id + ']:checked').val();
   },


   // this looks like it might not work, but it does
   Checkbox: function( el, id, val ){
      var cbval = el.attr('value');
      if( val !== undefined ) {
         if( (val && val !== cbval) || (val === '') ) {
            el.attr('checked', false);
            return true;
         }
         else{
            el.attr('checked', true);
            return cbval;
         }
      }
      if( $(el).is(':checked') ) { return cbval;  }
      return false;
   },

   // ??? this work?
   SelectBox: function( el, id, v ){
      if( v !== undefined ){  $(el).val( v );}
      else { v = $(el).val();  }
      v = v ? v : 0;
      return v;
   },

   showExtraOptions: function(formId, id) {
      var list = [];
      if( typeof id === 'string' ) { list.push(id); }
      else { list = id; }
      $.each( list, function( i, v ) {
         var el =  $('#'+formId).find('#'+v);
         var options = el.children();
         $.each( options, function(j,k) { $(k).removeClass('hiddenbox');  });
         if( i === 0 ) {
            $('#' +v + '_show').addClass('hiddenbox');
            $('#' +v + '_hide').removeClass('hiddenbox');
         }
      });
   },

/**
 * Function: hideExtraOptions
 * Reduces drop down list selections by 'hiding' normally hidden options
 *
 * Arguments: object, object id
 *
 * Returns: nothing
 *
 */
   hideExtraOptions: function( formId, id ) {
      var list = [];
      if( typeof id === 'string' ) { list.push(id); }
      else { list = id; }
      $.each( list, function( i, v ) {
         var el =  $('#'+formId).find('#'+v);
         var options = el.children();
         $.each( options, function(j,k) {
            var opt = $(k).attr('value');
            if( CV.countryDefs[opt] ) { return true; }
            $(k).addClass('hiddenbox');
            return true;
         });
         if( i === 0 ) {
            $('#' +v + '_hide').addClass('hiddenbox');
            $('#' +v + '_show').removeClass('hiddenbox');
         }
      });
   }

};
