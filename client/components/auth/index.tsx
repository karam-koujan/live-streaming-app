import Login from "./login";
import Register from "./register"
import Styles from "./styles/style.module.css";
import {useAuthContext} from "./context/authContext";



const Auth = ()=>{
    const {auth,setAuth} = useAuthContext()
     
    if(!auth){
        return null
    }
    
    return(
        <div className={Styles.container}>
            <div className={Styles.container__elements}>
            <div className={Styles.modal}>
            <h2 className={`text-center ${Styles.modal__title}`}>
                {auth} to live streaming App
            </h2>
            <div className={Styles.modal__navList}>
                <span className={`${Styles.modal__navItem} ${auth==="login"?Styles["modal__navItem--active"]:""}`} onClick={_=>setAuth("login")}>login</span>
                <span className={`${Styles.modal__navItem} ${auth==="register"?Styles["modal__navItem--active"]:""}`} onClick={_=>setAuth("register")}>register</span>
            </div>
            {auth==="register"?<Register/>:<Login/>}

            </div>
            <span className={Styles.deleteIcon} onClick={_=>setAuth("")}>&#10005;</span>
            </div>

        </div>
    )
}

export default Auth;