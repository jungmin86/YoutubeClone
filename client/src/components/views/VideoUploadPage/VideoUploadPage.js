import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions= [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"}
]

const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Veghicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"}
]


function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("") //리액트 훅 기능
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [Thumbnail, setThumbnail] = useState("")

    const onTitleChange = (e) => { //e: 이벤트
        // console.log(e.currentTarget.value)
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        // console.log(e.currentTarget)
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {

        let formData = new FormData;
        const config = {
            header: { 'content-type': 'multipart/form-data' } //파일을 올릴 때는 header에 content-type을 해줘야 오류를 막을 수 있다
        }
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.url)

                    Axios.post('/api/video/thumbnail', variable)
                    .then(response => { console.log("됐다");
                        if(response.data.success) {
                            console.log(response.data);
                            setDuration(response.data.fileDuration)
                            setThumbnail(response.data.url)
                        } else {
                            alert("썸네일 생성에 실패했습니다.")
                        }
                    } )
                } else {
                    alert("비디오 업로드를 실패했습니다.")
                }
            })


    }


    return ( 
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style = {{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{display:'flex', justifyContent:'space-between'}}> 
                    {/*Drop zone*/}
                    <Dropzone
                        onDrop = {onDrop}
                        multiple = {false} //한번에 파일을 2개이상올릴껀지
                        maxSize = {100000000} //최대사이즈 조절
                    >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                    width: '300px',
                    height: '240px', 
                    border: '1px solid lightgray', 
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent:'center'}} { ...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type='plus' style={{fontsize: '3rem'}} />
                        </div>
                        )}
                    </Dropzone>
                    {/*Thumbnail*/}

                    {Thumbnail && //썸네일이 있을 때에만
                    <div>
                        <img src={`http://localhost:5000/${Thumbnail}`} alt="thumbnail"></img>
                    </div>
                    }
                    <div>
                        <img src alt />
                    </div>
                </div>

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange = {onTitleChange}
                    value = {VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange = {onDescriptionChange}
                    value = {Description}
                />
                <br />  
                <br />

                <select onChange={onPrivateChange}> 

                        {PrivateOptions.map((item, index) =>(
                            <option key = {index} value = {item.value}>{item.label}</option>
                        ))}

                </select>
                <br />  
                <br />
                <select onChange={onCategoryChange}> 

                        {CategoryOptions.map((item, index) =>(
                                    <option key = {index} value = {item.value}>{item.label}</option>
                                ))}

                </select>
                <br />  
                <br />
                <Button type='primary' size='large' onClick> 
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default VideoUploadPage