
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/movie',async (req,res)=>{
    const popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`;
    const p_response = await axios.get(popular_url);

    const upcoming_url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`;
    const u_response = await axios.get(upcoming_url);

    const top_rated_url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`;
    const tr_response = await axios.get(top_rated_url);

    const now_playing_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`;
    const np_response = await axios.get(now_playing_url);

    res.render('movies',{p:p_response.data.results, up:u_response.data.results,tr:tr_response.data.results,np:np_response.data.results});
})


router.get('/movies/:id/details',async (req,res)=>{
    const {id} = req.params;

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`;
    const dr = await axios.get(url);

    const casturl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`;
    const cr = await axios.get(casturl);

    const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY}`;
    const tr = await axios.get(trailerUrl);

    res.render('details',{cast:cr.data.cast, title:dr.data.original_title, overview:dr.data.overview , rating:dr.data.popularity , image:dr.data.poster_path , genres:dr.data.genres, trailer:tr.data.results})
})

router.get('/movies/popular/all',async(req,res)=>{
    const popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`;
    const p_response = await axios.get(popular_url);

    const title = "Popular Movies";
    res.render('all',{res:p_response.data.results, title});
})
router.get('/movies/upcoming/all',async(req,res)=>{
    const popular_url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`;
    const p_response = await axios.get(popular_url);

    const title = "Upcoming Movies";
    res.render('all',{res:p_response.data.results, title});
})
router.get('/movies/top_rated/all',async(req,res)=>{
    const popular_url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`;
    const p_response = await axios.get(popular_url);

    const title = "Top-Rated Movies";
    res.render('all',{res:p_response.data.results, title});
})
router.get('/movies/now_playing/all',async(req,res)=>{
    const popular_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`;
    const p_response = await axios.get(popular_url);

    const title = "Now Playing Movies";
    res.render('all',{res:p_response.data.results, title});
})

module.exports = router;