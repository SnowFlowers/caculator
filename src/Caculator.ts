import {CaculatorAstNode} from './CaculatorAstNode';
import {ASTNodeType, TokenType} from "./CommonConstants";
import {Lexer, Token, TokenReader} from "./CaculatorLexer";

export default class Caculator {

  public variables: Map<string, string> = new Map();

  public verbose: boolean = false;

  additive(tokens) {
    let child1 = this.multiplicative(tokens); // 应用 add 规则
    let node = child1;
    if (child1 != null) {
      while (true) {    // 循环应用 add'
        let token = tokens.peek();
        // console.log(token, '1111')
        if (token && (token.getType() === TokenType.Plus || token.getType() === TokenType.Minus)) {
          token = tokens.read();  // 读出加号
          let child2 = this.multiplicative(tokens);  // 计算下级节点
          if (child2 !== null) {
            node = new CaculatorAstNode(ASTNodeType.Additive, token.getText());
            node.addChildren(child1); // 注意，新节点在顶层，保证正确的结合性
            node.addChildren(child2);
            child1 = node;
          } else {
            throw new Error("invalid additive expression, expecting the right part.");
          }
        } else {
          break;
        }
      }
    }

    return node;
  }

  /**
   * 语法解析：乘法表达式 优化版本
   */
  multiplicative(tokens: TokenReader<Token> ) {
    let child1 = this.primary(tokens);
    let node = child1;

    while (true) {
      let token = tokens.peek();
      if (token != null && (token.getType() === TokenType.Star ||
        token.getType() === TokenType.Slash)) {
        token = tokens.read();
        let child2 = this.multiplicative(tokens);
        if (child2 !== null) {
          node = new CaculatorAstNode(ASTNodeType.Multiplicative, token.getText());
          node.addChildren(child1);
          node.addChildren(child2);
        } else {
          throw new Error(
            "invalid additive expression, expecting the right part."
          );
        }
      } else {
        break;
      }
    }
    return node;
  }

  /**
   * 语法解析：基础表达式
   */
  primary(tokens) {
    let node = null;
    let token = tokens.peek()
    if (token) {
      // 多个字符
      while (token) {
        if (token.getType() === TokenType.LetLiteral) {
          token = tokens.read();
          if(token && token.getType() === TokenType.LetLiteral) {
            if(node) {
              node.nodeText = node.nodeText + token.getText()
            } else {
              node = new CaculatorAstNode(ASTNodeType.LetLiteral, token.getText());
            }
          }
        } else if (token.getType() === TokenType.Identifier) {
          token = tokens.read();
          node = new CaculatorAstNode(ASTNodeType.Identifier, token.getText());
          break;
        } else if (token.getType() === TokenType.LeftParen) {
          let token1 = tokens.read();
          node = this.additive(tokens);
          // console.log(token1, node, 'primary')
          if (node !== null) {
            token = tokens.peek();
            if (token != null && token.getType() === TokenType.RightParen) {
              tokens.read();
            } else {
              throw new Error("expecting right parenthesis");
            }
          } else {
            throw new Error(
              "expecting an additive expression inside parenthesis"
            );
          }
          break;
        } else {
          tokens.unread();
          break;
        }
      }
    }

    return node;
  }

  /**
   * 执行脚本，并打印输出AST和求值过程。
   */
  evaluate(script) {
    try {
      const tree = this.parse(script);
      // console.log(tree, 'tree');
      this.dumpAST(tree, "");
      return this.evaluateAst(tree, "");
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 对某个AST节点求值，并打印求值过程。
   */
  evaluateAst(node, indent) {
    let result = 0;
    switch (node.getType()) {
      case ASTNodeType.Programm:
        for (let i = 0; i < node.getChildren().length; i++) {
          result = this.evaluateAst(node.getChildren()[i], indent + "\t");
        }
        break;
      case ASTNodeType.Additive:
        const child1 = node.getChildren()[0];
        let value1 = this.evaluateAst(child1, indent + "\t");
        const child2 = node.getChildren()[1];
        let value2 = this.evaluateAst(child2, indent + "\t");
        if (node.getText() === "+") {
          result = value1 + value2;
        } else {
          result = value1 - value2;
        }
        break;
      case ASTNodeType.Multiplicative:
        const child3 = node.getChildren()[0];
        let value3 = this.evaluateAst(child3, indent + "\t");
        const child4 = node.getChildren()[1];
        let value4 = this.evaluateAst(child4, indent + "\t");
        if (node.getText() === "*") {
          result = value3 * value4;
        } else {
          result = value3 / value4;
        }
        break;
      case ASTNodeType.LetLiteral:
        result = parseInt(node.getText());
        break;
      case ASTNodeType.Identifier:
        let varName = node.getText();
        if(this.variables.has(varName)){
          let value = this.variables.get(varName);
          if(value !== null){
            result = parseInt(value);
          } else {
            throw new Error('variable " + varName + " has not been set any value')
          }
        } else {
          throw new Error("unknown variable: " + varName)
        }
        break;
      default:
        break;
    }

    return result;
  }

  /**
   * 打印输出AST的树状结构
   * @param node
   * @param indent 缩进字符，由tab组成，每一级多一个tab
   */

  dumpAST(node, indent = "") {
    const children = node.children;
    for (let i = 0; i < children.length; i++) {
      this.dumpAST(children[i], indent + "\t");
    }
  }

  /**
   * 解析脚本，并返回根节点
   */
  parse(code) {
    const lexer = new Lexer();
    const tokens = lexer.tokenize(code);
    const rootNode = this.prog(tokens);
    return rootNode;
  }

  /**
   * 语法解析：根节点
   */
  prog(tokens) {
    const node = new CaculatorAstNode(ASTNodeType.Programm, "Calculator");
    const child = this.additive(tokens);
    if (child !== null) {
      node.addChildren(child);
    }
    return node;
  }
}
