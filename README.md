[PoziTone](https://github.com/PoziWorld/PoziTone) module SDK<img src="https://github.com/PoziWorld/PoziTone/raw/develop/static/global/img/pozitone-icon-48.png" width="48" height="48" alt="PoziTone">
=======

This SDK lets you create an external PoziTone module – a standalone extension which will provide PoziTone [features](https://github.com/PoziWorld/PoziTone/blob/master/README_en.md#features) to not yet [supported online media players](https://github.com/PoziWorld/PoziTone/blob/master/README_en.md#supported-online-media-players).

Such external PoziTone module gets published separately from PoziTone allowing you to get a proper credit for your work.

___

##### Table of contents

  * [Include SDK file](#include-sdk-file)
  * [Initialize SDK](#initialize-sdk)
  * [Connect with PoziTone](#connect-with-pozitone)
  * [Modules utilizing this SDK](#modules-utilizing-this-sdk)
  * [To be continued](#to-be-continued)

___

Include SDK file
--------

PoziTone module SDK is written in ES5 and doesn't have any dependencies.

Include the [SDK JavaScript file](pozitone-module-sdk.js) before any other JavaScript files.

```javascript
// Remember to replace "/path/to/"
<script src="/path/to/pozitone-module-sdk.js"></script>
```

<sup>[(back to table of contents)](#table-of-contents)</sup>


Initialize SDK
--------

Before your module can make any calls to the SDK, you need to initialize the SDK and provide an appropriate PoziTone “edition” name.

There are four PoziTone editions available:
* _[alpha](https://chrome.google.com/webstore/detail/pozitone-alpha/lbjkjmmcckjjijnnhdabbnkddgmpinhc)_ – may contain new features that are unstable and need to be properly tested before being released to everybody.
* _[beta](https://chrome.google.com/webstore/detail/pozitone-beta/hfdnjjobhcbkciapachaegijeednggeh)_ – may contain new features that have been tested, but need more testing before being released to everybody.
* _[stable](https://chrome.google.com/webstore/detail/pozitone/bdglbogiolkffcmojmmkipgnpkfipijm)_ – the version of PoziTone that gets released to everybody and shouldn't have major issues.
* _test_ – downloaded from the [source](https://github.com/PoziWorld/PoziTone) and loaded unpacked in Developer mode. _(Sometimes extension ID of such edition doesn't match the one hardcoded in the SDK. The fix is on the way.)_

```javascript
// Specify PoziTone edition you will be connecting to: 'alpha', 'beta', 'stable', or 'test'.
pozitoneModule.sdk.init( 'stable' );
```

_This is done only once per component/class/script/page._

<sup>[(back to table of contents)](#table-of-contents)</sup>


___

Connect with PoziTone
--------

Before your module is able to utilize any PoziTone [features](https://github.com/PoziWorld/PoziTone/blob/master/README_en.md#features), you need to connect it with PoziTone.

```javascript
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

pozitoneModule.sdk.connectModule( objSettings, funcSuccessCallback, funcErrorCallback );
```
where
```javascript
const objSettings = {
  objSettings_com_example : { // Replace com_example (for example, com_github if your module is for github.com)
      strName : 'Example'
    , boolIsEnabled : true
    , boolShowNotificationLogo : true
    , strNotificationLogo : 'site' // Other options: 'station'
    , strNotificationTitleFormat : 'short' // Optional. Other options: 'long', 'noStationInfo'
    , arrAvailableNotificationTitleFormats : [ // Optional. If multiple are available
          'short'
        , 'long'
        , 'noStationInfo'
      ]
    , arrAvailableNotificationButtons : [ // Choose only the applicable ones
          'add'
        , 'addAuth'
        , 'favorite'
        , 'favoriteAuth'
        , 'next'
        , 'nextAuth'
        , 'previous'
        , 'previousAuth'
        , 'playStop'
        , 'muteUnmute'
        , 'volumeUp'
        , 'volumeDown'
      ]
    , arrActiveNotificationButtons : [ // Two active buttons maximum. Any from the available ones
          'playStop'
        , 'muteUnmute'
      ]
    , boolShowNotificationWhenStopped : false // Optional
    , boolShowNotificationWhenMuted : false
    , boolShowNotificationWhenNoTrackInfo : false // Optional
    , boolUseGeneralVolumeDelta : true // Optional
    , intVolumeDelta : 10 // Optional
    , strRegex : '(http:\/\/|https:\/\/)example.com\/.*'
  }
};
```

Once connected, you can offer user to open the module settings subpage/section within PoziTone Options page.

```javascript
// Replace com_example with the appropriate name
pozitoneModule.sdk.openModuleSettings( 'com_example' );
```

<sup>[(back to table of contents)](#table-of-contents)</sup>


___

Modules utilizing this SDK
--------

* [YouTube embedded player | external PoziTone module](https://github.com/PoziWorld/YouTube-Embedded-Player-external-PoziTone-module)
* [SoundCloud Widget | external PoziTone module](https://github.com/PoziWorld/SoundCloud-Widget-external-PoziTone-module)
* [Sovyatnik | external PoziTone module](https://github.com/PoziWorld/Sovyatnik-external-PoziTone-module)

<sup>[(back to table of contents)](#table-of-contents)</sup>


___

To be continued
--------

This document is a work-in-progress and will be updated with more instructions soon...

<sup>[(back to table of contents)](#table-of-contents)</sup>
