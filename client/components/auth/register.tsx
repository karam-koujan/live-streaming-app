



const Register = ()=>{

    return(
        <form>
         <div>
             <label>
                 userName
             </label>
             <input type="text" placeholder="userName" name="userName" className="formInput-small" />
         </div>
         <div>
             <label>
                 Email
             </label>
             <input className="formInput-small" placeholder="email" type="email" name="email" />
         </div>
         <div>
             <label>
                 password
             </label>
             <input type="password" placeholder="password" name="password" className="formInput-small" />
         </div>
         <div>
             <label>
                 About me
             </label>
             <textarea name="aboutMe" placeholder="about me" className="formInput-small" />
         </div>
         <button className="btn-primary">
             register
         </button>
        </form>
    )
}

export default Register;