$(document).on('ready',function(){

	function max(data){
		return d3.max(data,function(d){
			return d.mark;
		});
	}

	var scales = {
		markScaleColor : function(data){
			return d3.scale.linear()
				.domain([0,max(data)])
				.range(["yellow","green"]);
		},
		
		markScaleLinear : function(data, range){
			return d3.scale.linear()
	    		.domain([0,max(data)])
				.range([0,range]);
		}

		/*widthScale : function(){
			return d3.scale.linear()
	    		.domain([0,svgSettings.width])
				.range([0,svgSettings.height]);
		}*/
	}

	makeBarChart(scales);
	makePieChart(scales);
});

