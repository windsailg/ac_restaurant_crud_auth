// delete restaurant  function
document.querySelector('body').addEventListener('click', (e) => {
  if (e.target.matches('.delete__restaurant__btn')) {
    const id = e.target.dataset.id
    document.delete_form.action = `/restaurant/${id}?_method=DELETE`
  }
  if (e.target.matches('.delete__restaurant__btn')) {
    const id = e.target.dataset.id
    document.delete_form.action = `/restaurant/${id}?_method=DELETE`
  }
})

AOS.init({
  once: true,
  duration: 400,
  easing: 'ease-in-out'
})