import React, { useState, useEffect} from 'react';
import { Button, RadioGroup , Card, CardTitle, CardText, CardActions} from '@chatui/core';
import axios from 'axios';

const LimitRadio = (props) => {
    const [value, setValue] = useState([])
    function handleChange(val) {
        setValue(val)
    }
    const [limits, setLimits] = useState([])
    // let limits = []

    useEffect(()=>{
        getLimit()
    }, [])

    function selection2option(selection){
        let options = []
        for(let i=0;i < selection.length; i++){
            let option = {}
            option['label'] = selection[i]
            option['value'] = i+1
            options.push(option)
        }
        return options
    }

     function getLimit(){
        // limits = [
        //     {label: '1', value: '1'},
        //     {label: '2', value: '2'},
        //     {label: '3', value: '3'},
        //     {label: '4', value: '4'},
        // ]
        // return limits
        axios.get('/GetLimit')
            .then(
                (response)=>{
                    if(response.data.code === 0){
                        let selection = response.data.selection
                        console.log(selection)
                        let result = selection2option(selection)
                        setLimits(result)
                        console.log(limits)
                    }
                    else{
                        props.sendResponse("不好意思，无法获取用途限定条件")
                    }
                }
            )
            .catch(
                (error)=>{
                    console.log(error)
                }
            )
    }
    function handleSubmit(event){
        // props.sendResponse("您选择的用途限定条件是 " + value)
        // // 前进到第三步
        // props.forward(3)
        axios.post('/SubLimit', {
            selection: value
        })
            .then(function (response) {
                console.log(response);
                let result = response.data.result
                let application = response.data.application
                // result为0 则判断为简易低风险项目
                if(result === 0){
                    props.sendResponse("恭喜，用途限定条件符合简易低风险的要求！")
                    props.sendResponse("对于此建筑，小助理判断可能有以下用途:")
                    props.sendResponse(application.join("；"))
                    // 前进到第三步
                    props.forward(3)
                }
                else{
                    props.sendResponse("很抱歉，根据小助理的判断，您的工程建设项目不属于简易低风险。")
                    // 前进到第四步
                    props.forward(5)
                }
            })
            .catch(function (error) {
                console.log(error);
                this.props.sendResponse("您的选择出现错误，请重试。")
            });
    }

    return(
        <Card size="xl">
            <CardTitle>用途限定条件选择</CardTitle>
            <CardText>
                <RadioGroup value={value} options={limits} onChange={handleChange} />
            </CardText>
            <CardActions>
                <Button color="primary" onClick={handleSubmit}>提交选择</Button>
            </CardActions>
        </Card>
    )
}
export default LimitRadio;