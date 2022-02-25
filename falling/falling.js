// const line = svg
//   .append("line")
//   .attr("x1", "300")
//   .attr("y1", "300")
//   .attr("x2", "300")
//   .attr("y2", "300")
//   .attr("rx", "5")
//   .style("stroke", "white")
//   .style("stroke-width", "10")
//   .style("stroke-linecap", "round")
//   .attr('opacity',0)

// line
//   .append("animate")
//   .attr("attributeName", "x1")
//   .attr("values", "10;300;")
//   .attr("dur", "2s")
//   .attr("repeatCount", "indefinite");
// line
//   .append("animate")
//   .attr("attributeName", "y1")
//   .attr("values", "10;300;")
//   .attr("dur", "2s")
//   .attr("repeatCount", "indefinite");
// line
//   .append("animate")
//   .attr("attributeName", "x2")
//   .attr("values", "300;400;")
//   .attr("dur", "2s")
//   .attr("repeatCount", "indefinite");
// line
//   .append("animate")
//   .attr("attributeName", "y2")
//   .attr("values", "300;400;")
//   .attr("dur", "2s")
//   .attr("repeatCount", "indefinite");
// line
//   .append("animate")
//   .attr("attributeName", "opacity")
//   .attr("values", "1;0.5;0")
//   .attr("dur", "2s")
//   .attr("repeatCount", "indefinite");

const fallingStar = (config = {}) => {
  const defaultConfig = {
    select: "body",
    width: "100%",
    height: "100%",
    viewBox: "",
    scaleLinearDomain: [0, 300],
    scaleLinearRange: [-600, 3000],
    randomData: false,
    viewWidth: 1200,
    viewHeight: 1200,
    dataLength: 500,
    line: {
      x1: 5,
      y1: 5,
      rx: 10,
      fill: "white",
      storkeWidth: 8,
      dur: 10,
    },
    // angle: 315,
    distance: 2,
  };

  config = Object.assign(defaultConfig, config);
  _init(config);
};

const _init = (config = {}) => {
  const svg = d3.select(config.select).append("svg");
  const data = config.randomData ? makeRandomData(config) : makeData(config);
  svg
    .attr("viewBox", `0 0 ${config.viewWidth} ${config.viewHeight}`)
    .attr("width", config.width)
    .attr("height", config.height)
    .attr("id", "falling-star");

  draw(svg, data, config);
};

const draw = (svg, data = [], config = {}) => {


  const g = svg
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class", (d, i) => `falling-start-g-${i}`);
  const line = g
    .append("line")
    .attr("class", "falling-star-line")
    .attr("rx", (d) => d.line.rx)
    .attr("x1", (d) => d.line.x1)
    .attr("y1", (d) => d.line.y1)
    .attr("x2", (d) => d.line.x1)
    .attr("y2", (d) => d.line.y1)
    .style("stroke", "#e5e5f7")
    // .style("stroke", (d) => d.line.stroke)
    .style("stroke-width", (d) => d.line.storkeWidth)
    .style("stroke-linecap", "round")
    .attr("fill", "url(#falling-start-gradient)")
    // .attr("fill", config.line.fill)
    .attr("opacity", 1);

  line
    .append("animate")
    .attr("attributeName", "x1")
    .attr("values", (d) => `${d.line.x1};${d.line.end.x};${d.line.end.x};`)
    .attr("dur", (d) => `${d.line.dur}s`)
    .attr("repeatCount", "indefinite");
  line
    .append("animate")
    .attr("attributeName", "y1")
    .attr("values", (d) => `${d.line.y1};${d.line.end.y};${d.line.end.y};`)
    .attr("dur", (d) => `${d.line.dur}s`)
    .attr("repeatCount", "indefinite");
  line
    .append("animate")
    .attr("attributeName", "x2")
    .attr("values", (d) => `${d.line.x1};${d.line.end.x};`)
    .attr("dur", (d) => `${d.line.dur}s`)
    .attr("repeatCount", "indefinite");
  line
    .append("animate")
    .attr("attributeName", "y2")
    .attr("values", (d) => `${d.line.y1};${d.line.end.y};`)
    .attr("dur", (d) => `${d.line.dur}s`)
    .attr("repeatCount", "indefinite");
  line
    .append("animate")
    .attr("attributeName", "opacity")
    .attr(
      "values",
      (d) => `${d.line.opacity};${d.line.opacity / 2};${d.line.opacity / 4};0`
    )
    .attr("dur", (d) => `${d.line.dur}s`)
    .attr("repeatCount", "indefinite");
  return;
};

const ScaleLinear = (domain = [0, 300], range = [-600, 3000]) => {
  return d3.scaleLinear().domain(domain).range(range);
};

const makeRandomData = (config = {}) => {
    const angle = config.angle || Math.floor(Math.random() * 15 ) +315
    console.log(angle)
    const xScaler = ScaleLinear(
    [0, config.line.x1],
    [-1 * config.viewWidth, config.viewWidth + config.viewWidth * 2]
  );
  const yScaler = ScaleLinear(
    [0, config.line.y1],
    [-1 * config.viewHeight, config.viewHeight * 2]
  );

  const dataLength = config.dataLength || 10;
  const data = [];
  for (var i = 0; i < dataLength; i++) {
    const row = {};
    row.line = {};
    row.line.x1 = xScaler(Math.random(config.line.x1) * config.line.x1);
    row.line.y1 = yScaler(Math.random(config.line.y1) * config.line.y1);
    row.line.x2 = row.line.x1;
    row.line.y2 = row.line.y1;
    row.line.storkeWidth =
      Math.floor(Math.random() * config.line.storkeWidth) + 1;
    row.line.rx = row.line.storkeWidth / 2;
    row.line.stroke = "white";
    row.line.opacity = Math.floor(Math.random() * 10) + 0.5;
    row.line.dur =
      (Math.floor(Math.random() * config.line.dur) + config.line.dur / 10) + Math.random();
    const distance = xScaler(config.distance);
    row.line.end = endPoint(angle, distance, {
      x: row.line.x1,
      y: row.line.y1,
    });
    data.push(row);
  }
  return data;
};

const endPoint = (angle = 315, distance = 20, pos = { x: 0, y: 0 }) => {
  const result = { x: 0, y: 0 };
  const ang = (angle / 180) * Math.PI * -1;
  result.x = Math.cos(ang) * distance + pos.x;
  result.y = Math.sin(ang) * distance + pos.y;
  return result;
};

const makeData = (config = {}) => {
  const dataLength = config.dataLength || 10;
  const r = config.r || 20;
  const data = [];
  for (var i = 0; i < dataLength; i++) {
    const row = {};
    row.circle = {};
    row.circle.r = r;
    data.push(row);
  }

  return data;
};
fallingStar({
  select: "body",
  randomData: true,
});
