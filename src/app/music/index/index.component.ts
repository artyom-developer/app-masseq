import { Component, OnInit } from '@angular/core';

import { MusicService } from '../music.service';
import { AuthTokenService } from '../auth-token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  tokenSotify: string = ""  
  txtBuscador: string = "prueba"  
  imageDefault = "https://www.scdn.co/i/_global/twitter_card-default.jpg"
  listArtist = []
  listTracks = []
  dataArtist:any = {  }
  dataTracks:any = {  }
  showPart = 1

  urlAPI = "https://api.spotify.com/v1/search?q=$buscar&type=track%2Cartist&market=ES&limit=20&offset=5"

  constructor( 
    public authTokenService: AuthTokenService,
    public musicService: MusicService,
    ) { }

    ngOnInit(): void {

      this.authTokenService.authToekn().subscribe((data:any)=>{
        this.tokenSotify = data.access_token   
      })
      
    }

    onClickPart(num){
      this.showPart = num
    }
  
    onTestData(token){
      const urlTest = "https://api.spotify.com/v1/search?q=shakira&type=track%2Cartist&market=ES&limit=20&offset=5"
      this.musicService.get(urlTest,token).subscribe((data:any)=>{   
        console.log(data) 
        this.listArtist = data.artists.items
        this.listTracks = data.tracks.items
      })
    }

    onChangeTextSearch(value){ 
      this.txtBuscador=value 
    }
  
    onClickBuscar(){
      if(this.txtBuscador.length>=1){
        const ulr = this.urlAPI.replace('$buscar', this.txtBuscador)
        this.onLoadDataMusic(ulr)
      }
    }

    onClickNext(){
      if(this.showPart==1){ 
        this.onLoadDataMusic(this.dataArtist.next)
      }
      else{
        this.onLoadDataMusic(this.dataTracks.next)
      }
    }

    onClickPrev(){
      if(this.showPart==1){ 
        this.onLoadDataMusic(this.dataArtist.previous)
      }
      else{
        this.onLoadDataMusic(this.dataTracks.previous)
      }
    }

    onLoadDataMusic(urlapiMusic){
      console.log(urlapiMusic)
      this.musicService.get(urlapiMusic,this.tokenSotify).subscribe((data:any)=>{   
        console.log(data) 
        if(data.tracks){
          this.dataTracks = data.tracks
          this.listTracks = data.tracks.items
        }
        if(data.artists){
          this.dataArtist = data.artists 
          this.listArtist = data.artists.items
        }
      })
    }

}
