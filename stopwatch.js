const stopwatch = document.querySelector('.app-header-timer')
const inputNameTask = document.querySelector('#app-header-task-name')
const startButton = document.querySelector('.start-button')
const pauseButton = document.querySelector('.pause-button')
const pauseStartButton = document.querySelector('#pause-start-button')
const restartButton = document.querySelector('.restart-button')
let seconds = 0, stopwatchIncrease = null

function stopwatchStart(){
    if(stopwatchIncrease === null){
        stopwatchIncrease = setInterval(() => {

            seconds++

            let hours = Math.floor(seconds / 3600)
            let min = Math.floor((seconds % 3600) / 60)
            let sec = Math.floor(seconds % 60)

            let formattedTime = 
                String(hours).padStart(2, '0') + ':'+
                String(min).padStart(2, '0') + ':'+
                String(sec).padStart(2, '0');

            stopwatch.innerHTML = formattedTime
            
            }, 1000)
    }   
}

function changeButton(){
    if (pauseStartButton.classList.contains('start-button') && inputNameTask.value.trim() !== '') {
        pauseStartButton.classList.remove('start-button');
        pauseStartButton.classList.add('pause-button');
        pauseStartButton.innerHTML = '<img src="pausa.png" alt="pausar cronômetro" width="30px" height= "30px">'
    } else {
        pauseStartButton.classList.remove('pause-button');
        pauseStartButton.classList.add('start-button');
        pauseStartButton.innerHTML = '<img src="toque.png" alt="começar cronômetro" width="30px" height= "30px">'
    }
}

function stopwatchPause(){
    clearInterval(stopwatchIncrease)
    stopwatchIncrease = null
}

function stopwatchReset(){
    if(pauseStartButton.classList.contains('pause-button')){
        pauseStartButton.classList.remove('pause-button');
        pauseStartButton.classList.add('start-button');
        pauseStartButton.innerHTML = '<img src="toque.png" alt="começar cronômetro" width="30px" height= "30px">'
    }
    clearInterval(stopwatchIncrease)
    seconds = 0
    stopwatch.innerHTML = '00:00:00'
    stopwatchIncrease = null
}

pauseStartButton.addEventListener('click', () => {
    if(stopwatchIncrease === null && inputNameTask.value.trim() !== ''){
        stopwatchStart()    
    }else{
        stopwatchPause()
    }
    changeButton()
})

restartButton.addEventListener('click', stopwatchReset)



//-------------------------------------------------------------------//




const submitTaskButton = document.querySelector('#app-header-submit-button')
const tbody = document.querySelector('tbody')

let history = JSON.parse(localStorage.getItem('history')) || []

function renderHistory(){
    tbody.innerHTML = ''
    history.forEach((task, i) => {
        tbody.innerHTML += `                                                                        
        <tr>
            <td class="task-number">${ i+1 }</td>
            <td class="task-name">${task.name}</td>
            <td class="task-date">${task.date}</td>
            <td class="task-time">${task.time}</td>
            <td class="td-delete-button">
                <button class="task-delete" onclick= "removeTask(${i})">
                    <img src="lixo.png" alt="excluir" width="20px" height="20px">
                </button>
            </td>
        </tr>
        `   
    })
    console.log(tbody)
}

function addTaskToHistory(){

    const calendar = new Date()
    const day = String(calendar.getDate()).padStart(2, '0')
    const month = String(calendar.getMonth() + 1).padStart(2, '0')
    const year = calendar.getFullYear()
    const date = `${day}-${month}-${year}`
    const name = inputNameTask.value.trim()
    const time = stopwatch.textContent.trim()

    if(name !== '' && time !== "00:00:00"){
        
        history.push({name, date, time})
        inputNameTask.value = ''
        stopwatchReset()
        localStorage.setItem('history',JSON.stringify(history))
    }

    renderHistory()
}

function removeTask(index){
    history.splice(index, 1)
    localStorage.setItem('history',JSON.stringify(history))
    renderHistory()
}

renderHistory()

submitTaskButton.addEventListener('click', () => {
    if(inputNameTask.value.trim() !== ''){addTaskToHistory()}
    
    stopwatchPause()

    if(pauseStartButton.classList.contains('pause-button')){
        pauseStartButton.classList.remove('pause-button');
        pauseStartButton.classList.add('start-button');
        pauseStartButton.innerHTML = '<img src="toque.png" alt="começar cronômetro" width="30px" height= "30px">'
    }
})