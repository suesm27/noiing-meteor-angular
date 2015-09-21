Chats = new Mongo.Collection('chats');
Chatrooms = new Mongo.Collection('chatrooms');

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
    // This code only runs on the client
  angular.module('noiing',['angular-meteor']);
 
  angular.module('noiing').controller('ChatsListCtrl', ['$scope', '$meteor',
    function ($scope, $meteor) {
 
      $scope.chats = $meteor.collection(Chats);
      $scope.chatrooms = $meteor.collection(Chatrooms);
      $scope.errors = [];
      $scope.errorFlag = false;
 
      $scope.addChat = function (newChat) {
        $scope.errors = [];
        $scope.errorFlag = false;
        if(newChat == ''){
          $scope.errors.push({msg: "Cannot send empty message!"});
          $scope.errorFlag = true;
        }
        else{
          $scope.chats.push( {
            text: newChat,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username }
          );          
        }
      };

      $scope.addChatroom = function (newChatroom) {
        $scope.chatrooms.push( {
          name: newChatroom,
          createdAt: new Date() }
        );
      };

    }]);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
