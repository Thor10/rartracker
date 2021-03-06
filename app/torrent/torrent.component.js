(function(){
	'use strict';

	angular
		.module('app.shared')
		.component('torrent', {
			bindings: {
				torrent: '=',
				searchText: '@',
				viewingTorrent: '@'
			},
			templateUrl: '../app/torrent/torrent.component.template.html',
			controller: TorrentController, location,
			controllerAs: 'vm'
		});

	function TorrentController($scope, $location) {
        
          
              if ($location.path().indexOf('/torrent-comments') > -1 || $location.path().indexOf('/user/') > -1) {
              	this.showPre = 0;
              }  else {                
                     this.showPre = 1;
              }


		this.calcSpecialLeech = function () {
			var date1 = new Date(this.torrent.added.replace(/-/g, '/'));
			var date2 = new Date();
			var timeDiff = 86400000 - Math.abs(date2.getTime() - date1.getTime());
			timeDiff = timeDiff / 1000;
			var minutes = Math.floor(timeDiff / 60);
			var hours = Math.floor(minutes / 60);
			minutes -= hours * 60;

			if (hours > 0) {
				return hours + ' h';
			}

			if (minutes > 0) {
				return minutes + ' min';
			}

			return '< 1 min';
		};

		// See if torrent is on 24h special leech
		this.checkSpecialLeech = function () {
			if (this.torrent.section === 'new') {
				var date1 = new Date(this.torrent.added.replace(/-/g, '/'));
				var date2 = new Date();
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				if (timeDiff < 86400000) {
					this.specialLeech = this.calcSpecialLeech();
				}
			}
		};

		if (this.torrent) {
			this.checkSpecialLeech();
		} else {
			var unbindWatcher = $scope.$watch('vm.torrent', (torrent) => {
				if (torrent) {
					this.checkSpecialLeech();
					unbindWatcher();
				}
			});
		}

	}

})();
