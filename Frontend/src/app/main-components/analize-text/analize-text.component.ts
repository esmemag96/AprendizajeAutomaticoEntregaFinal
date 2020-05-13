import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TextService } from "../../services/text.service";
import { Text } from "../../model/Text";

@Component({
  selector: "app-analize-text",
  templateUrl: "./analize-text.component.html",
  styleUrls: ["./analize-text.component.scss"],
})
export class AnalizeTextComponent implements OnInit {
  textForm: FormGroup;
  resultScore: string;
  resultKeys: Array<string>;
  // Handle Loading
  isLoadingAnalisis: boolean;
  // Handle Error
  analisisError: boolean;
  errorMessage: boolean;

  constructor(
    private textService: TextService,
    private formBuilder: FormBuilder
  ) {
    this.isLoadingAnalisis = false;
    this.analisisError = false;
  }
  ngOnInit() {
    this.textForm = this.formBuilder.group({
      input: ["", Validators.required],
    });
  }

  get f() {
    return this.textForm.controls;
  }

  submitText(): void {
    this.isLoadingAnalisis = true;
    this.analisisError = false;
    this.errorMessage = null;

    const text: Text = {
      inputText: this.f.input.value,
    };

    this.textService.text(text).subscribe(
      (predictResponse) => {
        this.isLoadingAnalisis = false;
        this.resultScore = predictResponse[0].documents[0].score;
        this.resultScore = String(Math.round((Number(this.resultScore) * 100) * 100)/100);
        this.resultKeys = predictResponse[1].documents[0].keyPhrases;
        return this.resultScore;
        console.log(predictResponse);
      },
      (err) => {
        this.isLoadingAnalisis = false;
        this.analisisError = true;
        this.errorMessage = err.statusText;

        setTimeout(() => {
          this.analisisError = false;
          this.errorMessage = null;
        }, 3000);
        console.log("HTTP Error", err);
      }
    );
  }
}
