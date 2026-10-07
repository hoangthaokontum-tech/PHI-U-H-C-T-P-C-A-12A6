document.addEventListener("DOMContentLoaded", initApp);

let userScore = 0;
let totalQuestions = 0;
// Store answers to verify on submit
const state = {
    mcq: {},
    truefalse: {},
    fill: {},
    match: {},
    dragdrop: {} // tracks correct drops
};

function initApp() {
    renderHeader();
    renderGoals();
    renderRemember();
    renderSections();
    setupEvents();
}

function renderHeader() {
    document.getElementById('m-subject').textContent = LESSON_DATA.subject;
    document.getElementById('m-grade').textContent = LESSON_DATA.grade;
    document.getElementById('m-title').textContent = LESSON_DATA.title;
    document.getElementById('m-subtitle').textContent = LESSON_DATA.subtitle;
}

function renderGoals() {
    const list = document.getElementById('goals-list');
    LESSON_DATA.goals.forEach(goal => {
        const li = document.createElement('li');
        li.textContent = `✓ ${goal}`;
        list.appendChild(li);
    });
}

function renderRemember() {
    const list = document.getElementById('remember-list');
    LESSON_DATA.remember.forEach(rem => {
        const li = document.createElement('li');
        li.textContent = `💡 ${rem}`;
        list.appendChild(li);
    });
}

function renderSections() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = ''; // clear

    LESSON_DATA.sections.forEach((sec, sIdx) => {
        const secCard = document.createElement('div');
        secCard.className = 'card';
        
        const title = document.createElement('h3');
        title.className = 'section-title';
        title.textContent = sec.title;
        secCard.appendChild(title);

        if(sec.description) {
            const desc = document.createElement('p');
            desc.style.marginBottom = '15px';
            desc.style.fontStyle = 'italic';
            desc.textContent = sec.description;
            secCard.appendChild(desc);
        }

        if (sec.type === 'mcq') {
            renderMCQ(sec, secCard);
        } else if (sec.type === 'truefalse') {
            renderTrueFalse(sec, secCard);
        } else if (sec.type === 'fill') {
            renderFill(sec, secCard);
        } else if (sec.type === 'match') {
            renderMatch(sec, secCard);
        } else if (sec.type === 'dragdrop') {
            renderDragDrop(sec, secCard);
        }

        container.appendChild(secCard);
    });
}

// ================= RENDERERS =================

function renderMCQ(sec, container) {
    sec.questions.forEach((q, idx) => {
        totalQuestions++;
        state.mcq[q.id] = { answer: q.answer, selected: null, el: null };
        
        const block = document.createElement('div');
        block.className = 'question-block';
        block.id = `qb-${q.id}`;
        
        const qt = document.createElement('div');
        qt.className = 'q-text';
        qt.textContent = q.question;
        block.appendChild(qt);

        const grid = document.createElement('div');
        grid.className = 'options-grid';

        q.options.forEach(opt => {
            const lbl = document.createElement('label');
            lbl.className = 'option-label';
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = q.id;
            radio.value = opt;
            
            radio.addEventListener('change', () => {
                // Clear selected style on siblings
                Array.from(grid.children).forEach(c => c.classList.remove('selected'));
                lbl.classList.add('selected');
                state.mcq[q.id].selected = opt;
                state.mcq[q.id].el = grid;
            });

            lbl.appendChild(radio);
            lbl.append(opt);
            grid.appendChild(lbl);
        });
        
        block.appendChild(grid);
        container.appendChild(block);
    });
}

function renderTrueFalse(sec, container) {
    sec.questions.forEach((q, idx) => {
        totalQuestions++;
        state.truefalse[q.id] = { answer: q.answer, selected: null, el: null };
        
        const block = document.createElement('div');
        block.className = 'question-block';
        block.id = `qb-${q.id}`;
        
        const qt = document.createElement('div');
        qt.className = 'q-text';
        qt.textContent = q.text;
        block.appendChild(qt);

        const grid = document.createElement('div');
        grid.className = 'options-grid';
        grid.style.flexDirection = 'row';

        ['Đúng', 'Sai'].forEach(opt => {
            const lbl = document.createElement('label');
            lbl.className = 'option-label';
            lbl.style.flex = '1';
            lbl.style.justifyContent = 'center';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = q.id;
            radio.value = opt;
            
            radio.addEventListener('change', () => {
                Array.from(grid.children).forEach(c => c.classList.remove('selected'));
                lbl.classList.add('selected');
                state.truefalse[q.id].selected = opt;
                state.truefalse[q.id].el = grid;
            });

            lbl.appendChild(radio);
            lbl.append(opt);
            grid.appendChild(lbl);
        });
        
        block.appendChild(grid);
        container.appendChild(block);
    });
}

