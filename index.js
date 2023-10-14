const toast = document.querySelector('#toast')
const toastMsg = document.querySelector('#toast-msg')
const closeToast = document.querySelector('#close-toast')

const createEntry = document.querySelector('#create-entry')
const hiddenInputs = document.querySelector('#hidden-inputs')

const entryContainer = document.querySelector('#entry-container')
const inputsContainer = document.querySelector('#inputs')
const onboardingHeaderContainer = document.querySelector('#onboarding-header-container')

const entryBodyInput = document.querySelector('#entry-body')
const entryTitleInput = document.querySelector('#entry-title')

const publishEntry = document.querySelector('#publish-entry')
const closeCreate = document.querySelector('#close-create')

createEntry.addEventListener('click', function(){
    hiddenInputs.style.display = "flex"
    document.getElementById('html').style.overflow = 'hidden';
    toast.style.display = "none"

    hiddenInputs.style.animation = "fadeIn 0.3s linear"
})

publishEntry.addEventListener('click', function(){
    if (entryTitleInput.value === "" || entryBodyInput.value === ""){
        toastMsg.textContent = "You must fill out all fields."
        toast.style.display = "inline-flex"
    } 
    
    else if(entryTitleInput.value === "" && entryBodyInput.value === ""){
        toastMsg.textContent = "You must fill out both fields."
        toast.style.display = "inline-flex"
    }

    else{
        checkChildren()
        hiddenInputs.style.animation = "fadeOut 0.3s linear"

        setTimeout(() => {
            hiddenInputs.style.display = "none"
        }, 300);

        document.getElementById('html').style.overflow = 'auto';

        let newEntry = document.createElement('li')
        let remove = document.createElement('button')
        let entryTitle = document.createElement('h4')
        let entryBody = document.createElement('p')

        newEntry.appendChild(remove)
        remove.innerHTML = `<span class="material-symbols-outlined remove">delete</span>`

        remove.addEventListener('click', function(e){
            let clickTarget = e.target

            clickTarget.parentElement.parentElement.style.animation = "fadeOut 0.3s linear"

            location.reload()

            setTimeout(() => {
                console.log('reached')
                clickTarget.parentElement.parentElement.remove()
            }, 300);

            setTimeout(clickTarget.parentElement.parentElement.remove(), 300)
            saveToStorage()
        })

        newEntry.appendChild(entryTitle)
        entryTitle.textContent = entryTitleInput.value
        newEntry.appendChild(entryBody)
        entryBody.textContent = entryBodyInput.value

        entryContainer.appendChild(newEntry)

        entryTitleInput.value = ""
        entryBodyInput.value = ""

        inputsContainer.classList.remove('onboarding')
        onboardingHeaderContainer.style.display = "none"
        saveToStorage()
    }
    
})

closeToast.addEventListener('click', function(){
    toast.style.display = "none"
})

closeCreate.addEventListener('click', function(){
    checkChildren()
    hiddenInputs.style.animation = "fadeOut 0.3s linear"

    setTimeout(() => {
        hiddenInputs.style.display = "none"
    }, 300);

    document.getElementById('html').style.overflow = 'auto';
})

function saveToStorage(){
    localStorage.setItem("entries", entryContainer.innerHTML)
}

function renderStorage(){
    entryContainer.innerHTML = localStorage.getItem('entries')
}

renderStorage()

function checkChildren(){
    if (entryContainer.hasChildNodes()){
        let removeBtn = document.querySelector('.remove')
        removeBtn.addEventListener('click', function(e){
            let clickTarget = e.target
    
            clickTarget.parentElement.parentElement.style.animation = "fadeOut 0.3s linear"

            location.reload()

            setTimeout(() => {
                console.log('reached')
                clickTarget.parentElement.parentElement.remove()
            }, 300);

            setTimeout(clickTarget.parentElement.parentElement.remove(), 300)
            saveToStorage()

        })

        inputsContainer.classList.remove('onboarding')
        onboardingHeaderContainer.style.display = "none"

    } else{
        console.log('has no children')
        inputsContainer.classList.add('onboarding')
    }
}

checkChildren()





