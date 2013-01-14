function formatPrint() {
	console.log("hide dropdown");
	document.getElementById("dropdown").style.display = "none";
	console.log("initiate print dialog");
	window.print();
	console.log("show dropdown");
	document.getElementById("dropdown").style.display = "block";
	dd.stop();
	dd.start(-1);
}

var dd;

function initDD() {
	dd = new DropDown();
	dd.element = document.getElementById("dropdown");	
	dd.element.style.top = dd.up +"em";
	dd.element.style.left = dd.left +"em";
//	dd.element.style.opacity = dd.opacity;
	dd.element.style.position = "fixed";
		
	dd.vIncrement = -(dd.up / dd.iterations);
	dd.hIncrement = -(dd.left / dd.iterations);
	dd.aIncrement = (1 - dd.alpha) / dd.iterations;
	dd.lIncrement = (100 - dd.light) / dd.iterations;
	
	$("div#dropdown").mouseenter(function() {
		dd.state = 1;
		dd.go();
	});
	$("div#dropdown").mouseleave(function() {
		dd.state = -1;
		dd.go();
	});
}

function DropDown() {
	this.opacity = 0.6;
	this.up = -2.55;
	this.down = 0;
	this.left = -2.7;
	this.right = 0;
	this.state = 0;
	this.iterations = 50;
	this.period = 5;
	this.timer = false;
	this.element;
	this.ramp = 0.990;
	
	this.hue = 45;
	this.sat = 81;
	this.light = 50;
	this.alpha = 0.5;
	this.currentAlpha = 0.5;
	this.currentLight = 50;
	
	this.startUp = function() { console.log("startup");
		this.state = 1;
		//this.go();console.log("start");
		this.timer = setInterval("dd.move()", this.period);
	}
	
	this.startDown = function() {
		this.state = -1;
		this.go();
	}
	
	this.go = function() { 
		if (!this.timer) {
			this.timer = setInterval("dd.move()", this.period);
		}
	};
	
	this.stop = function() {
		this.state = 0;
		clearInterval(this.timer);
		this.timer = false;
	}
	
	this.move = function() {

		var newTop = parseFloat(this.element.style.top) + (this.state * this.vIncrement);
		var newLeft = parseFloat(this.element.style.left) + (this.state * this.hIncrement);
		var newLight = parseFloat(this.element.style.opacity) - (this.state * this.aIncrement);
		var newAlpha = this.currentAlpha - (this.state * this.aIncrement);
				
console.log("move: "+newTop+" - "+this.state * this.vIncrement);
		if (newTop > this.down) {
			newTop = this.down;
			newLeft = this.right;
			newAlpha = 1;
			this.stop();
		}
		if (newTop < this.up) {
			newTop = this.up;
			newLeft = this.left;
			newAlpha = this.opacity;
			this.stop();
		}
		
		this.element.style.top = newTop + "em";
		this.element.style.left = newLeft + "em";
		//this.element.style.opacity = newAlpha;
		
		this.state *= this.ramp;
	}
}