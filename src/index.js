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

renderAPP(appState);


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
    contentDOM.style.olor = content.color;
}


