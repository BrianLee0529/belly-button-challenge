//locate the url link
url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"


// Build the metadata panel
function buildMetadata(sample) {
  d3.json(url).then((sample) => {

    d3.json(url).then(function (data){
        
    // get the metadata field
    const metadata = data.metadata

    // Filter the metadata for the object with the desired sample number
    const result=metadata.find(item=>item.id ===parseInt(sample));

    console.log(metadata)
    console.log(result)

    // Use d3 to select the panel with id of `#sample-metadata`
    const PANEL =d3.select(`#sample-metadata`);

    // Use `.html("") to clear any existing metadata
    PANEL.html("")

    // Inside a loop, you will need to use d3 to append new
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });    
    
        // tags for each key-value in the filtered metadata.

  });
}
console.log(buildMetadata(1510))
                    
// function to build both charts
function buildCharts(sample) {
  d3.json(url).then((data) => {

    // Get the samples field
    const samples = data.samples;


    // Filter the samples for the object with the desired sample number
    const result=samples.find(item=>item.id===sample);

    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = result.otu_ids;
    const otu_labels = result.otu_labels;
    const sample_values = result.sample_values;

    // Build a Bubble Chart
    const bubbleData= [{
      x:otu_ids,
      y:sample_values,
      text:otu_labels,
      mode:'markers',
      marker: {
        size:sample_values,
        color:otu_ids,
        colorscale:"Earth"
      }
    }];
    // Build a Bubble Chart Layout
    const bubbleLayout={
      title: "Bacteria Cultures Per Sample",
      hovermode:"closest",
      xaxis:{title:"OTU ID"},
      yaxix:{title:"Number of Bacteria"}
    };
      
      // Render the Bubble Chart
    Plotly.newPlot("bubble",bubbleData,bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    const yticks=otu_ids.slice(0,10).map(otuID=>`OTU ${otuID}`).reverse() //map the otu_ids to a list of strings for your yticks

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
      const barData =[{
      type:'bar',
      y:yticks,
      x:sample_values.slice(0,10).reverse(),
      text:otu_labels.slice(0,10).reverse(),
      orientation: 'h'
    }];

    const barLayout={
      title: "Top 10 Bacteria Cultures Found",
      xaxis:{title:'Number of Bacteria'},
      hovermode:"closest",
      margin:{t:30, l:150}
    };

    // Render the Bar Chart
    Plotly.newPlot("bar",barData,barLayout)
  });
}

// Function to run on page load
function init() {
  d3.json(url).then((data) => {

    // Get the names field
    const sampleNames=data.names; //returns an array of sample names
    sampleNames.forEach((name)=>{
      selector.append("option")
              .text(name)
              .property("value".name);
  }); 

    const firstSample=sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample)
  });
}
// Function for event listener
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample)
};
    // Use d3 to select the dropdown with id of `#selDataset`
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    // Get the first sample from the list
    // Build charts and metadata panel with the first sample
  });
}

  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
