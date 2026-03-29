import React, { useRef, useState } from 'react'
import  "./App.css"
import {Editor} from "@monaco-editor/react"
import {MonacoBinding} from "y-monaco"
import { useMemo } from 'react'
import * as Y from "yjs"
import {SocketIOProvider} from "y-socket.io"


const App = () => {

  const editorRef = useRef(null)
  const [username,setUsername] = useState("")


  const ydoc = useMemo(()=>new Y.Doc(),[])
  const yText = useMemo(()=>ydoc.getText("monaco"),[ydoc])

  const handleMount = (editor)=>{
    editorRef.current = editor

    const provider = new SocketIOProvider("http://localhost:3000", "monaco", ydoc,{
      autoConnect:true})
    const monacoBinding = new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness 
    )
  }

  const handleJoin= (e)=>{
    e.preventDefault()
    setUsername(e.target.username.value)
  }

  if(!username){
    return (
      <main className='h-screen w-full bg-gray-950 flex gap-4 p-4 items-center justify-center'>
        <form onSubmit={handleJoin} className='flex flex-col gap-4'>
          <input
          type="text"
          name="username"          
          placeholder='Enter your name'
          className='p-2 rounded-md bg-neutral-800 text-white'
        />
        <button
          type="submit"          
          className='p-2 rounded-md bg-amber-50 text-gray-950 font-bold'
        >
          Join
        </button>
        </form>
      </main>
    )
  }


  return (
    <main className='h-screen w-full bg-gray-950 flex gap-4 p-4'>
      <aside className='h-full w-1/4 bg-amber-50 rounded-md'>

      </aside>


      <section className='h-full w-3/4 bg-neutral-800 rounded-md overflow-hidden'>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          theme='vs-dark'
          onMount={handleMount}
        />
      </section>
    </main>
  )
}

export default App