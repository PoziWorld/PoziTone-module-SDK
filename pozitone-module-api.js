/* =============================================================================

  Product: PoziTone module API
  Author: PoziWorld
  Copyright: (c) 2016 PoziWorld
  License: pozitone.com/license

  Table of Contents:

    Api
      init()
      connectModule()
      onConnectModuleResponse()
      sendMediaEvent()
      setMediaInfo()
      convertImageSrcToDataUrl()

 ============================================================================ */

( function() {
  'use strict';

  function Api() {
    this.strVersion = '0.1';

    this.strMediaInfoDivider = ' – ';
  }

  /**
   * Initialize.
   *
   * @type    method
   * @param   strPozitoneEdition
   *            PoziTone edition (alpha, beta, stable, test).
   * @return  void
   **/

  Api.prototype.init = function ( strPozitoneEdition ) {
    var objPozitoneEditions = {
        'alpha' : 'lbjkjmmcckjjijnnhdabbnkddgmpinhc'    
      , 'beta' : 'hfdnjjobhcbkciapachaegijeednggeh'    
      , 'stable' : 'bdglbogiolkffcmojmmkipgnpkfipijm'    
      , 'test' : 'ioiggdgamcfglpihfidbphgoofpmncfi'    
    };

    if ( typeof strPozitoneEdition !== 'string'
      || typeof objPozitoneEditions[ strPozitoneEdition ] !== 'string'
    ) {
      strPozitoneEdition = 'test';
    }

    this.strPozitoneId = objPozitoneEditions[ strPozitoneEdition ];
  };

  /**
   * Send request to PoziTone to connect the module.
   *
   * @type    method
   * @param   objSettings
   *            Module settings.
   * @param   funcSuccessCallback
   *            Optional. Function to run on success.
   * @param   funcErrorCallback
   *            Optional. Function to run on error.
   * @return  void
   **/

  Api.prototype.connectModule = function ( objSettings, funcSuccessCallback, funcErrorCallback ) {
    var self = this;

    // TODO: Make a separate method
    chrome.runtime.sendMessage(
        this.strPozitoneId
      , {
          objPozitoneApiRequest : {
              strVersion : self.strVersion
            , strCall : 'module'
            , strMethod : 'POST'
            , objData : objSettings
          }
        }
      , function ( objResponse ) {
          // TODO: Handle a case when objResponse is undefined
          objResponse = objResponse.objPozitoneApiResponse;

          if ( typeof objResponse !== 'object' || Array.isArray( objResponse ) ) {
            self.onConnectModuleResponse( funcErrorCallback, objResponse );

            return;
          }

          var intStatusCode = objResponse.intStatusCode;

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Response_codes
          if ( typeof intStatusCode !== 'number' || intStatusCode < 100 || intStatusCode > 399 ) {
            self.onConnectModuleResponse( funcErrorCallback, objResponse );
          }
          else {
            self.onConnectModuleResponse( funcSuccessCallback, objResponse );
          }
        }
    );
  };

  /**
   * When there is an error connecting the module or
   * the module has been successfully connected.
   *
   * @type    method
   * @param   funcCallback
   *            Function to run.
   * @param   objResponse
   *            Response object.
   * @return  void
   **/

  Api.prototype.onConnectModuleResponse = function ( funcCallback, objResponse ) {
    if ( typeof funcCallback === 'function' ) {
      funcCallback( objResponse );
    }
  };

  /**
   * Send media event information to PoziTone.
   *
   * @type    method
   * @param   objData
   *            Media-related data.
   * @param   funcSuccessCallback
   *            Optional. Function to run on success.
   * @param   funcErrorCallback
   *            Optional. Function to run on error.
   * @return  void
   **/

  Api.prototype.sendMediaEvent = function ( objData, funcSuccessCallback, funcErrorCallback ) {
    var self = this;

    // TODO: Make a separate method
    chrome.runtime.sendMessage(
        this.strPozitoneId
      , {
          objPozitoneApiRequest : {
              strVersion : self.strVersion
            , strCall : 'media'
            , strMethod : 'POST'
            , objData : objData
          }
        }
      , function ( objResponse ) {
          // TODO: Define what success and error are
          if ( typeof funcSuccessCallback === 'function' ) {
            funcSuccessCallback( objResponse );
          }

          if ( typeof funcErrorCallback === 'function' ) {
            funcErrorCallback( objResponse );
          }
        }
    );
  };

  /**
   * Provide artist name and media name, get a line consisting of both inputs.
   *
   * @type    method
   * @param   strArtist
   *            Artist (singer, band, etc.) name.
   * @param   strMediaTitle
   *            Media (song, video, etc.) title.
   * @return  string
   **/

  Api.prototype.setMediaInfo = function ( strArtist, strMediaTitle ) {
    // TODO: Handling of invalid/empty strings
    return strArtist.trim() + this.strMediaInfoDivider + strMediaTitle.trim();
  };

  /**
   * Provide relative image URL/src, get data URL.
   *
   * PoziTone can't access image files from other extensions.
   * Thus, images URLs have to be data URLs.
   *
   * @type    method
   * @param   strImgSrc
   *            Relative image URL.
   * @param   funcCallback
   *            Do when ready to provide data URL.
   * @param   intBorder
   *            Optional. Border to add to the image.
   * @param   strBorderColor
   *            Optional. Image border color.
   * @return  void
   **/

  Api.prototype.convertImageSrcToDataUrl = function ( strImgSrc, funcCallback, intBorder, strBorderColor ) {
    var $$image = new Image();

    $$image.onload = function () {
      var $$canvas = document.createElement( 'canvas' )
        , intLogoBorder = intBorder || 0
        , intLogoWidth = this.naturalWidth
        , intLogoHeight = this.naturalHeight
        , intCanvasWidth = intLogoWidth + 2 * intLogoBorder
        , intCanvasHeight = intLogoHeight + 2 * intLogoBorder
        ;

      $$canvas.width = intCanvasWidth;
      $$canvas.height = intCanvasHeight;

      var context = $$canvas.getContext( '2d' );

      // Solid bg
      context.fillStyle = strBorderColor || '#fff';
      context.fillRect( 0, 0, intCanvasWidth, intCanvasHeight );

      context.drawImage(
          this
        , intLogoBorder
        , intLogoBorder
        , intLogoWidth
        , intLogoHeight
      );

      funcCallback( $$canvas.toDataURL() );
    };

    $$image.setAttribute( 'crossOrigin', 'anonymous');
    $$image.src = strImgSrc;
  };

  if ( typeof pozitoneModule === 'undefined' ) {
    window.pozitoneModule = {};
  }

  pozitoneModule.api = new Api();
} )();
