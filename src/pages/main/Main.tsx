import { getDocs, collection } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"
import { Post } from "./Post"

export interface Post { // Criação de uma interface para mostrar para o typescript o tipo de dado que está sendo tratado.
    id: string,
    userId: string,
    title: string,
    username: string,
    description: string
}


export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null)
    const postsRef = collection(db, "posts") // Definir qual a coleção você vai se referir
    // O React Query não será necessário pois o firebase nos ajuda na organização do backend

    const getPosts = async () => {
        const data = await getDocs(postsRef) // Collection
        setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]) // Organização dos dados para uma melhor  visualização no console
        
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
    <div> 
        {postsList?.map((post) => (
            <Post post={post}/>
        ))}
    </div>
    )
}