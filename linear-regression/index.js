require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");
const loadCSV = require("../load-csv");
const LinearRegression = require("./linear-regression");
const plot = require("node-remote-plot");

let { features, labels, testFeatures, testLabels } = loadCSV(
  "../data/cars.csv",
  {
    shuffle: true,
    splitTest: 50,
    dataColumns: ["horsepower", "weight", "displacement"],
    labelColumns: ["mpg"],
  }
);

const regression = new LinearRegression(features, labels, {
  learningRate: 0.1,
  iterations: 10,
  batchSize: 10,
});

regression.train();
// const r2 = regression.test(testFeatures, testLabels);

plot({
  x: regression.mseHistory.reverse(),
  xLabel: "Iteration #",
  yLabel: "MSE",
  title: "MSE vs. Iteration #",
});

// console.log("R2 is: ", r2);

// console.log(
//   "Updated M is: ",
//   regression.weights.get(1, 0),
//   ", Updated b is: ",
//   regression.weights.get(0, 0)
// );

regression.predict([[120, 2, 380]]).print();
