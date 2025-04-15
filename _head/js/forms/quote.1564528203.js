// jquery extend function
$.extend(
{
    redirectPost: function(location, args)
    {
        var form = '';
        $.each( args, function( key, value ) {
           // value = encodeURIComponent( value );
            form += '<input type="hidden" name="'+key+'" value="'+value+'">';
        });
        $('<form action="'+location+'" method="POST">'+form+'</form>').appendTo('body').submit();
    }
});


$(document).ready(function () {
   //window.onpopstate = function(ev){
   // alert('Popped ' + this);
   // }
});

//function setAlerts(args) {
//   quotes.alerts = args;
//}


var quotes = {
    testme: function(){ console.log('to testme');},

    noVAl: false,  // allows binding 'stuff' without requireing validation?

    newPage: '',
    myDelay:  '',
    keyDelay: '',
    keyTimeout: 5000,
    keyBlurout: 150,
    overWrite:   'quote_form',
    alerts:      {},

    pagePath: '/quoting/quote/index.php',
    pageURL:  '/quoting/quote/',

    pageList: { // zero based, mostly
        'qq':  'index',
        '-1': 'reset',      // important hack, allows resetting ALL quote parameters
        '0':  '1_binding',
        '1':  '2_quantities',
        '2':  '3_trim',
        '3':  '4_paper',
        '4':  '5_cover',
        '5':  '6_design',
        '6':  '7_save',
        '7':  '8_saveorder',
        '8':  '9_shipping',
        '9':  '10_summary',
        '10': '11_payment',     // NOT - this WAS a STANDALONE page....
        '11': '12_thankyou',
        '20': '20_reprint',
        '21': '21_shipping',
        '22': '22_summary',
        '23': '23_billing'
    },

    pageInputs: {
        'index':           [ 'books', 'trim','black_pages','color_pages', 'pages' ],
        '1_binding':       [ 'binding' ],
        '2_title':         [ 'book_title' ],  /// shopmanager accomodation
        '2_quantities':    [ 'books','ebook','black_pages','color_pages', 'pages' ],
        '3_trim':          [ 'bleeds', 'trim'  ],  // , 'orientation' is calculated based on trim selected/entered
        '3_bleeds':        [ 'bleeds'  ],     /// shopmanager accomodation
        '4_paper':         [ 'text_stock_id'],
        '5_cover':         [],
        '5_cover_perfect': ['cover_stock_id', 'lamination'],
        '5_cover_spiral':  ['cover_stock_id', 'lamination', 'spiral_color_id'],
        '5_cover_hardPL':  ['cover_stock_id','cover_stock_name','lamination'],
        '5_cover_hardStd': ['cover_type','foil_color', 'ribbon_marker','dust_jacket','lamination'],
        '5_cover_hardDJ':  ['cover_stock_id','cover_stock_name','cover_type','foil_color', 'ribbon_marker','dust_jacket','lamination'],
        '6_design':        ['cover_design','cover_printed_proof','text_design','text_printed_proof','photos','scan_photos','charts'], // 'text_design_level',
        '7_save':          [ 'book_title','verify_books'],  // ,'books','color_pages','black_pages', 'pages'
        '7_reprint':       [ 'books','cover_corrections', 'cover_proof','text_corrections','text_proof'],
        '8_saveorder':     [],
        '9_shipping':      [ 'shipoption','shipFirstName','shipLastName','shipCompany','shipAddress','shipAddress2','shipCity','shipState','shipZip'],
        '10_summary':      ['chkDisc'],
        'payment':         [ 'paytype','cardname','cardnumber','CSC4','cardexpmonth','cardexpyear','billaddress','billaddress2','billcity','billstate','billzip'],
        '11_payment':      [ 'paytype','ccType','cardnumber','CSC4','cardexpmonth','cardexpyear','cardname','billaddress','billaddress2','billcity','billstate','billzip'],
        '12_thankyou':     [],
        '20_reprint':      [ 'books','cover_corrections', 'cover_changes', 'cover_proof','text_corrections', 'text_changes', 'text_proof'],
        '21_shipping':     [ 'shipoption','shipFirstName','shipLastName','shipCompany','shipAddress','shipAddress2','shipCity','shipState','shipZip'],
        '22_summary':      ['chkDisc'],
        '23_billing':      []
    },


    notSaved: {
        '1_binding': true,
        '2_quantities': true,
        '3_trim': true,
        '4_paper': true,
        '5_cover': true,
        '6_design': true,
        '7_save': true,
       // '8_saveorder': true
    },


    binds: [ '.page-nav', '.onchange', '.onkeyup', '.vonblur', '.toggle','.mousetoggle', '.quote-scroll', '.float-decimal','.editGo', '.info-link'],

    clearBinds: function( ) {
        var list = this.binds;
        $.each( list, function( i, v ) {  $(v).off();  });
    },

    // refined wheat spaghetti noodle added to allow ADMIN usage from order_invoice.php and friends
    adminInit: function( path ) {

    },

    canBind: {},

    bindPageNav: function( that, ajax ) {

        //console.log( 'newPage is ' + this.newPage );
        //console.trace();
        if ( !that ) {  that = this; }  // context is king....

        that.canBind = {};
        $.each( this.pageInputs[this.newPage], function( i, k ) {
            that.canBind[k] = true;
        });

        that.clearBinds( );


        //if ( that.notSaved[that.newPage] ) {
        //  //  console.log('shouldbe binding onbeforeunload')
        //    window.onbeforeunload = function (e) {
        //        e = e || window.event;
        //        //IE & Firefox
        //        if (e) {   e.returnValue = 'Are you sure?'; }
        //        // For Safari
        //        return 'Are you sure?';
        //    };
        //}
        //else {
        //  //  console.log('should be unbinding onbeforeunload');
        //    window.onbeforeunload = function (e) {};
        //}

        $('.page-nav').on(
            'mouseup', function(ev) {
                var go   = $(this).attr('data-go');
                var inst = [];
                inst = go.split(',');
                that.panelNav(inst[0], inst[1], this);
            }
        );

        $('.page-nav').on(
            'keyup', function(ev) {
                var code = (ev.keyCode ? ev.keyCode : ev.which);
                if ( code == 13 ) {
                  var go = $(this).attr('data-go');
                  //console.log('go is ' + go);
                  var inst = [];
                  inst = go.split(',');
                  that.panelNav(inst[0], inst[1], this);
                }

            }
        );

        $('.onchange').on(
            'change', function(ev){
                var name = $(this).attr('name');
                //console.log( name + ' changed');
                validate.reset();
                validate.matchInputs( name );
                validate.showAlertList();
                // HACK -   allows us to set a default dust_jacket value based on new value
                //if ( that.newPage === '1_binding' ) {
                //    that.bindingHack( this );
                //}
            }
        );


        $('.onkeyup').on( // text boxes
            'keyup', function(ev) {

            //var that = this;
            var code = (ev.keyCode ? ev.keyCode : ev.which);
            if ( code == 9 ) { return; }

            var id   = $(this).attr('id');
            clearTimeout( that.keyDelay );

            var go = function(){
                validate.reset();
                validate.filterInput( id );
            }

            if ( $('.'+id+'-alert').is(':visible') ){
                go();
                return;
            }
            // HACK - semi serious one too...
            if ( id === 'black_pages' || id === 'color_pages') {
               if ( $('.pages-alert').is(':visible') || $('.pagesDisp-alert').is(':visible') ){
                    go();
                    return;
                }
            }

            that.keyDelay = setTimeout( go, that.keyTimeout );

            }
        );

        $('.vonblur').on( // v(alidate)onblur - text boxes, mostly
            'blur', function(ev) {
                //console.log('blurred');
                clearTimeout( that.keyDelay );
                var id = $(this).attr('id');
                var go = function(){
                    if ( that.canBind[id]) {
                        validate.reset();
                       // console.log('vonvblur filtering ' + id);
                        validate.filterInput( id );
                    }
                }
                if ( that.canBind[id]) {
                  //that.keyDelay = setTimeout( go, that.keyBlurout );
                  validate.reset();
                       // console.log('vonvblur filtering ' + id);
                        validate.filterInput( id );
                }

            }
        );

        $('.float-decimal').on(
            'blur', function(ev) {
                clearTimeout( that.keyDelay );
                var id = $(this).attr('id');
                validate.rawNumbers = false;
                validate.reset();
                validate.filterInput( id );
                validate.rawNumbers = true;
            }
        );

        $('.toggle').on (
            'change', function(ev) {
                that.toggle( this );
            }
        );

        $('.mousetoggle').on (             // designed to work on links rather than form elements
            'mouseup', function(ev) {
                that.toggle( this );
            }
        );

        $('.editGo').on(
            'click', function(ev){
                var go =  $(this).attr('data-go');
                that.panelNav( go, 'not really nav', this);

            }
        );

        that.bindScroll();

        $('.form-post').on(
            'mouseup', function( ev ) { that.quoteSaveSubmit(this); }
        );

        $('.form-post').on(
            'keyup', function( ev ) {
                var code = (ev.keyCode ? ev.keyCode : ev.which);
                if ( code === 13 ) { that.quoteSaveSubmit(this);  }
            }
        );

        $('.info-link').on(
            'mouseup', function(ev) {
                var go = $(this).attr('data-go');

                //console.log('go: ' + go );
                var blank = true; //false;

                if ( go.match(/\.pdf/ ) ) { blank = true; }

                if ( blank ) {
                    //console.log('is blank');
                    window.open(go, '_blank');
                   return true;
                }
                else{
                    // we need to set session[quote] (server side) so we can use the 'back' button...
                    var fields = that.pageInputs[this.newPage];
                    var url = go;

                    $.redirectPost( go, {} );
                }
                //console.log('done with infolink');
                return true;
            }
        );

        that.firstFocus();

    },

    //bindingHack: function( el ) {
    //    var val = forms.Get( 'theForm', 'binding');
    //    var triggers = { 'hardcover (foil)': 1, "hardcover (dj)": 1 };
    //    if( val === 'hardcover (dj)' ){
    //      forms.Set('theForm', 'dust_jacket', 1 );
    //    }
    //    else {
    //        forms.Set('theForm', 'dust_jacket', 0 );
    //    }
    //
    //},

    firstFocus: function() {
      $.each($('#theForm').find('.first-focus'), function(i, o ){
        var id = $(o).attr('id');
        //console.log('focusing on ' + id );
        var cb = function() { $('#' + id ).focus(); }
        var junk = setTimeout( cb, 350); // timeout attempts to make sure panel is acutally loaded...
        return false;
      });
    },

    quoteSaveSubmit: function( el ) {
        var canGo = false;
        var noValid = $(el).attr('data-noval');
        if ( noValid ) { canGo = true; }
        else {  //console.log('svaesubmit');
            canGo = validate.matchInputs( );
            validate.checkAlerts();   // poor name, controls scrolling to FIRST alert in list below
            validate.showAlertList(); // this RESETS the alert list, MUST come after checkAlerts above
            this.bindScroll();       // rebinds, FIXME - do we need this anymore?
        }
        if ( canGo ) { // FIXME - redundent hack
            var go     = $(el).attr('data-goto');
            var action = $(el).attr('data-action');
            //var params = $('#theForm').serialize() + '&goto=' + go + '&action=' + action;
            var params = 'goto=' + go + '&action=' + action;
            var overWrite = '#' + this.overWrite;
            cb = function( html ) {
                $(overWrite).html(html);
            }
            $.post('save_submit_router.php', params, cb );
        }

    },


    ajaxMessage: function( msg ) {
        $('#ajax_message').html( msg );
        $('#ajax_message').show();
       // $('#ajax_message').fadeOut(4000);
    },


    bindScroll: function() {
        $('.quote-scroll').off();
        var that = this;
        $('.quote-scroll').on (
            'mouseup', function(ev) {
                var id = $(this).attr('data-go');
                that.quoteScroll( id );
            }
        );
    },

    panelNav:  function(go, left, obj){
        left = left ? left : '';
       // console.log('panelNav, go: ' + go + ' left: ' + left + ' obj: ' + obj + ' newPage: ' + this.newPage );

        var location = this.pageURL;

        var page   = this.pageList[go];
        var fields = this.pageInputs[this.newPage];

        if ( left ) { //console.log('going left');
            //this.newPage = page;
            //var params = '&ajax=1&go=' + this.pageList[go];
            //var cb = function(obj){return false; }
            //this.ajax( params, '' );
            //return true;
            this.newPage = page;
            var params = { go: this.pageList[go] };
            $.redirectPost(location, params);
        }

        validate.reset();

        var canGo = false;
        var noValid = $(obj).attr('data-noval');
        if ( noValid ) {  canGo = true;  }
        else if( go === 11 ) { canGo = true; }
        else {
            canGo = validate.matchInputs( );
            validate.checkAlerts();   // poor name, controls scrolling to FIRST alert in list below
            validate.showAlertList(); // this RESETS the alert list, MUST come after checkAlerts above
            this.bindScroll();       // rebinds, FIXME - do we need this anymore?
            //console.log('should be validated');
        }


        //console.log('canGo: ' + canGo );

        //canGo = false; // testing
        if (  canGo ) {
            //console.log('canGo = ' + canGo );
             // HACK TO DUMP US OUT OF THE QUOTE SYSTEM AND TO BILLING
            //if ( go == 10 ) {
            //     document.location = '/quoting/payment.php';
            //     return false;
            //}

            if ( go === 'qq' ) {  // FIXME - don't think this is used anymore - incoming 'go' has NOT been fiddled at this point...
                var data = forms.formData('theForm');
                var params = {};
                $.each( data, function( k, v ) {  params[v.name] = v.value;  })
                params = this.orientation( params );
                //console.log( params );
                $.redirectPost('/quoting/quote/data/quickquote.php', params );
            }
            else{
                var hack = $(obj).attr('data-confirm');
                if ( hack ) {
                    if ( ! confirm( hack )) {
                        return false;
                    }
                }


                //var params = forms.queryString('theForm');
                var params = {};
                var data   = $('#theForm').serializeArray();

                $.each( data, function( k, v ) {
                    params[v.name] = v.value;
                })

                var ret = $(obj).attr('data-return');
                var act = $(obj).attr('data-action');



                //if ( ret ) { params = params + '&return_to=' + ret; }
                //if ( act ) { params = params + '&action=' + act; }

                if ( ret ) { params['return_to'] = ret; }
                if ( act ) { params['action']    = act; }
//console.log( 'params: ' + params );
                params = this.checkLabels( params, fields );
//console.log( 'params2: ' + params );
                params = this.formHacks( params );
//console.log( 'params3: ' + params );
                //params = params + '&ajax=1&go=' + this.pageList[go];

                 params['go'] = this.pageList[go];

                var cb = function(obj){return false; }  // placeholder
//console.log( 'params4: ' + params );
               // console.log('params: ' + params );

               //$.each( params, function( k, v ) {
               //     console.log('k: ' + k + ', v: ' + v );
               //})

               $.redirectPost(location, params);

              //  this.ajax( params, '' );
            }
        }

        return true;
    },

    resetButton: function() {
        var params = '&ajax=1&go=reset';
        var cb = function(obj){return false; }
        this.ajax( params, cb );
    },


  // HACKS - most definitely....
  formHacks: function( params ) {
    //console.log('to formHacks and newPage is ' + this.newPage);
    if ( this.newPage === '3_trim'        ) {
        //console.log( 'page is ' + this.newPage );
        params = this.orientation( params );
    }
    if ( this.newPage === '6_design') {
      var cd = forms.Get('theForm', 'cover_design');
      //if ( cd === 'assisted' || cd === 'custom') {
      if ( cd === 'custom') {
        params['cover_printed_proof'] = 1;
      }
      var td = forms.Get('theForm', 'text_design');
      if ( td === 'level2' || td === 'level2') {
         params['text_printed_proof'] = 1;
      }
    }
    // Was creating problems with dustjackets,
    // functionality SHOULD be handled server side by Quote.php - but....
    //if ( this.blankInputs[this.newPage] ) {
    // var list = this.blankInputs[this.newPage];
    // $.each( list, function( i, k ) {
    //   //console.log('blanking ' + k );
    //   params = params + '&' + k + '=';
    // });
    //}
    return params;
  },


  orientation: function( params ) {
    var test = forms.Get('theForm', 'trim');

    var ori = 'portrait';

    var list = test.split('x');

    //console.log('list 0 is ' + list[0] + ' and list 1 is ' + list[1] );

    if ( (test === 'otherL') || ( parseFloat(list[0]) > parseFloat(list[1])) ) {
        //console.log( 'landscape');
        ori = 'landscape';
    }

    //params = params + '&orientation=' + ori;
    params['orientation'] = ori;
    return params;
  },

    // endo form HACKS

    checkLabels: function( params, fields ) {
        //console.log( 'to check labels');
        var that = this;

        $.each( fields, function(k, v ) {
            //console.log('looking at ' + v );
            var doit = that.wantLabel( v );
            if ( doit ) {
                if ( forms.Get('theForm', doit ) ) { return true; } // if we have a hidden field that contains this value (likely in cover stuff)
                var val = forms.Label( 'theForm', v );
                //console.log( 'doing ' + v + ' with doit of ' + doit + ' and val of ' + val);
                // need to escape val NOW since some people want ampersands in their strings
                // and who knows what else coming down the pike
                //val = val ? encodeURIComponent(val) : '';
                //params = params + '&' + doit + '=' + val;

                params[doit] =  val;
            }
            return true;
        });
        return params
    },

    wantLabel: function( id ) {
        var that = this;

        var doit = {
            binding: 'binding_name',
            text_stock_id: 'text_stock_name',
            cover_stock_id: 'cover_stock_name',
            spiral_color_id: 'spiral_color_name',
            cover_type:  'cover_type_name'
        };
      //  console.log('looked at ' + id);
        if ( doit[id] ) {
           // console.log('found it');
            return doit[id];
        }
        return false;
    },

    ssDelay: '',
    quoteScroll: function ( id, delay ) {
        id = '#' + id + '-scrollto';
        var cb = function() {
           // console.log('animating ' + id );
            $('html, body').animate({
                scrollTop: $(id).offset().top -150
            }, 500);
        }
        clearTimeout( this.ssDelay);
        if ( delay ) { ssDelay = setTimeout(cb, 2000); }
        else { cb(); }

    },



    ajax: function( params, callback ) {
        var path = this.pagePath;

        var that = this;

        $.ajax({
           url: path,
           data: params,
           type: "POST",
           contentType: "application/x-www-form-urlencoded",
           dataType: "json",
           async: true,
           cache: false,
           beforeSend: function() { $('.spinner').show(); },
           complete:   function() { $('.spinner').hide(); },
           error: function(e) {    },
           success: function(obj) {
              if ( obj.error ) {
                alert( obj.error );
              }
              else  {  // if obj.message then it's a message of some kind, else it's a form panel replacement
                //$('#' + that.overWrite).hide(250);

                if ( obj.redirect ) { document.location = obj.redirect; }
                var overWrite = '#' + that.overWrite;
                if ( obj.message ) { overWrite = false;  }

                if ( overWrite ) {   // FIXME - wtf is this about?
                    //console.log('overwriting');
                    $(overWrite).html('');
                    if ( obj.html ) {  $(overWrite).html( obj.html ); }
                    else { $(overWrite).html( obj ); }
                    document.location = "#page-top";
                }

                // context issue here, that sent as arg so the cb uses the proper (last) object instance
                if ( callback ) {  callback(that, obj); }
                else {
                    //var mcb = function() { that.bindPageNav( that ); }
                    //var junk = setTimeout( mcb, 1350);
                }


              }
           }
        });
        return false;
    },


    toggle: function( obj ){
        var hides = [];

        //console.log('to toggle');
        var hide   = $(obj).attr('data-hide');
        var show   = $(obj).attr('data-show');
        var toggle = $(obj).attr('data-toggle');

        if ( toggle ) {
           //console.log('have a toggle of ' + toggle );
            $('#' + toggle ).toggle(500);
            return true;
        }

        if ( hide ) {  this.hideList( hide.split(',') );  }

        if ( show ) {
            //console.log('have show');
            this.showList( show.split(',') );
        }

        this.bindPageNav();
        return true;
    },

    hideList: function(list) {
        $.each( list, function( i, v ) {
            if( v ) {
                //console.log('hiding ' + v );
                $('.' + v ).hide(500);
            }
        });
    },

    showList: function(list) {
        $.each( list, function( i, v ) {
            if( v ) {
                //console.log('showing ' + v )
                $('.' + v ).show(500);
            }
        });
    },


    breadCrumbs: function(that) {

        $('.breadcrumb').addClass('breadcrumb-inactive');
        $('.breadcrumb').removeClass('page-nav fake-link');
        var list = that.pageList;
        var me   = that.newPage;

        $.each( list, function( i, v ) {
            //console.log('enabling ' + v );
            $('#' + v).removeClass('breadcrumb-inactive')
            $('#' + v).addClass('page-nav fake-link')
            if ( v === me ) { return false; }
            return true;
        });
    },

    clearShipping: function( formID ) {
        formID = formID ? formID : 'theForm';
        forms.clearForm(formID);
    },

    resetShipping: function(){
        var list = this.pageInputs['9_shipping'];
        $.each( list, function(i,k) {
            if ( i === 0 ) { return true; }
            var kk = 'default_' + k;
            var val = forms.Get('theForm', kk );
            forms.Set('theForm', k, val );
            return true;
        });
    },



    // FIXME - this needs to be the same as quick-price 'stuff', not critical until rewrite
  // probably don't need the match for non-req fields
  filters: function() {
    var titleMatch =  function(k, val, filters ) {
        if ( val.match(/untitled/i)) { return false; }
        if ( val.match(/\w+/) ) { return true;}
        return false;
    };

    var that = this;
    var ref = {
        id: {
            filter: '\\D',
            match:  '\\d+'
        },
        sessID: {
            filter: '\W',
            match:  '\w{10,}'
        },
        custID: {
            filter: '\\D',
            match:  '\\d+'
        },
        jobID: {
            filter: '\\D',
            match:  '\\d+'
        },
        binding: {
            filter: '[^\\w\\(\\)\\s]', // not really needed since radios only use matches
            matchStrings: ['perfect','spiral','hardcover (p and l)','hardcover (foil)','hardcover (dj)'],
            req: true
        },
        binding_name: {
            filter: '[^-\\&\\w\\(\\)\\s]', // not really needed since radios only use matches
            matchStrings: ['perfect','spiral','hardcover (p and l)','hardcover (foil)','hardcover (dj)']
        },
        book_title: {
            filter: "[^-\\w\\s\\',]",
            match:  titleMatch,
            req: true
        },
        books: {
            filter: '\\D',
            isInt: true,
            min:  25,
            max:  2000,
            req: true
        },
        verify_books: {
            filter: '\\D',
            isInt: true,
            min:  1,
            max:  6000,
            req: true
        },
        ebook: {
            filter: '\\W',
            matchStrings: ['no','yes'],
            req: true
        },
        black_pages: {
            filter: '\\D',
            isInt: true,
            min:  0,
            max:  900,
            setmin: 0,
            mindef:  0,
            maxdef:  900,
            //ifOther: {
            //    other: 'binding', // so 'iflist' trim value is reserved
            //    perfect: { min: 0, max: 900 },
            //    spiral:  { min: 0, max: 450 }
            //},
            req: true,
            even: true,
            add: [ 'black_pages','color_pages'],
            addTo: ['pages','pagesDisp'],
            checkAddTo: true
        },
        color_pages: {
            filter: '\\D',
            isInt: true,
            min:  0,
            max:  900,
            setmin: 0,
            mindef:  0,
            maxdef:  900,
            //ifOther: {
            //    other: 'binding', // so 'iflist' trim value is reserved
            //    perfect: { min: 0, max: 900 },
            //    spiral:  { min: 0, max: 450 }
            //},
            req: true,
            even: true,
            add: [ 'black_pages','color_pages'],
            addTo: ['pages','pagesDisp'],
            checkAddTo: true
        },

        pages: {
            filter: '\\D',
            isInt: true,
            isSum: true,
            //add: [ 'black_pages','color_pages'],
            //addTo: ['pages','pagesDisp'],
            min: 24,
            max: 900,
            mindef: 24,
            maxdef: 900,
            //ifOther: {
            //    other: 'binding', // so 'iflist' trim value is reserved
            //    perfect: { min: 32, max: 900 },
            //    spiral:  { min: 20, max: 450 }
            //},
            even: true,
            req: true
        },

        pagesDisp: {
            filter: '\\D',
            isInt: true,
            isSum: true,
            //add: [ 'black_pages','color_pages'],
            //addTo: ['pages','pagesDisp'],
            min: 24,
            max: 900,
            mindef: 24,
            maxdef: 900,
            //ifOther: {
            //    other: 'binding', // so 'iflist' trim value is reserved
            //    perfect: { min: 32, max: 900 },
            //    spiral:  { min: 20, max: 450 }
            //},
            even: true,
            req: true
        },



        bleeds: {
            filter: '\\D',
            matchStrings: ['1','0'],
            alt:  '0',
            req: true
        },
        trim: {
            filter: '[^\\.\\d]',
            matchStrings: [ '5.5x8.5', '6x9', '8.5x11', 'otherP', '8.5x5.5', '9x6', '11x8.5', 'otherL' ],
            req: true,
            ifvalue: {  // if trim value is [below] then check required fields listed
                iflist: [ 'otherP', 'otherL'], // so 'iflist' trim value is reserved
                otherP: ['trimXp','trimYp' ],
                otherL: ['trimXl','trimYl' ]
            }
        },

        trimXp: {
            filter: '[^\\.\\D]',
            isDecimal: true,
            min: 4,
            max: 8.5,
            checkField: 'trimYp',
            req: true
        },
        trimYp: {
            filter: '[^\\.\\D]',
            isDecimal: true,
            min: 5,
            max: 11,
            gt: 'trimXp',
            req: true
        },
        trimXl: {
            filter: '[^\\.\\D]',
            isDecimal: true,
            min: 5,
            max: 11,
            checkField: 'trimYl',
            req: true
        },
        trimYl: {
            filter: '[^\\.\\D]',
            isDecimal: true,
            min: 4,
            max: 8.5,
            lt: 'trimXl',
            req: true
        },
        text_stock_id: {
            filter: '\\D',
            isInt: true,
            min: 1,
            max: 100000000000, // should do it...
            match:  '\\d+',
            req: true
        },
        text_stock_name: {
            filter: "[^-\\w\\s\\',]",
            match:  '\\w+'
        },
        cover_stock_id: {
            isInt: true,
            min: 1,
            max: 100000000000, // should do it...
            filter: '\\D',
            match:  '\\d+',
            req: true
        },
        cover_stock_name: {
            filter: "[^-\\w\\s\\'\\(\\),]",
            match:  '\\w+'
        },
        lamination: {
            filter: '\\w',
            matchStrings: ['gloss','matte','none','uv'],
            req: true
        },
        spiral_color_id: {
            filter: '[^\\s\\w]',
            match:  '\\w+'
        },
        spiral_color_name: {
            filter: "[^-\\w\\s\\',]",
            match:  '\\w+'
        },
        cover_type: {
            filter: "[^-\\w\\s\\',]",
            match:  '\\w+',
            req: true
        },
        cover_type_name: {
            filter: "[^-\\w\\s\\',]",
            match:  '\\w+'
        },
        ribbon_marker: {
            filter: '\\D',
            matchStrings: ['0','1']
        },
        dust_jacket: {
            filter: '\\D',
            matchStrings: ['0','1'],
            setFields: {
                'default': { key: 'binding', val: 'hardcover (foil)' },
                '0':       { key: 'binding', val: 'hardcover (foil)' },
                '1':       { key: 'binding', val: 'hardcover (dj)' },
            },
            req:  true
        },
        foil_color: {
            filter: '\\w',
            match:  '\\w+',
            req: true
        },
        cover_design: {
          filter: '\\W',
            matchStrings: ['pdf','assisted','custom', 'hcstd'],
            req: true
        },
        cover_printed_proof: {
            filter: '\\D',
            matchStrings: ['0','1'], // HAVE to be strings, not integers
            req: false,
            reqIf: [   // MUST be after the key below in form or it will be unreliable
                    { 'key': 'cover_design', 'is': 'pdf' },  // could be
                    //{ 'key': 'cover_design', 'is': 'assisted' }
                  ]
        },
        text_design: {
            filter: '\\w',
            matchStrings: ['pdf','level1','level2','level3'],
            req: true
        },
        text_design_level: {
            filter: '\\D',
           // matchStrings: ['level1','level2','level3'],
            req: false,
            //reqIf: [   // MUST be after the key below in form or it will be unreliable
            //        { 'key': 'text_design', 'is': 'assisted' }  // could be multiple
            //      ]
        },
        text_printed_proof: {
            filter: '\\D',
            matchStrings: ['0','1'],
            req: true
        },
        photos: {
            filter: '\\D',
            isInt: true,
            min: 0,
            max: 100000000000, // should do it...
            match:  '\\d+',
            req: false,
            reqIf: [   // MUST be after the key below in form or it will be unreliable
                    { 'key': 'text_design', 'is': 'assisted' }  // could be multiple
                  ]
        },
        scan_photos: {
            filter: '\\D',
            match:  '\\d+',
            req: false,
            reqIf: [   // MUST be after the key below in form or it will be unreliable
                    { 'key': 'text_design_level', 'is': '1' }  // could be multiple
                  ]
        },
        charts: {
            filter: '\\D',
            isInt: true,
            min: 0,
            max: 100000000000, // should do it...
            match:  '\\d+',
            req: false,
            reqIf: [   // MUST be after the key below in form or it will be unreliable
                    { 'key': 'text_design', 'is': 'assisted' }  // could be multiple
                  ]
        },

        reprint_flag:   { filter: '\\D',  matchStrings: ['0','1'] },
        parent_id:      { filter: '\\D',  match:  '\\d+' },
        completed_flag: { filter: '\\D',  matchStrings: ['0','1'] },
        submitted_flag: { filter: '\\D',  matchStrings: ['0','1'] },

        shipoption:     { filter: '\\W',  match: '\\w', req: true },

        // reprint fields
        cover_corrections: { filter: '\\W',  match: '\\w', req: true },
        cover_changes:     { filter: '\\D', match:  '\\d+', min: 1, req: false, reqIf: [ { 'key': 'cover_corrections', 'is': 'QureLogix' } ]  },
        cover_proof:       { filter: '\\W',  match: '\\w', req: true },
        text_corrections:  { filter: '\\W',  match: '\\w', req: true },
        text_changes:      { filter: '\\D', match:  '\\d+', req: false, reqIf: [ { 'key': 'text_corrections', 'is': 'QureLogix' } ]  },
        text_proof:        { filter: '\\W',  match: '\\w', req: true },

        shipFirstName: { filter: "[^-\\w\\s\\',]",     match:  '\\w+',     req: false, reqIf: [ { 'key': 'shipoption', 'is': 'address' } ]  },
        shipLastName:  { filter: "[^-\\w\\s\\',]",     match:  '\\w+',     req: false, reqIf: [ { 'key': 'shipoption', 'is': 'address' } ]  },
        shipCompany:   { filter: "[^-\\w\\s\\'\\.,]",  match:  '\\w+',     req: false },
        shipAddress:   { filter: "[^-#\\w\\s\\',\\.]", match:  '\\w+',     req: false, reqIf: [ { 'key': 'shipoption', 'is': 'address' } ]  },
        shipAddress2:  { filter: "[^-#\\w\\s\\',\\.]", match:  '\\w+',     req: false },
        shipCity:      { filter: "[^-#\\w\\s\\',\\.]", match:  '\\w+',     req: false, reqIf: [ { 'key': 'shipoption', 'is': 'address' } ]  },
        shipState:     { filter: '\\W',                match:  '\\w{2}',   req: false, reqIf: [ { 'key': 'shipoption', 'is': 'address' } ]  },
        shipZip:       { filter: "[^-\\w]",            match:  "\\d{5,}",  req: false, reqIf: [ { 'key': 'shipoption', 'is': 'address' } ]  },

        chkDisc:       { filter: "\\D",                match: '1',         req: true },

        paytype:       { filter: "[^\\w]", matchStrings: ['check','cc'], req: true },
        ccType:        { filter: "[^\\w]", matchStrings: ['amex','visa','mastercard','discover'], checkField: 'cardnumber', req: true }, // checkField: 'cardnumber', FIXME
        cardnumber:    { filter: "[^-\\d\\s]", match: that.ccValidation, req: true },  // MUST load cc-validation.js file separate
        CSC4:          { filter: "\\D", match: "^\\d{3,4}$", req: true },
        cardexpmonth:  { filter: "\\D", match: "^\\d{2}$", req: true },
        cardexpyear:   { filter: "\\D", match: "^\\d{2}$", req: true },
        cardname:      { filter: "[^-\\w\\s\\',\\.]", match: "\\w+", req: true },
        billaddress:   { filter: "[^-#\\w\\s\\',\\.]", match:  '\\w+', req: true },
        billaddress2:  { filter: "[^-#\\w\\s\\',\\.]", match:  '\\w+', req: false },
        billcity:      { filter: "[^-#\\w\\s\\',\\.]", match:  '\\w+', req: true },
        billstate:     { filter: '\\W',                match:  '^\\w{2}$',   req: true },
        billzip:       { filter: "[^-\\w]",            match:  "\\d{5,}",  req: true }

        /* NOT modifiable by users
        submitted_date DATETIME,
        modified_date TIMESTAMP,
        modified_by int(11) NOT NULL DEFAULT 0,
        created_date DATETIME NOT NULL DEFAULT 0,
        created_by int(11) NOT NULL DEFAULT 0,
        */
    }

    return ref;
  },  // endo filters and object methods


// simple roll my own Luhn validation, most of the canned stuff on the web does NOT work at all
// with one or more of the card types QureLogix accepts... since this is a convienience
// rather than a deal killer -sjm
 ccValidation: function( id ){

    var type = forms.Get('theForm', 'ccType');
    var ccnum  = forms.Get('theForm', id);

    if ( !type ) { return false; }
    //console.log('type: ' + type );
    ccnum = ccnum.replace( /\D/g, '');
    var cclen = ccnum.length;
    if ( cclen < 13 )  { return false; }// nothing we accept is less than 13

    //console.log( 'ccnum: "' + ccnum + '" cclen: ' + cclen );

    // simple card type check first
    var digits = ccnum.split( '' );
    var match  = /notachance/;
    var strlen = [326];
    if ( type === 'amex'       ) {  match = /^3[47]/;     strlen = [15] }
    /// 6011, 622126-622925, 644-649, 65 but we'll just use the first two
    if ( type === 'discover'   ) {  match = /^6[0245]/;   strlen = [16,19]; }
    if ( type === 'mastercard' ) {  match = /^5[12345]/;  strlen = [16]; }
    if ( type === 'visa'       ) {  match = /^4/;         strlen = [13,16,19];  }

    if( !ccnum.match( match )   ) { return false; }
    //console.log('match good');
    var badlength = true;
    for( i = 0; i < strlen.length; i++ ) {
        if ( ccnum.length === strlen[i] ) { badlength = false; }
    }
    if ( badlength ) { return false; }
    //console.log('lenght good');

    // Then the Luhn Algorithm. It's so pretty.
    var nCheck = 0, nDigit = 0, bEven = false;

    for (var n = ccnum.length - 1; n >= 0; n--) {
       var cDigit = ccnum.charAt(n),
            nDigit = parseInt(cDigit, 10);

       if (bEven) {
          if ((nDigit *= 2) > 9) nDigit -= 9;
       }

       nCheck += nDigit;
       bEven = !bEven;
    }

    return (nCheck % 10) == 0;


 }



};


function addMoney( val1, val2 ) {
    val1 = parseFloat( val1 );
    val2 = parseFloat( val2 );
    var total = parseFloat(val1+val2).toFixed(2);
}
