export default class Node {
  constructor({ title, position, inputs, outputs }) {
    this.title = title;
    this.position = position;
    this.inputs = inputs;
    this.outputs = outputs;
    this.isDragging = false;
    this.isHover = -1;
    this.elementSize = 80;
    this.elementMargin = 10;
    this.elementStart = 50;
    this.elementPadding = 25;
    this.elementCheckboxSize = 10;
    this.size = {
      width: 200,
      height:
        this.elementStart +
        Math.max(inputs.length, outputs.length) * this.elementPadding,
    };
  }

  getInputBox(index) {
    return {
      x: this.position.x + this.elementMargin - this.elementMargin / 2,
      y:
        this.position.y +
        this.elementStart +
        index * this.elementPadding -
        this.elementMargin / 2,
      width: this.elementSize,
      height: 20,
    };
  }

  getOutputBox(index) {
    return {
      x:
        this.position.x +
        this.size.width -
        this.elementMargin * 2 -
        this.elementSize +
        this.elementCheckboxSize +
        this.elementMargin / 2,
      y:
        this.position.y +
        this.elementStart +
        index * this.elementPadding -
        this.elementMargin / 2,
      width: this.elementSize,
      height: 20,
    };
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
    if (this.isHover === 0) {
      ctx.strokeStyle = "#f00";
    } else {
      ctx.strokeStyle = "#000";
    }
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
    );
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    ctx.fillText(this.title, this.position.x + 10, this.position.y + 30);

    // draw inputs
    this.inputs.forEach((input, index) => {
      const x = this.position.x + this.elementMargin;
      const y =
        this.position.y + this.elementStart + index * this.elementPadding;

      if (this.isHover === index + 1) {
        ctx.strokeStyle = "#f00";
      } else {
        ctx.strokeStyle = "#000";
      }
      const boxSize = this.getInputBox(index);
      ctx.strokeRect(boxSize.x, boxSize.y, boxSize.width, boxSize.height);

      ctx.fillStyle = "#fff";
      ctx.fillRect(x, y, this.elementCheckboxSize, this.elementCheckboxSize);
      ctx.strokeStyle = "#000";
      ctx.strokeRect(x, y, this.elementCheckboxSize, this.elementCheckboxSize);
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.fillText(input.name, x + 20, y + 10);
    });

    // draw outputs
    this.outputs.forEach((output, index) => {
      const x = this.position.x + this.size.width - this.elementMargin * 2;
      const y =
        this.position.y + this.elementStart + index * this.elementPadding;

      if (this.isHover === index + this.inputs.length + 1) {
        ctx.strokeStyle = "#f00";
      } else {
        ctx.strokeStyle = "#000";
      }
      const boxSize = this.getOutputBox(index);
      ctx.strokeRect(boxSize.x, boxSize.y, boxSize.width, boxSize.height);

      ctx.fillStyle = "#fff";
      ctx.fillRect(x, y, this.elementCheckboxSize, this.elementCheckboxSize);
      ctx.strokeStyle = "#000";
      ctx.strokeRect(x, y, this.elementCheckboxSize, this.elementCheckboxSize);
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.fillText(output.name, x - 50, y + 10);
    });
  }

  consumeEvent(event, nodes) {
    // console.log(this.title, event.type);
    switch (event.type) {
      case "mousedown":
        return this.mouseDownHandler(event.e, nodes);
      case "mouseup":
        return this.mouseUpHandler(event.e);
      case "mousemove":
        return this.mouseMoveHandler(event.e);
      case "mouseleave":
        return this.mouseLeaveHandler(event.e);
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
    const isOverElement = this.isMouseOverElement(e);
    if (isOverElement !== -1) {
      this.isHover = isOverElement;
    } else {
      this.isHover = 0;
    }
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

  mouseLeaveHandler(e) {
    this.isHover = -1;
    return true;
  }

  isMouseOverInput(e) {
    return this.inputs.findIndex((input, index) => {
      const boxSize = this.getInputBox(index);
      return (
        e.offsetX > boxSize.x &&
        e.offsetX < boxSize.x + boxSize.width &&
        e.offsetY > boxSize.y &&
        e.offsetY < boxSize.y + boxSize.height
      );
    });
  }

  isMouseOverOutput(e) {
    return this.outputs.findIndex((output, index) => {
      const boxSize = this.getOutputBox(index);
      return (
        e.offsetX > boxSize.x &&
        e.offsetX < boxSize.x + boxSize.width &&
        e.offsetY > boxSize.y &&
        e.offsetY < boxSize.y + boxSize.height
      );
    });
  }

  isMouseOverElement(e) {
    const inputOver = this.isMouseOverInput(e);
    const outputOver = this.isMouseOverOutput(e);
    if (inputOver !== -1) {
      return inputOver + 1;
    }
    if (outputOver !== -1) {
      return outputOver + this.inputs.length + 1;
    }
    return -1;
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
