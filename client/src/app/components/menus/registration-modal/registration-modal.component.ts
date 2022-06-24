import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/services/modal.service';
import { Response } from 'src/app/models/response.modal';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { AlertType } from 'src/app/models/alert-type.model';

@Component({
  selector: 'registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent implements OnDestroy {
  alertTypes = AlertType;

  private MODAL_NAME: string = 'CreateAccount';

  public form: FormGroup
  submitted = false;

  public isOpen:boolean = false;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private modalService: ModalService,
    private alertService: AlertService) { 

  this.subscription = this.modalService.modalOpened.subscribe(modalName => {
    if (modalName === this.MODAL_NAME) {
      this.openModal();
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

      const user = new User(this.f['username'].value, this.f['password'].value, '');

      this.accountService.register(user, (regResponse: Response) => {

        if (regResponse.isError) {
          this.alertService.writeError(regResponse.message, AlertType.Modal);
        } else {

          this.accountService.login(user, (response: Response) : void => {
            if (response.isError) {
              this.alertService.writeError(response.message, AlertType.Modal);
            } else {
              
              this.accountService.saveUser(user)
              this.closeModal();
            }
          });
        }
      });
  }
 
  onModalCloseClick(): void {
    this.closeModal();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private openModal(): void {
    this.form.reset();
    this.isOpen = true;
  }

  private closeModal(): void {
    this.isOpen = false;
    this.alertService.clear(AlertType.Modal);
    this.modalService.closeModal(this.MODAL_NAME);
  }
}
