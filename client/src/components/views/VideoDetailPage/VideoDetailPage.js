
import React, { useEffect, useState } from "react";
import {Row, Col,  Avatar, List} from 'antd';
import Axios from "axios";
// import { response } from "express";
import SideVideo from './Sections/SideVideo.js';
import Subscribe from './Sections/Subscribe.js';
import Comment from './Sections/Comment.js'


function VideoDetailPage(props) {


    
    const videoId = props.match.params.videoId;
    const variable = {videoId: videoId}

    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState([])


    useEffect(() => {

        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success) {
                    setVideoDetail(response.data.VideoDetail);
                } else {
                    alert('비디오 정보를 가져오길 실패했습니다.');
                }
            })
        console.log(Comments)
    }, []);
    
    const subscribeButton = VideoDetail.writer && (VideoDetail.writer._id !== localStorage.getItem('userId')) 
        && <Subscribe 
        userTo={VideoDetail.writer && VideoDetail.writer._id} 
        userFrom={localStorage.getItem('userId')} />

        return (
            
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
    
                    <div style={{width: '100%', padding: '3rem 4rem'}}>
                    <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>
    
                        <List.Item
                            actions={[subscribeButton]} >
                                <List.Item.Meta
                                    avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                                    title={VideoDetail.writer && VideoDetail.writer.name}
                                    description={VideoDetail.description}
                                />
                        </List.Item>
    
                        {/* comments */}
                        <Comment postId={videoId}/>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
    
        )
    
}


export default VideoDetailPage
