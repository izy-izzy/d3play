function makePieChart(scales){

	var scales = scales;

	var margin = 20;

	var svgSettings = {
		width: $(".elementForPieChart").width() - margin*2,
		height: $(".elementForPieChart").height() - margin*2
	};

	svgSettings.minDimension = Math.min(svgSettings.width, svgSettings.height);

	var pieSettings = {
		radius : svgSettings.height/2,
		angle : 0.02
	}

  	var svg = d3.select(".elementForPieChart")
		.append("svg")
		.attr("width", svgSettings.width + margin*2)
		.attr("height", svgSettings.height + margin*2)
		.append("g")
		.attr("transform", "translate(" + ((svgSettings.width / 2)+margin) + "," + ((svgSettings.height / 2)+margin )+ ")");

	var pie = d3.layout.pie().value(function(d){
			return d.mark
		})
		.sort(null)
    	.padAngle(.02);

    var arc = d3.svg.arc()
    	.innerRadius(pieSettings.radius - 40)
    	.outerRadius(pieSettings.radius)
    	.cornerRadius(svgSettings.minDimension/20);

	function update(data){
		var paths = svg.selectAll("path")
			.data(pie(data));

		paths.enter()
			.append("path");
		
    	paths.transition()
    		.duration(500)
  			.attr("d", arc)
  			.attr("fill", function(d,i){
  				console.log(d.data.mark);
				return scales.markScaleColor(data)(d.data.mark);
			});
    	paths.exit().remove();
	};

	update(workData);

	$(".elementForPieChart button").on("click",function(){
		update(workData2);
	})
} 