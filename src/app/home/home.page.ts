import { Component } from '@angular/core';

import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private speechRecognition: SpeechRecognition, private tts: TextToSpeech) {}

  test(){

    

    this.speechRecognition.isRecognitionAvailable().then((available: boolean) => {
      if(available){
        this.speechRecognition.requestPermission().then(
          () => {
            this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
              if(hasPermission){
                this.speechRecognition.startListening({language: "en-US",
                                                  matches: 1,
                                                  showPartial: true
                                                })
                .subscribe((matches: string[]) => {
                        this.tts.speak({
                          text: matches[0],
                          locale: 'en-US',
                          rate: 0.7})
                        .then(() => console.log('Success'))
                        .catch((reason: any) => alert(reason));
                      },
                      (onerror) => {
                        alert('error:' + onerror)
                      });
         
              }else{
                alert("Has no permision");
              }
            });
         
          },
          () => alert('Denied'));
      }else{
        alert("Not available");
      }
    });

    

      
    


    

    

  }

}
