import Node from "./node.js";
import Scene from "./scene.js";

const canvas = document.getElementById("app");
const ctx = canvas.getContext("2d");

const nodeData = {
  title: "Node 1",
  position: {
    x: 10,
    y: 10,
  },
  inputs: [
    {
      name: "input 1",
      type: "number",
    },
    {
      name: "input 2",
      type: "string",
    },
  ],
  outputs: [
    {
      name: "output 1",
      type: "number",
    },
    {
      name: "output 2",
      type: "string",
    },
  ],
};

const nodeData2 = {
  title: "Node 2",
  position: {
    x: 210,
    y: 10,
  },
  inputs: [
    {
      name: "input 1",
      type: "number",
    },
    {
      name: "input 2",
      type: "string",
    },
  ],
  outputs: [
    {
      name: "output 1",
      type: "number",
    },
    {
      name: "output 2",
      type: "string",
    },
  ],
};

const nodeData3 = {
  title: "Node 3",
  position: {
    x: 410,
    y: 10,
  },
  inputs: [
    {
      name: "input 1",
      type: "number",
    },
    {
      name: "input 2",
      type: "string",
    },
  ],
  outputs: [
    {
      name: "output 1",
      type: "number",
    },
    {
      name: "output 2",
      type: "string",
    },
  ],
};

const scene = new Scene();
const node = new Node(nodeData);
const node2 = new Node(nodeData2);
const node3 = new Node(nodeData3);
scene.addNode(node);
scene.addNode(node2);
scene.addNode(node3);

canvas.addEventListener("mousedown", (e) => {
  scene.addEvent("mousedown", e);
});

canvas.addEventListener("mouseup", (e) => {
  scene.addEvent("mouseup", e);
});

canvas.addEventListener("mousemove", (e) => {
  scene.addEvent("mousemove", e);
});

const render = () => {
  if (
    canvas.width !== canvas.clientWidth ||
    canvas.height !== canvas.clientHeight
  ) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  scene.draw(ctx);
  scene.consumeEvents();

  requestAnimationFrame(render);
};

requestAnimationFrame(render);
