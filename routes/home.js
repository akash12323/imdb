
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/',async (req,res)=>{

    const nowplaying_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`;
    const nowplaying_response =await axios.get(nowplaying_url);

    const trending_url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}`;
    const trending_response =await axios.get(trending_url);
    
    res.render('home',{popular:nowplaying_response.data.results, trending:trending_response.data.results})
})

router.get('/popular/all',async(req,res)=>{
    const nowplaying_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&page=${req.query.page}`;
    
    const nowplaying_response =await axios.get(nowplaying_url);

    const title = "Popular Movies";

    res.render('all',{res:nowplaying_response.data.results,title, page:req.query.page});
})

router.get('/trending/all',async(req,res)=>{
    const trending_url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}&page=${req.query.page}`;
    const trending_response =await axios.get(trending_url);

    const title = "Trending Movies & TV-Shows";
    const {page} = req.query;
    console.log(page);

    res.render('all',{res:trending_response.data.results,title,page});
})

router.get('/search',async(req,res)=>{
    const title = req.query.title;

    const search_url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${title}&page=1`
    const searchResponse = await axios.get(search_url);

    // console.log(searchResponse);

    res.render('search',{searchRes:searchResponse.data.results,title});
})




module.exports = router;