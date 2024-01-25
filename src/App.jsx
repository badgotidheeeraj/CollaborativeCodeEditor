import { useState, useRef } from 'react'
import Editor from "@monaco-editor/react"
import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc"
import { MonacoBinding } from "y-monaco"
import SLS from './Component/SLS'


function App() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    // Initialize YJS
    const doc = new Y.Doc(); 
    const provider = new WebrtcProvider("test-room", doc); // room1, room2
    const type = doc.getText("monaco"); // doc { "monaco": "what our IDE is showing" }
    // Bind YJS to Monaco 
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
    console.log(provider.awareness);                
  }

  return (
    <>
    <SLS onMount={handleEditorDidMount} />
    {/* <Editor
      height="100vh"
      width="100vw"
      theme="light"
      onMount={handleEditorDidMount}
      /> */}
      </>
  )
}

export default App
