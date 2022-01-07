import { useState } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  const [url, setUrl] = useState(null);
  const [shortenedUrl, setShortenedUrl] = useState(null)
  const [duration, setDuration] = useState(3600000)
  const [redirect, setRedirect] = useState(null);

  const shortenUrl = () => {
    const reqBody = {
      "originalUrl": url,
      "requiredDuration": duration
    }

    fetch("http://localhost:8080/shorten", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(reqBody)
    }).then(res => res.json())
      .then(data => {
        const { shortenedUrl } = data;
        setShortenedUrl(shortenedUrl)
        setRedirect("http://localhost:8080/redirect?id=" + shortenedUrl.split(".com/")[1])
      }).catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <Header />
      <div>
        <input className='urlinput' type={"text"} onChange={(e) => setUrl(e.target.value)} placeholder='www.url.com' />
      </div>
      <div>
        <p>
          <a href={redirect} target={"_blank"} rel={"external"} className='shortenedurl'>
            {shortenedUrl}
          </a>
        </p>
      </div>
      <div>
        <select className='durationSelector' onChange={(e) => setDuration(e.target.value)}>
          <option value={3600000}>1 hour</option>
          <option value={86400000}>1 day</option>
        </select>
      </div>
      <div>
        <button className='shorten' onClick={shortenUrl}>
          Shorten
        </button>
      </div>
    </div>
  );
}

export default App;
