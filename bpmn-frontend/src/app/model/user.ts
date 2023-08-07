
export class User {
  public  userId :string ;
  public  firstName :string ;
  public  lastName :string ;
  public  username : string;
  public lastLoginDate: Date | null = null;
  public  email : string;
  public  lastLoginDateDisplay :Date | null = null;
  public  joinDate :Date | null = null;
  public  profileImageUrl :string;
  public  active : boolean;
  public  notLocked : boolean ;
  public  role : string;
  public category: string;
  public  authorities :[];

  constructor(){
      this.userId = '' ;
      this.firstName='' ;
      this.lastName='' ;
      this.username='' ;
      this.email='' ;
      this.lastLoginDate=null;
      this.lastLoginDateDisplay = null;
      this.joinDate= null;
      this.profileImageUrl='' ;
      this.active= false ;
      this.notLocked = false ;
      this.role='' ;
      this.category='' ;
      this.authorities= [];
  }
}
