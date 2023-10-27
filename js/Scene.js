export default class Scene {
  constructor() {
    this.nodes = [];
    this.events = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  addEvent(type, e) {
    this.events.push({ type, e });
  }

  draw(ctx) {
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.nodes.forEach((node) => {
      node.draw(ctx);
    });
  }

  consumeEvents() {
    this.events.forEach((event) => {
      for (let i = this.nodes.length - 1; i >= 0; i--) {
        const node = this.nodes[i];
        if (node.isMouseOver(event.e)) {
          const isConsumed = node.consumeEvent(event, this.nodes);
          if (isConsumed) {
            break;
          }
        } else if (node.isDragging) {
          const isConsumed = node.consumeEvent(event, this.nodes);
          if (isConsumed) {
            break;
          }
        }
      }
    });
    this.events = [];
  }
}
