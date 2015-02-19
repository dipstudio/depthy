'use strict';

angular.module('depthyApp')
.directive('depthyViewer', function (depthy) {
  return {
    restrict: 'A',
    scope: true,
    controller: function($scope, $element, $attrs) {
      var viewer,
          options = $scope.$parent.$eval($attrs.depthyViewer);

      $scope.$parent.$watch($attrs.depthyViewer, function(newOptions) {
        if (viewer && newOptions) {
          viewer.setOptions(options);
        }
      }, true);

      viewer = new DepthyViewer($element[0], options);

      this.getViewer = function() {
        return viewer;
      };
    },
    link: function ($scope, $element, $attrs) {
      function loadImage (fileUrl, mapUrl) {
        fileUrl && depthy.loadUrlDirectImage(fileUrl, false, {
          depthSource: mapUrl,
          stateParams: {
            url: fileUrl
          }
        });
      }

      $attrs.$observe('depthyFileUrl', function(depthyFileUrl) {
        loadImage(depthyFileUrl, $attrs.depthyDepthUrl);
      });

      $attrs.$observe('depthyDepthUrl', function(depthyDepthUrl) {
        loadImage($attrs.depthyFileUrl, depthyDepthUrl);
      });

      loadImage($attrs.depthyFileUrl, $attrs.depthyDepthUrl);

      $(window).on('resize', function() {
        depthy.viewer.size = {
          width:  $($element).width(),
          height: $($element).height()
        };

          $scope.$safeApply();
      });

      $(window).resize();
    }
  };
});