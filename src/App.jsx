import { useState,useCallback ,useEffect,useRef} from 'react'  

function App() {
  const [len,setlen] = useState(7)
  const [numberAllowed,setnumberAllowed]=useState(false)  
  const [charAllowed,setCharAllowed]=useState(false)  
  const [password,setPassword]=useState("")  


  //useRef hook
  const passwordRef=useRef(null)

  const PasswordGenerator= useCallback( ()=> { // useCallback ka means cache ke andr rkh diya hai
      let pass=""
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  
      if(numberAllowed==true){ // agar number allowed  hai to str mai add kr do
        str+="0123456789"
      }
      if(charAllowed==true){
        str+="!@#$%^&*-_=+{}~`"
      }

      for (let i = 1; i <=len; i++) {
        let char=Math.floor(Math.random()*str.length+1) //yha pr array ki indexes value ayyi hai

        pass+=str.charAt(char)
      }
   setPassword(pass)

     },[len,numberAllowed,charAllowed]) 


     const  copyPasswordToClipboard=useCallback(()=>{ 
      passwordRef.current?.select() //when click on copy btn password select hota hai 
      passwordRef.current?.setSelectionRange(0,100 ) // yhe hota  hai ki  kitne digit select krne hai 
      window.navigator.clipboard.writeText(password)
      },[password])


     useEffect(()=>{
      PasswordGenerator()
     },[len,numberAllowed,charAllowed,PasswordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4  py-3 my-8 bg-gray-800 text-orange-500  '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
           />
            <button 
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
             type="range"
              min={5}
              max={100}
              value={len}
              className='cursor-pointer'
              onChange={(e)=>{setlen(e.target.value)}} //sliding event logic 
              />
              <label >Length:{len}</label>
          </div>
          <div className='flex items-centre gap-x-1'>
            <input
             type="checkbox"
             defaultChecked={numberAllowed}
             id='numberInput'
             onChange={()=>{
              setnumberAllowed((prev)=>!prev )
             }}
              />
              <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-centre gap-x-1'>
            <input
             type="checkbox"
             defaultChecked={charAllowed}
             id='characterInput'
             onChange={()=>{
              setCharAllowed((prev)=>!prev )
             }}
              />
              <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
