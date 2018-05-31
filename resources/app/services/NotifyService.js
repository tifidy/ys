var application = angular.module("application")
.factory("NotifyService", function($http,$q,RESOURCES, $rootScope, $state,$timeout)
{
	var Notify = {
		queue:[],
		timerContainer:[],
		timing:4000,
		_index:0,
		add:function(msgText)
		{
			var that = this;
			var message = {
				id:that._index,
				message:msgText,
				promise:null
			};
			that.queue.push(message);
			that._index++;

			$rootScope.$broadcast("notify:message");
			that.timeOutNotifications(message);
		},
		remove:function(id)
		{
			var that = this;
			var index = findWithAttr(this.queue, "id", id);
			that.queue.splice(index,1);
			//that.timeOutNotifications("removed");


		},
		/**
		 * Ekrana düşen notificationlar timeout tarafından silinme işlemini burada yapar
		 * 
		 */
		removeByTimeOut:function()
		{
			var that = this;
			angular.forEach(that.timerContainer, function(timeoutObject,k)
			{
				//message containerdan mesajı sil
				that.remove(timeoutObject.message_id);
				//promise collectionındaki $timeout promise'ini iptal et.
				$timeout.cancel(timeoutObject.promise);
				//promise objesini promise collectionından sil
				that.timerContainer.splice(k,1);
			});
		},
		/**
		 * Ekrana düşen notificationlar timeout'a eklenir
		 */
		timeOutNotifications:function(message)
		{
			var that = this;
			var timeoutObject = {
				message_id:message.id,
				promise:$timeout(function()
				{
					console.log("timeout çalıştı!")
					that.removeByTimeOut();
				},that.timing)
			};

			that.timerContainer.push(timeoutObject);
			
		}
	};

	return Notify;
});