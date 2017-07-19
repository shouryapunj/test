import React, { Component, PropTypes } from 'react';
//import sortBy from 'sort-by';
export default class App extends Component {
 
 constructor(props) {
 super(props); 
 this.state = {
 currentPage: 1,
 pageSize: 10,
 topics: props.topics,
 KeyWord: props.KeyWord,
 SearchTag: "BITSID",
 finalquery: ""
 };
 this.filterTopics = this.filterTopics.bind(this);
 this.filter = this.filter.bind(this);
 this.updateSearchTag = this.updateSearchTag.bind(this);
 this.updatefinalquery = this.updatefinalquery.bind(this);
 }

 filter(topics, input) {
 return topics.filter(topic => {
 return topic[this.state.SearchTag].includes(input);
 });
}

updatefinalquery(evt){
  console.log(evt.target.value);
  this.setState({
    finalquery: evt.target.value
  });
}

updateSearchTag(evt){
 console.log(evt.target.value);
 this.setState({
 SearchTag: evt.target.value
 });
 }

 filterTopics(SearchKey) {
 var filtrdTopis = this.filter(this.props.topics, SearchKey);
 this.setState({topics: filtrdTopis});

 }

 render() {
 const { isMobile } = this.props;
 //var full = window.location.host;
 //   console.log(full);

 return (
 <div>
  <Config pageSize={this.state.pageSize} handlePageSizeChange={this.handlePageSizeChange.bind(this)} />
 
 <Final finalquery={this.state.finalquery} />
 <TopicListing topics={this.state.topics} currentPage={this.state.currentPage} pageSize={this.state.pageSize} />

 </div>
 );
 //<TopicFilter KeyWord={this.state.KeyWord} filterTopics={this.filterTopics} SearchTag={this.state.SearchTag} updateSearchTag={this.updateSearchTag} />
 }
 handlePageSizeChange(e){
 this.setState(
 {
 pageSize: Number(e.target.value),
 currentPage: 1
 }
 )
 return (pageSize)
 } 
}

class Config extends Component {
 render()
 {
 return ( 
 <div>
 <center>
 <h2>Config</h2>
 <label htmlFor="pageSize">Page Size:</label>
 <select id="pageSize" value={this.props.pageSize} onChange={this.props.handlePageSizeChange}>
 <option value="10">10</option>
 <option value="20">20</option>
 <option value="30">30</option>
 <option value="40">40</option>
 <option value="50">50</option>
 <option value="100">100</option>
 </select>
 </center>
 </div>
 );
 }
}

class TopicListing extends Component {
 constructor(props) {
 super(props);
 this.state = {
 currentPage: props.currentPage,
 pageSize: props.pageSize
 };
 }
 componentWillReceiveProps(nextProps) {
 this.setState({
 currentPage: nextProps.currentPage,
 pageSize: nextProps.pageSize,
 data: nextProps.topics
 })
 }

 render()
 {
 var page = this.getPage()
 var topicElements = page.topics.map(function(topic){
 return(
 <tr key = {topic.id}> 
 <td>{topic.sourceTenderId}</td> 
 <td>{topic.tenderId}</td>
 <td>{topic.value}</td>
 <td>{topic.postingDate}</td>
 <td>{topic.purchaserName}</td>
 <td>{topic.originPlace}</td>
 </tr>
 )
 })
 return(
 <div>
 <center>
 <h2>Topic Listing</h2>
 {pager(page)}
 <table id="mytable">
 <thead>
 <tr>
 <th>SourceTenderId</th>
 <th>tenderId</th>
 <th>value</th>
 <th>postingDate</th>
 <th>purchaserName</th>
 <th>originPlace</th>
 </tr>
 </thead>
 <tbody>
 {topicElements}
 </tbody>
 </table>
 {pager(page)}
 </center>
 </div>
 );
 }
 getPage()
 {
 //console.log(this.state.currentPage);
 var start = this.props.pageSize * (this.state.currentPage- 1)
 var end = start + this.props.pageSize
 return {
 currentPage: this.state.currentPage,
 topics: this.props.topics.slice(start,end),
 numPages: this.getNumPages(),
 handleClick: function(pageNum) {
 return function() {this.handlePageChange(pageNum)}.bind(this)
 }.bind(this)
 }
 } 
 getNumPages() {
 var numPages = Math.floor(this.props.topics.length/ this.props.pageSize)
 if (this.props.topics.length % this.props.pageSize > 0){
 numPages++
 }
 return numPages
 }
 handlePageChange(pageNum) {
 this.setState({currentPage: pageNum}
 )
 } 
}


class Final extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      finalquery: this.props.finalquery
    }
     this.handleSubmit = this.handleSubmit.bind(this);
    this.updatefinalquery = this.updatefinalquery.bind(this);
  }
  

