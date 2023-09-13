import { addDoc, getDocs,  collection, where, query, deleteDoc, doc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../../config/firebase"
import { Post as IPost} from "./Main"
import { useEffect, useState } from "react"

interface Props { // Como estamos organizando a forma de exibição do post nesse componente, copiamos a interface do Main para cá
    post: IPost
}

interface Like {
    likeId: string,
    userId: string 
}
''
export const Post = (props: Props) => {
    const { post } = props // Estamos pegando as props, ou melhor, a API dos posts
    const [user] = useAuthState(auth)

    const [likes, setLikes] = useState<Like[] | null>(null)

    const likesRef = collection(db, "likes") // Definir qual a coleção você vai se referir

    const likesDoc = query(likesRef, where("postId", "==", post.id)) // Estamos fazendo uma query, especificando qual collection está sendo tratada que é o likesRef e só vamos pegar a informação onde o postId = post.id

    const getLikes = async () => {
         const data = await getDocs(likesDoc)
         setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})))
    }

    const addLike = async () => { // Passar os dados do post (title e description) pro banco de dados do firebase
        try{
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid, 
        postId: post.id,
      })
        if (user) { 
            setLikes((prev) =>
             prev ? [...prev, {userId: user.uid, likeId: newDoc.id}] : [{userId: user.uid, likeId: newDoc.id}]
        )
      }
    } catch (err) {
        console.log(err)
    }
}

    const removeLike = async () => { // Passar os dados do post (title e description) pro banco de dados do firebase
        try{
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid)) 
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(db, "likes", likeId)
            await  deleteDoc(likeToDelete) 
        if (user) { 
            setLikes(
                (prev) => prev && prev.filter((like) => like.likeId !== likeId))
            }
        }
        catch (err) {
            console.log(err)
        }
        }

        const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes()
    }, [])

    return (
        <div>
            <div className="title">
                <h1>
                    {post.title}
                </h1>
            </div>

            <div className="body">
                <p>
                    {post.description}
                </p> 

                <div className="footer">
                    <p>
                        @{post.username}
                        <button onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
                        {likes && <p>Likes: {likes.length}</p>}
                    </p>
                </div>
            </div>    
        </div>
    )
}

