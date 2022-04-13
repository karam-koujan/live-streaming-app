import * as React from "react";
import Styles from "./styles/modal.module.css";
import AuthGlobalStyle from "./styles/style.module.css";
import * as Yup from "yup";
import {useFormik,FormikProps} from "formik";
import eye from "../../assets/icons/eye.png";
import {usePost} from "../../hooks/httpReq/";
import useLocalhost from "../../hooks/useLocalhost";
import {useAuthContext} from "./context/authContext";
import serverReducer from "./reducers/server";
import {GoogleLogin} from "react-google-login";

interface formikInterface{
    userName: string;
    email: string;
    password: string;
}

const Login = ()=>{
    const [passwordVisibility,setpasswordVisibility] = React.useState(false);
    const [auth,setAuthorization] = useLocalhost("authorization");
    const [{serverErr},dispatch] = React.useReducer(serverReducer,{serverErr:""}); 
    const {setAuth} = useAuthContext()
    const setPost = usePost();
    const [_,setGoogleToken] = useLocalhost("googleToken")

    const validationSchema = Yup.object({
        userName : Yup.string().max(15,"15 letters is the maximum").min(3,"3 letter is the minimum").required("this field is required"),
        email: Yup.string().email("please write a valid email").required("this field is required"),
        password:Yup.string().min(8,"password should have at least 8 letters").max(30,"30 letters is the maximum").required("this field is required"),
    })

    const {handleSubmit,handleChange,handleBlur,errors,values,touched}:FormikProps<formikInterface> = useFormik<formikInterface>({
        initialValues:{
            userName:"",
            email:"",
            password:"",
        },
        validationSchema,
        onSubmit:async(e)=>{
            try{
               const response = await setPost("http://localhost:8080/api/auth/login",values,false)
               if(response.error){
                  dispatch({type:"server__err",payload:{name:"serverErr",err:response.message}})
               }else{
                   setAuthorization(`Bearer ${response.token}`)
                   setAuth("") 
               }
            }catch(err){
                console.error(err)
            }
          
        
        }
    })
  
    const handleGoogleResponse = async(response:any)=>{
        if(response.tokenId){
            try{
             const data = await setPost("http://localhost:8080/api/auth/google/account/login",{token:response.tokenId},true)
             console.log("data",data)
             if(!data.error){
                 setGoogleToken(data.token)
                 setAuth("")
             }else{
                 dispatch({type:"server__err",payload:{name:"serverErr",err:data.message}})
             }                 
            }catch(err){
                console.error(err)
            }
        }
    }
  return(
      <form className={Styles.form} onSubmit={handleSubmit}>
          <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 username :
             </label>
             <input type="text" onBlur={handleBlur} onChange={handleChange}  placeholder="userName" name="userName" className="formInput-small" />
             {touched.userName && errors.userName ? <span className={Styles.err}>{errors.userName}</span>:null}

         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 Email :
             </label>
             <input className="formInput-small" onBlur={handleBlur} onChange={handleChange}  placeholder="email" type="email" name="email" />
             {touched.email && errors.email ? <span className={Styles.err}>{errors.email}</span>:null}

         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 password :
             </label>
             <div className={Styles.password__container}>
             <input type={passwordVisibility?"text":"password"}  placeholder="password" onBlur={handleBlur} onChange={handleChange}  name="password" className={`formInput-small ${Styles.password}`}
              />
             <button className={Styles.passwordVisibility} onClick={_=>setpasswordVisibility(!passwordVisibility)} type="button">
                 <img src={eye.src} alt="show password"/>
             </button>
             </div>
             {touched.password && errors.password ? <span className={Styles.err}>{errors.password}</span>:null}

         </div>
         {serverErr?<p className={`text-center ${AuthGlobalStyle.server__err}`}>{serverErr}</p>:null}
         <button className={`btn-primary ${Styles.form__submit__btn}`} type="submit" onSubmit={_=>handleSubmit()}>
             login
         </button>
         <p className={AuthGlobalStyle.or}>or</p>
         <div className={AuthGlobalStyle.googleLoginBtn__container}>
             <GoogleLogin
             clientId={process.env.CLIENT_ID?process.env.CLIENT_ID:""}
             onSuccess={handleGoogleResponse}
             onFailure={handleGoogleResponse}
             buttonText="Login With Google Account"
             />
         </div>
      </form>
  )
}

export default Login