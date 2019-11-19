let appState = {
    title: {
        text: "React.js 小书",
        color: "red"
    },
    content: {
        text: "React.js 小书内容",
        color: "blue"
    }
};
function dispatch(action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            appState.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            appState.title.color = action.color
            break
        default:
            break
    }
}

function createStore(state,stateChanger) {
    //抽取出来createStore
    let listeners=[]
    let subscribe=(listener)=>listeners.push(listener);
    let getStore=()=>state;
    let dispatch=(action)=>{
        stateChanger(state,action);
        listeners.forEach(listener => {
            listener();
        });
    };
    return {getStore,dispatch,subscribe}
}


function  stateChanger(state,action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            state.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            state.title.color = action.color
            break
        default:
            break
    }
}

function renderAPP(appState) {
    renderTitle(appState.title);
    renderContent(appState.content);
}

function renderTitle(title) {
    let titleDOM = document.getElementById("title");
    titleDOM.innerHTML = title.text;
    titleDOM.style.color = title.color;
}

function renderContent(content) {
    let contentDOM = document.getElementById("content");
    contentDOM.innerHTML = content.text;
    contentDOM.style.color = content.color;
}


let store=createStore(appState,stateChanger);

store.subscribe(()=>renderAPP(store.getStore()));

// renderAPP(store.getStore());

store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《react js 书》' }); //修改标题文字
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'green' }) // 修改标题颜色
// renderAPP(store.getStore());

