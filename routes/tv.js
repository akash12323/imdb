
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/tv',async (req,res)=>{
    const popular_url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}`;
    const p_response = await axios.get(popular_url);

    const onair_url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.API_KEY}`;
    const onair_response = await axios.get(onair_url);

    const top_rated_url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}`;
    const tr_response = await axios.get(top_rated_url);

    const airing_url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.API_KEY}`;
    const at_response = await axios.get(airing_url);

    res.render('tvshows',{p:p_response.data.results, onair:onair_response.data.results,tr:tr_response.data.results,at:at_response.data.results});
})


router.get('/tv/:id/details',async (req,res)=>{
    const {id} = req.params;

    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}`;
    const dr = await axios.get(url);

    const casturl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.API_KEY}`;
    const cr = await axios.get(casturl);

    const trailerUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.API_KEY}`;
    const tr = await axios.get(trailerUrl);

    res.render('details',{cast:cr.data.cast, title:dr.data.name, overview:dr.data.overview , rating:dr.data.popularity , image:dr.data.poster_path , genres:dr.data.genres, trailer:tr.data.results})

})




router.get('/tv/popular/all',async(req,res)=>{
    const popular_url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}`;
    const p_response = await axios.get(popular_url);

    const title = "Popular TV-Shows"

    res.render('all',{res:p_response.data.results, title});
})
router.get('/tv/on_the_air/all',async(req,res)=>{
    const popular_url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.API_KEY}`;
    const p_response = await axios.get(popular_url);

    const title = "On-Air TV-Shows"

    res.render('all',{res:p_response.data.results, title});
})
router.get('/tv/top_rated/all',async(req,res)=>{
    const popular_url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}`;
    const p_response = await axios.get(popular_url);

    const title = "Top Rated TV-Shows"

    res.render('all',{res:p_response.data.results, title});
})
router.get('/tv/airing_today/all',async(req,res)=>{
    const popular_url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.API_KEY}`;
    const p_response = await axios.get(popular_url);

    const title = "Airing Today TV-Shows"

    res.render('all',{res:p_response.data.results, title});
})


module.exports = router;