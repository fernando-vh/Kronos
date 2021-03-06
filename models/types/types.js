const types = {
    ROLE:{
        ADMIN_ROLE: 1,
        USER_ROLE: 2
    },
    AUTH_TYPE:{
        INTERNAL:1,
        GOOGLE:2,
        FACEBOOK:3
    },
    FILE_DIRS:{
        PP_DIRNAME: require('os').homedir() + '/Documents/MMC/uploads/images',
        SONGS_DIRNAME: require('os').homedir() + '/Documents/MMC/uploads/songs'
    },
    PERMISSION_TYPE:{
        USER: 0,
        ADMIN: 1,
        BOTH: 2,
    },
    DEFAULT_VALUES:{
        DEFAULT_IMG: '__default.jpg'
    },
    EMOTION:{
        ALARMED: 0,
        HAPPY: 1,
        TIRED: 2,
        SAD: 3
    },
    SEARCH_COMPONENTS:{
        SONGS:'songs',
        USERS:'users'
    },
    RESTRICTIONS:{
        MAX_IMAGE_SIZE: 225,
        TOKEN_TIME: "1h",
        LONG_TOKEN_TIME:'15d'
    }
}

module.exports = types;