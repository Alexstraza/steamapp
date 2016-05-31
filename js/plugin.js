/**
 * Created by stijn_000 on 13-5-2016.
 */
window.addEventListener('load', function(){
   var so = cordova.plugins.screenorientation;
   so.setOrientation(so.Orientation.LANDSCAPE);
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   StatusBar.hide
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   window.open = cordova.InAppBrowser.open;
}

