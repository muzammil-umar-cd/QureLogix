/* BlackWater validate
 * Silly propriatory  validation system
 *
 * SEQUENCE IS VITAL  do NOT mess with it lightly -YHBW
 *
 * Copyright 2007-2016 Blackwater-Pacific.com
 * All rights reserved.
 * This custom version used with permission by QureLogix.com
 */

/*
Filter
  strings  - regex
  integers - non-numerics
  floats   - non-decimals

Match
  strings  - regex
  integers - range (min/max)
  floats   - decimals

Filter Format/Example

'stringfield': {
  // Filter/Match
  filter:    '\\W+',      // string non alpha-numerics, isInt and isFloat also need filters to prevent entering silly characters
  match:     '\w+',       // at least one alpha-numeric, isInt and isFloat to NOT NEED this setting but will use it if available

  // Settings
  req:       true/false,   // required field, NOTE: match will not be performed if false
  // Type
  isString:  [true||false],   // for clarity only, default if isInt, isDecimal, and isFloat NOT true
  isInt:     [true||false],   // if integer field
  isDecimal  [true||false]    // if decimal field
  isFloat:   [true||false],   // if float field

  // Dependencies
  checkDown: [ 'a','b','c' ]    // filter and match if children are required (usually are)
  checkUp:   [ 'a','b','c' ]    // filter and match parent(s?) regardless of parent req setting

  // Math
  add:      [ 'a','b'(,'c') ],       // list, a + b + c + etc., integer or float fields to add
  addTo:    [ 'd','e'  ],            // list, write result to named field(s) - (rounded by named field's type)
  minus:    [ 'a','b' (,'c','d') ],  // list, left to right, a - b - c - etc. , integer or float field values sequentially subtract, usually only minuend and subtrahend
  minusTo:  [ 'e','f','g' ],         // list, write minuend to named field(s) - (rounded by named field's type)
  times:    [ 'a','b','c' ],         // list, left to right, a * b * c, etc.
  timesTo:  [ 'd','e'  ],            // list, write product to named field(s) - (rounded by named field's type)
  divide:   [ 'a','b'(,'c') ],       // list, left to right, a/b/c/etc, divisor, dividend, quotient
  divideTo: [ 'e','d' ],             // list, write quotient to named fields,

  // String
  writeTo:   [ 'a','b'(,'c') ],      // list, overwrite subsequent fields with first field value
  appendTo:  [ 'a','b'(,'c') ],      // list, append first field value to subsequent fields
}


*/

$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 50,
    duration      : 500,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
};

var validate;

