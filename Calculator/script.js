class Calculator{
    constructor(previousOparandTextElement,currentOparandTextElement){
        
        this.previousOparandTextElement=previousOparandTextElement
        this.currentOparandTextElement=currentOparandTextElement
        this.clear()
    }
    clear(){
        this.currentOparand=''
        this.previousOparand=''
        this.operation= undefined
     
    }
    delete(){
        this.currentOparand= this.currentOparand.toString().slice(0,-1)
    }
    appendNumber(number)
    {
        if (number==='.' &&this.currentOparand.includes('.'))return
      this.currentOparand =this.currentOparand.toString()+number.toString()
    }
    chooseOperation(operation){
        if(this.currentOparand==='')return
        if(this.previousOparand!==''){
            this.compute()
        }
        this.operation=operation
        this.previousOparand=this.currentOparand
        this.currentOparand=''
    }
    compute(){
        let computation
        const prev= parseFloat(this.previousOparand)
        const current= parseFloat(this.currentOparand)
        if (isNaN(prev)||isNaN(current)) return
        switch(this.operation){
            case '+':
                computation= prev+current
                break
            case '-':
                computation= prev-current
                break
            case '*':
                computation= prev*current
                break
            case '÷':
                computation= prev/current
                break
            default:
                return
        }
        this.currentOparand=computation
        this.operation=undefined
        this.previousOparand=''
    }
    getDisplayNumber(number){
        const floatNumber= number.toString()
        const integerDigits= parseFloat(floatNumber.split('.')[0])
        const decimalDigits= floatNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay=''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }
    updateDisplay(){      
        this.currentOparandTextElement.innerText= 
        this.getDisplayNumber(this.currentOparand)
        if(this.operation!=null){
            this.previousOparandTextElement.innerText= 
            `${this.getDisplayNumber(this.previousOparand)} ${this.operation}`
        }else{
            previousOparandTextElement.innerText=''
        }
    }
}

const numberButtons= document.querySelectorAll('[data-number]')
const operationButtons= document.querySelectorAll('[data-operation]')
const equalsButton= document.querySelector('[data-equals]')
const deleteButton= document.querySelector('[data-delete]')
const allClearButton= document.querySelector('[data-all-clear]')
const previousOparandTextElement= document.querySelector('[data-previouse-oparand]')
const currentOparandTextElement= document.querySelector('[data-current-oparand]')


const calculator = new Calculator(previousOparandTextElement, currentOparandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })  
})

operationButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })   
})

equalsButton.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})