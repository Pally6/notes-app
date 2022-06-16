export class Note {
    public name: string;
    public tasks: string[] | any;
    
  
    constructor(title: string, tasks: string[]) {
      this.name = title;
      this.tasks = tasks;
    }
}