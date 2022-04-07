import * as React from "react" ;
import Styles from "./styles/register.module.css";


const Register = ()=>{
 const [rulesNum,setRulesNum] = React.useState(1)  
 const [socialMediaNum,setSocialMediaNum] = React.useState(1);
 const handleAddRemoveElement = (state:number,setState:React.Dispatch<React.SetStateAction<number>>,max:number,min:number)=>{  
       const add = ()=> state===max ? null : setState(state+1)
       const remove = ()=> state===min ? null : setState(state-1)
       return {add,remove}
 }
 const maxRules = 4;
 const maxSocialMedia = 5 ;
 const minSocialMedia = 1;
 const minRules = 1 ;
 const handleAddRemoveRules = handleAddRemoveElement(rulesNum,setRulesNum,maxRules,minRules);
 const handleAddRemoveSocialMedia = handleAddRemoveElement(socialMediaNum,setSocialMediaNum,maxSocialMedia,minSocialMedia);

 return(
        <form className={Styles.form}>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 username :
             </label>
             <input type="text" placeholder="userName" name="userName" className="formInput-small" />
         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 Email :
             </label>
             <input className="formInput-small" placeholder="email" type="email" name="email" />
         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 password :
             </label>
             <input type="password" placeholder="password" name="password" className="formInput-small" />
         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 About me :
             </label>
             <textarea name="aboutMe"  placeholder="about me" className={`formInput-small ${Styles.form__textarea}`} />
         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 Rules :
             </label>
             {Array.apply(null,Array(rulesNum)).map((_,idx)=>(
                 <div key={idx} className={Styles.form__elements}>
                 <input type="text" className="formInput-small" placeholder="no racism"/>
                 </div>
             ))}
             <div className={Styles.form__addElements__container}>
             <button className={`btn-primary ${rulesNum===maxRules?`btn-primary--disabled`:null}`} disabled={rulesNum===maxRules} type="button" onClick={_=>handleAddRemoveRules.add()}> 
                 +
             </button>
             <button className={`btn-primary ${rulesNum===minRules?`btn-primary--disabled`:null}`} disabled={rulesNum===minRules} type="button" onClick={_=>handleAddRemoveRules.remove()}> 
                 -
             </button>
             </div>
         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 Social media :
             </label>
             {Array.apply(null,Array(socialMediaNum)).map((_,idx)=>(
                 <div key={idx} className={Styles.form__elements}>
                 <input type="text" className="formInput-small" placeholder="social media link"/>
                 </div>
             ))}
             <div className={Styles.form__addElements__container}>
             <button className={`btn-primary ${socialMediaNum===maxSocialMedia?`btn-primary--disabled`:null}`} disabled={socialMediaNum===maxSocialMedia} type="button" onClick={_=>handleAddRemoveSocialMedia.add()}> 
                 +
             </button>
             <button className={`btn-primary ${socialMediaNum===minSocialMedia?`btn-primary--disabled`:null}`} disabled={socialMediaNum===minSocialMedia} type="button" onClick={_=>handleAddRemoveSocialMedia.remove()}> 
                 -
             </button>
             </div>
         </div>
         <button className={`btn-primary ${Styles.form__submit__btn}`}>
             register
         </button>
        </form>
    )
}

export default Register;