import { SelectDropDown } from "./SelectDropDown.jsx";

export function TextBox({
  setShowModal,
  selectedLanguage,
  style,
  setTextToTranslate,
  textToTranslate,
  translatedText,
  setTranslatedText
}) {

  const handleClick = () => {
    setTranslatedText('');
    setTextToTranslate('')
  }

  return (
    <div className={style}>
      <SelectDropDown
        style={style}
        setShowModal={setShowModal}
        selectedLanguage={selectedLanguage}
      />
      <textarea
        placeholder={style == "input" ? "Enter text" : "Translation"}
        /*aqui tenemos input u output, como el estilo es igual a la 
      
      entrada en cadena(input) entonces... */
        disabled={style == "output "}
        onChange={(e) => setTextToTranslate(e.target.value)}
        value={style == 'input' ? textToTranslate : translatedText }
      />
      {style == 'input' && (
        <div className="delete" onClick={handleClick}>X</div>
      )}
    </div>
  );
}
