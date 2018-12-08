document.getElementById('me').addEventListener('click', function() {
    console.log('entering function')

    form = document.getElementById('MyForm')

    title = document.getElementById('title').value
    link = document.getElementById('link').value
    description = document.getElementById('description').value
    category = document.getElementById('category').value

    try {

        const url = 'http://localhost:3000/todos';
        const dat = { title, link, description, category }
        $.post(url, dat, function(data, status) {
            console.log(`${data} and status is ${status}`)
        })

    } catch (error) {
        alert(error)
    }

})