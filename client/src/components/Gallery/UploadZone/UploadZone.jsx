import React from 'react'
import { Upload, message } from 'antd'
import { connect, useDispatch } from 'react-redux'
import { getImages } from '../../../redux/actions'

const UploadZone = props => {
    const getDispatch = useDispatch()

    const params = {
        name: 'file',
        action: 'http://localhost:5000/api/images/',
        headers: {
            'auth-token': props.authToken
        },
        showUploadList: false,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`)
                getDispatch(getImages(props.authToken))
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
    }

    return (
        <Upload listType="picture-card" {...params}>
            Click to Upload
        </Upload>
    )
}

const mapStateToProps = state => ({
    authToken: state.root.authToken,
})

export default connect(mapStateToProps, null)(UploadZone)