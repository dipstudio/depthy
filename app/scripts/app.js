'use strict';

angular.module('depthyApp', [
    'ngTouch'
])
    .config(function($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|blob):|data:image\//);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|blob):/);
    });
