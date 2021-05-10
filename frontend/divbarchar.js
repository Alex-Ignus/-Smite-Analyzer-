
var data = {'all':[]};
smiteDB.collection('damage_test').orderBy('damage_total').get().then(res=>{
  var main = res._delegate.docs;
  for (i=0;i<main.length;i++){
    data.all[i] = {
      gods: res.docs[i]._delegate._document.data.partialValue.mapValue.fields.Name.stringValue,
      net_damage: parseInt(res.docs[i]._delegate._document.data.partialValue.mapValue.fields.damage_total.integerValue),
      damage_given: parseInt(res.docs[i]._delegate._document.data.partialValue.mapValue.fields.damage_given.integerValue),
      damage_taken: parseInt(res.docs[i]._delegate._document.data.partialValue.mapValue.fields.damage_taken.integerValue)
    }
  }
  makeChart()
})

var makeChart = ()=>{

var margin = { top: 40, right: 50, bottom: 60, left: 50 };
var width = 960 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var svg = d3.select("body svg svg")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  svg.append("text")             
        .attr("transform",
                "translate(" + (width/3) + " ," + 
                            (height + 150) + ")")
        .style("text-anchor", "middle")
        .text("Match Types");
        

        svg.append("text")
        .attr("y", height + (margin.bottom/2))
        .attr("x",width/2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Net Damange (Delt - Taken)");
        svg.append("text")
        .attr("y", -40)
        .attr("x",width/2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Damage Stat's of the Most Played God's in Smite");
var cfg = {
  labelMargin: 5,
  xAxisMargin: 10,
  legendRightMargin: 0
};

var x = d3.scaleLinear().range([0, width]);

var colour = d3.scaleQuantize().domain([-1,1]).range([d3.rgb("#FFC17A"), d3.rgb('#DE9FFF')]);

var y = d3.scaleBand().range([height, 0]).padding(0.1);


var dataSort = ((error) => {
  if (error) throw error;
  x.domain(d3.extent(data.all,(d)=>{return d.net_damage;}));
  y.domain(data.all.map((d)=>{return d.gods;}));

  var max = d3.max(data.all,(d)=>{return d.net_damage;});
  colour.domain([-max, max]);

  var xAxis = svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (height + cfg.xAxisMargin) + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

  var bars = svg.append("g").attr("class", "bars");
  bars.selectAll("rect")
    .data(data.all)
    .enter()
    .append("rect")
    .attr("class", "annual-growth")
    .on("mouseover", function(d) {
      div.transition().duration(200).style("opacity", .9);    
      div .html( 'Damage given: '+d.damage_given+' | '+'Damage taken: '+d.damage_taken +' | '+'Net Damage: '+d.net_damage)
          .style("left", (d3.event.pageX) + "px")   
          .style("top", (d3.event.pageY - 28) + "px");
    })          
    .on("mouseout", function(d) {
      div.transition()
         .duration(500)
         .style("opacity", 0);
    })
    .attr("x", function(d) {return x(Math.min(0, d.net_damage));})
    .attr("y", function(d) {return y(d.gods);})
    .attr("height", y.bandwidth())
    .attr("width", function(d) {return Math.abs(x(d.net_damage) - x(0));})
    .style("fill", function(d) {return colour(d.net_damage);});
  
  bars.on("mouseover", function(d) {
    bars.selectAll("rect").style("filter", "grayscale(100%)")
    d3.select(this).style("filter", "grayscale(0%)")
  })
  .on("mouseout", function(d) {
    bars.selectAll("rect").style("filter", "grayscale(0%)")
  })

  var yAxis = svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + x(0) + ",0)")
    .append("line")
    .attr("y1", 0)
    .attr("y2", height);
  
  var labels = svg.append("g").attr("class", "labels");
  labels.selectAll("text")
    .data(data.all)
    .enter()
    .append("text")
    .attr("class", "bar-label")
    .attr("x", x(0))
    .attr("y", function(d) {return y(d.gods);})
    .attr("dx", function(d) {return d.net_damage < 0 ? cfg.labelMargin : -cfg.labelMargin;})
    .attr("dy", y.bandwidth())
    .attr("text-anchor", function(d) {return d.net_damage < 0 ? "start" : "end";})
    .text(function(d) {return d.gods;})
     .on("mouseover", function(d) {
      div.transition().duration(200).style("opacity", .9);    
      div .html( 'Damage given: '+d.damage_given+' | '+'Damage taken: '+d.damage_taken +' | '+'Net Damage: '+d.net_damage)
          .style("left", (d3.event.pageX) + "px")   
          .style("top", (d3.event.pageY - 28) + "px");
    })          
    .on("mouseout", function(d) {
      div.transition()
         .duration(500)
         .style("opacity", 0);
    })
  })()
}