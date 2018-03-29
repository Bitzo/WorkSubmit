/**
 * @Author: bitzo
 * @Date: 17-10-4 下午3:17
 * @Last Modified by: bitzo
 * @Last Modified time: 17-10-4 下午3:17
 * @Function:
 */

myApp.controller('signUpController', function($scope, $http) {

    $scope.form = {};
    $scope.form.grade = '2017';

    $("#input-id").fileinput({
      language: 'zh',
      // showUpload: false,
      previewFileType: 'any',
      maxFileCount: 1,
      maxFileSize: 20 * 1024,
      uploadUrl: '/api/signUp/file',
      allowedFileExtensions: ['zip', '7z', 'rar'],
      uploadExtraData: function (previewId, index) {
          const data = $scope.form;
          return data;
      },
    }).on('filepreupload', function(event, data, previewId, index) {
        console.log(data);
        console.log('File pre upload triggered');
        $('#input-id').fileinput('cancel');
    });

    $scope.submit = function() {

      console.log($scope.form)

      if($scope.form.phoneNumber == 0) {
          return alert('请填写正确的手机号')
      }

      if($scope.form.QQ  == 0) {
          return alert('请填写正确的QQ号')
      }

      function isChinese(temp)
      {
          let re=/[^\u4e00-\u9fa5]/;
          if(re.test(temp)) return false;
          return true;
      }

      if(!isChinese($scope.form.username)) {
          return alert('请填写正确的中文姓名！');
      }

      $http({
          method: 'post',
          url: "/api/signUp",
          data: $scope.form
      }).then(function success(response) {
          if(response.data.isSuccess) {
              $('#input-id').fileinput('upload');
              alert(response.data.msg)
          }else{
              alert(response.data.msg)
          }

      }, function error(response) {
          alert(response.data.msg)
      });

      console.log($scope.form)
    }
});
