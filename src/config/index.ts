import {devConfig} from "./dev";
import {prodConfig} from "./prod";
if(process.env.NODE_ENV==="production"){
     module.exports = prodConfig
}else{
   module.exports = devConfig
}


