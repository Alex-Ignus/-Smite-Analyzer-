var svg = d3.select("svg").attr("class", "graph-svg-component"), //https://stackoverflow.com/questions/20142951/how-to-set-the-background-color-of-a-d3-js-svg/20143158
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin


var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");
   
smiteDB.collection('Pantheon_counter').get().then( res =>{

    var data = []; 
    res.docs.forEach(doc => { 
        data.push(doc.data())
    })
    console.log(data);
    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;
    var xScale =  d3.scaleLinear().range ([0, width]),
    yScale = d3.scaleBand().range ([0, height]).padding(0.4);

    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");
    var div = d3.select("body").append("div") 
        .attr("class", "tooltip")       
        .style("opacity", 0);
    xScale.domain([0, d3.max(data, function(d) { return d.matchCount; })]);
    yScale.domain(data.map(function(d) { return d.Pantheon; }));
    svg.append("text")             
    .attr("transform",
            "translate(" + (width - 250) + " ," + 
                        (height + 150) + ")")
    .style("text-anchor", "middle")
    .text("Number Of Match's Played");
    
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 35)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Pantheons Of Smite");      
    svg.append("text")
    .attr("y", 35)
    .attr("x",width/2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Pantheons I've Played (With/Agaisnt) Most Often");
        g.append("g")
        .attr("transform", "translate(50," + height + ")")
        .call(d3.axisBottom(xScale));

        g.append("g")
        .attr("transform", "translate(50," + 0 + ")")
        .call(d3.axisLeft(yScale).tickFormat(function(d){
            return  d;
        }).ticks(10))
        .append("text")
        .style("font", "21px times")
        .attr("y", 0)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value");
        g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", function(d) { return yScale(d.Pantheon); })
        .attr("height", yScale.bandwidth())
        .attr("width", function(d) { return xScale(d.matchCount); })
        .attr("transform", "translate(50," + 0 + ")")
        .on("mouseover", function(d) {    
            div.transition().duration(200).style("opacity", .9);    
            div .html('Number of gods in ' + d.Pantheon +": " +   d.totalGods +' | Most Played God: '+d.topGod)
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");})          
        .on("mouseout", function(d) {div.transition().duration(500).style("opacity", 0);})
       


        
})