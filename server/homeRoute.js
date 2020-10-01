const homeRoute = (app) => {
    // create the home url
    app.get('/', (req, res) => {
        res.render('index', { title: 'Home', message: 'Hello There' })
    })
}

export default homeRoute
