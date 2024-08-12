import MonacoEditor from 'react-monaco-editor';
import { useContext,useState,useEffect } from "react";
import SocketContext from '../Context/SocketContext';
const CodeEditor = () => {
  const context=useContext(SocketContext);
  const finalcode=context.collabcode;
  const permission=context.permission;
  const socket=context.socket;
  const roomid=context.room;
  const [code, setCode] = useState('');
  
  const editorDidMount = (editor, monaco) => {
    //console.log('editorDidMount', editor);
    if(!code){
      setCode(finalcode);
    }
    editor.focus();
  };

  const onChange = (newValue, e) => {
    //console.log('onChange', newValue, e);
    // if(context.permission)
    // {
    //console.log("typing");
    setCode(newValue);
    socket.emit("editorcode", {roomid,newValue,permission});
    context.setrealcode(newValue);
    // }
    // else{
    //   console.log("nottttttt");
    // }
      // setCode(newValue);
      // socket.emit("editorcode", {roomid,newValue});
      // context.setrealcode(newValue);
    //}
  };
  useEffect(() => {
    socket.on("receivedcode", (data) => {
      setCode(data);
      context.setrealcode(data);
    });
    // socket.on("getpermission",(data)=>{
    //     context.collabteam(data);
      
// });
  }, [socket]);
  const options = {
    selectOnLineNumbers: true
  };
  
  return (
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
  );
};

export default CodeEditor;