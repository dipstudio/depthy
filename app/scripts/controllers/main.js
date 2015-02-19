'use strict';

angular.module('depthyApp')
.controller('MainCtrl', function ($rootScope, $window, $scope, $timeout, depthy, $element) {

  $rootScope.depthy = depthy;
  $rootScope.viewer = depthy.viewer; // shortcut
  $rootScope.Modernizr = window.Modernizr;
  $rootScope.Math = window.Math;

  $scope.version = depthy.getVersion();

  $rootScope.$safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase === '$apply' || phase === '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  $scope.$watch('compoundFiles', function(files) {
    if (files && files.length) {
      depthy.loadLocalImage(files[0]).then(
        function() {
          depthy.leftpaneClose();
          depthy.opened.openState();
        },
        function(e) {
          depthy.leftpaneClose();
        }
      );
      // depthy.handleCompoundFile(files[0]);
    }
  });


  $scope.$watch('depthy.useOriginalImage', function() {
    depthy.refreshOpenedImage();
  });

  $scope.debugClicksLeft = 2;
  $scope.debugClicked = function() {
    if (--$scope.debugClicksLeft === 0) depthy.enableDebug();
  };

  $scope.$watch('(depthy.activePopup.state === "export.gif.options" || depthy.activePopup.state === "export.webm.options" || depthy.exportActive) && depthy.exportSize', function(size) {
    if (size) {
      depthy.isViewerOverriden(true);
      depthy.viewer.size = {width: size, height: size};
      if (depthy.viewer.fit) $scope.oldFit = depthy.viewer.fit;
      depthy.viewer.fit = false;
      console.log('Store fit ' + $scope.oldFit)
    } else {
      if ($scope.oldFit) {
        depthy.viewer.fit = $scope.oldFit;
        console.log('Restore fit ' + $scope.oldFit)
      }
      $($window).resize();
      depthy.isViewerOverriden(false);
    }
  });

  $scope.$watch('viewer.fit', function(fit) {
    if (fit === 'cover') {
      depthy.viewer.upscale = 4;
    } else if (fit === 'contain') {
      depthy.viewer.upscale = 1;
    }
  });


  $scope.$on('pixi.webgl.init.exception', function(evt, exception) {
    console.error('WebGL Init Exception', exception);
    Modernizr.webgl = false;
  });

  /*$($window).on('resize', function() {
    var $viewer = $('#viewer');
    depthy.viewer.size = {
      width:  $viewer.width(),
      height: $viewer.height()
    };
    console.log('Resize %dx%d', $viewer.width(), $viewer.height());
    $scope.$safeApply();
  });
  $($window).resize();*/

  $($window).on('online offline', function() {
    $scope.$safeApply();
  });
});
