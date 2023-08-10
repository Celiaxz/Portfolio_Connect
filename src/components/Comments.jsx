import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";
import { BASE_URL } from "../config/config.index";
import { Button, Textarea } from "@mantine/core";
import "./Comments.css";

function Comments({ projectId, allComments, setAllComments }) {
   const { user, isLoggedIn } = useContext(AuthContext);
   const [commentContent, setCommentContent] = useState("");
   const [editComment, setEditComment] = useState(false);
   const [commentToEdit, setCommentToEdit] = useState(null);
   const [editedComment, setEditedComment] = useState("");

   const navigate = useNavigate()

   //Create new comment
   const handleNewComment = async (e) => {
      e.preventDefault();
      if (!isLoggedIn) {
         navigate("/login")
      }
      try {
         const responseComments = await axios.post(`${BASE_URL}/project/${projectId}/comment`,
            {
               userId: user._id,
               projectId: projectId,
               comment: commentContent,
            })
         if (responseComments.status === 201) {
            try {
               const response = await axios.get(`${BASE_URL}/project/${projectId}`);
               setAllComments(response.data.comments);
               setCommentContent("");
            }
            catch (error) {
               console.error(error);
            }
         }
      }
      catch (error) {
         console.error(error)
      }
   }

   //Editing the comment
   const handleEditComment = async (commentId) => {
      try {
         const responseComment = await axios.patch(`${BASE_URL}/project/${projectId}/comment/${commentId}/update`, { comment: editedComment })
         if (responseComment.status === 200) {
            //fetching all comments again and set the state to refresh comments section
            const response = await axios.get(`${BASE_URL}/project/${projectId}`)
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
         const response = await axios.delete(`${BASE_URL}/project/${projectId}/comment/${commentId}/delete`)
         if (response.status === 204) {
            const response = await axios.get(`${BASE_URL}/project/${projectId}`);
            setAllComments(response.data.comments);
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <>
         <div className="comments_section">
            <h3>Comments :</h3>
            {allComments && allComments.map((comment) => {
               return (
                  <div className="one_comment" key={comment._id}>
                     {editComment && commentToEdit === comment._id ? (
                        <div>
                           <div className="comment_infos">
                              <p>From <Link to={`/user/${comment.userId._id}`} className="author">{comment.userId.username}</Link></p>
                              <p className="comment_date">{comment.date.split("-").join('/').split("T").join(' ').split('.').splice(0,1)}</p>
                           </div>
                           <form>
                              <label>
                                 <Textarea
                                    className="comment_textarea"
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                    required />
                              </label>
                              <Button onClick={(e) => {
                                 e.preventDefault()
                                 handleEditComment(comment._id)
                              }}>
                                 Save
                              </Button>
                           </form>
                        </div>
                     ) : (
                        <div>
                           <div className="comment_infos">
                              <p>From <Link to={`/user/${comment.userId._id}`} className="author">{comment.userId.username}</Link></p>
                              <p className="comment_date">{comment.date.split("-").join('/').split("T").join(' ').split('.').splice(0,1)}</p>
                           </div>
                           <p className="comment">{comment.comment}</p>
                           {user && comment.userId._id === user._id && (
                              <div className="comments_buttons">
                                 <Button onClick={() => {
                                    setEditComment(true);
                                    setCommentToEdit(comment._id);
                                    setEditedComment(comment.comment);
                                 }}>
                                    ✎ Edit
                                 </Button>
                                 <Button onClick={() => handleDeleteComment(comment._id)}>Delete</Button>
                              </div>
                           )}
                        </div>
                     )}
                  </div>
               );
            })}
               <h3>Add a comment :</h3>
               <form className="new_comment" onSubmit={handleNewComment}>
                  <label>
                     <Textarea
                        className="comment_textarea"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        required />
                  </label>
                  <Button type="submit">Post</Button>
               </form>
         </div>
      </>
   )
}

export default Comments