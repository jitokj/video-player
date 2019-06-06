import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../Apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const KEY = 'AIzaSyBSBH1JniRJo1Iy8prgcxDdwBfDD4s7GbQ';
class App extends React.Component {

state = {video: [], selectedVideo: null}

 componentDidMount(){
     this.onTermSubmit('ferrari');
 }

   onTermSubmit = async (term)=>{
    const response = await youtube.get('/search',{
      params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY,
        q: term
      }
      });
     
      this.setState({
          video: response.data.items,
          selectedVideo: response.data.items[0]
                   
        });
   };

   onVideoSelect = (video)=>{
   
this.setState({selectedVideo: video});
}

    render(){
        return (
            <div className =" ui container" style = {{marginTop :'10px'}}>
            <SearchBar onFormSubmit = {this.onTermSubmit} />
            <div className = "ui grid">
            <div className = "ui row">
            <div className = "eleven wide coloumn">
            <VideoDetail video = {this.state.selectedVideo} />
            </div>
            <div className = "five wide coloumn">
            <VideoList onVideoSelect= {this.onVideoSelect} videos = {this.state.video} />
            </div>
            </div>
            </div>
            </div>
            
        )
    }
}

export default App;