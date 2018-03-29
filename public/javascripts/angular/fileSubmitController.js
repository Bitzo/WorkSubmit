/* eslint-disable */

myApp.controller('fileSubmitController', function($scope, $http) {
      console.log('-----------------------');

      $scope.userInfo = {};
      $scope.userInfo.id = localStorage.getItem('id')
      $scope.userInfo.username = localStorage.getItem('username')

      console.log($scope);

      $("#input-id").fileinput({
        language: 'zh',
        // showUpload: false,
        previewFileType: 'any',
        maxFileCount: 1,
        maxFileSize: 20 * 1024,
        uploadUrl: '/api/signUp/file',
        allowedFileExtensions: ['zip', '7z', 'rar'],
        uploadExtraData: function (previewId, index) {
            const data = {
              token: localStorage.getItem("token"),
            };
            return data;
        },
      }).on('filepreupload', function(event, data, previewId, index) {

      });
});
