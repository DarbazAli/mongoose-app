const userRoute = (Person, app) => {
    app.route('/person').post((req, res) => {
        const { name, age, fav_food } = req.body

        const newPerson = new Person({
            name: name,
            age: age,
            favFoods: fav_food,
        })

        newPerson
            .save(newPerson)
            .then((data) => res.json(data))
            .catch((err) => log(err))
    })
}

export default userRoute
