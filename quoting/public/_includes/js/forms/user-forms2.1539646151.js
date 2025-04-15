/* User forms object
 *
 * SEQUENCE IS VITAL  do NOT mess with it lightly -YHBW
 *
 * Copyright 2007-2017 Blackwater-Pacific.com
 * All rights reserved.
 * This custom version used with permission by QureLogix.com
 *
 * var redirect = 'http://www.website.com/page?id=23231';
 * $.redirectPost(redirect, {x: 'example', y: 'abc'});
 */

$.extend(
{
    redirectPost: function(location, args)
    {
        var form = '';
        $.each( args, function( key, value ) {
            form += '<input type="hidden" name="'+key+'" value="'+value+'">';
        });
        $('<form action="'+location+'" method="POST">'+form+'</form>').appendTo('body').submit();
    }
});


//function setAlerts(args) {
//   userForms.alerts = args;
//}


var userForms = {

  dataPath: '',
  this_page: '',
  newPage:   '',
  myDelay:  '',
  keyDelay: '',
  keyTimeout: 5000,
  keyBlurout: 250,
  singleton:  false,
  alerts:     { 'fred': 'wilma'},

  pageInputs: {
    'new_acct': ['firstname','middlename','lastname','company','address','address2','city','state','zip','phone','email','reseller','passwd','passwd2' ],
    'profile':  ['firstname','middlename','lastname','company','address','address2','city','state','zip','phone','email','reseller' ], // ,'passwd','passwd2'
    'shipping': ['shipoption','shipto','company','address','address2','city','state','zip'],
    'catalog':  ['book','firstname','lastname','company','address','address2','city','state','zip','referred_by'],
    'login':    ['email_req', 'passwd_req'],  /// legacy crap... short passwords FIXME - need to look at old length req (if any)
    'password': [ 'passwd','passwd2']
  },

  blankInputs: {
    'customer_profile': [  ],
    'catalog': [  ],
    'upload':  [  ]
  },

  inputs: [ ],

  init: function( args ) {
    var that = this;

    // console.log('to init');
    if ( args ) {
        $.each( args, function( k, v ){
            if( k && v ) { that[k] = v;  }
        });
    }

    //console.log('past init');
    this.bind();

    return this;

  },


  binds: [ '.ajax-button', '.onchange', '.validate', '.onkeyup', '.toggle', '.page-scroll', 'info-link'],

  clearBinds: function( ) {
      var list = this.binds;
      $.each( list, function( i, v ) { i=i; $(v).off();  });
  },

  // various things to bind
  bind: function() {
    //console.log( 'this_page is ' + this.this_page );
    this.clearBinds();
    var that = this;


    $('.onkeyup').on( // text boxes
        'keyup', function(ev) {

            if ( ev.which == 9 ) { return; }

            //var that = this;
            var id   = $(this).attr('id');

            clearTimeout( that.keyDelay );

            var go = function(){
                validate.reset();
                validate.filterInput( id );
            };

            if ( $('.'+id+'-alert').is(':visible') ){
                go();
                return;
            }

            that.keyDelay = setTimeout( go, that.keyTimeout );

        }
    );

    $('.mousetoggle').off();
    $('.mousetoggle').on (             // designed to work on links rather than form elements
            'mouseup', function(ev) { ev = ev;
                that.toggle( this );
            }
        );

    $('.vonblur').on( // text boxes
      'blur', function(ev) { ev = ev;
          clearTimeout( that.keyDelay );
          that.clearAjaxMessages();
          var id = $(this).attr('id');
          var go = function(){
              validate.reset();
              validate.filterInput( id );
          };
          that.keyDelay = setTimeout( go, that.keyBlurout );
      }
    );

    $('.onchange').on(
        'change', function(ev){ ev = ev;
            var name = $(this).attr('name');
            validate.reset();
            validate.matchInputs( name );
        }
    );

    $('.submit-button').on(
      'mouseup', function(ev) {  ev = ev;
        //console.log('MOUSEUP');
        userForms.submit( this );
      }
    );

    $('.submit-button').on(
      'keyup', function(ev) {
            if ( ev.which == 13 ) {
              //console.log('key was 13');
              userForms.submit( this );
            }
      }
    );

    $( "#theForm" ).submit(function( event ) {
        event.preventDefault();
    });


    //$('.first-focus').focus();

  },

  keyup: function( obj, ev ){  ev = ev;

    var that = this;
    var id = $(obj).attr('id');

    //console.log('id is ' + id );

    clearTimeout( that.keyDelay );

    var go = function(){
        //console.log('go');
        validate.reset();
        validate.filterInput( id );
    };

    if ( $('.'+id+'-alert').is(':visible') ){
        //console.log( id + ' is visible' );
        go();
        return;
    }

    that.keyDelay = setTimeout( go, that.keyTimeout );
  },

  // this is for clickable scroll-up or scroll-to images.. NOT using this in these three forms
  bindScroll: function() {
    $('.quote-scroll').off();
    var that = this;
    $('.quote-scroll').on (
      'mouseup', function(ev) { ev = ev;
        var id = $(this).attr('data-go');
        that.quoteScroll( id );
      }
    );
  },

  submit: function( obj ) {
    // console.log('to submit');
    this.clearAjaxMessages();
    //console.log('submitting');
    this.singleton = false;
    if ( this.singleton ) {
      //return true;
      var msg = '';
      if ( this.singleton === true ) { msg = 'Please be patient...';  }
      if ( this.singleton === 1    ) { msg = 'Your request has already been submitted'; }
      if ( this.singleton === 2    ) { msg = 'Feature no longer available'; }
      this.ajaxMessage( msg );
      return true;

    }
    else {
      var action = $(obj).attr('data-action');
      //var func   = forms.Get('theForm', 'function');

      if ( action === 'create' ) { this.singleton = true; }

      var page  = this.this_page;
      var list  = this.pageInputs[page];
      var canGo = validate.matchInputs( list );

      validate.checkAlerts();
      validate.showAlertList();

      //console.log( 'page is ' + page );
      //return;

      if ( canGo ) {
        if( this.this_page === 'login' || this.this_page === 'order' ) {
            var uname  = $('#email_req').val();
            var passwd = $('#passwd_req').val();
            //console.log( 'uname: ' + uname + ' passwd: ' + passwd );
            $('#uname').val( uname );
            $('#passwd').val( passwd );
        }
        params = $('#theForm').serialize();

        // console.log( 'params: ' + params );

        switch (page ) {
          case 'catalog':  cb = this.cb_catalog;  break;
          case 'shipping': cb = this.cb_shipping; break;
          case 'newacct':  cb = this.cb_newacct;  break;
          case 'order':    cb = this.cb_quoting;  break; // paritally handled by anonymouse.js (quoting engine)
          case 'login':    cb = this.cb_login;    break;
          case 'profile':  cb = this.cb_profile;  break;
          case 'password': cb = this.cb_password; break; // for CHANGING passwords
          default: cb = function(){};
        }
        this.ajax( params, cb );

      }
    }
    return true;
  },



  //sets a delayed reload? maybe
  cb_catalog: function( obj, that ) {
    // allow resubmit on error...
    that.singleton = false;
    if ( obj.error ) { that.singleton = false;  }
    else {
      var msg = 'Guidebook  request sent';
      that.ajaxMessage( msg );
      $('#form_buttons').hide(250);
    }
  },

  // should always be an update
  cb_shipping: function( obj, that) {
    that.singleton = false;
    if ( obj.error ) { that.singleton = false; }
    else {
      var msg = 'Shipping updated';
      that.ajaxMessage( msg );

     // DO WE NEED THIS
     // var direct_to = '/quoting/customer_home.php';


      // unless we sent in some redirect instructions ( an order instead of save directive )
      //window.location.href = '/quoting/customer_home.php';
    }
  },


  // these two need to redirect based on where the customer came from
  // if they tried to order a quote but were NOT logged in or did NOT have an account
  // they go back to quoting... otherwise they go to customer home...
  cb_newacct: function( obj, that ) {
    if ( obj.error ) { that.singleton = false; }
    else {
      that.cb_login_newacct_redirect( obj );
    }
  },

  cb_login: function( obj, that ) {
    // console.log('back to cb_login');
    that.singleton = false;
    if ( obj.error ) { that.singleton = false; }
    else {
      that.cb_login_newacct_redirect( obj );
    }
  },

  cb_quoting: function( obj, that ) {
    that = that;
     if( obj.redirect ) {
      document.location = obj.redirect;
     }
  },

  cb_login_newacct_redirect: function( obj ) {
   // var direct_to = '/quoting/customer_home.php';
    if ( obj.go  ) {
      if (  obj.go === 'quote' ) {
        //console.log('redirect is order');
        $.redirectPost( '/quoting', { action: ''});
      }
      if (  obj.go === 'save' ) {
        //console.log( 'redirect is save');
        //window.location.href = '/quoting/quote';
        $.redirectPost( '/quoting/quote', { action: ''});
      }
    }
    else {
      //console.log('no redirect detected');
      window.location.href = '/quoting/dash';
    }
  },

  cb_profile: function( obj, that ) {
    that.singleton = false;
    if ( obj.error ) { that.singleton = false; }
    else {

     //window.location.href = '/quoting/customer_home.php';
     $('#return_to_home').show(250);
    }
  },

  cb_password: function( obj, that ) {
    that.singleton = false;
    if ( obj.error ) { that.singleton = false;  }
  },

  ajax: function( params, callback ) {
    var path = this.dataPath;

    var that = this;

    if( this.singleton === true ) {
        that.ajaxMessage( 'Please be patient' );
        return false;
    }
    this.singleton = true;

    this.clearAjaxMessages();

    $.ajax({
      url: path,
      data: params,
      type: "POST",
      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
      async: true,
      cache: false,
      //error: function(e) { e=e;
      //  that.singleton = 2; // means a system error, does NOT reset singleton
      //  that.ajaxError( 'Error returned' );
      //},
      success: function(obj) {

        if ( obj.redirect ) {
            //console.log( 'redirect to ' + obj.redirect );
            that.singleton    = false;
            document.location = obj.redirect;
        }

        if ( obj.message) {
            //console.log( 'message?');
            that.singleton = false;    // as opposed to 'true' meaning submitted, tells us we've succeeded (hopefully)
            that.ajaxMessage( obj.message );
        }
        else if ( obj.error && obj.error.length ) {
            that.singleton = false;
            //console.log( 'Error? WTF?');
            that.ajaxError( obj.error );
            return true;
        }
        else if ( obj.show ) {
           // console.log('showing');
            that.singleton = false;
            $('#' + obj.show).show(250);
            return true;
        }
        else {
           // console.log( 'default');
            that.singleton = false;
            that.ajaxMessage( 'Operation successful' );
        }

        // don't lose our context
        if ( callback ) {
           // console.log('should be banging callback');
            that.singleton = false;
            callback(obj, that);
        }
       }

    });
    return false;
  },

  clearAjaxMessages: function() {
    //console.log('to clear messages');
    $('#ajax_message').html('&nbsp;');
    //$('#ajax_message').hide();
    $('#ajax_error').html('&nbsp;');
   // $('#ajax_error').hide();
  },

  ajaxMessage: function( msg ) {
    //console.log('to ajaxMessage');
    $('#ajax_message').html( msg );
    $('#ajax_message').show();
    $('#ajax_message').fadeOut(8000);
  },

  ajaxError: function( msg ) {
   //console.log('to ajaxError, error is ' + msg);
   var loc = $('#ajax_error');
    loc.html( msg );
    loc.show();
    loc.fadeOut(8000);
  },

  toggle: function( obj ){
        var toggle = $(obj).attr('data-toggle');

        if ( toggle ) {
           //console.log('have a toggle of ' + toggle );
            $('#' + toggle ).toggle(500);
        }
  },


  // match for id, char, length
  passwordMatch: function( id, val, filter  ) {  //console.log('password match');
    filter = filter;
    val = val.toString();
    var str = '&nbsp;';

    var alert_span = '.'  + id + '-alert';

    if ( id === 'passwd' && !val ) {
        str  = str + 'Password entry is required';
        $(alert_span).html( str );
        //console.log('should have written to ' + alert_span);
        return false;
    } // required, so if no value then we call it bad and bail

    var ret = false;

    var sep = '';
    if ( val.length < 8 ) { str = 'too short'; sep = ', '; }
    else { ret = true; }
    if ( ! val.match('\\d') ) { str = str + sep + 'no number(s)';  sep = ', '; ret = false; }
    if( ! val.match('\\D') ) {  str = str + sep + 'no letters';  ret = false; }
    if ( !ret ) { str = 'Password error: ' + str; }
    $(alert_span).html( str );
    return ret;
  },

   // match for int, char, length
  password2Match: function( id, val, filter  ) {   //console.log('password2 match');
    filter = filter;
    var ret = false;
    var str = '&nbsp;';
    var matches = {
      passwd:  'passwd2',
      passwd2: 'passwd'
    };
    //console.log('password match for ' + id );
    var mustmatch = matches[id];

    //console.log('mustmatch: ' + mustmatch );
    var mval = forms.Get('theForm', mustmatch );
    //console.log( "val: '" + val + "' mval: '" + mval + "'");
    if ( mval === val ) {  ret = true; }
    else { str = 'must match password above'; }
    if ( !ret ) { str = 'Error: ' + str; }
    $('.' + id + '-alert').html( str );
    return ret;
  },
   /*
    this.function - call back
    These can be set in page itself....
    writetoid     - writes filtered value to dom elment by id
    writetoclass  - writes filtered value to dom elements by class
  */
  filters: function( page ) {
    page = page;
    //console.log('filters request');
    var pwdfilter = "[^-\\w\\!\\@\\#\\$\\%^\\&\\*]";
    pwdfilter = "[^-\\w]";
    var name            = { filter: "[^-\\w\\s\\',]",     match:  '\\w+',     req: false  };
    var name_req        = { filter: "[^-\\w\\s\\',]",     match:  '\\w+',     req: true   };
    var text_string     = { filter: "[^-\\w\\s\\'\\.,]",  match:  '\\w+',     req: false };
    var text_string_req = { filter: "[^-\\w\\s\\'\\.,]",  match:  '\\w+',     req: true };
   // var state           = { filter: '\\W',                match:  '\\w{2}',   req: false };
    var state_req       = { filter: '\\W',                match:  '\\w{2}',   req: true };
  //  var zip             = { filter: "[^-\\w]",            match:  "\\d{5,}",  req: true };
    var zip_req         = { filter: "[^-\\w]",            match:  "\\d{5,}",  req: true };
    var phone           = { filter: "[^-\\.\\d]",         match:  '\\d\\d\\d\\D\\d\\d\\d\\D\\d\\d\\d\\d',  req: false };
    var phone_req       = { filter: "[^-\\.\\d]",         match:  '\\d\\d\\d\\D\\d\\d\\d\\D\\d\\d\\d\\d',  req: true };
    var email           = { filter: '\\s',                match:  '.+?\\@.+?\\.\\w+',  req: true,  writetoid: 'email_display' };
    var email_req       = { filter: '\\s',                match:  '.+?\\@.+?\\.\\w+',  req: true,  writetoid: 'email_display' }; // writetoid writes to dom element by id
    var referred_by     = { filter: '\\W',                match: '\\w+',               req: true };
    var reseller        = { filter: '[^-\\d]',            match: '\\w',                req: false };
  //  var leavebe         = { filter: '', match: '', req: false };
    //var passwd          = { filter: pwdfilter,            match:  this.passwordMatch,  req: true };  // always one, this is not required by process, but validation needs it
    //var passwd_req      = { filter: pwdfilter,            match:  this.passwordMatch,  req: true };
    var passwd          = { filter: pwdfilter,            match:  '\\w+',  req: true };  // always one, this is not required by process, but validation needs it
    var passwd_req      = { filter: pwdfilter,            match:  '\\w+',  req: true };
    var passwd2         = { filter: pwdfilter,            match:  this.password2Match, req: true };


    // oh gee, lets have multiple names for the same data, what fun...
    var ref = {
        'book':        text_string,
        'firstname':   name_req,
        'middlename':  name,
        'lastname':    name_req,
        'shipto':      text_string_req,
        'company':     text_string,
        'address':     text_string_req,
        'address2':    text_string,
        'city':        text_string_req,
        'state':       state_req,
        'zip':         zip_req,
        'phone':       phone,
        'phone_req':   phone_req,
        'email':       email,
        'email_req':   email_req,
        'uname':       email_req,
        'password':    passwd,
        'passwd':      passwd,
        'passwd_req':  passwd_req,
        'passwd2':     passwd2,
        'referred_by': referred_by,
        'reseller':    reseller
    };

    //console.log('finding list for ' + page );
    var list = this.pageInputs[page];

    var out = {};
    $.each( list, function( i, k ){
        //console.log('looking at ' + k );
        i=i;
        out[k] = ref[k];
    });

    return out;
  },


  //consoleList: function( list ) {
  //  $.each( list, function( i, v ) { i=i;
  //    console.log( v );
  //  });
  //}



};
