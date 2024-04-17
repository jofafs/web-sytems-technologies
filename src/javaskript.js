document.getElementById('createAccountBtn').addEventListener('click', function() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const roleSelect = document.getElementById('role');
  
    const name = nameInput.value;
    const email = emailInput.value;
    const role = roleSelect.value;
  
    if (name.trim() === '' || email.trim() === '') {
      alert('Please enter Name and Email.');
      return;
    }
  
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
  
    const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const rows = table.rows;
    const lastId = rows.length > 1 ? parseInt(rows[rows.length - 1].cells[0].textContent) : 0;
    const newRow = table.insertRow();
  
    const idCell = newRow.insertCell(0);
    const nameCell = newRow.insertCell(1);
    const emailCell = newRow.insertCell(2);
    const roleCell = newRow.insertCell(3);
    const actionsCell = newRow.insertCell(4);
  
    idCell.textContent = lastId + 1;
    nameCell.textContent = name;
    emailCell.textContent = email;
    roleCell.innerHTML = `<span>${role}</span>`;
    actionsCell.innerHTML = `<button type="button" onclick="toggleEdit(this)" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"><i class="fas fa-edit"></i></button>
      <button type="button" onclick="deleteRow(this)" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"><i class="fas fa-trash-alt"></i></button>`;
    
    newRow.classList.add('border-b', 'hover:bg-orange-100', 'bg-gray-100');
    idCell.classList.add('p-3', 'px-5');
    nameCell.classList.add('p-3', 'px-5');
    emailCell.classList.add('p-3', 'px-5');
    roleCell.classList.add('p-3', 'px-5');
    actionsCell.classList.add('p-3', 'px-5', 'flex', 'justify-end');

    nameInput.value = '';
    emailInput.value = '';
  });

function toggleEdit(btn) {
    const row = btn.closest('tr');
    const cells = row.cells;
    const nameCell = cells[1];
    const emailCell = cells[2];
    
    if (btn.textContent === 'Save') {
      btn.textContent = 'Edit';
      
      const newName = nameCell.querySelector('input').value;
      const newEmail = emailCell.querySelector('input').value;
      
      nameCell.innerHTML = `<span>${newName}</span>`;
      emailCell.innerHTML = `<span>${newEmail}</span>`;
  
    } else {
      btn.textContent = 'Save';
      
      const nameValue = nameCell.textContent;
      const emailValue = emailCell.textContent;
  
      nameCell.innerHTML = `<input type="text" value="${nameValue}" class="bg-transparent border-b-2 border-gray-300 py-1 px-2 w-full">`;
      emailCell.innerHTML = `<input type="text" value="${emailValue}" class="bg-transparent border-b-2 border-gray-300 py-1 px-2 w-full">`;
    }
  }
  
function deleteRow(btn) {
    if (confirm('Are you sure you want to delete this user?')) {
      const row = btn.closest('tr');
      row.remove();
  
      const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
      const rows = table.rows;
      for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1;
      }
    }
  }
