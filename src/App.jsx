import { useEffect, useState } from 'react'
import './App.css'

function App() {
 let post = '강남 우동 맛집';
 const [lists, setLists] = useState([
    {title: '남자 코트 추천', cnt: 0, id: 2, date : "2025.12.24. 오후 10:58"},
    {title: '강남 우동 맛집', cnt: 0, id: 1, date : "2025.12.24. 오후 10:23"},
    {title: '파이썬 독학', cnt: 0, id: 0, date : "2025.12.24. 오후 10:20"}
 ]);
 const [modal, setModal] = useState({
  isScreened : false,
  date : null,
  title : null,
  index : null
});
 const [isSorted, setIsSorted] = useState(false);
 const [inValue, setInValue] = useState('');

 const onChangeHandler = (e) =>{
    setInValue(e.target.value);
 }

 const addPostHanlder = () =>{
  if(inValue.trim() != ''){
    const copyLists = lists.map((list)=>({...list}));
    copyLists.unshift({
      title : inValue,
      cnt : 0,
      id : (lists[0].id + 1),
      date : new Date().toLocaleString("ko-KR", 
        { year: "numeric", 
          month: "2-digit", 
          day: "2-digit", 
          hour: "2-digit", 
          minute: "2-digit"})
    });
    setLists(copyLists);
    setInValue("");

  }
  else{
    setInValue("");
    return 0;
  }

 }

 const delHandler = (id) =>{
  setLists(lists.filter(list =>list.id != id));  
 }


 return (
<div className="App">
      <div className="black-nav">
        <h4 style={{color: 'red', fontSize: '16px'}}>ReactBlog</h4>
      </div>
      {
        isSorted 
        ? (
          lists.slice().sort((a, b)=>{
            return a.title.localeCompare(b.title);
          }).map((list, idx)=>{
          return(
            <div className="list" key={`list${idx}`}>
              <h4 onClick={(e)=>{
                if(modal.title === list.title){
                  setModal({
                   isScreened : false,
                   date : null,
                   title : null,
                   index : null
                  });
                }
                else{
                  setModal({
                   isScreened : true,
                   date : list.date,
                   title : list.title,
                   index : list.id
                  });
                }
              }}>{list.title} 
                <span onClick={(e)=>{
                  e.stopPropagation();
                  setLists(lists.map((originList)=>{
                      if(originList.id == list.id){
                        return ({...list, cnt : list.cnt + 1});
                      }
                      else{
                        return originList;
                      }
                  }));
                }}> 좋아요
                </span> {list.cnt} 
              </h4>
              <p>{list.date}</p>
              <button onClick={()=>{delHandler(list.id)}}>삭제하기</button>
            </div>      
          )
        }))
        :lists.map((list, idx)=>{
          return(
            <div className="list" key={`list${idx}`}>
              <h4 onClick={()=>{
                if(modal.title === list.title){
                  setModal({
                   isScreened : false,
                   date : null,
                   title : null,
                   index : null
                  });
                }
                else{
                  setModal({
                   isScreened : true,
                   date : list.date,
                   title : list.title,
                   index : list.id
                  });
                }
              }}>{list.title} 
                <span onClick={(e)=>{
                  e.stopPropagation();
                  let copyLists = lists.map((list)=>({...list}));
                  copyLists[idx].cnt = copyLists[idx].cnt + 1;
                  setLists(copyLists);
                }}> 좋아요
                </span> {list.cnt} 
              </h4>
              <p>{list.date}</p>
              <button onClick={()=>{delHandler(list.id)}}>삭제하기</button>
            </div>      
          )
        })
      }
      <div className='post-box'>
        <input  type="text" 
                onChange={onChangeHandler}
                value={inValue}
                className='add-post'/>
        <button onClick={addPostHanlder}>글 추가</button>
        <button onClick={()=>{
          setIsSorted(!isSorted);
        }}>글정렬</button>
      </div>
      {modal.isScreened && <Modal content={modal} lists={lists} updateTitle={setLists}/>}      
    </div>
  )
}

const Modal = (props)=>{
  return(
      <div className="modal">
        <h4>{props.content.title}</h4>
        <p>{props.content.date}</p>
        <p>상세내용</p>
      </div>
  )
}

export default App
