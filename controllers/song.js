const { validateOrderBy } = require("../helpers/validate-query");
const Song = require("../models/dbModels/song");

const getSongs = async (req, res) => {
    try{
        const {limit, from, userId, orderBy} = req.query;
        const {field, by} = validateOrderBy(orderBy, ['title', 'createdAt']);

        let config = {
            order: [[field, by]],
            limit: Number(limit) || 10,
            offset: Number(from) || 0
        }

        if(userId){
            config = {
                where:{
                    user_id: userId
                },
                ...config
            }
        }

        const {count, rows} = await Song.findAndCountAll(config);
    
        return res.status(200).json({
            msg:'success',
            total: count,
            songs: rows
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

const getSong = async (req, res) => {
    try{
        const {id} = req.params;

        const song = await Song.findByPk(id);

        return res.status(200).json({
            msg:'success',
            song
        });

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

const updateSong = async (req, res) => {
    try{
        const {id} = req.params;
        const {title} = req.body;

        const song = await Song.findByPk(id);
        await song.update({title:title});

        return res.status(201).json({
            msg:'success',
            song
        });
        
    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

module.exports = {
    getSongs,
    updateSong,
    getSong
}