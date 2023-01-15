import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment.js";

function Comment(props) {

    const videoId = props.postId;
    // console.log(videoId)
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("");

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)
    };

    const onSubmit = (event) => {
        event.preventDefault(); //제출 시 새로고침 방지

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: videoId,
        }
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result)
                    setCommentValue("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('코멘트를 저장하지 못했습니다.');
                }
            })
    };

    return (
        <div>
            <br />
            <p> Replies </p>
            <hr />


            {/* Comment Lists */}

            {/* {props.commentLists && props.commentLists.map((comment, index) => {
                (!comment.responseTo &&
                <SingleComment comment={comment} postId={props.postId}/>
                )
            })} */}

            
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
                
            ))}
            


            {/* Root Comment Form */}

            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <textarea 
                    style={{ width: '100%', borderRadius: '5px'}}
                    onChange= {handleClick}
                    value= {CommentValue}
                    placeholder="코멘트를 작성해주세요."
                
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</button>

            </form>
        </div>
    )
}

export default Comment