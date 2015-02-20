(function () {
    require('script!../scripts/modernizr.js');
    require('script!../scripts/modernizr-platform.js');
    require('script!../bower_components/jquery/dist/jquery.min.js');
    require('../bower_components/angular/angular.js');
    require('../bower_components/lodash/dist/lodash.compat.js');
    require('script!../bower_components/pixi.js/bin/pixi.dev.js');
    require('../bower_components/angular-touch/angular-touch.min.js');
    require('../bower_components/is-jpg/browser.js');
    require('../bower_components/is-png/browser.js');
    require('../scripts/vendor/LensBlurDepthExtractor.js');
    require('../scripts/vendor/md5.js');
    require('../scripts/classes/GDepthEncoder.js');
    require('../bower_components/promise/index.js');
    require('../scripts/app.js');
    require('../scripts/services/depthy.js');
    require('../scripts/controllers/main.js');
    require('../scripts/directives/depthyViewer.js');
    require('../scripts/pixi/ColorMatrixFilter2.js');
    require('../scripts/pixi/DepthPerspectiveFilter.js');
    require('../scripts/pixi/DepthDisplacementFilter.js');
    require('../scripts/classes/DepthyViewer.js');

})();