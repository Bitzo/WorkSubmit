/* eslint-disable */
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

    $scope.submit = function() {
      console.log('submit: ===========>');

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
          console.log(response.data);
          if(response.data.isSuccess) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('id', response.data.data.userInfo.id);
            localStorage.setItem('username', response.data.data.userInfo.username);

            alert('报名成功， 将为您自动登录，登陆后请提交作品文件。');
            location.href = './home?token=' +  response.data.data.token;
          }else{
            alert(response.data.msg)
          }

      }, function error(response) {
          alert(response.data.msg)
      });

      console.log($scope.form)
    }

    $scope.relocate_home = function(link) {
        $scope.form = {};
        location.href = link;
    };

    $scope.login = function() {
      console.log('Login: ===========>');
      $http({
          method: 'post',
          url: "/api/login",
          data: {
            username: $scope.form.username,
            password: $scope.form.password
          }
      }).then(function success(response) {
          if(response.data.isSuccess) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('id', response.data.data.userInfo.id);
            localStorage.setItem('username', response.data.data.userInfo.username);

            alert(response.data.msg);
            location.href = './home?token=' +response.data.data.token;
          }else{
              alert(response.data.msg)
          }
      }, function error(response) {
          alert(response.data.msg)
      });

      console.log($scope.form)
    };
});
