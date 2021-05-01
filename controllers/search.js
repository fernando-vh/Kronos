const { Sequelize } = require("../db/connection");
const Song = require("../models/dbModels/song");
const User = require("../models/dbModels/user");
const types = require("../models/types/types");

const Op = Sequelize.Op;

const searchElements = async (req, res) => {
    try{
        const {component, searchTerm} = req.params;
        const {limit, from} = req.query;
        let result;

        switch(component){
            case types.SEARCH_COMPONENTS.USERS:
                result = await searchUsers(searchTerm, Number(limit) || 10, Number(from) || 0);
                break;
            
            case types.SEARCH_COMPONENTS.SONGS:
                result = await searchSongs(searchTerm, Number(limit) || 10, Number(from) || 0);
                break;
            
            default:
                result = {count:0, rows:[]}
        }

        return res.status(200).json({
            msg:'success',
            total:result.count,
            result:result.rows,
            component
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

const searchSongs = async (term, limit, offset) => {
    const {count, rows} = await Song.findAndCountAll({
        where:{
            title:{
                [Op.like]: `%${term}%`
            }
        },
        limit,
        offset,
        raw:true
    });

    return {count:count, rows:rows};
}

const searchUsers = async (term, limit, offset) => {
    const {count, rows} = await User.scope('no_sensitive_email').findAndCountAll({
        where:{
            archived:false,
            username:{
                [Op.like]:`%${term}%`
            }
        },
        limit,
        offset,
        raw:true
    });

    return {count, rows};
}

module.exports = {
    searchElements
}