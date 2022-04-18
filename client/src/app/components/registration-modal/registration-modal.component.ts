import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgControlStatus, Validators } from '@angular/forms';
import { first, Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent implements OnDestroy {

  form: FormGroup
  submitted = false;

  public isOpen:boolean = false;
  subscription: Subscription;
  private MODAL_NAME: string = 'CreateAccount';

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private modalService: ModalService
) { 

  this.subscription = this.modalService.modalOpened.subscribe(modalName => {
    if (modalName === this.MODAL_NAME) {
      this.form.reset()
      this.isOpen = true;
    }
  });

  this.form = this.formBuilder.group({
    username: ['', Validators.required, Validators.maxLength(15), Validators.pattern("'^\\S*$'")],
    password: ['', [Validators.required, Validators.minLength(6)]]
});
}

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.accountService.register(this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                this.isOpen = false;
              },
              error: error => {
                  console.log(error)
              }
          });
  }
 
  onModalCloseClick(): void {
    this.isOpen = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
