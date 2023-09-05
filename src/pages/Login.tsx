import { auth, provider } from "../config/firebase"
import { signInWithPopup }from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()

    const signInWithGoogle = async () => {
       const result = await signInWithPopup(auth, provider)
       console.log(result) 
       navigate("/") // Basicamente o usenavigate serve para mudar de link dentro de uma função
    }

    return (
        <div>
            <div> Sign in with Google to continue</div>
            <button onClick={signInWithGoogle}> Sign in with google </button>
        </div>
    )
}