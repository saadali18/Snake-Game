import React,{Component} from 'react';
import './App.css';
import Snake from './snake.js';
import Food from './food.js';
class App extends Component
{
  GenerateRandomNum=()=>
  {
    let min=4;
    let max=96;
    let x=Math.floor((Math.random()*(max -min))+min);
    if(x%4!==0)
    {
      while(x%4!==0)
      {
        x=x+1;
      }
    }
    let y=Math.floor((Math.random()*(max -min))+min);
    if(y%4!==0)
    {
      while(y%4!==0)
      {
        y=y+1;
      }
    }
    return [x,y];
  }
  StartGame=()=>
  {
    return {
      food:this.GenerateRandomNum(),
      direction:"RIGHT",
      speed:200,
      snakedots:[
        [0,0],
        [4,0]
      ]
    }
  }
  constructor()
  {
    super();
    this.state=this.StartGame();
  }
  componentDidMount()
  {
    setInterval(this.MoveSnake, this.state.speed);
    document.onkeydown=this.Onkeydown;
  }
  Onkeydown=(e)=>
  {
    if(this.state.direction==="RIGHT")
    {
      switch (e.keyCode)
      {
        case 38:
          this.setState({direction:"UP"});
          break;
        case 39:
          this.setState({direction:"RIGHT"});
          break;
        case 40:
          this.setState({direction:"DOWN"});
          break;
        default:
          break;
      }
    }
    else if(this.state.direction==="LEFT")
    {
      switch (e.keyCode)
      {
        case 37:
          this.setState({direction:"LEFT"});
          break;
        case 38:
          this.setState({direction:"UP"});
          break;
        case 40:
          this.setState({direction:"DOWN"});
          break;
           default:
          break;
      }
    }
  else if(this.state.direction==="UP")
    {
      switch (e.keyCode)
      {
        case 37:
          this.setState({direction:"LEFT"});
          break;
        case 38:
          this.setState({direction:"UP"});
          break;
        case 39:
          this.setState({direction:"RIGHT"});
          break;
        default:
          break;
      }
    }
    else if (this.state.direction==="DOWN")
    {
      switch (e.keyCode)
      {
        case 37:
          this.setState({direction:"LEFT"});
          break;
        case 39:
          this.setState({direction:"RIGHT"});
          break;
        case 40:
          this.setState({direction:"DOWN"});
          break;
         default:
          break;
      }
    }
      
  }
  MoveSnake=()=>
  {
    let dots=this.state.snakedots;
    let head=dots[dots.length-1];
    switch (this.state.direction)
    {
      case "RIGHT":
        head=[head[0]+4,head[1]];
        break;
      case "LEFT":
        head=[head[0]-4,head[1]];
        break;
      case "UP":
        head=[head[0],head[1]-4];
        break;
      case "DOWN":
        head=[head[0],head[1]+4];
        break;
       default:
          break;
    }
    dots.push(head);
    dots.shift();
    this.setState({snakedots:dots});

  }
  componentDidUpdate()
  {
    this.SnakeHitBoundry();
    this.HeadHitBody();
    this.IsEatFood();
    
  }
  SnakeHitBoundry=()=>
  {
    let dots=this.state.snakedots;
    let head=dots[dots.length-1];
    if(head[0]>=100 || head[0]<0 || head[1]>=100 || head[1]<0 )
    {
        this.Gameover();
    }
  }
  Gameover=()=>
  {
    alert("Game Over");
    this.setState(this.StartGame());
  }
  HeadHitBody=()=>
  {
    if(this.state.snakedots.length>2)
    {
      let dot=[...this.state.snakedots];
      let head=dot[dot.length-1];
      dot.pop();
      dot.forEach(item=>{
        if(head[0]===item[0] && head[1] === item[1])
        {
          this.Gameover();
        }
      })
    }
  }
  IsEatFood=()=>
  {
    let dots=this.state.snakedots;
    let head=dots[dots.length-1];
    let food=this.state.food;
    if(head[0]===food[0] && head[1] === food[1])
    {
      this.setState({
        food:this.GenerateRandomNum()
      })
      dots.unshift([]);
      this.SpeedIncrese();
    }
  }
  SpeedIncrese=()=>
  {
    this.setState({speed:this.state.speed-10});
  }
  render()
  {
    return (
      <div className="area">
        <Snake snakedots={this.state.snakedots}/>
        <Food  food={this.state.food}/>
        <h1 className="header">Score: {(this.state.snakedots.length)-2}</h1>
      </div>
     
    );
  }
}

export default App;
