import React from "react";
import MonacoEditor from 'react-monaco-editor';
import {useState,useContext} from "react";
import SocketContext from '../Context/SocketContext';

const SelfEditor=()=>{
    
    const [code, setCode] = useState('');
    const context=useContext(SocketContext);
    const finalcode=context.selfcode;
    const editorDidMount = (editor, monaco) => {
        //console.log('editorDidMount', editor);
        if(!code && setCode(finalcode))
        editor.focus();
      };
    
    const onChange = (newValue, e) => {
        //console.log('onChange', newValue, e);
        setCode(newValue);
        
        context.setoffcode(newValue);
      };
      const options = {
        selectOnLineNumbers: true
      };
    return(
    <MonacoEditor
      width="100%"
      height="70%"
      language="javascript"
      theme="vs-dark"
      value={code}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
      />
    )
}

export default SelfEditor;