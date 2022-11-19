let todoInput //miejsce gdzie użytkownik wpisuje teść zadania
let info //informacja o braku zadań konieczności wipsania tekstu
let addBtn // przycisk ADD - dodaje nowe elementy do listy
let list // losta zadań, tagi UL
let newTask // nowo dodany LI, nowe zadanie

let popup // popup
let popupInfo // tekst w popupie wskazujacy na błedy
let taskToEdit // edytowne zadanie, zadanie do etytowania
let popupAcceept // przycisk "zatwirdz"  w popupie
let popupCancel // przycisk "anuluj"  w popupie
let popupInput // input w popupie

const main = () => {
	prepareDomElements()
	prepareDomEvents()
}

const prepareDomElements = () => {
	todoInput = document.querySelector('.addtask__input')
	info = document.querySelector('.addtask__info')
	addBtn = document.querySelector('.addtask__btn')
	list = document.querySelector('.todolist ul')
	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup__info')
	popupAcceept = document.querySelector('.popup__btn--accept')
	popupCancel = document.querySelector('.popup__btn--cancel')
	popupInput = document.querySelector('.popup__input')
}

const prepareDomEvents = () => {
	addBtn.addEventListener('click', addNewTask)
	list.addEventListener('click', checkClick)
	popupCancel.addEventListener('click', closePopup)
	popupAcceept.addEventListener('click', changeTaskText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTask = () => {
	if (todoInput.value !== '') {
		newTask = document.createElement('li')
		newTask.textContent = todoInput.value
		list.append(newTask)
		todoInput.value = ''
		info.textContent = ''
		creatTools()
	} else {
		info.textContent = 'You can’t add empty task'
	}
}

const creatTools = () => {
	const tools = document.createElement('div')
	tools.classList.add('todolist__tools')
	tools.innerHTML =
		'<button class="todolist__tool todolist__tool-delete"><i class="fas fa-times"></i></button><button class="todolist__tool todolist__tool-edit"><i class="fas fa-pen-to-square"></i>Edit</button><button class="todolist__tool todolist__tool-complete"><i class="fas fa-check"></i></button>'
	newTask.append(tools)
}

const checkClick = e => {
	if (e.target.matches('.todolist__tool-complete')) {
		completedLi = e.target.closest('li')
		completedLi.classList.toggle('completed')
		e.target.classList.toggle('tool-completed')
	} else if (e.target.matches('.todolist__tool-edit')) {
		popup.style.display = 'block'
		editTask(e)
	} else if (e.target.matches('.todolist__tool-delete')) {
		e.target.closest('li').remove()
		const allTasks = list.querySelectorAll('li')
		if (allTasks.length == 0) {
			info.textContent = 'Feed your to do list'
		}
	}
}

const editTask = e => {
	taskToEdit = e.target.closest('li')
	popupInput.value = taskToEdit.firstChild.textContent
}

const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}
const changeTaskText = () => {
	if (popupInput.value !== '') {
		taskToEdit.firstChild.textContent = popupInput.value
		console.log(popupInput.vlaue)
		closePopup()
	} else {
		popupInfo.textContent = 'Your task can’t be empty'
	}
}

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		addNewTask()
	}
}

document.addEventListener('DOMContentLoaded', main)
