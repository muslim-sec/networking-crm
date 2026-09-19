import { openFile, saveFile } from './storage.js';

const btnLoad = document.getElementById('btn-load');
const statusBadge = document.getElementById('file-status');
const searchInput = document.getElementById('search-input');
const btnAdd = document.getElementById('btn-add');
const listContainer = document.getElementById('list-container');
const emptyState = document.getElementById('empty-state');

const modalBackdrop = document.getElementById('modal-backdrop');
const modalPanel = document.getElementById('modal-panel');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancel = document.getElementById('btn-cancel');
const addForm = document.getElementById('add-form');

const tplContact = document.getElementById('tpl-contact');

let crmData = null;
let filteredPeople = [];

btnLoad.addEventListener('click', async () => {
    try {
        const data = await openFile();
        if (data) {
            crmData = data;
            if (!crmData.people) crmData.people = [];
            
            updateUIState(true);
            renderList();
        }
    } catch (err) {
        alert("Failed to load file: " + err.message);
    }
});

searchInput.addEventListener('input', (e) => {
    renderList(e.target.value);
});

const openModal = () => {
    modalBackdrop.classList.remove('hidden');
    requestAnimationFrame(() => {
        modalBackdrop.classList.remove('opacity-0');
        modalPanel.classList.remove('scale-95');
    });
};

const closeModal = () => {
    modalBackdrop.classList.add('opacity-0');
    modalPanel.classList.add('scale-95');
    setTimeout(() => {
        modalBackdrop.classList.add('hidden');
        addForm.reset();
    }, 200);
};

btnAdd.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);

addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newPerson = {
        "Person ID": `P-${Date.now()}`,
        "Full Name": document.getElementById('input-name').value,
        "Current Title": document.getElementById('input-skills').value,
        "Phone": document.getElementById('input-phone').value,
        "Note": document.getElementById('input-notes').value
    };
    
    crmData.people.unshift(newPerson);
    
    try {
        await saveFile(crmData);
        closeModal();
        renderList(searchInput.value);
    } catch (err) {
        alert("Failed to save: " + err.message);
    }
});

function updateUIState(isLoaded) {
    if (isLoaded) {
        statusBadge.textContent = 'File Loaded';
        statusBadge.className = 'px-2 py-1 text-xs font-medium rounded-md bg-green-900/50 text-green-400 border border-green-800';
        searchInput.disabled = false;
        btnAdd.disabled = false;
        emptyState.style.display = 'none';
    }
}

function renderList(query = '') {
    listContainer.innerHTML = '';
    
    if (!crmData || !crmData.people || crmData.people.length === 0) {
        listContainer.innerHTML = '<div class="flex h-full items-center justify-center text-gray-500"><p>No contacts found.</p></div>';
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    filteredPeople = crmData.people.filter(p => {
        const name = (p['Full Name'] || '').toLowerCase();
        const skills = (p['Current Title'] || '').toLowerCase();
        return name.includes(lowerQuery) || skills.includes(lowerQuery);
    });
    
    if (filteredPeople.length === 0) {
        listContainer.innerHTML = '<div class="flex h-full items-center justify-center text-gray-500"><p>No matches.</p></div>';
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    filteredPeople.forEach(p => {
        const clone = tplContact.content.cloneNode(true);
        clone.querySelector('[data-name]').textContent = p['Full Name'] || 'Unknown';
        
        const skills = p['Current Title'] || p['Skill'] || p['Notes'] || '';
        clone.querySelector('[data-skills]').textContent = skills;
        
        const phone = p['Phone'] || p['WhatsApp'] || '';
        if (phone) {
            clone.querySelector('[data-phone]').textContent = phone;
        } else {
            clone.querySelector('[data-phone-container]').style.display = 'none';
        }
        
        const note = p['Note'] || '';
        if (note) {
             clone.querySelector('[data-notes]').textContent = note;
        }
        
        fragment.appendChild(clone);
    });
    
    listContainer.appendChild(fragment);
}
