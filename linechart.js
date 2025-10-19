const dscc = require('ds-component');

function drawViz(data) {
  const rows = data.tables.DEFAULT;
  const values = rows.map(row => ({
    date: row["date"],
    value: row["value"]
  }));

  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { "values": values },
    "mark": "line",
    "encoding": {
      "x": { "field": "date", "type": "temporal", "title": "Date" },
      "y": { "field": "value", "type": "quantitative", "title": "Value" }
    }
  };

  vegaEmbed(document.body, spec, { actions: false });
}

dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
