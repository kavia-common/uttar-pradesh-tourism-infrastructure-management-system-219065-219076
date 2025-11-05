import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  template: `
    <label class="lbl">{{label}}
      <input class="inp" [type]="type" [placeholder]="placeholder" [value]="value"
        (input)="onInput($event)" (blur)="onTouched()" />
    </label>
  `,
  styles: [`
    .lbl { display: block; color: #111827; font-size: 14px; margin-bottom: 8px; }
    .inp {
      width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;
      outline: none;
    }
    .inp:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.2); }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextInputComponent),
    multi: true
  }]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = 'Label';
  @Input() placeholder = '';
  @Input() type: 'text' | 'password' | 'email' = 'text';
  value = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(v: any): void { this.value = v ?? ''; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  onInput(e: any) {
    this.value = e.target.value;
    this.onChange(this.value);
  }
}
