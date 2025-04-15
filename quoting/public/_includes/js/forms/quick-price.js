
$(document).ready(function () {
  quickquote.init();
});


var quickquote = {

  // settings
  path:           '/quoting',
  messageTimeout: 3000,

  lastId: '',
  focused: '',

  init: function( args ) {
    args = args;
    console.log( 'to init for some damned reason or other....' );

    var that = this;

    $('#quickquote').off();
    $('#quickquote').mouseup(
      function() {
        var isgood = that.validate();
        if( isgood ){ that.process(); }
      }
    );

    // the rest of these events can NOT be reset due to potential conflicts with validate

    $('.qq-books').keyup( function() {
      var val = $(this).val();
      val = val.replace( /\D/, '' );
      $(this).val( val );
    });
    $('.qq-books').blur(
      function() {
        var val =$(this).val();
        val = val.replace( /\D/, '' );
        val = val ? parseInt(val) : 0;
        if( val < that.fields.books.min ){ val = that.fields.books.min; }
        if( val > that.fields.books.max ){ val = that.fields.books.max; }
        $(this).val( val );
      }
    );

    //$('.qq-trim').change(
    //  function( ev ) {
    //    //console.log( 'trim changed' ); // do we realy give a damn?
    //  }
    //);


   // $('.qq-black-pages').keyup( function( ) {  that.page_counts( this ); } );
   $('.qq-black-pages').keyup( function() {
      var val = $(this).val();
      val = val.replace( /\D/, '' );
      $(this).val( val );
    });
    $('.qq-black-pages').blur( function( ) {
      var org = parseInt( $(this).val() );
      var fxd = that.fixOdd( org );
      if( org !== fxd ) { $(this).val( fxd ); }
      that.page_counts( this );
    } );


  //  $('.qq-color-pages').keyup( function( ) {  that.page_counts( this ); } );
    $('.qq-color-pages').keyup( function() {
      var val = $(this).val();
      val = val.replace( /\D/, '' );
      $(this).val( val );
    });
    $('.qq-color-pages').blur( function( ) {
      var org = parseInt( $(this).val() );
      var fxd = that.fixOdd( org );
      if( org !== fxd ) { $(this).val( fxd ); }
      that.page_counts( this );
    } );

    $('.qq-pages').focus( function( ) { this.blur();  }  );

  },


  page_counts: function ( ) {
    var id    = $(this).attr('id');
    var black = parseInt( $('#black_pages').val() );
    var color = parseInt( $('#color_pages').val() );

    black = black ? black : 0;
    color = color ? color : 0;

   // var pages = parseInt( $('#pages').val()       );

    black = black > this.fields.black_pages.max ? this.fields.black_pages.max : black;
    color = color > this.fields.color_pages.max ? this.fields.color_pages.max : color;

    var max = this.fields.pages.max;

    black = black > max ? max : black;
    color = color > max ? max : color;

    // tmeporary
    var pages = black + color;

    //black = ( pages = 0 ) ? this.fields.pages.min - color : black;

    if( pages > max ){
      if( id === 'black_pages' ){ black = max - color; }
      if( id === 'color_pages' ){ color = max - black; }
    }

    pages = black + color;

   $('#black_pages').val( black );
   $('#color_pages').val( color );
   $('#pages').val( pages );

  },


   fixOdd: function( num ) {
    if( this.isOdd(num) ) { num = num + 1; }
    return num;
   },

   isOdd: function(num) { return (num % 2) == 1;  },

   fields: {
    "list": [ "books", "trim", "black_pages", "color_pages", "pages" ], //, "totalPages"
      "books": {
        "default": 25,
        "min":     25,
        "max":     2000,
        "even":    false
      },
      "trim": {
        "isNum": false,
        "valids": {
          "5.5x8.5": 1,
          "6x9":     1,
          "8.5x11":  1,
          "8.5x5.5": 1,
          "9x6":     1,
          "11x8.5":  1
        }
      },
      "black_pages": {
        "default": 32,
        "min":     0,
        "max":     900,
        "isNum":   true,
        "even":    true
      },
      "color_pages": {
        "default": 0,
        "min":     0,
        "max":     900,
        "isNum":   true,
        "even":    true
      },
      "pages": {
        "default": 32,
        "min":     32,
        "max":     900,
        "isNum":   true,
        "even":    true
      }
  },


	validate: function( ) {

    var data   = this.fields;
		var list   = data.list;
		var isgood = true;
		var that   = this;
    var val    = '';

    $.each( list, function( j, k ){
      val = $('#' + k).val();
      if( data[k].valids ) {
          if( data[k].valids[val] ) { that.hideError( k );  }
          else { that.showError( k ); isgood = false; }
      }
      else {
        if( val >= data[k].min && val <= data[k].max ) {
          that.hideError( k );
        }
        else {
          that.showError( k ); isgood = false;
        }
      }
    });

    return isgood;

	},

   showError: function( target ) {
      $('.' + target + '-alert').removeClass('validate-widget');
   },

   hideError: function( target ) {
      $('.' + target + '-alert').addClass('validate-widget');
   },



    process: function() {
        dataLayer.push({'event': 'quick-quote'});
        var params = $('#theForm').serializeArray();
        var form = '';
        $.each( params, function( j, o ) {
            j = j;
            form += '<input type="hidden" name="'+ o.name +'" value="'+ o.value +'">';
        });
        $('<form id="tmp" action="' + '/quoting/quote/review' + '" method="POST">'+form+'</form>').appendTo('body').submit().remove();
    
        return false;
     }



};
