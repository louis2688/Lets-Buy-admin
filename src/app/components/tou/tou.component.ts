import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/service/serverService';

@Component({
  selector: 'app-tou',
  templateUrl: './tou.component.html',
  styleUrls: ['./tou.component.css'],
  providers:[ServerService]
})
export class TOUComponent implements OnInit {

  dataModel:string;
  
  constructor(private service: ServerService) { }

  ngOnInit() {
      this.service.Get_TOU().then(x=>{
         if(x.isOk){
           this.dataModel = x.Singel;
         }
      })

  }

  Save(){
    this.service.Update_TOU(this.dataModel).then(x=>{
      if(x.isOk){
        this.dataModel = x.Singel;
      }
    })
  }

}
