import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BirthDate } from './entities/birth-date.entity';
import { Description } from './entities/description.entity';
import { HelpCall } from './entities/help-call.entity';
import { Note } from './entities/note.entity';
import { Page } from './entities/page.entity';
import { Quote } from './entities/quotes.entity';
import { Schedule } from './entities/schedule.entity';
import { User } from './entities/user.entity';
import { UserType } from './enums/user-type.enum';
import { compare, hash } from 'bcrypt';
import { environment } from './environments/environment';
import { QuoteDto } from './models/quote.model';

@Injectable()
export class AppService {
  
  public bcrypt;
  public saltRounds: number;

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(BirthDate) private birthDateRepo: Repository<BirthDate>,
    @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>,
    @InjectRepository(Note) private noteRepo: Repository<Note>,
    @InjectRepository(Description) private descriptionRepo: Repository<Description>,
    @InjectRepository(Quote) private quoteRepo: Repository<Quote>,
    @InjectRepository(Page) private pageRepo: Repository<Page>,
    @InjectRepository(HelpCall) private helpCallRepo: Repository<HelpCall>,
  ) {
    this.bcrypt = require('bcrypt');
    this.saltRounds = environment.salt_rounds;
  }
  getHello(): string {
    return 'Hello World!';
  }

  async fillDatabase() {
    let original_password: string;
    let hashed_password: string;

    original_password = "admin";
    hashed_password = await this.bcrypt.hash(original_password, this.saltRounds);

    //users
    const admin: User = this.userRepo.create({
      email: "admin@admin.com",
      online: false,
      firstName: "Admin",
      lastName: "",
      gender: "Male",
      phoneNumber: "0948513545",
      password: hashed_password,
      userType: UserType.Admin,
      profilePicturePath: "./assets/Images/ProfilePictures/account_icon.png"
    });
    await this.userRepo.save(admin);

    const adminBirthDate: BirthDate = this.birthDateRepo.create({
      year: 2012,
      month: 6,
      day: 28,
      user: admin
    });
    await this.birthDateRepo.save(adminBirthDate);

    original_password = "123";
    hashed_password = await this.bcrypt.hash(original_password, this.saltRounds);

    const callOperator: User = this.userRepo.create({
      email: "tarmi@ricmi.rs",
      online: false,
      firstName: "Tarmi",
      lastName: "Ricmi",
      gender: "Male",
      phoneNumber: "0948513545",
      password: hashed_password,
      userType: UserType.CallOperator,
      profilePicturePath: "/assets/UserData/user1.png"
    });
    await this.userRepo.save(callOperator);

    const operatorBirthDate: BirthDate = this.birthDateRepo.create({
      year: 2012,
      month: 6,
      day: 28,
      user: callOperator
    });
    await this.birthDateRepo.save(operatorBirthDate);

    original_password = "budala";
    hashed_password = await this.bcrypt.hash(original_password, this.saltRounds);

    const therapist1: User = this.userRepo.create({
      email: "rajko@r.com",
      online: false,
      firstName: "Rajko",
      lastName: "Specko",
      gender: "Female",
      phoneNumber: "2132131241",
      password: hashed_password,
      userType: UserType.Therapist,
      profilePicturePath: "/assets/UserData/user1.png"
    });
    await this.userRepo.save(therapist1);

    const therapist1_BirthDate: BirthDate = this.birthDateRepo.create({
      year: 2022,
      month: 10,
      day: 13,
      user: therapist1
    });
    await this.birthDateRepo.save(therapist1_BirthDate);

    const therapist1_Description: Description = this.descriptionRepo.create({
      descriptionText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique velit vitae magna pretium, vitae euismod libero maximus. Fusce sodales egestas erat. Cras hendrerit venenatis justo, vel ornare justo rhoncus vel. Quisque mauris metus, placerat ac eros at, facilisis viverra orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas tempor ullamcorper ante vitae congue. In aliquam eleifend finibus. In hac habitasse platea dictumst. Nunc vulputate, eros ut viverra eleifend, dolor mi blandit elit, molestie semper ipsum metus at lorem. Nunc faucibus tortor sed nisl aliquet imperdiet. Nullam bibendum eget turpis id rhoncus. Vivamus suscipit vel urna id vulputate. Aliquam sodales vestibulum augue vestibulum mollis.",
      therapist: therapist1
    });
    await this.descriptionRepo.save(therapist1_Description);

    original_password = "123";
    hashed_password = await this.bcrypt.hash(original_password, this.saltRounds);

    const patient1: User = this.userRepo.create({
      email: "nesto@nesto.rs",
      online: false,
      firstName: "Mandrila",
      lastName: "Antic",
      gender: "Male",
      phoneNumber: "0948513545",
      password: hashed_password,
      userType: UserType.Patient,
      profilePicturePath: "/assets/UserData/user1.png",
      therapist: therapist1
    });
    await this.userRepo.save(patient1);

    const patient1_BirthDate: BirthDate = this.birthDateRepo.create({
      year: 2012,
      month: 6,
      day: 28,
      user: patient1
    });
    await this.birthDateRepo.save(patient1_BirthDate);

    const patient1_Note: Note = this.noteRepo.create({
      noteText: "bla blaq bla",
      patient: patient1
    });
    await this.noteRepo.save(patient1_Note);

    original_password = "a";
    hashed_password = await this.bcrypt.hash(original_password, this.saltRounds);

    const patient2: User = this.userRepo.create({
      email: "a",
      online: false,
      firstName: "Mandrilica",
      lastName: "Anticevic",
      gender: "Male",
      phoneNumber: "0948513545",
      password: hashed_password,
      userType: UserType.Patient,
      profilePicturePath: "/assets/UserData/user1.png",
      therapist: therapist1
    });
    await this.userRepo.save(patient2);

    const patient2_BirthDate: BirthDate = this.birthDateRepo.create({
      year: 1389,
      month: 6,
      day: 28,
      user: patient2
    });
    await this.birthDateRepo.save(patient2_BirthDate);

    const patient2_Note: Note = this.noteRepo.create({
      noteText: null,
      patient: patient2
    });
    await this.noteRepo.save(patient2_Note);

    original_password = "ccc";
    hashed_password = await this.bcrypt.hash(original_password, this.saltRounds);

    const patient3: User = this.userRepo.create({
      email: "andrija@gmail.com",
      online: false,
      firstName: "Andrija",
      lastName: "Djordjevic",
      gender: "Male",
      phoneNumber: "0948513545",
      password: hashed_password,
      userType: UserType.Patient,
      profilePicturePath: "/assets/UserData/user1.png",
      therapist: therapist1
    });
    await this.userRepo.save(patient3);

    const patient3_BirthDate: BirthDate = this.birthDateRepo.create({
      year: 1389,
      month: 6,
      day: 28,
      user: patient3
    });
    await this.birthDateRepo.save(patient3_BirthDate);

    const patient3_Note: Note = this.noteRepo.create({
      noteText: null,
      patient: patient3
    });
    await this.noteRepo.save(patient3_Note);

    original_password = "sadsad";
    hashed_password = await this.bcrypt.hash(original_password, this.saltRounds);

    const patient4: User = this.userRepo.create({
      email: "majko@gmail.com",
      online: false,
      firstName: "Josip",
      lastName: "Broz",
      gender: "Male",
      phoneNumber: "3142342342",
      password: hashed_password,
      userType: UserType.Patient,
      profilePicturePath: "/assets/Icons/account_icon.png",
      therapist: null
    });
    await this.userRepo.save(patient4);

    const patient4_BirthDate: BirthDate = this.birthDateRepo.create({
      year: 2004,
      month: 10,
      day: 19,
      user: patient4
    });
    await this.birthDateRepo.save(patient4_BirthDate);

    const patient4_Note: Note = this.noteRepo.create({
      noteText: "nesto nesto nesto nesto nesto nesto nesto nesto nesto nesto nesto ",
      patient: patient4
    });
    await this.noteRepo.save(patient4_Note);

    original_password = "budala";
    hashed_password = await this.bcrypt.hash(original_password, this.saltRounds);

    const therapist2: User = this.userRepo.create({
      email: "b@b.com",
      online: false,
      firstName: "Budaletina",
      lastName: "Kompletna",
      gender: "Male",
      phoneNumber: "2132131241",
      password: hashed_password,
      userType: UserType.Therapist,
      profilePicturePath: "/assets/UserData/user1.png"
    });
    await this.userRepo.save(therapist2);

    const therapist2_BirthDate: BirthDate = this.birthDateRepo.create({
      year: 2022,
      month: 10,
      day: 13,
      user: therapist2
    });
    await this.birthDateRepo.save(therapist2_BirthDate);

    const therapist2_Description: Description = this.descriptionRepo.create({
      descriptionText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique velit vitae magna pretium, vitae euismod libero maximus. Fusce sodales egestas erat. Cras hendrerit venenatis justo, vel ornare justo rhoncus vel. Quisque mauris metus, placerat ac eros at, facilisis viverra orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas tempor ullamcorper ante vitae congue. In aliquam eleifend finibus. In hac habitasse platea dictumst. Nunc vulputate, eros ut viverra eleifend, dolor mi blandit elit, molestie semper ipsum metus at lorem. Nunc faucibus tortor sed nisl aliquet imperdiet. Nullam bibendum eget turpis id rhoncus. Vivamus suscipit vel urna id vulputate. Aliquam sodales vestibulum augue vestibulum mollis.",
      therapist: therapist2
    });
    await this.descriptionRepo.save(therapist2_Description);

    original_password = "budala";
    hashed_password = await this.bcrypt.hash(original_password, this.saltRounds);

    const therapist3: User = this.userRepo.create({
      email: "c@c.com",
      online: false,
      firstName: "Budaletina",
      lastName: "Kompletna",
      gender: "Male",
      phoneNumber: "2132131241",
      password: hashed_password,
      userType: UserType.Therapist,
      profilePicturePath: "/assets/UserData/user1.png"
    });
    await this.userRepo.save(therapist3);

    const therapist3_BirthDate: BirthDate = this.birthDateRepo.create({
      year: 2022,
      month: 10,
      day: 13,
      user: therapist3
    });
    await this.birthDateRepo.save(therapist3_BirthDate);

    const therapist3_Description: Description = this.descriptionRepo.create({
      descriptionText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique velit vitae magna pretium, vitae euismod libero maximus. Fusce sodales egestas erat. Cras hendrerit venenatis justo, vel ornare justo rhoncus vel. Quisque mauris metus, placerat ac eros at, facilisis viverra orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas tempor ullamcorper ante vitae congue. In aliquam eleifend finibus. In hac habitasse platea dictumst. Nunc vulputate, eros ut viverra eleifend, dolor mi blandit elit, molestie semper ipsum metus at lorem. Nunc faucibus tortor sed nisl aliquet imperdiet. Nullam bibendum eget turpis id rhoncus. Vivamus suscipit vel urna id vulputate. Aliquam sodales vestibulum augue vestibulum mollis.",
      therapist: therapist3
    });
    await this.descriptionRepo.save(therapist3_Description);

    original_password = "budala";
    hashed_password = await this.bcrypt.hash(original_password, this.saltRounds);

    const therapist4: User = this.userRepo.create({
      email: "d@d.com",
      online: false,
      firstName: "Cisti",
      lastName: "Slepac",
      gender: "Female",
      phoneNumber: "2132131241",
      password: hashed_password,
      userType: UserType.Therapist,
      profilePicturePath: "/assets/UserData/user1.png"
    });
    await this.userRepo.save(therapist4);

    const therapist4_BirthDate: BirthDate = this.birthDateRepo.create({
      year: 2022,
      month: 10,
      day: 13,
      user: therapist4
    });
    await this.birthDateRepo.save(therapist4_BirthDate);

    const therapist4_Description: Description = this.descriptionRepo.create({
      descriptionText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique velit vitae magna pretium, vitae euismod libero maximus. Fusce sodales egestas erat. Cras hendrerit venenatis justo, vel ornare justo rhoncus vel. Quisque mauris metus, placerat ac eros at, facilisis viverra orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas tempor ullamcorper ante vitae congue. In aliquam eleifend finibus. In hac habitasse platea dictumst. Nunc vulputate, eros ut viverra eleifend, dolor mi blandit elit, molestie semper ipsum metus at lorem. Nunc faucibus tortor sed nisl aliquet imperdiet. Nullam bibendum eget turpis id rhoncus. Vivamus suscipit vel urna id vulputate. Aliquam sodales vestibulum augue vestibulum mollis.",
      therapist: therapist4
    });
    await this.descriptionRepo.save(therapist4_Description);

    //schedules
    const schedule1: Schedule = this.scheduleRepo.create({
      date: "16.1.2023.",
      appointmentNumber: 0,
      patient: patient1,
      therapist: therapist1,
    });
    await this.scheduleRepo.save(schedule1);

    const schedule2: Schedule = this.scheduleRepo.create({
      date: "16.1.2023.",
      appointmentNumber: 1,
      patient: patient2,
      therapist: therapist1,
    });
    await this.scheduleRepo.save(schedule2);

    const schedule3: Schedule = this.scheduleRepo.create({
      date: "16.1.2023.",
      appointmentNumber: 2,
      patient: patient2,
      therapist: therapist1,
    });
    await this.scheduleRepo.save(schedule3);

    const schedule4: Schedule = this.scheduleRepo.create({
      date: "16.1.2023.",
      appointmentNumber: 3,
      patient: patient3,
      therapist: therapist1,
    });
    await this.scheduleRepo.save(schedule4);

    const schedule5: Schedule = this.scheduleRepo.create({
      date: "16.1.2023.",
      appointmentNumber: 4,
      patient: patient3,
      therapist: therapist1,
    });
    await this.scheduleRepo.save(schedule5);

    const schedule6: Schedule = this.scheduleRepo.create({
      date: "16.1.2023.",
      appointmentNumber: 5,
      patient: patient3,
      therapist: therapist1,
    });
    await this.scheduleRepo.save(schedule6);

    const schedule7: Schedule = this.scheduleRepo.create({
      date: "16.1.2023.",
      appointmentNumber: 6,
      patient: patient3,
      therapist: therapist1,
    });
    await this.scheduleRepo.save(schedule7);

    const schedule8: Schedule = this.scheduleRepo.create({
      date: "17.1.2023.",
      appointmentNumber: 4,
      patient: patient1,
      therapist: therapist1,
    });
    await this.scheduleRepo.save(schedule8);

    const schedule9: Schedule = this.scheduleRepo.create({
      date: "17.1.2023.",
      appointmentNumber: 5,
      patient: patient2,
      therapist: therapist1,
    });
    await this.scheduleRepo.save(schedule9);

    //helpCalls
    const helpCall1: HelpCall = this.helpCallRepo.create({
      guestName: "Lik1",
      guestPhoneNumber: "0649807810",
      processed: false
    });
    await this.helpCallRepo.save(helpCall1);

    const helpCall2: HelpCall = this.helpCallRepo.create({
      guestName: "Lik2",
      guestPhoneNumber: "5555555555",
      processed: false
    });
    await this.helpCallRepo.save(helpCall2);

    const helpCall3: HelpCall = this.helpCallRepo.create({
      guestName: "Lik3",
      guestPhoneNumber: "0948513545",
      processed: false
    });
    await this.helpCallRepo.save(helpCall3);

    const helpCall4: HelpCall = this.helpCallRepo.create({
      guestName: "Lik4",
      guestPhoneNumber: "4444444444",
      processed: false
    });
    await this.helpCallRepo.save(helpCall4);

    const helpCall5: HelpCall = this.helpCallRepo.create({
      guestName: "Lik5",
      guestPhoneNumber: "4343545646",
      processed: false
    });
    await this.helpCallRepo.save(helpCall5);

    const helpCall6: HelpCall = this.helpCallRepo.create({
      guestName: "Lik6",
      guestPhoneNumber: "2132131231",
      processed: false
    });
    await this.helpCallRepo.save(helpCall6);

    const helpCall7: HelpCall = this.helpCallRepo.create({
      guestName: "Lik7",
      guestPhoneNumber: "2222222222",
      processed: false
    });
    await this.helpCallRepo.save(helpCall7);

    const helpCall8: HelpCall = this.helpCallRepo.create({
      guestName: "Lik8",
      guestPhoneNumber: "2333333333",
      processed: false
    });
    await this.helpCallRepo.save(helpCall8);

    //quotes
    const quote1: Quote = this.quoteRepo.create({
      quoteText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra interdum magna, id dapibus magna dignissim et. Curabitur quis aliquet lorem, eget venenatis felis. Sed sed libero metus. Nullam sed lorem vel sem lobortis vestibulum. Praesent id neque eget est molestie imperdiet.",
      patient: patient1
    });
    await this.quoteRepo.save(quote1);

    const quote2: Quote = this.quoteRepo.create({
      quoteText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra interdum magna, id dapibus magna dignissim et. Curabitur quis aliquet lorem, eget venenatis felis. Sed sed libero metus. Nullam sed lorem vel sem lobortis vestibulum. Praesent id neque eget est molestie imperdiet.",
      patient: patient2
    });
    await this.quoteRepo.save(quote2);

    //page
    const page1: Page = this.pageRepo.create({
      title: "Home",
      route: "",
      permissions: [0, 1, 2, 3, 4]
    });
    await this.pageRepo.save(page1);

    const page2: Page = this.pageRepo.create({
      title: "Register",
      route: "register",
      permissions: [0, 1, 2, 3, 4]
    });
    await this.pageRepo.save(page2);

    const page3: Page = this.pageRepo.create({
      title: "Operator Dashboard",
      route: "operator-dashboard",
      permissions: [0, 3]
    });
    await this.pageRepo.save(page3);

    const page4: Page = this.pageRepo.create({
      title: "Therapist page",
      route: "therapist",
      permissions: [0, 1]
    });
    await this.pageRepo.save(page4);

    const page5: Page = this.pageRepo.create({
      title: "Patient page",
      route: "patient",
      permissions: [0, 2]
    });
    await this.pageRepo.save(page5);

    const page6: Page = this.pageRepo.create({
      title: "Admin page",
      route: "admin-page",
      permissions: [0]
    });
    await this.pageRepo.save(page6);

  }

  async getPages() : Promise<Page[]>{
    return await this.pageRepo.createQueryBuilder("page").getMany();
  }

  async getQuotes(): Promise<QuoteDto[]>{
    let result: QuoteDto[] = [];
    let quotes: Quote[] = await this.quoteRepo.createQueryBuilder("quote")
      .leftJoinAndSelect("quote.patient", "patient")
      .getMany();
    quotes.forEach(quote => {
      result.push({
        userName: `${quote.patient.firstName} ${quote.patient.lastName}`,
        quoteText: quote.quoteText,
        profilePicture: environment.server_own_url + environment.user_path_to_profile_picture + quote.patient.profilePicturePath
      });
    })
    return result;
  }

}
