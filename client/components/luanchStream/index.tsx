import * as React from "react";
import * as Yup from "yup";
import VideoJS from "../videoPlayer"
import Styles from "./styles.module.css";
import formRegister from "../auth/reducers/register";
import {useFormik,FormikProps} from "formik";
import { useUserContext } from "../../context/userContext";
import {useFetchQuery} from "../../hooks/useFetchQuery";
import {useMutation, useQueryClient} from "react-query";
import { usePost } from "../../hooks/httpReq";
import { useRouter } from "next/router";
interface formikInterface{
    title:string;
    event:string
}
const LuanchStream = ()=>{
    const maxTagsFields = 4;
    const minTagsFields = 1 ;
    const [{tags,tagsFieldNum},dispatch] = React.useReducer(formRegister,{
        tags: Array.apply(null, Array(maxTagsFields)),
        tagsFieldNum:1,
       
   })
  const validationSchema = Yup.object({
      title:Yup.string().max(40,"40 letters are the maximum").min(2,"2 letters are the minimum"),
      event:Yup.string().max(40,"40 letters are the maximum").min(2,"2 letters are the minimum")
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
   dispatch({type:"remove__text",payload:{name:fieldName,textId:tagsFieldNum}})
 }
}
const streamLink = useFetchQuery("streamLink", "http://localhost:8080/api/stream/stream_link")
const setPost = usePost()
const mutation:any = useMutation((data:any)=>setPost("http://localhost:8080/api/stream/create_stream",data,true))
const router = useRouter()
const queryClient = useQueryClient()
const {handleSubmit,handleChange,handleBlur,errors,values,touched}:FormikProps<formikInterface> = useFormik<formikInterface>({
        initialValues:{
            title:"",
            event:"",
        },
        validationSchema,
        onSubmit:()=>{
            mutation.mutate({...values,tags:tags.filter((tag:(string|undefined))=>tag!==undefined),streamLink:streamLink.data.streamLink},{
                onSuccess: () => {
                    queryClient.invalidateQueries('streams')}})
            
            if(!mutation.error){
             router.push("/")
            }        
    }})

    return(
        <div className={Styles.container}>
        <h1 className={Styles.title}>Luanch The Live Stream</h1>
        <div className={Styles.videoWrapper}>
      <VideoJS  liveUrl={streamLink?.data?.streamLink} isLoading={streamLink.isLoading}/>
        </div>
        <form className={Styles.form} action="" onSubmit={handleSubmit}>
        <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 title :
             </label>
             <input type="text" placeholder="title" onBlur={handleBlur}  onChange={handleChange}  name="title" className="formInput-medium" value={values.title}/>
           {touched.title && errors.title ? <span className={Styles.err}>{errors.title}</span>:null}
         </div>
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 event :
             </label>
             <input className="formInput-medium" onBlur={handleBlur} onChange={handleChange}  value={values.event} placeholder="event" type="text" name="event" />
             {touched.event && errors.event ? <span className={Styles.err}>{errors.event}</span>:null}

         </div>
      
         <div className={Styles.form__elements}>
             <label className={Styles.form__label}>
                 tags :
             </label>
             {Array.apply(null, Array(tagsFieldNum)).map((_,idx)=>(
                <input key={idx} placeholder="tags"  onChange={handleTextChange(idx,"tags")} className="formInput-medium" name="rule" value={tags[idx]}/>
              
             ))}
             <div className={Styles.form__addElements__container}>
             <button className={`btn-primary ${tagsFieldNum===maxTagsFields?`btn-primary--disabled`:null}`} disabled={maxTagsFields===tagsFieldNum} type="button" onClick={handleAddField("tagsFieldNum")}> 
                 +
             </button>
             <button className={`btn-primary ${tagsFieldNum===minTagsFields?`btn-primary--disabled`:null}`} disabled={tagsFieldNum===minTagsFields} type="button" onClick={handleRemoveField("tags","tagsFieldNum")}> 
                 -
             </button>
             </div>
         </div>
         
         <button className={`btn-primary ${Styles.form__submit__btn}`} type="submit"  onClick={()=>handleSubmit()}>
             Luanch The Stream
         </button>
        </form>
        </div>
    )
}

export default LuanchStream