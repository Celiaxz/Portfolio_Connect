import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

function Project() {
    const [currentProject, setCurrentProject] = useState(null);
    const [commentContent, setCommentContent] = useState("");
    const [allComments, setAllComments] = useState([]);
    const { user } = useContext(AuthContext);
    const { projectId } = useParams()
    //Edit states here
    const [editComment, setEditComment] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState(null);
    const [editedComment, setEditedComment] = useState("");

    const handleNewComment = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5005/project/${projectId}/comment`, {
                userId: user._id,
                projectId: projectId,
                comment: commentContent
            })
            if (response.status === 201) {
                const response = await axios.get(`http://localhost:5005/project/${projectId}`)
                setAllComments(response.data.comments)
                setCommentContent("")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fetchProject = async () => {
        try {
            const response = await axios.get(`http://localhost:5005/project/${projectId}`)
            if (response.status === 200) {
                setCurrentProject(response.data)
                setAllComments(response.data.comments)
            }
        } catch (error) {
            console.error(error)
        }
    }

    //Editing the comment
    const handleEditComment = async (commentId) => {
        try {
            const response = await axios.patch(`http://localhost:5005/project/${projectId}/comment/${commentId}/update`, { comment: editedComment })
            if (response.status === 200) {
                //fetching all comments again and set the state to refresh comments section
                const response = await axios.get(`http://localhost:5005/project/${projectId}`)
                setAllComments(response.data.comments)
                setCommentToEdit(null)
                setEditComment(false)
            }
        } catch (error) {
            console.error(error)
        }
    }
    //Deleting the comment
    const handleDeleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`http://localhost:5005/project/${projectId}/comment/${commentId}/delete`)
            if (response.status === 204) {
                const response = await axios.get(`http://localhost:5005/project/${projectId}`)
                setAllComments(response.data.comments)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchProject()
    }, [])

    if (!currentProject) {
        return <p>Loading...</p>
    }

    const { title, description, technologies, repositoryLink, projectFolder, userId } = currentProject
    return (
        <>
            <h2>Project : {title}</h2>
            <p>{description}</p>
            <ul>
                {technologies.map(technology =>
                    <li key={technology}>{technology}</li>)}
            </ul>
            <Link to={repositoryLink}>Link to repo</Link>
            <Link to={projectFolder}>Download project</Link>
            <p>Creator: {userId.username}</p>
            {user && userId._id === user._id && <>
                <button>Update Project</button>
                <button>Delete Project</button>
            </>}
            <div className="comments_section">
                <h3>Comments: </h3>
                {allComments && allComments.map(comment => {
                    return (
                        <div key={comment._id}>
                            {editComment && commentToEdit === comment._id ?
                                <form >
                                    <label >
                                        <input type="textarea" value={editedComment} onChange={e => setEditedComment(e.target.value)} />
                                    </label>
                                    <button onClick={() => handleEditComment(comment._id)}>Save edit</button>
                                </form> :
                                <div className="one_comment" style={{ border: "solid teal 2px" }}>
                                    <p>From {comment.userId.username}</p>
                                    <p>{comment.comment}</p>
                                    <p>{comment.date}</p>
                                    {comment.userId._id === user._id && <><button onClick={() => {
                                        setEditComment(true)
                                        setCommentToEdit(comment._id)
                                        setEditedComment(comment.comment)
                                    }}>Edit</button>
                                        <button onClick={() => handleDeleteComment(comment._id)}>Delete</button></>}
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
            <div className="new_comment"><p>Add new comment</p>
                <form onSubmit={handleNewComment}>
                    <label>Comment :
                        <input type="textarea" value={commentContent} onChange={e => setCommentContent(e.target.value)} />
                    </label>
                    <button type="submit">Post</button>
                </form>
            </div>
        </>
    )
}

export default Project