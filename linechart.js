// Load external libraries
const script1 = document.createElement("script");
script1.src = "https://cdn.jsdelivr.net/npm/vega@5";
document.head.appendChild(script1);

const script2 = document.createElement("script");
script2.src = "https://cdn.jsdelivr.net/npm/vega-lite@5";
document.head.appendChild(script2);

const script3 = document.createElement("script");
script3.src = "https://cdn.jsdelivr.net/npm/vega-embed@6";
document.head.appendChild(script3);

const script4 = document.createElement("script");
script4.src = "https://developers.google.com/datastudio/components/v1/dscc.min.js";
document.head.appendChild(script4);

// Wait until all scripts are loaded
Promise.all([
  new Promise(resolve => (script1.onload = resolve)),
  new Promise(resolve => (script2.onload = resolve)),
  new Promise(resolve => (script3.onload = resolve)),
  new Promise(resolve => (script4.onload = resolve))
]).then(() => {
  function drawViz(data) {
    const rows = data.tables.DEFAULT;
    const values = rows.map(row => ({
      date: row["date"],
      value: row["value"]
    }));

    const spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "data": { "values": values },
      "mark": { "type": "line", "point": true },
      "encoding": {
        "x": { "field": "date", "type": "temporal", "title": "Date" },
        "y": { "field": "value", "type": "quantitative", "title": "Value" }
      }
    };

    document.body.innerHTML = "";
    vegaEmbed(document.body, spec, { actions: false });
  }

  dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
});
