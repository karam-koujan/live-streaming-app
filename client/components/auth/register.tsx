import * as React from "react" ;
import Styles from "./styles/register.module.css";
import AuthGlobalStyle from "./styles/style.module.css";
import {useFormik,FormikProps} from "formik";
import * as Yup from "yup";
import eye from "../../assets/icons/eye.png";
import {useAuthContext} from "./context/authContext";
import {usePost} from "../../hooks/httpReq";


interface formikInterface{
    userName: string;
    email: string;
    password: string;
    aboutMe: string;
}

interface InputPropsInterface{
    text:string;
    setText:React.Dispatch<React.SetStateAction<string>>;
    textPosition:number;
    textList:string[];
    setTextList : React.Dispatch<React.SetStateAction<string[]>>;
    textNum:number;
    placeholder:string;
}
const Input = ({text,setText,textPosition,textList,setTextList,textNum,...props}:InputPropsInterface)=>{
     React.useEffect(()=>setText(""),[])
     
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
     if(textNum===1){
            setTextList([])    
     }
     setText(e.target.value)
  }
    return(
        <div  className={Styles.form__elements}>
        <input type="text" disabled={textList.length===1?false:Boolean(textList[textPosition])} className="formInput-small"  onChange={handleChange} value={!text&&!textList[textPosition]?"":textList[textPosition]?textList[textPosition]:text} {...props} />
        </div>
    )
}


 
const Register = ()=>{
 const [rulesNum,setRulesNum] = React.useState(1)  
 const [socialMediaNum,setSocialMediaNum] = React.useState(1);
 const [rules,setRules] = React.useState<string[]>([])
 const [rule,setRule] = React.useState("")
 const [socialmediaLinks,setSocialMediaLinks] = React.useState<string[]>([])
 const [socialMediaLink,setSocialMediaLink] = React.useState("");
 const [socialMediaLinkErr,setSocialMediaLinkErr] = React.useState("")
 const [showPassword,setShowPassword] = React.useState(false)
 const [serverErr,setServerErr] = React.useState("");
 const {setAuth} = useAuthContext()
 const setPost = usePost()
 const handleAddRemoveField = (state:number,setState:React.Dispatch<React.SetStateAction<number>>,max:number,min:number)=>{  
       const add = ()=> state===max ? null : setState(state+1)
       const remove = ()=> state===min ? null : setState(state-1)
       return {add,remove}
 }
 const handleAddRemoveItem = (state:string[],setState:React.Dispatch<React.SetStateAction<string[]>>)=>{
       const add = (element:string)=> setState(state=>[...state,element])
       const remove = (id:number)=> setState(state.filter((_,idx)=>idx!==id-1))

     return {add,remove}
 }

 const maxRules = 4;
 const maxSocialMedia = 5 ;
 const minSocialMedia = 1;
 const minRules = 1 ;
 const handleAddRemoveRules = handleAddRemoveField(rulesNum,setRulesNum,maxRules,minRules);
 const handleAddRemoveSocialMedia = handleAddRemoveField(socialMediaNum,setSocialMediaNum,maxSocialMedia,minSocialMedia);

 const handleAddRules = (element:string)=>{
     if(rule!==""){
         handleAddRemoveRules.add()
         handleAddRemoveItem(rules,setRules).add(element)
     }
   console.log(rules)
 }
 const handlRemoveRules = (id:number)=>{
     handleAddRemoveRules.remove()
     handleAddRemoveItem(rules,setRules).remove(id)
     setRule("")

 }
 const handleAddSocialMediaLinks = (element:string)=>{
     if(socialMediaLink!==""){
        handleAddRemoveSocialMedia.add()
        handleAddRemoveItem(socialmediaLinks,setSocialMediaLinks).add(element)
    }
 }
 const handleRemoveSocialMediaLinks = (id:number)=>{
    handleAddRemoveSocialMedia.remove()
    handleAddRemoveItem(socialmediaLinks,setSocialMediaLinks).remove(id)
    setSocialMediaLink("")

 }

const validationSchema = Yup.object({
    userName : Yup.string().max(15,"15 letters is the maximum").min(3,"3 letter is the minimum").required("this field is required"),
    email: Yup.string().email("please write a valid email").required("this field is required"),
    password:Yup.string().min(8,"password should have at least 8 letters").max(30,"30 letters is the maximum").required("this field is required"),
    aboutMe: Yup.string().max(300,"300 letters is the maximum").required("this field is required")
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
     onSubmit:async(e)=>{
         
           
               try{
                   if(socialMediaLink){
                       await socialMediaSchema.validate([...socialmediaLinks,socialMediaLink])
                      setSocialMediaLinkErr("")
                   }
                }catch(err:any){
               return  setSocialMediaLinkErr(err.errors)
              }
              try{
                const response = await setPost("http://localhost:8080/api/auth/register",{...values,socialMedia:socialMediaLink&&socialmediaLinks.length?[...socialmediaLinks,socialMediaLink]:[] ,rules:socialMediaLink&&socialmediaLinks.length?[...rules,rule]:[]},false)
                if(response.error){
                   setServerErr(response.message)
                }else{
                    setAuth("login") 
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
             <input type="text" placeholder="userName" onBlur={handleBlur} onChange={handleChange} value={values.userName} name="userName" className="formInput-small" />
           {touched.userName && errors.userName ? <span className={Styles.err}>{errors.userName}</span>:null}
         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 Email :
             </label>
             <input className="formInput-small" onBlur={handleBlur} onChange={handleChange} value={values.email} placeholder="email" type="email" name="email" />
             {touched.email && errors.email ? <span className={Styles.err}>{errors.email}</span>:null}

         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 password :
             </label>
             <div className={Styles.password__container}>
             <input type={showPassword?"text":"password"} placeholder="password" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" className={`formInput-small ${Styles.password}`} />
             <button className={Styles.showPassword} onClick={_=>setShowPassword(!showPassword)} type="button">
                 <img src={eye.src} alt="show password"/>
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
             {Array.apply(null,Array(rulesNum)).map((_,idx)=>(
                <Input key={idx} textPosition={idx}  placeholder="no racism" text={rule} textList={rules} setText={setRule} setTextList={setRules} textNum={rulesNum}/>
              
             ))}
             <div className={Styles.form__addElements__container}>
             <button className={`btn-primary ${rulesNum===maxRules?`btn-primary--disabled`:null}`} disabled={rulesNum===maxRules} type="button" onClick={_=>handleAddRules(rule)}> 
                 +
             </button>
             <button className={`btn-primary ${rulesNum===minRules?`btn-primary--disabled`:null}`} disabled={rulesNum===minRules} type="button" onClick={_=>handlRemoveRules(rulesNum)}> 
                 -
             </button>
             </div>
         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 Social media :
             </label>
             {Array.apply(null,Array(socialMediaNum)).map((_,idx)=>(
                 
                <Input key={idx} placeholder="social media link" textPosition={idx} text={socialMediaLink} textList={socialmediaLinks} setText={setSocialMediaLink} setTextList={setSocialMediaLinks} textNum={socialMediaNum}/>
                
                ))}
                {socialMediaLinkErr?<span className={Styles.err}>{socialMediaLinkErr}</span>:null}
             <div className={Styles.form__addElements__container}>
             <button className={`btn-primary ${socialMediaNum===maxSocialMedia?`btn-primary--disabled`:null}`} disabled={socialMediaNum===maxSocialMedia} type="button" onClick={_=>handleAddSocialMediaLinks(socialMediaLink)}> 
                 +
             </button>
             <button className={`btn-primary ${socialMediaNum===minSocialMedia?`btn-primary--disabled`:null}`} disabled={socialMediaNum===minSocialMedia} type="button" onClick={_=>handleRemoveSocialMediaLinks(socialMediaNum)}> 
                 -
             </button>
             </div>
         </div>
         {serverErr?<p className={`text-center ${AuthGlobalStyle.server__err}`}>{serverErr}</p>:null}
         <button className={`btn-primary ${Styles.form__submit__btn}`} type="submit" onSubmit={_=>handleSubmit}>
             register
         </button>
        </form>
    )
}

export default Register;