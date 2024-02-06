class Controls{
    constructor(controlType){
        this.fr=0
        this.lr=0
        switch(controlType){
            case 2:
                
                break;
            case 1:
                this.#addKeyboardListeners()
                break;
            case 0:
                this.fr=1
                break;
        }
    }
    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "a":
                    this.lr=-1
                    break
                case "d":
                    this.lr=1
                    break
                case "w":
                    this.fr=1
                    break
                case "s":
                    this.fr=-1
                    break  
            }
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case "a":
                case "d":
                    this.lr=0
                    break
                case "w":
                case "s":
                    this.fr=0
                    break  
            }
        }
    }
}
//meow