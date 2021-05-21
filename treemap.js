var svg = d3.select("svg").attr("class", "graph-svg-component"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin


var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");


smiteDB.collection('test_Bubblechart').get().then( res =>{  
    console.log(res)
    var data = {
        "name": "Matchs",
        "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.kcount.integerValue),
        "children": [
          {
            "matchType": "Arena",
            "matchCount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.matchCount.integerValue),
            "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.kcount.integerValue),
            "children": [
              {
                "name": "Assassin",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Assassin.mapValue.fields.count.integerValue),
                "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Assassin.mapValue.fields.kcount.integerValue)
              },
              {
                "name": "Guardian",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Guardian.mapValue.fields.count.integerValue),
                "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Guardian.mapValue.fields.kcount.integerValue)

              },
              {
                "name": "Hunter",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Hunter.mapValue.fields.count.integerValue),
                "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Hunter.mapValue.fields.kcount.integerValue)

              },
              {
                "name": "Mage",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Mage.mapValue.fields.count.integerValue),
                "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Mage.mapValue.fields.kcount.integerValue)

              },
              {
                "name": "Warrior",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Warrior.mapValue.fields.count.integerValue),
                "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Warrior.mapValue.fields.kcount.integerValue)

              }
            ]
          },
          {
            "matchType": "Clash",
            "matchCount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.matchCount.integerValue),
            "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.kcount.integerValue),
            "children": [
              {
                "name": "Assassin",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Assassin.mapValue.fields.count.integerValue),
                "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Assassin.mapValue.fields.kcount.integerValue)
              },
              {
                "name": "Guardian",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Guardian.mapValue.fields.count.integerValue),
                "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Guardian.mapValue.fields.kcount.integerValue)

              },
              {
                "name": "Hunter",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Hunter.mapValue.fields.count.integerValue),
                "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Hunter.mapValue.fields.kcount.integerValue)

              },
              {
                "name": "Mage",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Mage.mapValue.fields.count.integerValue),
                "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Mage.mapValue.fields.kcount.integerValue)

              },
              {
                "name": "Warrior",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Warrior.mapValue.fields.count.integerValue),
                "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Warrior.mapValue.fields.kcount.integerValue)

              }
            ]
          },
          {
            "matchType": "Conquest",
            "matchCount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.matchCount.integerValue),
            "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.kcount.integerValue),
            "children": [
                {
                  "name": "Assassin",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Assassin.mapValue.fields.count.integerValue),
                  "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Assassin.mapValue.fields.kcount.integerValue)
                },
                {
                  "name": "Guardian",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Guardian.mapValue.fields.count.integerValue),
                  "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Guardian.mapValue.fields.kcount.integerValue)

                },
                {
                  "name": "Hunter",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Hunter.mapValue.fields.count.integerValue),
                  "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Hunter.mapValue.fields.kcount.integerValue)

                },
                {
                  "name": "Mage",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Mage.mapValue.fields.count.integerValue),
                  "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Mage.mapValue.fields.kcount.integerValue)

                },
                {
                  "name": "Warrior",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Warrior.mapValue.fields.count.integerValue),
                  "Kcount": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Warrior.mapValue.fields.kcount.integerValue)

                }
              ]
          }
        ]
      };
      console.log(data);
    var treemapLayout = d3.treemap()
    .size([1000, 500])
    .paddingOuter(32);
  
  var rootNode = d3.hierarchy(data)
  
  rootNode.sum(function(d) {
    return d.value;
  });
  
  treemapLayout(rootNode);
  const categories = data.children.map(d=>d.name),      

  colors = ['#1C1832', '#9E999D', 'green', 'blue', 
              'orange', 'purple', 'red',],

  colorScale = d3.scaleOrdinal() // the scale function
                .domain(categories) // the data
                .range(colors);    // the way the data should be shown  
  var nodes = d3.select('svg g')
    .selectAll('g')
    .data(rootNode.descendants())
    .enter()
    .append('g')
    .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})
  
  var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);
  svg.append("text")
    .attr("y", 35)
    .attr("x",width/2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Roles Played Most often in (Arena, Clash, Conquest) Smite ");
  nodes
    .append('rect')
    .attr('width', function(d) { return d.x1 - d.x0; })
    .attr('height', function(d) { return d.y1 - d.y0; })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("fill",  d=>colorScale(d.data.name))
    .style("opacity", "0.3")
    .on("mouseover", function(d) {
      div.transition().duration(200).style("opacity", .9);    
      div .html( 'Player Kills:  ' + d.data.Kcount)
          .style("left", (d3.event.pageX) + "px")   
          .style("top", (d3.event.pageY) + "px");
    })      
    .on("mouseout", function(d) {
      div.transition()
         .duration(500)
         .style("opacity", 0);
    });
  
  nodes
    .append('text')
    .attr('dx', 4)
    .attr('dy', 14)
    .style("font-family", "Helvetica Neue", "Helvetica", "sans-serif")
    .style("fill", "black")
    .style("font-size", "10px")
    .text(function(d) {
      return d.data.matchType;
    })
nodes
    .append('text')
    .attr('dx', 4)
    .attr('dy', 14)
    .style("font-family", "Helvetica Neue", "Helvetica", "sans-serif")
    .style("fill", "white")
    .style("font-size", "10px")
    .text(function(d) {
      return d.data.name;
    })
  
});
