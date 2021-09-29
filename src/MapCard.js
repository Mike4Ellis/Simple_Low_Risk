import React, { useState} from 'react';
import {Button, Modal, Card, CardTitle, CardText, CardActions, Bubble} from '@chatui/core';
import axios from 'axios';

const MapCard = (props) => {
    //北京市地图 候选 http://www.cgzdl.com/uploads/allimg/map/2021041417(2).jpg
    const [url, setUrl] = useState('http://uf-onegreen.qqxzb-img.com/m-maps/Upload_maps/201305/2013050708362908.jpg')
    const [open, setOpen] = useState(false);

    function handleSubmit(event){
        setOpen(true)
    }

    function handleConfirm(event){
        setOpen(false)
        props.sendResponse("恭喜，您选择的地点符合条件！")
        // props.sendResponse("恭喜您，根据小助理的判断，您的工程建设项目属于简易低风险。")
        props.sendResponse("您好，您已满足办理简低工程的条件，前往发改委办理项目备案证明，在建设项目属地政务服务大厅申请办理建设工程规划许可。")
        props.sendResponse("您可以点击这里http://tzxm.beijing.gov.cn/slre/index，登录官网后申请简低工程。")
        props.forward(5)
    }

    function handleClose(event){
        setOpen(false)
    }

    return(
        <div>
            <Card size="xl">
                <CardTitle>施工地点选择</CardTitle>
                <CardText>
                    <Bubble type="image">
                        <img src={url} alt="" />
                    </Bubble>
                </CardText>
                <CardActions>
                    <Button color="primary" onClick={handleSubmit}>选择地点</Button>
                </CardActions>
            </Card>
            <Modal
                // style={{weight: '1000px', height: '100%'}}
                active={open}
                title="施工地点选择"
                showClose={false}
                onClose={handleClose}
                actions={[
                    {
                        label: '选择',
                        color: 'primary',
                        onClick: handleConfirm,
                    },
                    {
                        label: '返回',
                        onClick: handleClose,
                    },
                ]}
            >
                <h3 style={{textAlign: 'center'}}>地图</h3>
                <img src={url} alt="地图" style={{display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%', height: '100%'}} />
            </Modal>
        </div>
    )
}
export default MapCard;