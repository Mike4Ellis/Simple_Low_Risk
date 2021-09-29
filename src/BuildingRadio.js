import React, { useState } from 'react';
import { Button, RadioGroup, Card, CardTitle, CardText, CardActions} from '@chatui/core';
import axios from 'axios';

const building = [
    {label: '办公', value: '办公'},
    {label: '商业', value: '商业'},
    {label: '公共服务设施', value: '公共服务设施'},
    {label: '仓库', value: '仓库'},
    {label: '厂房', value: '厂房'},
    {label: '住宅-平房', value: '住宅-平房'},
    {label: '住宅-楼房', value: '住宅-楼房'},
]

const BuildingRadio = (props) => {
    const [value, setValue] = useState('办公')
    function handleChange(val) {
        setValue(val)
    }
    function handleSubmit(event){
        // props.sendResponse("您选择的建筑物性质是 " + value)
        // // 前进到第二步
        // props.forward(2)
        axios.get('/SubBuilding?properties=' + value)
            .then(function (response) {
                console.log(response);
                if(response.data.code === 0){
                    // 客服回复 您选择的建筑物性质是 xxx
                    // sendResponse是父组件传来的回调函数
                    props.sendResponse("您选择的建筑物性质是 " + value)
                    // 前进到第二步
                    props.forward(2)
                }
                else{
                    props.sendResponse("您的选择出现错误，请重试")
                }

            })
            .catch(function (error) {
                console.log(error);
                props.sendResponse("您的选择出现错误，请重试")
            });
    }

    return(
        <Card size="xl">
            <CardTitle>建筑物性质选择</CardTitle>
            <CardText>
                <RadioGroup value={value} options={building} onChange={handleChange} />
            </CardText>
            <CardActions>
                <Button color="primary" onClick={handleSubmit}>提交选择</Button>
            </CardActions>
        </Card>
    )
}
export default BuildingRadio;