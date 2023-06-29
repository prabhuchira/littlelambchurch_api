
import songStyle from "./Song.module.css"

const Song = ({title,content})=>{
    return (
        <div className={songStyle.song}>
            <img src={content.thumbnails.standard.url} />
            Title: {title}
        </div>
    )
}

export default Song;