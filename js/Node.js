export default class Node {
  constructor({ title, position, inputs, outputs }) {
    this.title = title;
    this.position = position;
    this.size = { width: 100, height: 100 };
    this.inputs = inputs;
    this.outputs = outputs;
    this.isDragging = false;
  }

  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
    );
    // draw black border
    ctx.strokeStyle = "#000";
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
    );
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    ctx.fillText(this.title, this.position.x + 10, this.position.y + 30);
  }

  consumeEvent(event, nodes) {
    switch (event.type) {
      case "mousedown":
        return this.mouseDownHandler(event.e, nodes);
      case "mouseup":
        return this.mouseUpHandler(event.e);
      case "mousemove":
        return this.mouseMoveHandler(event.e);
    }
  }

  mouseDownHandler(e, nodes) {
    this.isDragging = true;
    const [removed] = nodes.splice(nodes.indexOf(this), 1);
    nodes.push(removed);
    return true;
  }

  mouseUpHandler(e) {
    this.isDragging = false;
    return true;
  }

  mouseMoveHandler(e) {
    if (this.isDragging) {
      if (!this.isMouseOver(e)) {
        this.position.x = e.offsetX - this.size.width / 2;
        this.position.y = e.offsetY - this.size.height / 2;
      }
      this.position.x += e.movementX;
      this.position.y += e.movementY;
    }
    return true;
  }

  isMouseOver(e) {
    return (
      e.offsetX > this.position.x &&
      e.offsetX < this.position.x + this.size.width &&
      e.offsetY > this.position.y &&
      e.offsetY < this.position.y + this.size.height
    );
  }
}
