import * as React from "react";
import Styles from "./styles/register.module.css";
import AuthGlobalStyle from "./styles/style.module.css";
import * as Yup from "yup";
import {useFormik,FormikProps} from "formik";
import eye from "../../assets/icons/eye.png";
import {usePost} from "../../hooks/httpReq/";
import useLocalhost from "../../hooks/useLocalhost";
import {useAuthContext} from "./context/authContext";

interface formikInterface{
    userName: string;
    email: string;
    password: string;
}

const Login = ()=>{
    const [showPassword,setShowPassword] = React.useState(false);
    const [_,setAuthorization] = useLocalhost("authorization");
    const [serverErr,setServerErr] = React.useState(""); 
    const {setAuth} = useAuthContext()
    const setPost = usePost();
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
                  setServerErr(response.message)
               }else{
                   setAuthorization(`Bearer ${response.token}`)
                   setAuth("") 
               }
            }catch(err){
                console.error(err)
            }
          
        
        }
    })
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
             <input type={showPassword?"text":"password"}  placeholder="password" onBlur={handleBlur} onChange={handleChange}  name="password" className={`formInput-small ${Styles.password}`}
              />
             <button className={Styles.showPassword} onClick={_=>setShowPassword(!showPassword)} type="button">
                 <img src={eye.src} alt="show password"/>
             </button>
             </div>
             {touched.password && errors.password ? <span className={Styles.err}>{errors.password}</span>:null}

         </div>
         {serverErr?<p className={`text-center ${AuthGlobalStyle.server__err}`}>{serverErr}</p>:null}
         <button className={`btn-primary ${Styles.form__submit__btn}`} type="submit" onSubmit={_=>handleSubmit}>
             login
         </button>
      </form>
  )
}

export default Login