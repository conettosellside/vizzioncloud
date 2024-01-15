import { Component, OnInit } from '@angular/core';
import {
  IMqttMessage,
  IMqttServiceOptions,
  MqttService,
  IPublishOptions,
} from 'ngx-mqtt';
import { IClientSubscribeOptions } from 'mqtt-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private subscription: Subscription;
  public message!: string;
  public checkedButtom: boolean = false;

  constructor(private _mqttService: MqttService) {
    this.subscription = this._mqttService.observe('1').subscribe((message: IMqttMessage) => {
      this.message = this.receiveImage(message.payload)
      if (this.message != null) {
        this.checkedButtom = true;
        return
      }
    });
  }

  public checkStatus(){
    if(this.checkedButtom){
      console.log('conectando');
      this.unsafePublish('esp32/cam/control', 'conectar');
    }else{
      console.log('desconectando');
      this.unsafePublish('esp32/cam/control', 'desconectar');
    }
  }

  private receiveImage = (binaryData: ArrayBuffer) => {
    const blob = new Blob([binaryData], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, { qos: 0, retain: true });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}