validate = {

   theForm:        'theForm',
   isValid:        true,
   warningConcat: '-warning',
   alertConcat:   '-alert',
   myDelay:       '',
   keyDelay:      '',
   filterReg:     {},
   matchReg:      {},
   rawNumbers:    true,  // testing hack to deal with decimal and float issues, can't replace during filter method
   //scrollTo:       '',
   alerts:        {},

   controller:    '',

   fields:        [],
   filters:       {},

   exportAlerts: function(){ return this.alerts; },

  reset: function() { this.isValid = true;  this.setFocus = '';  },

   init:  function( args ){
    //console.log('initing bw-validate');
      this.fields  = [];   // prevent AJAX bleeds
      this.filters = {};

      if ( args.fields ) {
        this.fields =  args.fields;
        //console.log('have fields');
      }
      else {
       // console.log('Finding fields to validate');
        this.fields = this.findFields();
      }

      if ( args.controller ) { this.controller = args.controller;  }

      this.filters = args.filters;
   },

   // by class only
   findFields: function(){
      var els    = $('.validate');
      var fields = [];
      $.each( els, function(i,o){
         var k = $(o).attr('id');
         if( k ) { fields.push( k ); }
      });
      return fields;
   },


   // filter only filters one field at a time... usually
   filterInput: function( id, filters, nodoublebang){
      nodoublebang = nodoublebang;
      var that = this;
      //console.log('filtering ' + id );
      //console.trace();
      if ( !id ) {  return false;  }
      clearTimeout(that.myDelay);

      var val  = forms.Get( this.theForm, id );
      //var val1 = val;


      if (!filters ) { filters = this.filters; } //console.log( 'filter id is ' + id );

      filter  = filters[id].filter;

      filters = this.setMinMax( filters, id );

      if ( typeof filter === 'function' ) { filter( id, val, filters[id] ); }
      else if ( filters[id].isInt) {
         if ( val && val !== 0 ) { val = that.filterInt( val ); } // prevent '0' (zero) silliness in text boxes
         if ( filters[id].add ) { that.addNumbers( id, val, filters[id] ); }
      }
      else if ( filters[id].isDecimal) {
         if ( val && val !== 0 ) { val = that.filterFloat( val, 2 ); } // prevent '0' (zero) silliness in text boxes
         if ( filters[id].add ) { that.addFloats( id, val, filters[id], 2 ); }
      }
      else if ( filters[id].isFloat) {
         if ( val && val !== 0 ) { val = that.filterFloat( val, 4 ); } // prevent '0' (zero) silliness in text boxes
         if ( filters[id].add ) { that.addFloats( id, val, filters[id], 4 ); }
      }
      else {
         var F = filters[id].filter;
         if ( !that.filterReg[id] ) { that.filterReg[id] = new RegExp(F); }
         var re = that.filterReg[id];
         if ( val ) { val = val.replace(re, ''); }
      }


      forms.Set( this.theForm, id, val );

      if ( filters[id].writetoid ) {
        var wt = filters[id].writetoid;
        $('#' + wt).html(val);
      }

      // only match if alert is visible....
      //if( $('.' + id + '-alert').is(':visible') ) {
         that.matchInputs( id ); // see if this thing will match, also related values
      //}
      //else {
      //  console.log('no alert visible for ' + id);
      //}



      that.showAlertList();

      if ( filters[id].checkAddTo ) { // BEWARE the infinite loop here..... this is ONLY meant to loop when adding values and checking the result
         var tt = function(){
           $.each( filters[id].checkAddTo, function( i, v ) {  that.filterInput( v ); } );
         };
         that.myDelay = setTimeout(tt, 350);
      }
      return true;
  },

   filterInt: function( val ) {
      val = val.toString();
      val = val.replace(/\D/g, '');
      val = val.replace(/^0+/, '');
      if ( val ) { return parseInt(val); }
      return '';
   },

   filterFloat: function( val, decimals ) {  // decimal places passed by caller
      val = val.toString();
      val = val.replace(/[^\d\.]/g, '');
      val = val.replace(/^0+/, '');
      if ( val ) {
         if ( this.rawNumbers ) { return val; }
         return parseFloat( val ).toFixed(decimals);
      }
      return '';
   },
// WARNING - NOT tested as of 2015-10-05, though it should work
   addFloats: function ( id, val, obj, decimals ) {
      if ( obj.addTo === id ) { val = 0; } // since we're double checking....
      var that = this;
      $.each( obj.add, function( i, add ) {
         if ( add !== id ) {
            var newVal = parseFloat( forms.Get(that.theForm, add ) );
            if( newVal ) { val = val + newVal; }
            else {
                forms.Set(that.theForm, add, 0);
            }
         }
      });
      val = this.filterFloat( val, decimals );
      this.addTo( id, obj.addTo, val );
   },


   addNumbers: function( id, val, obj ) {
      val = this.filterInt( val );
      if ( obj.addTo === id ) { val = 0; } // since we're double checking....
      var that = this;
      $.each( obj.add, function( i, add ) {
         if ( add !== id ) {
            var newVal = parseInt( forms.Get(that.theForm, add ) );
            if( newVal ) { val = val + newVal; }
            else {
                forms.Set(that.theForm, add, 0);
            }
         }
      });
      val = this.filterInt( val );
      this.addTo( id, obj.addTo, val );
   },

   addTo: function( id, addTo, val ) {
      var that = this;
      var list = [];
      if ( typeof( addTo ) === 'object') { list = addTo;  }
      else { list = [ addTo ]; }
      $.each( list, function( i, k ){
         forms.Set(that.theForm, k, val );
      });

   },
  // test comment

   // FIXME - this is a mess
   matchInputs: function ( id  ) {
      //console.log('matching ' + id );

      var list = [];
      if ( !id ) { list = this.fields;  } // note fields, NOT filters.. fields are specific page fields passed at init
      else  {                             // it's either a passed list of fields to match against, OR a single id
         if ( typeof id === 'object' ) { list = id; }
         else { list = [id]; }
      }

      var that    = this;
      var passed  = true;
      var subpass = true;
      filters     = this.filters;

      $.each( list, function( i, v ){
         //console.log('matching ' + i + ' ' + v );

         // FIXME - SERIOUS HACK stop problem with Shipping shipoption radio buttons, do NOT know why it's there
         if ( v.match( /.+_\d$/ ) ) { return true; }

         ifList = filters[v] && filters[v].reqIf ? filters[v].reqIf : false;

         var required = filters[v] && filters[v].req ? filters[v].req : false;

         // remember: this is for a single element, but it may need to look at several other elements for determination
         if ( ifList ) {
            $.each( ifList, function( i, o ) {
               input  = o.key;
               test   = o.is;
               tval = forms.Get('theForm', input);
               //console.log('seeing if ' + input + ' = ' + test );
               if ( tval === test ) { //console.log('reqIF ' + input + ' is true');
                  required = true;
                  return false;
               }
               return true;
            });
         }



         if (  required || ( filters[v] && filters[v].matchfunc ) ){  // filtering is all above so all we need to do is match 'stuff'
            //console.log('required, looking up value for ' + v );
            var val = forms.Get( that.theForm, v );
            val     = val ? val : '';
            //console.log('value for ' + v + ' is '  + val);

            if ( filters[v].setFields ) {
              //console.log('to setFields');
              try {
                var fld  = filters[v].setFields[val].key;
                var nval = filters[v].setFields[val].val;
                //console.log('setting ' + fld + ' to ' + nval );
                forms.Set( 'theForm', fld, nval );
               // $('#' . fld ).val( nval );
              } catch(e){
                if ( filters[v].setFields['default'] ) {
                  var fld  = filters[v].setFields['default'].key;
                  var nval = filters[v].setFields['default'].val;
                  forms.Set( 'theForm', fld, nval );
                }
                else { console.log('failure: ' + e); }
              }
            }

            var match = filters[v].match;
            if ( typeof match == 'function' ) {
              //console.log('is function');
              subpass = match( v, val, filters[v] );
            }

            else if ( filters[v].isInt  || filters[v].isDecimal || filters[v].isFloat ) {

               val = val ? val : 0;  // HAS to be a number of some kind....

              // filters = that.setMinMax( filters, v );  // does NOT work as expected and removed from process

               if ( filters[v].setmin !== undefined ) {  //console.log('setmin for ' + v );
                  if ( val <= filters[v].setmin ) {
                     val = filters[v].setmin;
                     $('#'+v).val(val);
                  }
               }

               if ( filters[v].min || filters[v].max ) { subpass = that.minmax( val, filters[v] ); }
               if ( subpass  && filters[v].even ) { subpass = that.isEven( val );  }
               if ( filters[v].checkAddTo      ) {
                   that.matchInputs( filters[v].addTo );  }
               if ( subpass && filters[v].gt ) { subpass = that.isGreaterThan( val, filters[v]); }
               if ( subpass && filters[v].lt ) { subpass = that.isLessThan( val, filters[v]); }
            }
            else {

               if ( filters[v].matchStrings ) {  subpass = that.matchAny( v, val ); }
               else { subpass = that.match( v, val );  }

               if ( !subpass && filters[v].alt ) {  // strings only?
                  val = filters[v].alt;
                  forms.Set( that.theForm, v, val );
                  subpass = true;
               }
            }
        // 'Ware loops with filter settings FIXME - remember that server side logic needs to ignore custom WxH for stock trims
            if ( filters[v].ifvalue ) { //console.log( 'ifvalue for ' + v + ' and isValid is ' + that.isValid );
               var sublist = filters[v].ifvalue[val];
               if (  sublist ) {
                  $.each( sublist, function( j, sv ) {  subpass = that.matchInputs( sv ); });
               }
            }

            if ( filters[v].checkField ) {              // single field at this point.. sigh....
              var isgo = forms.Get( that.theForm, filters[v].checkField );
              if ( isgo ) {
               that.matchInputs( filters[v].checkField );
              }
            }

            //console.log( 'field: ' + v + ' value: ' + val + ' pf: ' + subpass );
            that.adjustAlerts( v, subpass );
            //that.adjustAlerts( 'global', subpass );
            if( subpass === false ){ passed = false; }
           // console.log('looping');

         }
          return true;
      });
      //console.log('returning');
      return passed;
   },


   showAlertList: function() {
      //console.log('to showAlertList, called from ' + this.showAlertList.caller.name);
      //console.trace();
      var list = this.alerts;
      that     = this;
      var showAlerts = [];
      var hideAlerts = {};
      $.each( list, function( k,v ) {
         v = v;
         if ( list[k] ) {  showAlerts.push(k); }
         else{ hideAlerts[k] = true; }
      });

      // three stages, sheesh
      if ( showAlerts.length ) {
          showAlerts.push('global');
          $.each( showAlerts, function( i, k ) {  hideAlerts[k] = false; });
          $.each( hideAlerts, function( k, v ) {  if ( v === true ) {  that.hideAlert(k);  }  });
          $.each( showAlerts, function( i, k ) {  that.showAlert(k); });
      }
      else {
        hideAlerts.global = true;
        $.each( hideAlerts, function( k, v ) {    if ( v === true ) {  that.hideAlert(k);  } });
      }




      this.alerts = {};
   },

   adjustAlerts: function( id, drop ) { // need to keep these in order.. drop will be true if input validates
      if ( drop ) { this.alerts[id] = false;  }
      else { this.alerts[id] = true; }
   },

   setMinMax: function( filters, id ) {
      var easier = false;
      try {
         easier = filters[id].ifOther;
      } catch( e ) { easier = false; }
      if ( easier ) {
         var check = easier.other;
         var val = forms.Get(this.theForm, check);
         if ( check && easier[val] ) {
            filters[id].min = easier[val].min ? easier[val].min :  filters[id].min;
            filters[id].max = easier[val].max ? easier[val].max :  filters[id].max;
         }
         else {
            filters[id].min = filters[id].mindef;
            filters[id].max = filters[id].maxdef;
         }
      }
      return filters;
   },

   showAlertDelay: {},

   // by class to allow multiple locations on page
   showAlert: function( id ) { //console.log('449 should be showing ' + '.' + id + '-alert ');
      $('.' + id + '-alert').show(150);
   },
   hideAlert: function( id ) { //console.log('452 should be hiding ' + '.' + id + '-alert' );
      $('.' + id + '-alert').hide(150);
   },

   isEven: function( val ) {
     val = parseInt(val);
     if ( parseInt( val/2) === val/2 ){ return true; }
     return false;
   },

   minmax: function ( val, obj ){
     val = parseFloat( val );
     //console.log('min is ' + obj.min + ' and max is ' + obj.max );
     if ( (val >= obj.min) && ( val <= obj.max ) ) { return true;  }
     return false;
   },

   setMinmax: function( val, obj ) {
      val = parseFloat( val );
      if ( val < obj.min ) { val = obj.min; }
      if ( val > obj.max ) { val = obj.max; }
      return val;
   },

   isGreaterThan: function( val, obj ) {
      cval = forms.Get( this.theForm, obj.gt );
      if ( parseFloat( val) >= parseFloat( cval )) { return true; }
      return false;
   },

   isLessThan: function( val, obj ) {
      cval = forms.Get( this.theForm, obj.lt );
      if ( parseFloat( val) <= parseFloat( cval )) { return true; }
      return false;
   },

   match: function( id, val ) {
      //console.log('matching ' + id + ' val of "' + val +'"');
      if ( val === undefined ) { return false;  }
      var M = this.filters[id].match;

      if ( M && !this.matchReg[id] ) {
        //console.log( 'M is ' + M);
        this.matchReg[id] = new RegExp(M);
      }
      var re = this.matchReg[id];

      if ( val.toString().match(re) ) {
        //console.log( id + ' matched');
        return true;
      }

      //console.log( id + ' not matched');

      return false;
   },

   matchAny: function( id, val ) {
    //console.log('to matchstrings for ' + id );
      var list = this.filters[id].matchStrings;
      var ret  = false;
      $.each( list, function(i,m){
         if ( val === m ) {
          ret = true;
          return false;
         }
         return true;
      } );
      return ret;
   },


   //add: function( fields, settings ){
   //
   //},
   //
   //minus: function( fields, settings ){
   //
   //},
   //
   //times: function( fields, settings ) {
   //
   //},
   //
   //divide: function( fields, settings ) {
   //
   //},
   //
   //writeTo: function( fields, settings ) {
   //
   //},
   //
   //appendTo: function( fields, settings ) {
   //
   //},


   checkAlerts: function() { //console.log('checking Alerts')
      var fields = this.fields;
      var alerts = this.alerts;
      var that   = this;
      $.each( fields, function( i, v ) {  //console.log('checking to see if ' + v + ' has an alert');
         if( alerts[v] ) { //console.log('it does' );
            that.alertScroll( v, true );
            return false;
         }
         return true;
      });
   },

   ssDelay: '',

   alertScroll: function ( id, delay ) {
      var scrollto = '#' + id + '-scrollto';
      var cb = function() {
         //console.log('animating ' + id );
         $('html, body').animate({
             scrollTop: $(scrollto).offset().top -150
         }, 500);
         //console.log('focus on ' + id);
         $('#'+id).focus();
      };
      //console.log('scrolling');
      clearTimeout( this.ssDelay);
      if ( delay ) { this.ssDelay = setTimeout(cb, 1500); }
      else { cb(); }
   }


};


//function showdata (data, name ) {
//   var out = JSON.stringify(data);
//   console.log( out );
//}
