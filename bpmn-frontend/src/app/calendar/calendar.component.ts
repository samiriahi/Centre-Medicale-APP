import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, EventDragStopArg } from '@fullcalendar/interaction';
import { PatientService } from '../service/patient.service';
import { Patient } from '../model/patient';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { RoomService } from '../service/room.service';
import { BpmnService } from '../service/bpmn.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../service/exam.service';
import { ConsultationService } from '../service/consultation.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  fileInput!: HTMLInputElement;

  consultationForm!: FormGroup

  steps: string[] = []
  eventsF: any[]= [];
  events: any[]= [];

  activeIndex: number = 0;
  doctorNotAvailableInThisHour: boolean = false;
  consultationDetails!: any;

  constructor(private patientService: PatientService, private userService: UserService, private examService: ExamService,
     private roomService: RoomService, private bpmService: BpmnService, private fb: FormBuilder, private consultationService: ConsultationService){}

  ngAfterViewInit(): void {
    this.fileInput = document.getElementById('fileInput') as HTMLInputElement;

    //this.scanBpmn()
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllPatients();
    this.getMedecins();
    this.getAllRooms();
    this.getAllExams()
    this.getAllConsultation()

  }

  visible!: boolean;
  patients: Patient[] = [];
  medecins: User[] = [];
  rooms: any[] = [];
  exams: any[] = []
  selectedDate!: string;
  details!: boolean;
  patientDetails!: any;

  calendarOptions: CalendarOptions = {
    dayMaxEvents: 2,
    initialView: 'dayGridMonth',
    height: "85vh",
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.addEvent.bind(this),
    eventTimeFormat: {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit"
    },
    eventClick: this.handleEventClick.bind(this),

  };

  getAllExams(){
    this.examService.getAllExams().subscribe((exams: any[])=>{
      console.log(exams);
      this.exams = exams
    })
  }

  getConsultationDetails(id: number){
    this.consultationService.getConsultationById(id).subscribe(data=>{
      console.log(data);
      this.consultationDetails = data;

    })
  }

  handleEventClick(args: any){
    console.log(args);
    this.getConsultationDetails(parseInt(args.event.id));
    this.details = true;

  }

  closeDetails(){
    this.details = false;
  }

  addEvent(args: any){
    this.visible = true
    this.selectedDate = args.dateStr;
    this.consultationForm.patchValue({
      date: this.selectedDate
    })
    //this.scanBpmn();
    console.log(args.dateStr);
  }

  getAllPatients(){
    this.patientService.getPatients().subscribe(patient=>{
      console.log(patient);
      this.patients = patient as Patient[]
    })
  }

  getMedecins(){
    this.userService.getUsers().subscribe(users=>{
      const medecins = users as User[];
      this.medecins = medecins.filter(user => user.category == "Medecin");
      console.log(this.medecins);

    })
  }

  getAllRooms(){
    this.roomService.getAllRooms().subscribe((rooms: any[])=>{
      this.rooms = rooms
      console.log(this.rooms);

    })
  }


  async globalFunc(tab: any[]) {
    let current = tab[0];
    current.next = current.outgoing;
    console.log(current.name);
    this.addElementToList(current.type);

    let i = 1;
    while (i < tab.length - 1) {
      if (tab[i].incoming.find((elt: string) => elt === current.next)) {
        current = tab[i];
        if (current.type === 'activity') {
          // await this.bpmService.saveBpmnStep(current) // Enregistrer l'élément actuel dans la base de données
          // .subscribe(
          //   () => console.log('Étape enregistrée avec succès :', current),
          //   (error: any) => console.error('Erreur lors de l\'enregistrement de l\'étape :', error)
          // );
          this.addElementToList(current.name);
          current.next = current.outgoing[0];
          this.steps.push(current.name)
          console.log(current.name);
        } else if (current.type === 'test') {
          if (current.name === ' age<3?') {
            const input = await this.promptModal(current.name);
            current.next = parseInt(input) < 3 ? current.outgoing[0] : current.outgoing[1];
          } else {
            const input = await this.customModal(current.name);
            current.next = input === 'yes' ? current.outgoing[0] : current.outgoing[1];
          }
        } else if (current.type === 'convergence') {
          current.next = current.outgoing[0];
        }
        i = 1;
      } else {
        i++;
      }
    }
    this.addElementToList(tab[tab.length - 1].type);
    console.log(this.steps);

  }

  customModal(message: string): Promise<string> {
    return new Promise((resolve) => {
      const modal = document.getElementById("myModal")!;
      const modalText = document.getElementById("modal-text")!;
      const modalYes = document.getElementById("modal-yes")!;
      const modalNo = document.getElementById("modal-no")!;

      modalText.textContent = message;
      modal.style.display = "block";

      modalYes.addEventListener("click", () => {
        modal.style.display = "none";
        resolve("yes");
      });

      modalNo.addEventListener("click", () =>{

        modal.style.display = "none";
        resolve("no");
    });
    });
  }
    promptModal(message: string): Promise<string> {
      return new Promise((resolve) => {
        const modal1 = document.getElementById("promptModal")!;
        const modalText = document.getElementById("modal-text1")!;
        const modalOk = document.getElementById("modalOKBtn")!;
        const modalInput = document.getElementById("modalInput") as HTMLInputElement;
        modalInput.placeholder = "Entrez votre âge";
        modalText.textContent = message;
        modal1.style.display = "block";

        modalOk.addEventListener("click", () => {
          const inputVal = modalInput.value;
          modal1.style.display = "none";
          resolve(inputVal);
        });
      });
    }

    addElementToList(elt: string) {
      const listItem = document.createElement("li");
      listItem.textContent = elt;
      document.getElementById("etapes")?.appendChild(listItem);
    }

    getBlocsFromXml(type: string, tab: HTMLCollectionOf<Element>) {
      const array: any[] = [];
      for (let i = 0; i < tab.length; i++) {
        const bloc: any = {};
        const name = tab[i].getAttribute("name");
        bloc.name = name;
        bloc.outgoing = [];
        bloc.incoming = [];
        const outgoing = tab[i].getElementsByTagName('bpmn:outgoing');
        const incoming = tab[i].getElementsByTagName('bpmn:incoming');
        for (let outI = 0; outI < outgoing.length; outI++) {
          const element = outgoing[outI].innerHTML;
          bloc.outgoing.push(element);
        }
        for (let outI = 0; outI < incoming.length; outI++) {
          const element = incoming[outI].innerHTML;
          bloc.incoming.push(element);
        }
        bloc.type = type;
        array.push(bloc);
      }
      return array;
    }

    scanBpmn(event: any){
      // this.fileInput?.addEventListener('change', () => {
        console.log("enter");

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(reader.result as string, "text/xml");

          const steps = xmlDoc.getElementsByTagName("bpmn:userTask");
          const exclusiveGateway = xmlDoc.getElementsByTagName("bpmn:exclusiveGateway");
          const parallelGateway = xmlDoc.getElementsByTagName("bpmn:parallelGateway");

          const comparators = [...this.getBlocsFromXml('test', exclusiveGateway)];
          const convergence = [...this.getBlocsFromXml('convergence', parallelGateway)];
          const stepsArray = [...this.getBlocsFromXml('activity', steps)];

          const startEvent: any = { type: 'debut' };
          const endEvent: any= { type: 'fin' };

          startEvent.outgoing = xmlDoc.getElementsByTagName("bpmn:startEvent")[0].getElementsByTagName('bpmn:outgoing')[0].innerHTML;
          endEvent.incoming = xmlDoc.getElementsByTagName("bpmn:endEvent")[0].getElementsByTagName('bpmn:incoming')[0].innerHTML;

          const simulationArray = [startEvent, ...comparators, ...convergence, ...stepsArray, endEvent];
          console.log(simulationArray);

          this.globalFunc(simulationArray);
        };
        reader.readAsText(file);
      // });
    }

    initForm(){
      this.consultationForm = this.fb.group({
        patient: [""],
        room: [""],
        doctor: [""],
        hour: [""],
        exam: [""],
        date: [""]
      })
    }

    submitForm(){
      console.log(this.consultationForm.value);

      let consultation: any = {}
      consultation.patient = this.consultationForm.value.patient.firstName
      consultation.room = this.consultationForm.value.room.room_Name
      consultation.doctor = this.consultationForm.value.doctor.firstName
      consultation.hour = this.consultationForm.value.hour
      consultation.exam = this.consultationForm.value.exam.medExamName
      consultation.date = this.consultationForm.value.date
      consultation.steps = this.steps.join()

      let tab = this.eventsF.filter(value=>
        value.doctor == consultation.doctor
      )

      if(tab.some(v=>v.date == consultation.date && v.hour ==consultation.hour )){
        this.doctorNotAvailableInThisHour = true
        return;
      }else{
        this.consultationService.addNewConsultation(consultation).subscribe(data=>{
          console.log(data);
          this.visible = false;
          this.steps = [];
          this.activeIndex = 0;
          this.consultationForm.reset();
          this.doctorNotAvailableInThisHour = false
          this.getAllConsultation()

        })
      }





    }

    getAllConsultation(){
      this.consultationService.getAllConsultation().subscribe((data:any[])=>{
        console.log(data);
        this.eventsF=data;
        data.forEach(e=>{
          this.events.push({title: `${e.patient}`, start: `${e.date}T${e.hour}`, id: e.id})
        })

        this.calendarOptions.events = this.events;
        console.log(this.calendarOptions.events);

      })
    }        

}
