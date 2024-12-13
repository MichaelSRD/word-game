'use client'
import React, { useEffect, useRef, useState } from "react";

const palabras = [
  "amor", "paz", "vida", "sueño", "esperanza",
  "alegría", "tristeza", "miedo", "rabia", "sorpresa",
  "sol", "luna", "estrella", "cielo", "mar",
  "montaña", "río", "bosque", "ciudad", "campo",
  "rojo", "verde", "azul", "amarillo", "negro",
  "blanco", "grande", "pequeño", "alto", "bajo",
  "rápido", "lento", "fuerte", "débil", "bueno",
  "malo", "nuevo", "viejo", "primero", "último",
  "casa", "coche", "libro", "árbol", "perro",
  "gato", "pájaro", "pez", "flor", "comida",
  "agua", "fuego", "tierra", "aire", "luz",
  "sombra", "calor", "frío", "día", "noche",
  "mañana", "tarde", "noche", "semana", "mes",
  "año", "hoy", "ayer", "mañana", "siempre",
  "nunca", "quizás", "sí", "no", "por qué",
  "cómo", "cuándo", "dónde", "quién", "qué",
  "pensar", "sentir", "ver", "oír", "hablar",
  "caminar", "correr", "saltar", "jugar", "trabajar",
  "estudiar", "leer", "escribir", "dibujar", "crear",
  "sonreír", "llorar", "reír", "besar", "abrazar",
  "amigo", "familia", "amor", "felicidad", "paz"
];

export default function Home() {

  const inputRef = useRef<(HTMLInputElement | null) [] >([]);
  const [valores, setValores] = useState<string[]>(['']);  
  const [silabasOrden, setSilabasOrden]= useState<string[]>([]);
  const [silabas, setSilabas]= useState<string[]>([]);
  const [ mistakes, setMistakes] = useState<string[]>([]);
  const [palabra, setPalabra] = useState('');

  useEffect(() => {
    palabraAleatoria();
  }, []);

  useEffect(()=>{
    if (palabra) {
      const separar = palabra.split('');
      const copiaOrdenada = [...separar];
  
      setSilabasOrden(copiaOrdenada);
      setValores(new Array(copiaOrdenada.length).fill(''));
      
      const desordenar = separar.sort(()=>Math.random() - 0.5);
      setSilabas(desordenar);
    }
    
    },[palabra]);

    useEffect(()=>{
      if(JSON.stringify(valores) === JSON.stringify(silabasOrden)){
        setValores(new Array(silabasOrden.length).fill(''));
        setMistakes([]);
        alert('Succes');
        palabraAleatoria();
      }
    },[valores, silabasOrden])
    
    useEffect(()=>{
      if (mistakes.length === 5) {
         setMistakes([]);
         resetInput()
         palabraAleatoria()
      }
    },[mistakes])

  const resetInput = ()=>{
    setMistakes([]);
    setValores(new Array(silabasOrden.length).fill(''));
  }
   
  const handleInputOnchange = (value: string, index: number )=>{

    if (value === silabasOrden[index]) {
      setValores(prevValores => {
        const newValores = [...prevValores];
        newValores[index] = value;

        return newValores;
    });
    if (inputRef.current) {
      inputRef.current[index + 1]?.focus()
    }
    }else{
      setValores(prevValores => {
        const newValores = [...prevValores];
        newValores[index] = '';
        return newValores;
    });
    setMistakes(prevValores => {
      const newError = [...prevValores, value];
      return newError;
  });
    }
   
  }
  const palabraAleatoria = ()=>{
    const indiceAleatorio = Math.floor(Math.random() * palabras.length);
    setPalabra(palabras[indiceAleatorio]);
  }
   
  return (
    <main className="  flex justify-center items-center m-auto w-full h-screen " >
      <section className="rounded-xl text-center bg-[#030616] w-max p-4 " >
        <p className="text-[#7429C6] text-2xl font-bold mb-5 ">Word Scramblle</p>
        <div className=" shadow-sombra tracking-[1rem] text-[2rem] text-[#97A3B6] font-semibold  rounded-lg bg-[rgb(74,85,103)] w-full p-4 flex justify-center " >
          
          {silabas.map((item,index)=>(
              <p key={index}>{item}</p>
          ))}
        </div >
        <div className="flex justify-center space-x-7 mt-6  ">
        <div className=" text-[#4A5567] flex  items-center  ">Tries({mistakes.length}/5): <span className=" text-[#F2F5F9] flex space-x-1 ml-2 ">
          {[...Array(5)].map((_,i)=>(
               <div key={i} className={` h-2 w-2 rounded-full   ${i < mistakes.length ? 'bg-[#7429C6]' : 'bg-[#97A3B6]'  }   `}></div>
          ))}
           
          </span></div>
          <p className=" text-[#4A5567] ">Mistakes: <span className=" text-[#F2F5F9] "> {mistakes.join(', ')}</span></p>
          
        </div>
        <section className={``} >
        <form  className="flex justify-center mt-11 gap-3" >
          {silabas.map((item,index)=>(
            
               <input key={index} ref={(el) =>{ inputRef.current[index] = el}}  onChange={(event)=>handleInputOnchange( event.target.value, index)} value={valores[index]} type="text" maxLength={1} className=" bg-[#030616]  rounded-md h-12 border-[#97A3B6] border text-center text-xl text-white font-bold w-12 focus-visible:border-[#672171] focus-visible:ring-2 focus-visible:ring-[#672171] focus:outline-none  " />
            
          ))}
          </form>
        </section>
        <section className=" mt-11 space-x-8 ">
          <button onClick={palabraAleatoria} className=" shadow-buttonshadow px-6 py-2 font-bold text-white rounded-lg bg-[#C951E7]  ">Random</button>
          <button className=" shadow-buttonshadow px-6 py-2 font-bold text-white rounded-lg bg-[#C951E7] " onClick={resetInput} >Reset</button>
        </section>
      </section>
    </main>
  );
}
