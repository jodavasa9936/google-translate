import "./App.css";
import { TextBox } from "./components/TextBox.jsx";
import { Arrows } from "./components/Arrows.jsx";
import { Button } from "./components/Button.jsx";
import { Modal } from "./components/Modal.jsx";
import { useState, useEffect } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [inputLanguage, setInputLanguage] = useState("");
  const [outputLanguage, setOutputLanguage] = useState("");
  const [languages, setLanguages] = useState([]);
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [code, setCode] = useState('');


  const getLanguages = () => {
    const url = "https://text-translator2.p.rapidapi.com/getLanguages";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "d20d8c4c59msh59102833d3f6944p1b6feajsne14f48412d9f",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((objeto) => {
        setLanguages(objeto.data.languages.map((item) => item.code));
        
      })
      .catch((error) => console.log(error));
  };
  console.log(languages)
 

  const translate = () => {
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "d20d8c4c59msh59102833d3f6944p1b6feajsne14f48412d9f",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      body: new URLSearchParams({
        source_language: inputLanguage,
        target_language: outputLanguage,
        text: textToTranslate,
      }),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((objeto) => {
        setTranslatedText(objeto.data.translatedText);
      })
      .catch((error) => console.log(error));
  };

  console.log('translated',translatedText);

  useEffect(() => {
    getLanguages();
  }, []);

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  };

  /* nos dice en consola si seleccionamos el input o el output */

  return (
    <div className="app">
      {!showModal && (
        /* este valor se prende cuando el otro se apaga y viceversa */
        <>
          <TextBox
            setShowModal={setShowModal}
            selectedLanguage={inputLanguage}
            style="input"
            setTextToTranslate={setTextToTranslate}
            textToTranslate={textToTranslate}
            setTranslatedText={setTranslatedText}
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>
          <TextBox
            setShowModal={setShowModal}
            selectedLanguage={outputLanguage}
            style="output"
            translatedText={translatedText}
          />

          <div className="button-container" onClick={translate}>
            <Button />
          </div>
        </>
      )}

      {showModal && (
        /*  showModal es falso y en SelectDropDown al
        setear showModal(style) se vuelve true */
        <Modal
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={showModal == "input" ? inputLanguage : outputLanguage}
          /* se encartga de mostrar el chulo */
          setChosenLanguage={
            showModal == "input" ? setInputLanguage : setOutputLanguage
            /*  este escoge la opcion */
          }
        />
      )}
    </div>
  );
}

export default App;
