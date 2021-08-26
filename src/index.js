import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Button extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    onClick(){
        if(this.props.selectedIndex!=this.props.index){
            this.props.selectButton(this.props.index, this.props.value)
        }
    }
    render()
    {
        return(
            <div className={this.props.selectedIndex===this.props.index ? "panelButtonClicked" : "panelButton"}
                 onClick={()=>this.onClick()}>
                    <img 
                        className="image"
                        src={"/images/" + this.props.value + ".png"}
                    />
                    <div className="textPanel">
                        {this.props.value}    
                    </div>
                </div>   
        );
    }
}

class Panel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedIndex: this.props.currentButton,
        }
    }

    selectButton=(index, name)=>
    {
        this.setState({selectedIndex: index});
        this.props.handleChanger(index, name);
    }

    renderButton(name, index){
        return <Button 
                    value={name} 
                    index= {index}
                    selectedIndex = {this.state.selectedIndex}
                    selectButton = {this.selectButton}
                />;
    }
    render() {
        let name= this.props.isPanelShow ? "panel" : "panelMini";
        return(
            <div className={name}>
                <div className="headerPanel"> 
                    <img 
                        className="imageHeader"
                        src="/images/logo.png"
                    />
                    <div className="headerPanelText">КОМПАНИЯ</div>
                </div>
                    {this.renderButton('Каталог', 0)}
                    {this.renderButton('Здоровье', 1)}
                    {this.renderButton('Красота', 2)}
                    {this.renderButton('Развлечения', 3)}
                    {this.renderButton('Авто', 4)}         
            </div>   
        );
    }
}

class ItemContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    render()
    {
        return(
            <div className="itemContent">
                <text >
                {this.props.index} элемент из категории {this.props.typeOfItem}
                </text>
            </div>
        );
    }
}

class Content extends React.Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    renderItem(i){
        return(
            <ItemContent typeOfItem={this.props.header}
                         index = {i}
            />
        );
    }
    render() {

        let items=[];
        let coutnItems=12;
        for(var i=0;i<coutnItems;i++){
            items.push(this.renderItem(i+1));
        }
        let nameImage="showImage"
        if(this.props.mode=="Max") nameImage="showImageNone"
        
        return (
            <div className="content">
                <div onClick={()=>this.props.showPanel()}>
                    <img className={nameImage}
                         src="/images/ShowButton.png"
                    />
                </div>
                <h2 className= {this.props.mode != "Mini" ? "contentHeader" : "contentHeaderMini"}>{this.props.header}</h2>
                <Searcher />
                <hr/>
                <div className="contentTable">
                    {items}
                </div>
            </div>
        );
    }
}
class Searcher extends React.Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    handleSubmit=(event)=>{
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input className="searchForm"
                           type="text" 
                           id="filter"
                           placeholder="Какой магазин вам нужен?"
                    />
                </form>
            </div>
        )
    }
}
class Main extends React.Component {
    constructor(props){
        super(props);
        this.state={
            currentButton:0,
            contentName: "Каталог",
            isPanelShow: false,
            isMax: false
        }
    }

    componentDidMount(){
        if(window.innerWidth > 800){
            this.setState({isPanelShow: true, isMax: true})
        }
    }

    showPanel=()=>{
        this.setState({isPanelShow:!this.state.isPanelShow})
    }

    handleChanger=(index,name)=>
    {
        this.setState({currentButton: index});
        this.setState({contentName: name})
    }

    render() {
        let mode = "Mini"
        if(this.state.isMax) mode="Max"
        console.log(this.state.isMax)

        return(
        <div className="main">
            <Panel  currentButton={this.state.currentButton}
                    name={this.state.contentName}
                    handleChanger={this.handleChanger}
                    isPanelShow={this.state.isPanelShow}
            /> 
            <Content index={this.state.currentButton}
                     header={this.state.contentName}
                     mode={mode}
                     showPanel={this.showPanel}
            />
        </div>
        );
    }
}
  
  // ========================================
  
  ReactDOM.render(
    <Main />,
    document.getElementById('root')
  );

