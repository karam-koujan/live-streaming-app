import Styles from "./styles/register.module.css";





const Login = ()=>{
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
         <button className={`btn-primary ${Styles.form__submit__btn}`}>
             login
         </button>
      </form>
  )
}

export default Login