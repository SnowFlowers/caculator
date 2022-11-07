import {TokenType} from "./CommonConstants";

/**
 * 表达式节点类型
 */
export class Token {

  public type = null;

  public text = null;

  public getType() {
    return this.type
  }

  public getText() {
    return this.text;
  }
}


export class TokenReader<T> {

  tokens: T[]

  pos: number

  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }

  read() {
    if(this.pos < this.tokens.length) {
      return this.tokens[this.pos++]
    }
  }

  peek() {
    if(this.pos < this.tokens.length) {
      return this.tokens[this.pos]
    }
  }

  unread() {
    if(this.pos > 0) {
      this.pos--;
    }
  }

  setPosition(position) {
    if(position > 0 && position < this.tokens.length) {
      this.pos = position;
    }
  }

  getPosition() {
    return this.pos;
  }
}


export class Lexer {

  tokenText;
  tokens;
  token;

  constructor() {
    this.tokenText = null

  }

  // 是否是字母
  isAlpha(ch) {
    return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
  }
  // 是否是数字
  isDigit(ch) {
    return ch >= "0" && ch <= "9";
  }

  appendTokenText(ch) {
    this.tokenText = this.tokenText + ch;
  }

  initToken(ch) {
    if(this.tokenText.length > 0) {
      this.token.text = this.tokenText;
      if(this.token.type) {
        this.tokens.push(this.token);
      }
      this.tokenText = '';
      this.token = new Token();
    }

    // if(this.isAlpha(ch)) {
    //   this.to
    // }
    let state = DfaState.Initial;
    if(ch ==='+') {
      state =  DfaState.Plus
      this.token.type = TokenType.Plus;
    } else if(ch === '-') {
      state = DfaState.Minus
      this.token.type = TokenType.Minus;
    } else if(ch === '*') {
      state = DfaState.Star
      this.token.type = TokenType.Star;
    } else if(ch === '/') {
      state = DfaState.Slash
      this.token.type = TokenType.Slash;
    } else if (ch === "(") {
      state = DfaState.LeftParen;
      this.token.type = TokenType.LeftParen;
    } else if (ch === ")") {
      state = DfaState.RightParen;
      this.token.type = TokenType.RightParen;
    } else if (ch === "^") {
      state = DfaState.RightParen;
      // this.token.type = TokenType.RightParen;
    } else if (ch === "{") {
      state = DfaState.RightParen;
        // this.token.type = TokenType.RightParen;
    }else if (ch === "}") {
      state = DfaState.RightParen;
      // this.token.type = TokenType.RightParen;
    } else if(this.isDigit(ch)) {
      state = DfaState.LetLiteral;
      this.token.type = TokenType.LetLiteral;
    }
    this.appendTokenText(ch);
    return state;
  }

  getTokens(code) {
    return code.replace(/(.)(?=[^$])/g, "$1,").split(",")
  }

  tokenize(code) {
    this.tokens = [];
    const reader = new TokenReader<string>(this.getTokens(code))
    this.tokenText = '';
    this.token = new Token();
    let ch = '';
    let chI: string = '';
    let state = DfaState.Initial;

    try {
      while (chI = reader.read()) {
        ch = chI;
        switch (state) {
          case DfaState.Initial:
            state = this.initToken(ch);
            break;
          case DfaState.Plus:
          case DfaState.Star:
          case DfaState.Minus:
          case DfaState.Slash:
          case DfaState.LeftParen:
          case DfaState.LetLiteral:
          case DfaState.RightParen:
            state = this.initToken(ch);
            break;
          default:
            break
        }
      }
      // 把最后一个token送进去
      if (this.tokenText.length > 0) {
        this.initToken(ch)
      }
    } catch (err) {

    }
    return new TokenReader(this.tokens)
  }


}

// 定义各种状态机
const DfaState = {
  Initial: Symbol("Initial"),
  GT: Symbol("GT"),
  GE: Symbol("GE"),
  Plus: Symbol("Plus"),
  Minus: Symbol("Minus"),
  Star: Symbol("Star"),
  Slash: Symbol("Slash"),
  SemiColon: Symbol("SemiColon"),
  LeftParen: Symbol("LeftParen"),
  RightParen: Symbol("RightParen"),
  LetLiteral: Symbol("LetLiteral"),
};
