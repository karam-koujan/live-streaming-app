import * as React from "react" ;
import Styles from "./styles/modal.module.css";
import AuthGlobalStyle from "./styles/style.module.css";
import {useFormik,FormikProps} from "formik";
import * as Yup from "yup";
import eye from "../../assets/icons/eye.png";
import {useAuthContext} from "./context/authContext";
import {usePost} from "../../hooks/httpReq";
import registerReducer from "./reducers/register";
import serverReducer from "./reducers/server";
import {GoogleLogin} from "react-google-login";
import {useGet} from "../../hooks/httpReq/";


interface formikInterface{
    userName: string;
    email: string;
    password: string;
    aboutMe: string;
}



const Register = ()=>{

 const maxRulesFields = 4;
 const maxSocialMediaFields = 5 ;
 const minSocialMediaFields = 1;
 const minRulesFields = 1 ;
const {auth,setAuth}  = useAuthContext();
const setGet = useGet()
const setPost = usePost();
const [socialMediaLinkErr,setSocialMediaLinkErr] = React.useState("");
const [{rules,rulesFieldNum,socialMediaLinks,socialMediaLinksFieldNum,passwordVisibility},dispatch] = React.useReducer(registerReducer,{
     rules: Array.apply(null, Array(maxRulesFields)),
     rulesFieldNum:1,
     socialMediaLinks:Array.apply(null, Array(maxSocialMediaFields)),
     socialMediaLinksFieldNum:1,
     passwordVisibility:false
})
 const [{serverErr,userGoogleData},dispatchServer]  = React.useReducer(serverReducer,{
     serverErr:"",
     userGoogleData:{userName:"",email:""}
 })
 const handleTextChange = (id:number,fieldName:string) => {
    return (e:React.ChangeEvent<HTMLInputElement>)=>dispatch({type:"write__text",payload:{name:fieldName,textId:id,text:e.target.value}})
    
};
const handleAddField = (fieldNumName:string)=>{
    return ()=>dispatch({type:"increment",payload:{name:fieldNumName}})

}
 const handleRemoveField = (fieldName:string,fieldNumName:string)=>{
     return () => {
   dispatch({type:"decrement",payload:{name:fieldNumName}})
   dispatch({type:"remove__text",payload:{name:fieldName,textId:rulesFieldNum}})
 }
}
 const handleGoogleResponse = async(response:any)=>{
    try{
        const data = await setGet(`http://localhost:8080/api/auth/google/account/userInfo/?token=${response.tokenId}`,false)
       dispatchServer({type:"server__response",payload:{name:"userGoogleData",data:{userName:data.userName,email:data.email}}})
     }catch(err){
        console.error(err)
    }

 }
 const handlePasswordVisibility = ()=> passwordVisibility?dispatch({type:"hide__element",payload:{name:"passwordVisibility"}}):dispatch({type:"show__element",payload:{name:"passwordVisibility"}})
const validationSchema = Yup.object({
    userName : Yup.string().max(15,"15 letters is the maximum").min(3,"3 letter is the minimum").required("this field is required"),
    email: Yup.string().email("please write a valid email").required("this field is required"),
    password:Yup.string().min(8,"password should have at least 8 letters").max(30,"30 letters is the maximum").required("this field is required"),
    aboutMe: Yup.string().max(300,"300 letters is the maximum")
})
const socialMediaSchema = Yup.array().of(Yup.string().matches(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,"this not a valid url"))
 const {handleSubmit,handleChange,handleBlur,errors,values,touched}:FormikProps<formikInterface> = useFormik<formikInterface>({
     initialValues:{
         userName:"",
         email:"",
         password:"",
         aboutMe:"",
     },
     validationSchema,
     onSubmit:async()=>{
         
         const socialMedia = socialMediaLinks.filter((item:(string|undefined))=>item!==undefined);
         const rulesResult = rules.filter((item:(string|undefined))=>item!==undefined)
               try{
                   
                       await socialMediaSchema.validate(socialMedia)
                      setSocialMediaLinkErr("")
                   
                }catch(err:any){
               return  setSocialMediaLinkErr(err.errors)
              }
              try{
                const data = {...values,socialMedia ,rules:rulesResult}
                const response = await setPost("http://localhost:8080/api/auth/register",data,false)
                if(response.error){
               dispatchServer({type:"server__err",payload:{name:"serverErr",err:response.message}})
                }else{
                    setAuth("login") 

                }
             }catch(err){
                 console.error(err)
             }
            
     }

 })

 const handleRegisterWithGoogle =  ()=>{
  return async (e:React.FormEvent<HTMLFormElement>)=>{
    
    const socialMedia = socialMediaLinks.filter((item:(string|undefined))=>item!==undefined);
    const rulesResult = rules.filter((item:(string|undefined))=>item!==undefined)
          try{
              
                  await socialMediaSchema.validate(socialMedia)
                 setSocialMediaLinkErr("")
              
           }catch(err:any){
          return  setSocialMediaLinkErr(err.errors)
         }
         try{
           const data = {aboutMe:values.aboutMe,userName:userGoogleData.userName,email:userGoogleData.email,socialMedia ,rules:rulesResult}
           const response = await setPost("http://localhost:8080/api/auth/google/account/register",data,false)
           if(response.error){
          dispatchServer({type:"server__err",payload:{name:"serverErr",err:response.message}})
           }else{
               setAuth("") 

           }
        }catch(err){
            console.error(err)
        }
    }
 }
 return(
        <form className={Styles.form} onSubmit={userGoogleData.userName&&userGoogleData.email ?handleRegisterWithGoogle() :  handleSubmit}>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 username :
             </label>
             <input type="text" placeholder="userName" onBlur={handleBlur} disabled={userGoogleData.userName} onChange={handleChange} value={userGoogleData.userName?userGoogleData.userName:values.userName} name="userName" className="formInput-small" />
           {touched.userName && errors.userName ? <span className={Styles.err}>{errors.userName}</span>:null}
         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 Email :
             </label>
             <input className="formInput-small" onBlur={handleBlur} onChange={handleChange} disabled={userGoogleData.email} value={userGoogleData.email?userGoogleData.email:values.email} placeholder="email" type="email" name="email" />
             {touched.email && errors.email ? <span className={Styles.err}>{errors.email}</span>:null}

         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 password :
             </label>
             <div className={Styles.password__container}>
            
             <input type={passwordVisibility?"text":"password"} disabled={userGoogleData.userName&&userGoogleData.email} placeholder="password" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" className={`formInput-small ${Styles.password}`} />
 
             <button className={Styles.passwordVisibility} onClick={handlePasswordVisibility} type="button">
                 <img src={eye.src} alt="password visibility"/>
             </button>
 
             </div>
             {touched.password && errors.password ? <span className={Styles.err}>{errors.password}</span>:null}
         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 About me :
             </label>
             <textarea name="aboutMe"  placeholder="about me" onBlur={handleBlur} onChange={handleChange} value={values.aboutMe} className={`formInput-small ${Styles.form__textarea}`} />
             {touched.aboutMe && errors.aboutMe ? <span className={Styles.err}>{errors.aboutMe}</span>:null}

         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 Rules :
             </label>
             {Array.apply(null, Array(rulesFieldNum)).map((_,idx)=>(
                <input key={idx} placeholder="stream rules"  onChange={handleTextChange(idx,"rules")} className="formInput-small" name="rule" value={rules[idx]}/>
              
             ))}
             <div className={Styles.form__addElements__container}>
             <button className={`btn-primary ${rulesFieldNum===maxRulesFields?`btn-primary--disabled`:null}`} disabled={maxRulesFields===rulesFieldNum} type="button" onClick={handleAddField("rulesFieldNum")}> 
                 +
             </button>
             <button className={`btn-primary ${rulesFieldNum===minRulesFields?`btn-primary--disabled`:null}`} disabled={rulesFieldNum===minRulesFields} type="button" onClick={handleRemoveField("rules","rulesFieldNum")}> 
                 -
             </button>
             </div>
         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 Social media  :
             </label>
         {Array.apply(null, Array(socialMediaLinksFieldNum)).map((_,idx)=>(
                <input key={idx} placeholder="social media link"  onChange={handleTextChange(idx,"socialMediaLinks")} className="formInput-small" name="socialMediaLink" value={socialMediaLinks[idx]}/>
              
             ))}
             <div className={Styles.form__addElements__container}>
             <button className={`btn-primary ${socialMediaLinksFieldNum===maxSocialMediaFields?`btn-primary--disabled`:null}`} disabled={socialMediaLinksFieldNum===maxSocialMediaFields} type="button" onClick={handleAddField("socialMediaLinksFieldNum")}> 
                 +
             </button>
             <button className={`btn-primary ${socialMediaLinksFieldNum===minSocialMediaFields?`btn-primary--disabled`:null}`} disabled={socialMediaLinksFieldNum===minSocialMediaFields} type="button" onClick={handleRemoveField("socialMediaLinks","socialMediaLinksFieldNum")}> 
                 -
             </button>
             </div>
             {socialMediaLinkErr?<span className={Styles.err}>{socialMediaLinkErr}</span>:null}
         </div>
        
         {serverErr?<p className={`text-center ${AuthGlobalStyle.server__err}`}>{serverErr}</p>:null}
         <button className={`btn-primary ${Styles.form__submit__btn}`} type="submit" onSubmit={userGoogleData.userName&&userGoogleData.email ?()=>handleRegisterWithGoogle() : ()=> handleSubmit()}>
             register
         </button>
            <p className={AuthGlobalStyle.or}>or</p>
            <div className={AuthGlobalStyle.googleLoginBtn__container}>
            <GoogleLogin
            clientId={process.env.CLIENT_ID?process.env.CLIENT_ID:""}
             buttonText="Register With Google Account"
             onSuccess={handleGoogleResponse}
             onFailure={handleGoogleResponse}
            />
            </div>
        </form>
    )
}

export default Register;