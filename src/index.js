function createStore(reducer) {
  //抽取出来createStore
  let state=null;
  let listeners = [];
  let subscribe = listener => listeners.push(listener); //订阅，这里可以用来订阅渲染函数
  let getState = () => state;
  let dispatch = action => {
    state = reducer(state, action); //覆盖之前的state
    listeners.forEach(listener => {
      listener();//执行订阅的函数
    });
  };
  dispatch({});
  return { getState, dispatch, subscribe };
}

function stateChanger(state, action) {
    if (!state) {
        //初始化state
        return {
            title: {
              text: "React.js 小书",
              color: "red"
            },
            content: {
              text: "React.js 小书内容",
              color: "blue"
            }
          }
    }

  switch (action.type) {
    case "UPDATE_TITLE_TEXT":
      return {
        // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      };
    case "UPDATE_TITLE_COLOR":
      return {
        // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      };
    default:
      return state; // 没有修改，返回原来的对象
  }
}

function renderAPP(appState, oldAPPState = {}) {
  if (appState === oldAPPState) return;
  console.log("renderAPP");
  renderTitle(appState.title, oldAPPState.title);
  renderContent(appState.content, oldAPPState.content);
}

function renderTitle(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return;
  console.log("renderTitle");
  let titleDOM = document.getElementById("title");
  titleDOM.innerHTML = newTitle.text;
  titleDOM.style.color = newTitle.color;
}

function renderContent(newContent, oldContent = {}) {
  if (newContent === oldContent) return;
  console.log("renderContent");
  let contentDOM = document.getElementById("content");
  contentDOM.innerHTML = newContent.text;
  contentDOM.style.color = newContent.color;
}

const store = createStore(stateChanger);
let oldState = store.getState(); // 缓存旧的 state
store.subscribe(() => {
  let newState = store.getState(); // 数据可能变化，获取新的 state
  renderAPP(newState, oldState); // 把新旧的 state 传进去渲染
  oldState = newState; // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
});

renderAPP(store.getState()); // 首次渲染页面
store.dispatch({ type: "UPDATE_TITLE_TEXT", text: "《React.js 小书》" }); // 修改标题文本
store.dispatch({ type: "UPDATE_TITLE_COLOR", color: "green" }); // 修改标题颜色