handleSubmit() {
 console.log(this.state.finalquery);
 this.setState({
 finalquery: this.state.KeyWord
 }, () => {
//if (typeof(window) !== 'undefined') {
//  window.location = "/?purchaserName=" + this.state.finalquery;
//}
 window.location = "?query=" + this.state.finalquery;
 })

}

updatefinalquery(evt){
 console.log(this.state.SearchTag);
 this.setState({
 KeyWord: evt.target.value
 });
 }

render(){
  return(
    <div>
      <center>
      <h2>Name Query For Filter</h2>
      <input type="text" placeholder="Enter Name in CAPS!" size='40px' name="finalquery" onChange = {this.updatefinalquery} />
      &nbsp;<button type="submit" onClick={this.handleSubmit}>Enter</button>
     </center>

    </div>
  );
}

}
//<input ref="inputId" type="text" name="finalquery" onChange = {this.updatefinalquery} autoFocus onKeyDown={(evt) => {if(evt.keyCode !== 13) return; this.handleSubmit(evt); }}/>
class TopicFilter extends Component{

 constructor(props) {
 super(props);
 
 this.state = {
 KeyWord: this.props.KeyWord,
 SearchKey: this.props.SearchKey,
 SearchTag: this.props.SearchTag
 }
 this.handleSubmit = this.handleSubmit.bind(this);
 this.updateKeyword = this.updateKeyword.bind(this);


 }

 
 
 componentWillReceiveProps(nextProps) {
 this.setState({
 SearchTag: nextProps.SearchTag
 })
 }

 handleSubmit() {
 console.log(this.state.SearchTag);
 this.setState({
 
 SearchKey: this.state.KeyWord
 }, () => {
 console.log(this.state.SearchKey)
 this.props.filterTopics(this.state.SearchKey);
 })

 

}

 updateKeyword(evt){
 console.log(this.state.SearchTag);
 this.setState({
 KeyWord: evt.target.value
 });
 }



 render() {
 console.log(this.state.SearchTag);
 
 var self = this;
 return(
 <div>
 <center>
 <h2>Filter Keywords</h2>
 <label htmlFor = "KeyWord">Keyword</label><br></br>
 <label htmlFor="SearchTag">Search Tag</label><br></br>
 <select id="SearchTag" value={this.state.SearchTag} onChange={(evt) => {
 evt.preventDefault();
 self.props.updateSearchTag(evt);
 }} >
 <option value="BITSID">BITS ID</option>
 <option value="Name">Name</option>
 <option value="MarksMST">Marks MST</option>
 <option value="MarksQuiz">Marks Quiz</option>
 <option value="MarksLab">Marks Lab</option>
 <option value="MarksPCT">Marks PCT</option>
 </select>
 &nbsp;<input ref="inputId" type="text" name="KeyWord" onChange = {this.updateKeyword} autoFocus onKeyDown={(evt) => {if(evt.keyCode !== 13) return; this.handleSubmit(evt); }}/>
 &nbsp;<button type="submit" onClick={this.handleSubmit}>Enter</button>
 </center>
 </div>
 ); 
}


}


function pager(page) {
 var pageLinks = []
 if (page.currentPage > 1) {
 if (page.currentPage > 2) {
 
 pageLinks.push(<span className="pageLink" onClick={page.handleClick(1)}><button type="button" class="btn btn-primary">1</button></span>)
 pageLinks.push(' ')
 if(page.currentPage != 3){
 pageLinks.push(<span className="pageLink" onClick={page.handleClick(page.currentPage - 2)}><button type="button" class="btn btn-primary">←</button></span>)
 pageLinks.push(' ')} 
 }
 pageLinks.push(<span className="pageLink" onClick={page.handleClick(page.currentPage-1)}><button type="button" class="btn btn-primary">{page.currentPage-1}</button></span>)
 pageLinks.push(' ') 
 } 
 
 pageLinks.push(<span className="currentPage"><button type="button" class="btn btn-primary">Page {page.currentPage}</button></span>)
 if (page.currentPage < page.numPages) {
 pageLinks.push(' ')
 pageLinks.push(<span className="pageLink" onClick={page.handleClick(page.currentPage+1)}><button type="button" class="btn btn-primary">{page.currentPage + 1}</button></span>)
 if(page.currentPage < page.numPages - 2){
 pageLinks.push(' ')
 pageLinks.push(<span className="pageLink" onClick={page.handleClick(page.currentPage + 2)}><button type="button" class="btn btn-primary">→</button></span>) 
 } 
 if (page.currentPage < page.numPages - 1) {
 pageLinks.push(' ')
 pageLinks.push(<span className="pageLink" onClick={page.handleClick(page.numPages)}><button type="button" class="btn btn-primary">{page.numPages}</button></span>) 
 }
}

 return <div className="pager">{pageLinks}</div>
}
