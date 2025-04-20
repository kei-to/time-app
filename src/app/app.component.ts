import { NgModule, Component, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { TimeElementModel } from './time-element.model';
import localeJa from '@angular/common/locales/ja';

  // ロケールデータを登録
  registerLocaleData(localeJa);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  nowDate: Observable<Date> =new Observable<Date>();
  title = 'time-app';
  now: Date =new Date();
  items: string[] = [];
  timeInput: FormControl= new FormControl('00:00');
  elements: TimeElementModel[] = [];
  dropdownOptions: string[] = ['0', '1', '2', '3', '4', '5', '10'];
  intervalList: ReturnType<typeof setInterval>[] = [];

  ngOnInit() {
    this.nowDate = new Observable((observer) => {
      this.intervalList.push(setInterval(() => {
        observer.next(new Date());
        this.elementsForCheck();
        
      }, 1000));
    });
  }

  ngOnDestroy() {
    this.intervalList.forEach(clearInterval);
  }

  elementsForCheck(): void {
    this.elements.forEach((_, i) => this.checkIfTimeReached(i));
  }

  checkIfTimeReached(index: number): void {
    const element = this.elements[index];
    if (element.alertDisabled) return;
  
    if (element.time < new Date()) {
      element.className = element.className === 'normal' ? 'highlight' : 'normal';
      AppComponent.beep();
    }
  }

  public static beep() {
    // tslint:disable-next-line:max-line-length
    const base64 = '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';
    const sound = new Audio('data:audio/wav;base64,' + base64);
    sound.volume = 0.02;
    sound.play();
  }

  addElement() {
    const index = this.elements.length + 1;
    const now = new Date();
    const newElement: TimeElementModel = {
      label: '00:00',
      time: new Date(now.setHours(0, 0, 0, 0)),
      selectedMinutes: null,
      className: 'normal',
      alertDisabled: true,
    };
    this.elements.push(newElement);
  }

  onElementDisableAlert(index: number) {
    this.elements[index].alertDisabled = true;
    this.updateClassName(index, 'normal');
  }
  
  onElementEnableAlert(index: number) {
    this.elements[index].alertDisabled = false;
    this.updateClassName(index, 'highlight');
  }
  
  onSelectChange(index: number) {
    const element = this.elements[index];
    if (element.selectedMinutes != null) {
      const future = new Date();
      future.setMinutes(future.getMinutes() + Number(element.selectedMinutes));
      element.time = future;
      element.selectedMinutes;
      element.label = this.formatTime(future);
      this.updateTima(index, future );
      this.updateClassName(index, 'normal');
    }
  }

  updateTima(index: number, time: Date ){
    this.elements[index].time =time;
  }

  isValidTimeString(time: string): boolean{
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
  }

  updateClassName(index: number, newClass: 'normal' | 'highlight') {
    this.elements[index].className = newClass;
  }

  formatTime(date: Date): string {
    return formatDate(date, 'HH:mm', 'ja-JP');
  }

  removeElement(index: number): void {
    this.elements.splice(index, 1);
  }

}