function renderFill(sec, container) {
    sec.questions.forEach(q => {
        totalQuestions++;
        state.fill[q.id] = { answers: q.answers, selected: null, el: null };
        
        const block = document.createElement('div');
        block.className = 'question-block fill-inline';
        block.id = `qb-${q.id}`;
        
        if(q.prefix) {
            const pre = document.createElement('span');
            pre.textContent = q.prefix;
            block.appendChild(pre);
        }

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'fill-input';
        input.id = `input-${q.id}`;
        input.addEventListener('input', (e) => {
            state.fill[q.id].selected = e.target.value;
            state.fill[q.id].el = input;
        });
        block.appendChild(input);

        if(q.suffix) {
            const suf = document.createElement('span');
            suf.textContent = q.suffix;
            block.appendChild(suf);
        }
        
        container.appendChild(block);
    });
}

function renderMatch(sec, container) {
    sec.questions.forEach(q => {
        totalQuestions++;
        state.match[q.id] = { answer: q.answer, selected: null, el: null };
        
        const row = document.createElement('div');
        row.className = 'match-row';
        row.id = `qb-${q.id}`;
        
        const left = document.createElement('div');
        left.className = 'match-left';
        left.textContent = q.left;
        
        const right = document.createElement('div');
        right.className = 'match-right';
        
        const select = document.createElement('select');
        select.className = 'match-select';
        select.innerHTML = `<option value="">-- Chọn đáp án --</option>`;
        
        q.options.forEach(opt => {
            const op = document.createElement('option');
            op.value = opt;
            op.textContent = opt;
            select.appendChild(op);
        });

        select.addEventListener('change', (e) => {
            state.match[q.id].selected = e.target.value;
            state.match[q.id].el = select;
        });
        
        right.appendChild(select);
        row.appendChild(left);
        row.appendChild(right);
        container.appendChild(row);
    });
}

function renderDragDrop(sec, container) {
    const dragContainer = document.createElement('div');
    dragContainer.className = 'drag-container';

    const cardsArea = document.createElement('div');
    cardsArea.className = 'cards-area';
    
    const targetsArea = document.createElement('div');
    targetsArea.className = 'targets-area';

    // Track targets required
    sec.targets.forEach(t => {
        totalQuestions++; // Each target counts as 1 point
        state.dragdrop[t.accept] = { locked: false, el: null };

        const tgt = document.createElement('div');
        tgt.className = 'drop-target';
        tgt.dataset.accept = t.accept;
        tgt.innerHTML = `<div class="drop-text">${t.text}</div>`;
        targetsArea.appendChild(tgt);
    });

    sec.cards.forEach(c => {
        const card = document.createElement('div');
        card.className = 'drag-card';
        card.dataset.id = c.id;
        
        if (c.type === 'image') {
            card.innerHTML = `<img src="${c.src}" alt="card image" onerror="this.outerHTML='[Lỗi ảnh: ${c.label}]'">`;
        } else {
            card.textContent = c.label;
        }

        cardsArea.appendChild(card);
        makeDraggable(card);
    });

    dragContainer.appendChild(cardsArea);
    dragContainer.appendChild(targetsArea);
    container.appendChild(dragContainer);
}


// ================= DRAG & DROP LOGIC =================

