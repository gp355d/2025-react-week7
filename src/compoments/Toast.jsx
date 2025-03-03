import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Toast as BsToast } from "bootstrap"
import {
  messages as messagesData,
  removeMessage,} from '../slices/messageSlice'
  export default function Toast() {
  // const messages = useSelector((state)=>state.toast.message);
  const messages = useSelector(messagesData);
  const dispatch = useDispatch();
  const toastRefs = useRef({});
  const handleDismiss = (messageId) => {
    dispatch(removeMessage(messageId));
  };
  // console.log(message);
  useEffect(()=>{
    messages.forEach((message) => {
      const toastElement = toastRefs.current[message.id];
      if(toastElement){
        const toastInstance = new BsToast(toastElement)
        toastInstance.show()
        setTimeout(()=>{
          // dispatchEvent(removeMessage(message.id))
          handleDismiss(message.id);
        },5000)
      }
    });
  },[messages])
  return(
  <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1 }}>
    {messages.map((message)=>(
    <div ref={(el)=>toastRefs.current[message.id]= el} key={message.id} className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
      <div className={`toast-header ${message.status === 'success' ? 'bg-success' : 'bg-danger'} text-white`}>
        <strong className="me-auto">{message.status === 'success' ? '成功': '失敗'}</strong>
        <button
          type="button"
          className="btn-close"
          onClick={() => handleDismiss(message.id)}
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">{message.text}</div>
    </div>
    ))}
  </div>

  )
}