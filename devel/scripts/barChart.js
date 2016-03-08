function makeBarChart(scales){

	var scales = scales;

  	var margin = 20;

	var svgSettings = {
		width: $(".elementForBarGraph").width() - margin*2,
		height: $(".elementForBarGraph").height() - margin*2
	};

  	var svg = d3.select(".elementForBarGraph")
		.append("svg")
		.attr("width", svgSettings.width + margin*2)
		.attr("height", svgSettings.height + margin*2);

	var g = svg.append("g");

	function update(data){

		function barWidth(){
			return (svgSettings.width - ((data.length-1) * margin)) / data.length;
		};

		var rectangles = g.selectAll("rect")
			.data(data, function(d,i){
				return d.name;
			});

		// OLD elments
		//rectangles.attr("fill","#548746");

		// NEW elements
		rectangles.enter()
			.append("rect")
				.attr("class", "bar");


		// ALL elements after binding
		rectangles
			.transition()
			.duration(500)
			.attr("height",function(d,i){
				return scales.markScaleLinear(data,svgSettings.height)(d.mark);
			})
			.attr("width", function(d,i){
				return barWidth();
			})
			.attr("x", function(d,i){
				return margin + i*(barWidth()+margin);
			})
			.attr("y", function(d,i){
				return svgSettings.height - scales.markScaleLinear(data,svgSettings.height)(d.mark);
			})
			.attr("fill", function(d,i){
				return scales.markScaleColor(data)(d.mark);
			});

		// non BINDABLE elements
	    rectangles
	    	.exit()
	    	.transition()
	    	.attr("height", 0)
	    	.remove();
	};

	update(workData);

	$(".elementForBarGraph button").on("click",function(){
		update(workData2);
	})
} 
