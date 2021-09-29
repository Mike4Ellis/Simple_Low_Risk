import logo from './logo.svg';

import React ,{useState, useEffect } from 'react';
// 引入 ChatUI 样式
import '@chatui/core/es/styles/index.less';
// 引入定制的样式
import './chatui-theme.css';

// 引入组件
import Chat, {Bubble, useMessages} from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';
import BuildingRadio from "./BuildingRadio";
import LimitRadio from "./LimitRadio";
import AreaInput from "./AreaInput";
import MapCard from "./MapCard";

//初始对话内容
const initialMessages = [
  {
    type: 'text',
    content: { text: '主人好，我是您的智能助理，专门帮助您判断一个工程建设项目是否为简易低风险~' },
    user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
  },
];

const App = () => {
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  // 标记一轮对话结束 对话刚开始时为true
  const [turnover, setTurnover] = useState(true);

  // 标记执行步骤 表示该哪一步了
  const [step, setStep] = useState(0)

  // 传入第二个参数[]，即为只运行一次，仅在组件挂载卸载时执行（卸载时执行 会按预想工作吗？） 暂时弃用
  useEffect(()=>{
    //对话刚开始 客服主动提问
    if (turnover === true){
      appendMsg({
        type: 'text',
        content: { text: '请您描述您的问题~' },
      })
    }
  }, [turnover])

  useEffect(()=>{
    // 第一步，询问建筑物性质
    if (step === 1){
      sendTextResponse("请您选择建筑物性质:")
      sendCardResponse("building")
    }
    // 第二步，
    else if(step === 2){
      sendTextResponse("请您选择用途限定条件:")
      sendCardResponse("limit")
    }
    else if(step === 3){
      sendTextResponse("请您填写建筑面积:")
      sendCardResponse("area")
    }
    else if(step === 4){
      sendTextResponse("请您选择工程建设的地点:")
      sendCardResponse("map")
    }
    else if(step === 5){
      sendTextResponse("本次简易低风险咨询服务已结束，期待您的反馈。")
      sendTextResponse("如想继续使用本服务，请您输入您的需求再次咨询。")
    }
  }, [step])

  //点击发送后
  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        //用户所说的话在右侧
        position: 'right',
      });
      console.log(val)
      if(val.search(/我要建/i) !== -1){
        setStep(1)
      }
      else{
        sendTextResponse("很抱歉，我太笨啦，没法处理您的问题。")
      }
    }
  }

  // 发送文字回复
  // 先typing一会儿 间隔一秒发出回复
  function sendTextResponse(text){
    //设置状态为输入中
    setTyping(true);

    //一秒后回复消息
    setTimeout(() => {
      appendMsg({
        type: 'text',
        content: { text: text },
      });
    }, 1000);
  }

  // 发送图片回复
  // 先typing一会儿 间隔一秒发出回复
  function sendImageResponse(url){
    //设置状态为输入中
    setTyping(true);

    //一秒后回复消息
    setTimeout(() => {
      appendMsg({
        type: 'image',
        content: { picUrl: url },
      });
    }, 1000);
  }

  // 发送卡片回复
  // 先typing一会儿 间隔一秒发出回复
  function sendCardResponse(application){
    //设置状态为输入中
    setTyping(true);

    //一秒后回复消息
    setTimeout(() => {
      appendMsg({
        type: 'card',
        content:{
          code: '',
          data: {},
        },
        application: application
      });
    }, 1000);
  }

  function renderMessageContent(msg) {
    const { type, content, application} = msg;
    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
            <Bubble type="image">
              <img src={content.picUrl} alt="" />
            </Bubble>
        );
      case 'card':
        // 询问 建筑物性质
        if(application === 'building'){
          return(
              <BuildingRadio sendResponse={sendTextResponse} forward={setStep}/>
          )
        }
        // 询问 用途限定条件
        else if(application === 'limit'){
          return(
              <LimitRadio sendResponse={sendTextResponse} forward={setStep}/>
          )
        }
        // 询问 建筑面积
        else if(application === 'area'){
          return(
              <AreaInput sendResponse={sendTextResponse} forward={setStep}/>
          )
        }
        else if(application === 'map'){
          return(
              <MapCard sendResponse={sendTextResponse} forward={setStep}/>
          )
        }

      default:
        return null
    }
  }


  return (
      <Chat
          navbar={{ title: '智能助理' }}
          messages={messages}
          renderMessageContent={renderMessageContent}
          onSend={handleSend}
      />
  );
};


export default App;
