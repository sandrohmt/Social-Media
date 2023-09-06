import { Post as IPost} from "./Main"

interface Props { // Como estamos organizando a forma de exibição do post nesse componente, copiamos a interface do Main para cá
    post: IPost
}

export const Post = (props: Props) => {
    const { post } = props // Estamos pegando as props, ou melhor, a API dos posts
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
                    </p>
                </div>
            </div>
        </div>
    )
}