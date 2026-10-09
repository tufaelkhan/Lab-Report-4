console.log("Connected!");

fetch("http://localhost:3000/movie")
.then(res=>res.json())
.then(data=>{
    const movieDiv = document.getElementById("movie-div");
    data.forEach(movie => {
        movieDiv.innerHTML+=`
        <h2>${movie.Movie_Name}</h2>
        <p>Genre: ${movie.Genre}</p>
        <p>IMDb_Rating: ${movie.IMDb_Rating}</p>
        <hr/>
    `   
    });
    console.log(data)
})