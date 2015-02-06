'use strict';

angular.module('depthyApp')
.controller('ExportWebmModalCtrl', function ($scope, $modalInstance, $rootElement, depthy, $timeout, $sce) {
  $scope.exportProgress = 0;
  $scope.imageReady = false;
  $scope.shareUrl = '';
  $scope.tweetUrl = null;
  $scope.imageOverLimit = false;

  $timeout(function() {
    var exportPromise = depthy.exportWebmAnimation(),
        sharePromise = null,
        imageDataUri = null,
        exportStarted = new Date(),
        gaLabel = 'size ' + depthy.exportSize + ' dur ' + depthy.viewer.animDuration;

    exportPromise.then(
      function exportSuccess(blob) {
        $scope.size = blob.size;
        $scope.videoUrl = $sce.trustAsResourceUrl(URL.createObjectURL(blob));
        $scope.ready = true;

      },
      function exportFailed() {
        $scope.exportError = 'Export failed';
      },
      function exportProgress(p) {
        $scope.exportProgress = p;
        $scope.$safeApply();
      }
    );

    $modalInstance.result.finally(function() {
      if (exportPromise) exportPromise.abort();
      if ($scope.videoUrl) URL.revokeObjectURL($scope.videoUrl.toString());
    });
  }, depthy.modalWait);

});
