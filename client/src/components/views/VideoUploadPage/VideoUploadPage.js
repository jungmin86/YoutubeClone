import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import { STATES } from 'mongoose';

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



    return ( 
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style = {{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>Uploaod Video</Title>
            </div>

            <Form onSubmit>
                <div style={{display:'flex', justifyContent:'space-between'}}> 
                    {/*Drop zone*/}
                    <Dropzone
            onDrop
            multiple //한번에 파일을 2개이상올릴껀지
            maxSize//최대사이즈 조절
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