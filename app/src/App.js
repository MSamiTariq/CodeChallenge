import './App.css';
import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')  
  const [cep, setCep] = useState({})
  
  const handleButton = async (e) => {
    e.preventDefault()

    if(input === '') {
      alert('This field cannot be empty.')
      return
    }

    try{
      fetch(`https://rest.bandsintown.com/artists/${input}?app_id=abc`)
      .then((response) => response.json())
      .then((actualData) => {
        setCep(actualData)
        console.log(actualData)});

      // const response = await api.get(`${input}/json`)
      // setCep(response.data)
      setInput('')

    }catch(error) {
      alert(`Invalid Input!`)
      setInput('')
      return
    }
    
  }

  return (
    <div className="container">
        <h1 className='title'>Buscador CEP</h1>
        <form className='form'>
          <input 
          type="text" name="cep" id="cep" placeholder='Digite seu cep...' autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
          <button 
          className='button-search'
          onClick={handleButton}>
            Submit
          </button>
        </form>

        { Object.keys(cep).length > 0 && (
          <main className="main">
          <h2>Name: {cep.name}</h2>
          <span>ID: {cep.id}</span>
          <span>Facebook URL: {cep.facebook_page_url}</span>
          {/* <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span> */}
          <img src={cep.image_url}></img>
          </main>
        )}
    </div>
  );
}

export default App;