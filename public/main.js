new Vue({
    el: '#app',
    data: {
        success: false,
        error: '',
        url: '',
        name: ''
    },
    methods: {
        createPuny() {
            const body = {
                url: this.url,
                name: this.name
            }
            fetch('/api/puny', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => {
                return response.json();
            }).then(result => {
                console.log(result)
                if (result.details) {
                    this.error = result.details.map(detail => detail.message).join(". ");
                } else {
                    this.success = true;
                }
            })
        }
    }
})