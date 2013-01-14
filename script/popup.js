

	function popup() {
		
		var overlay = document.createElement("div");
		$(overlay).attr('id', "popup-overlay");
		$("#resume").append(overlay);
		
		var popup = document.createElement("div");
		$(popup).attr('id', "popup");
		$("#resume").append(popup);
		
		var popupClose = document.createElement("div");
		$(popupClose).addClass("popup close");
		$("#popup").append(popupClose);
		
		$(popupClose).click( function() {
			close();
		});
		
		$(overlay).click( function() {
			close();
		});
		
		function close() {
			$("#popup-overlay").remove();
			$("#popup").remove();
		}
	}
	
	