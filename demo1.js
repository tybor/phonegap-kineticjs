var demo1= function() {
	var stage = new Kinetic.Stage({
		container : "container",
		width : $(document).width() - 20,
		height : $(document).height() - 100,
		draggable : true
	});

	var flowerLayer = new Kinetic.Layer();
	var lineLayer = new Kinetic.Layer();
	var flower = new Kinetic.Group({
		x : stage.getWidth() / 2,
		y : stage.getHeight() / 2
	});

	// build stem
	var stem = new Kinetic.Line({
		strokeWidth : 10,
		stroke : "green",
		points : [{
			x : flower.getX(),
			y : flower.getY()
		}, {
			x : stage.getWidth() / 2,
			y : stage.getHeight() + 10
		}]
	});

	// build center
	var center = new Kinetic.Circle({
		x : 0,
		y : 0,
		radius : 20,
		fill : "yellow",
		stroke : "black",
		strokeWidth : 4
	});

	center.on("mousedown", function() {
		document.body.style.cursor = "pointer";
	});

	center.on("mouseover", function() {
		flower.setDraggable(true);
		this.setFill("orange");
		flowerLayer.draw();
	});

	center.on("mouseout", function() {
		flower.setDraggable(false);
		this.setFill("yellow");
		flowerLayer.draw();
	});
	// build petals
	var numPetals = 10;
	for (var n = 0; n < numPetals; n++) {
		// induce scope
		( function() {
				/*
				 * draw custom shape because KineticJS
				 * currently does not support tear drop
				 * geometries
				 */
				var petal = new Kinetic.Shape({
					drawFunc : function() {
						var context = this.getContext();
						context.globalAlpha = 0.8;
						context.beginPath();
						context.moveTo(-5, -20);
						context.bezierCurveTo(-40, -90, 40, -90, 5, -20);
						context.closePath();
						this.fill();
						this.stroke();
					},
					fill : "#00dddd",
					strokeWidth : 4,
					draggable : true,
					rotation : 2 * Math.PI * n / numPetals
				});

				petal.on("dragstart", function() {
					this.moveToTop();
					center.moveToTop();
				});

				petal.on("mouseover", function() {
					this.setFill("blue");
					flowerLayer.draw();
				});

				petal.on("mouseout", function() {
					this.setFill("#00dddd");
					flowerLayer.draw();
				});

				flower.add(petal);
			}());
	}

	stage.on("mouseup", function() {
		document.body.style.cursor = "default";
	});

	flower.on("dragmove", function() {
		stem.attrs.points[0] = this.getPosition();
		lineLayer.draw();
	});

	lineLayer.add(stem);
	flower.add(center);
	flowerLayer.add(flower);
	stage.add(lineLayer);
	stage.add(flowerLayer);

}
