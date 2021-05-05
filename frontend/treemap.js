var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin


var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");


smiteDB.collection('test_Bubblechart').get().then( res =>{  
    console.log(res)
    var data = {
        "name": "Matchs",
        "children": [
          {
            "matchType": "Arena",
            "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.matchCount.integerValue),
            "children": [
              {
                "name": "Assassin",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Assassin.mapValue.fields.count.integerValue)
              },
              {
                "name": "Guardian",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Guardian.mapValue.fields.count.integerValue)
              },
              {
                "name": "Hunter",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Hunter.mapValue.fields.count.integerValue)
              },
              {
                "name": "Mage",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Mage.mapValue.fields.count.integerValue)
              },
              {
                "name": "Warrior",
                "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Arena.mapValue.fields.Roles.mapValue.fields.Warrior.mapValue.fields.count.integerValue)
              }
            ]
          },
          {
            "matchType": "Clash",
            "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.matchCount.integerValue),
            "children": [
                {
                  "name": "Assassin",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Assassin.mapValue.fields.count.integerValue)
                },
                {
                  "name": "Guardian",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Guardian.mapValue.fields.count.integerValue)
                },
                {
                  "name": "Hunter",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Hunter.mapValue.fields.count.integerValue)
                },
                {
                  "name": "Mage",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Mage.mapValue.fields.count.integerValue)
                },
                {
                  "name": "Warrior",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Clash.mapValue.fields.Roles.mapValue.fields.Warrior.mapValue.fields.count.integerValue)
                }
              ]
          },
          {
            "matchType": "Conquest",
            "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.matchCount.integerValue),
            "children": [
                {
                  "name": "Assassin",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Assassin.mapValue.fields.count.integerValue)
                },
                {
                  "name": "Guardian",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Guardian.mapValue.fields.count.integerValue)
                },
                {
                  "name": "Hunter",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Hunter.mapValue.fields.count.integerValue)
                },
                {
                  "name": "Mage",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Mage.mapValue.fields.count.integerValue)
                },
                {
                  "name": "Warrior",
                  "value": parseInt(res.docs[0]._delegate._document.data.partialValue.mapValue.fields.matchTypes.mapValue.fields.Conquest.mapValue.fields.Roles.mapValue.fields.Warrior.mapValue.fields.count.integerValue)
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
  
  nodes
    .append('rect')
    .attr('width', function(d) { return d.x1 - d.x0; })
    .attr('height', function(d) { return d.y1 - d.y0; })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("fill",  d=>colorScale(d.data.name))
    .style("opacity", "0.3");
  
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
