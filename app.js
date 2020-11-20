const dataSet = "samples.json";

// Fetch the JSON data and console log it
d3.json(dataSet).then(function(data) {
  console.log(data);
});

// Initializes the page with a default plot
function init() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        d3.json(dataSet).then(function(data) {
            var NamesdropDown = data.names;
            // Use forEach to call a function on each element
            NamesdropDown.forEach(function(id) {
                dropdownMenu.append("option").text(id).property("value",id);
  });
});
Visuals("940");
Metadata("940");
};



// Initializes the page with a default plot
function Visuals(sally) {

    // Fetch the JSON data 
    d3.json(dataSet).then(function(data) {
        var samples = data.samples
        var sample_values = samples.filter(bob => bob.id == sally)[0].sample_values; 
        var otu_ids = samples.filter(bob => bob.id == sally)[0].otu_ids;
        var otu_labels = samples.filter(bob => bob.id == sally)[0].otu_labels;

        // Create the Trace
        var traceBar = {
            x: sample_values.slice(0, 10),
            y: otu_ids.slice(0, 10).map(d => "otu_id "+d),
            type: "bar",
            text: otu_labels, 
            orientation: "h"
        };
        
        // Create the data array for the plot
        var dataBar = [traceBar];
        
                // create layout
                var layout = {
                    yaxis:{
                        tickmode:"linear",
                    }
                };
        
        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", dataBar, layout);

        // bubble
        // create the traces
        var traceBubble = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            },
            text: otu_labels

        };

        // set the layout
        var layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1300
        };

        // create the data array
        var dataBubble = [traceBubble];

        // create the plot
        Plotly.newPlot("bubble", dataBubble, layout); 

        // pie
        // create the trace
        var tracePie = {
            labels: otu_labels.slice(0, 10),
            values: sample_values.slice(0, 10),
            type:"pie",
            hovertext: otu_labels.slice(0, 10),
            hoverinfo: "hovertext"
        }

        //create the data array
        var dataPie = [tracePie]

        // creat the plot
        Plotly.newPlot("gauge", dataPie, layout); 

    });    
}

// create the function
function Metadata(id) {
    //Fetch the JSON data and console log
    d3.json(dataSet).then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() == id)[0];
       
        // Select the input element and get the raw HTML node
        var demographicInfo = d3.select("#sample-metadata");
        
        demographicInfo.html("");

        Object.entries(result).forEach((susan) => {   
                demographicInfo.append("h5").text(susan[0] + ": " + susan[1] + "\n");    
        });
    });
}

function optionChanged(newData) {
  Visuals(newData);
  Metadata(newData);
}

init();