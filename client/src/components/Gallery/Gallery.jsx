import React, { useEffect } from 'react'
import { Image, Space } from 'antd'
import { connect, useDispatch } from 'react-redux'
import { getImages } from '../../redux/actions'
import NavigationBar from '../NavigationBar/NavigationBar'
import UploadZone from './UploadZone/UploadZone'

const Gallery = props => {
    const getDispatch = useDispatch()

    useEffect(() => {
        getDispatch(getImages(props.authToken))
    }, [])

    if (props.authToken) {
        return (
            <div>
                <NavigationBar />
                <div>
                    <Space>
                        {props.images.map((image, index) => {
                            return (
                                <Image
                                    width={200}
                                    height={150}
                                    key={index}
                                    src={`data:image/jpeg; base64,${Buffer.from(props.images[index]).toString('base64')}`}
                                />
                            )
                        })}
                    </Space>
                    <UploadZone />
                </div>
            </div>
        )
    }

    return <div>Please authorize</div>
}

const mapStateToProps = state => ({
    authToken: state.root.authToken,
    images: state.root.images,
})

export default connect(mapStateToProps, null)(Gallery)