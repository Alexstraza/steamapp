/**
 * Created by stijn_000 on 13-5-2016.
 */
window.addEventListener('load', function(){
   var so = cordova.plugins.screenorientation;
   so.setOrientation(so.Orientation.LANDSCAPE);
});