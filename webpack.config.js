const path = require('path');
const { resolve } = require('constants-browserify');

module.exports={
    resolve:{
        fallback:{
            path: require.resolve("path-browserify") ,
            assert: false,
            fs:false,
            constants: false

        }
    }
    
}
