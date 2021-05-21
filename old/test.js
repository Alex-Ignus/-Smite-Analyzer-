var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - 200,
    height = svg.attr("height") - 200


var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");
    var labels = d3.set();
    var lastNum;
    //https://www.w3schools.com/js/js_random.asp
    function getRndInteger(min, max) {
        var ranNum = Math.floor(Math.random() * (max - min) ) + min
        if(ranNum == 0 ||ranNum == lastNum  ){
            ranNum = getRndInteger(min, max) ;
        }
        
        lastNum = ranNum;
        return ranNum;
      }
var chartData = 
smiteDB.collection('test_Bubblechart').get().then( res =>{
    console.log(res)

    var data = [];
   
    res.docs.forEach(doc => { 
        console.log(doc.id)
        data.push(doc.data())
        matchTypes.push(doc.id)

    })
    console.log(data)
    console.log()

    // set the dimensions and margins of the graph
    var xScale = d3.scaleBand()
        .domain(data.map(d => console.log(d)))
        .range([0,width]).padding(0.4);
    var yScale = d3.scaleLinear()
        .domain([0,mxRelease])
        .range([height, 0]);
    var z = d3.scaleLinear()
        .domain([0,mxPlaytime])
        .range([ 1, 30]);
    var color = d3.scaleOrdinal()
        .domain(d => d.gameConsole)
        .range([ "blue", "red", "purple" , "green", "orange"])
   
})