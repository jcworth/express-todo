const updateForm = document.querySelector('#update-form');
const updateSubmit = document.querySelector('#update-submit')

if (updateForm) {
  updateSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    let formData = new FormData(updateForm)
    updateTask(formData, updateForm.dataset.taskid);
  });
};

function updateTask(form, taskId) {
  fetch('/tasks/edit/' + taskId, {
    body: form,
    method: 'PUT'
  });
};
