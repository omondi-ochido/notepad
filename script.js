document.addEventListener('DOMContentLoaded', function() {
    const notepad = document.getElementById('notepad');
    notepad.addEventListener('input', autoExpand);

    function autoExpand(event) {
        const element = event.target;
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    }
});

function saveNote() {
    const note = document.getElementById('notepad').value;
    const blob = new Blob([note], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = 'note.txt';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = '_blank';
    anchor.style.display = 'none'; // Ensure the anchor is not visible
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    alert('Note saved as note.txt!');
}

function loadNote() {
    const note = localStorage.getItem('note');
    if (note) {
        document.getElementById('notepad').value = note;
        alert('Note loaded!');
    } else {
        alert('No saved note found.');
    }
}

function clearNote() {
    const notepad = document.getElementById('notepad');
    notepad.classList.add('fade-out');
    setTimeout(() => {
        notepad.value = '';
        notepad.classList.remove('fade-out');
    }, 500);
}

// Add fade-out animation class
const style = document.createElement('style');
style.innerHTML = `
    .fade-out {
        animation: fadeOut 0.5s forwards;
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
