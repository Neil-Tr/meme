import { useState, useEffect } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "Me trying to be healthy",
    bottomText: "Also me ordering pizza at midnight",
    imageUrl: "https://i.imgflip.com/3eqjd8.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const newMemeUrl = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageUrl: newMemeUrl,
    }));
  }

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="Me trying to be healthy"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Also me ordering pizza at midnight"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
        <button onClick={getMemeImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
