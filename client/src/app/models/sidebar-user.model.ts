export class SidebarUser {
  username: string = '';
  isOnline: boolean;
  isInviter: boolean;
  isSelected: boolean;

  constructor(username: string = '', isOnline: boolean = false, isInviter: boolean = false, isSelected: boolean = false) {
    this.username = username;
    this.isOnline = isOnline;
    this.isInviter = isInviter;
    this.isSelected = isSelected;
  }
}