function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    element.addEventListener('pointerdown', (e) => {
        if (element.classList.contains('locked')) return;
        isDragging = true;
        element.setPointerCapture(e.pointerId);
        element.classList.add('dragging');

        if (!element.dataset.homeX) {
            element.dataset.homeX = 0;
            element.dataset.homeY = 0;
        }

        startX = e.clientX;
        startY = e.clientY;

        const style = window.getComputedStyle(element);
        const matrix = new DOMMatrixReadOnly(style.transform);
        initialX = matrix.m41;
        initialY = matrix.m42;
    });

    element.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        element.style.transform = `translate(${initialX + dx}px, ${initialY + dy}px)`;
    });

    element.addEventListener('pointerup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        element.releasePointerCapture(e.pointerId);
        element.classList.remove('dragging');

        // Hit test
        element.style.display = 'none'; 
        const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        element.style.display = 'block';

        const dropzone = elemBelow ? elemBelow.closest('.drop-target') : null;

        if (dropzone && dropzone.dataset.accept === element.dataset.id) {
            // Correct
            element.classList.add('locked');
            element.style.transform = 'translate(0, 0)';
            dropzone.appendChild(element);
            dropzone.classList.add('correct');
            state.dragdrop[element.dataset.id].locked = true;
            state.dragdrop[element.dataset.id].el = dropzone;
            showToast("Chính xác! 🎉");
        } else {
            // Wrong / Return
            element.style.transform = `translate(${element.dataset.homeX}px, ${element.dataset.homeY}px)`;
            if (dropzone) showToast("Sai rồi, thử lại nhé!", true);
        }
    });
}

// ================= EVENTS & GRADING =================

function setupEvents() {
    document.getElementById('btn-submit').addEventListener('click', calculateScore);
    document.getElementById('btn-reset').addEventListener('click', resetQuiz);
}

function calculateScore() {
    let score = 0;

    // Reset previous visual states
    document.querySelectorAll('.correct-ans, .wrong-ans').forEach(el => {
        el.classList.remove('correct-ans', 'wrong-ans');
    });

    // Grade MCQ
    for (const [id, data] of Object.entries(state.mcq)) {
        if(data.el) {
            if(data.selected === data.answer) {
                score++;
                data.el.querySelector('.selected').classList.add('correct-ans');
            } else {
                data.el.querySelector('.selected').classList.add('wrong-ans');
            }
        }
    }

    // Grade True/False
    for (const [id, data] of Object.entries(state.truefalse)) {
        if(data.el) {
            if(data.selected === data.answer) {
                score++;
                data.el.querySelector('.selected').classList.add('correct-ans');
            } else {
                data.el.querySelector('.selected').classList.add('wrong-ans');
            }
        }
    }

    // Grade Fill
    for (const [id, data] of Object.entries(state.fill)) {
        if(data.el) {
            const val = (data.selected || '').trim().toLowerCase();
            const correctAns = data.answers.map(a => a.toLowerCase().trim());
            if(correctAns.includes(val)) {
                score++;
                data.el.classList.add('correct-ans');
            } else {
                data.el.classList.add('wrong-ans');
            }
        }
    }

    // Grade Match
    for (const [id, data] of Object.entries(state.match)) {
        if(data.el) {
            if(data.selected === data.answer) {
                score++;
                data.el.classList.add('correct-ans');
            } else {
                data.el.classList.add('wrong-ans');
            }
        }
    }

    // Grade DragDrop
    for (const [id, data] of Object.entries(state.dragdrop)) {
        if(data.locked) {
            score++;
        }
    }

    showResult(score);
}

function showResult(score) {
    const name = document.getElementById('student-name').value.trim() || 'Học sinh ẩn danh';
    const percent = Math.round((score / totalQuestions) * 100) || 0;
    
    const resBox = document.getElementById('result-container');
    const resContent = document.getElementById('result-content');
    
    resContent.innerHTML = `
        <h3>🎉 Cảm ơn bạn <strong>${name}</strong> đã hoàn thành!</h3>
        <div class="score-display">${score} / ${totalQuestions}</div>
        <p>Tỉ lệ chính xác: <strong>${percent}%</strong></p>
    `;
    
    resBox.classList.remove('hidden');
    resBox.scrollIntoView({ behavior: 'smooth' });
}

function resetQuiz() {
    totalQuestions = 0;
    // Clears state by re-rendering
    renderSections();
    
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('student-name').value = '';
    document.getElementById('student-class').value = '';
    document.getElementById('student-date').value = '';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(msg, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    if(isError) toast.classList.add('error');
    else toast.classList.remove('error');
    
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2000);
}
