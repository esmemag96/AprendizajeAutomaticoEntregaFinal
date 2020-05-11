import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextService } from '../../services/text.service';
import { Text } from '../../model/Text';

@Component({
  selector: 'app-analize-text',
  templateUrl: './analize-text.component.html',
  styleUrls: ['./analize-text.component.scss']
})
export class AnalizeTextComponent implements OnInit {

  textForm: FormGroup;
  result: string;
  constructor(private textService: TextService, private formBuilder: FormBuilder,

  ) { }
  ngOnInit() {
    this.textForm = this.formBuilder.group({
      input: [''],
    });
  }

  get f() {
    return this.textForm.controls;
  }

  submitText(): void {

    const text: Text = {
      inputText: this.f.input.value,
    };

    this.textService.text(text).subscribe(predictResponse => {
      console.log(predictResponse);
    });
  }
}
