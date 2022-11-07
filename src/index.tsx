import React, {useState} from "react";
import ReactDOM from "react-dom";
import {Input, Button} from "antd";

import {Lexer} from "./CaculatorLexer";
import {CaculatorAstNode} from "./CaculatorAstNode";
import {ASTNodeType} from "./CommonConstants";

import Caculator from "./Caculator";


function A() {
  const [state, setState] = useState('');
  const [result, setResult] = useState(0);

  function cal() {
    setResult(0);
    console.log('开始计算' + state + "的值");
    const cal = new Caculator();
    let result =  cal.evaluate(state);
    setResult(result);
  }

  return <div style={{width: '500px', margin: '20px auto'}}>
    <div>
      <Input type="text" value={state} onChange={(e) => {
        setState(e.target.value);
      }}/>
    </div>
    <div style={{marginTop: '20px'}}>
      结果： {result}
    </div>
    <div style={{marginTop: '20px'}}>
      <Button type={'primary'} onClick={cal}>计算</Button>
    </div>
  </div>
}


ReactDOM.render(<A></A>, document.getElementById('App'))
