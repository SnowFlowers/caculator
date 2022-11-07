
export class CaculatorAstNode {

  public parent: CaculatorAstNode;

  children: CaculatorAstNode[];

  nodeType: Symbol

  nodeText: string

  constructor(nodeType, text) {
    this.nodeType = nodeType;
    this.nodeText = text;
    this.children = []
  }

  addChildren(child) {
    this.children.push(child);
    child.parent = this;
  }

  getChildren() {
    return this.children;
  }

  getType() {
    return this.nodeType
  }

  getText() {
    return this.nodeText
  }

}



