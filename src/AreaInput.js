import React, { useState} from 'react';
import { Button, Input , Card, CardTitle, CardText, CardActions} from '@chatui/core';
import axios from 'axios';

const AreaInput = (props) => {
    const [use, setUse] = useState('')
    const [allSquad, setAllSquad] = useState('')
    const [earthSquad, setEarthSquad] = useState('')
    const [height, setHeight] = useState('')

    function handleSubmit(event){
        props.sendResponse("您填写的数据如下:")
        props.sendResponse(
            "建筑用途 " + use + '\n'
            + "建筑总面积 " + allSquad + '\n'
            + "地上建筑面积 " + earthSquad + '\n'
            + "建筑高度 " + height
        )

        axios.post('/SubSquard', {
            'use': use,
            'all_squad': allSquad,
            'earth_squad': earthSquad,
            'height': height
        })
            .then(function (response) {
                console.log(response);
                let result = response.data.result
                // result为0 则判断为简易低风险项目
                if(result === 0){
                    props.sendResponse("恭喜，建筑面积符合简易低风险的要求！")
                    // 前进到第四步
                    props.forward(4)
                }
                else{
                    props.sendResponse("很抱歉，根据小助理的判断，您的工程建设项目不属于简易低风险。")
                    // 前进到第四步
                    props.forward(5)
                }

            })
            .catch(function (error) {
                console.log(error);
                props.sendResponse("您的选择出现错误，请重试")
            });


    }

    return(
        <Card size="xl">
            <CardTitle>建筑面积表单</CardTitle>
            <CardText>
                <h3>建筑用途</h3>
                <Input value={use} placeholder="请输入建筑用途" onChange={val=> setUse(val)} />
                <h3>建筑总面积</h3>
                <Input value={allSquad} placeholder="请输入建筑总面积" onChange={val=> setAllSquad(val)} />
                <h3>地上建筑面积</h3>
                <Input value={earthSquad} placeholder="请输入地上建筑面积" onChange={val=> setEarthSquad(val)} />
                <h3>建筑高度</h3>
                <Input value={height} placeholder="请输入建筑高度" onChange={val=> setHeight(val)} />
            </CardText>
            <CardActions>
                <Button color="primary" onClick={handleSubmit}>提交表单</Button>
            </CardActions>
        </Card>
    )
}
export default AreaInput;