// 定义token类型
export const TokenType = {
  Identifier: Symbol("Identifier"),
  LetLiteral: Symbol("LetLiteral"),
  GT: Symbol("GT"),
  Plus: Symbol("Plus"),
  Minus: Symbol("Minus"),
  Star: Symbol("Star"),
  Slash: Symbol("Slash"),
  SemiColon: Symbol("SemiColon"),
  LeftParen: Symbol("LeftParen"),
  RightParen: Symbol("RightParen"),
  Assignment: Symbol("Assignment"),
  Let: Symbol("Let"),
};

export const ASTNodeType = {
  Additive: Symbol("Additive"),
  Multiplicative: Symbol("Multiplicative"),
  Identifier: Symbol("Identifier"),
  Programm: Symbol("Programm"),
  LetLiteral: Symbol("LetLiteral"),
};

