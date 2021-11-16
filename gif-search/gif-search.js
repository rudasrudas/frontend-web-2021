const searchBox = document.querySelector(".search-box");
const button = document.querySelector(".submit-search");
const gifBox = document.querySelector(".search-results");

button.addEventListener("click", () => {
    const fetchString = "https://api.giphy.com/v1/gifs/search?api_key=eckR9DB3wvPZEYyBgD2O3fxoWerNkogZ&limit=20&q=" + searchBox.value;
    fetch(fetchString).then((results) => {
        results.json().then(result => {
            //Remove existing gifs
            while (gifBox.firstChild) {
                gifBox.removeChild(gifBox.firstChild);
            }
            //Add new gifs
            result.data.forEach((gif) => {
                console.log(gif);
                let img = document.createElement('img');
                img.src = gif.images.fixed_height.url;
                gifBox.append(img);
            })
        });
    });
})