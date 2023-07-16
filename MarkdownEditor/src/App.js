import './App.css';
import React, { Component } from 'react'
import hljs from 'highlight.js'

const marked = require('marked')//this extracts marked(github markdown library) from npm install marked

//to get highlights for github markdown library
marked.setOptions({
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  breaks: true
});

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markdown: previewMessage
        }
    }
    handleChange(event) {
        this.setState({ markdown: event.target.value })
    }
    render() {
        return (
            <div className="App">
                <h1>Markdown Previewer</h1>
                <div className="container">
                    <div className="leftside">
                        <p style={{ textAlign: "center", fontSize: 30 }}>Markdown Input</p>
                        <button onClick={() => this.setState({ markdown: '' })}>Clear content to convert your own markdown</button>
                        <br />
                        <textarea
                                id="editor"
                                as="textarea" placeholder="Enter Markdown"
                                value={this.state.markdown} onChange={this.handleChange.bind(this)}> 
                        </textarea>
                    </div>
                    <div className = "rightside">
                        <p style={{textAlign:"center",fontSize:30}}>Markdown Output</p>
                        <div id="preview" dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }} ></div>
                    </div>
                </div>
            </div>
        );
    }
}

const previewMessage = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![Google](https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png)
`
export default App;



