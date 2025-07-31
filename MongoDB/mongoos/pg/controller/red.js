let USER = require('../model/model')

exports.viewsPage = async (req, res) => {

    const data = await USER.find()
    console.log(data);
    

    res.render('index', { data, editData: null })
}

exports.Datashow = async (req, res) => {
    const data = req.query
    console.log(data);
    
    if (data.id != "") {
        await USER.findByIdAndUpdate(data.id, data)
    } else {
        await USER.create(data)
    }
    res.redirect('/gautam')
}

exports.Datadelete = async (req, res) => {
    const deleteId = req.params.id
    await USER.findByIdAndDelete(deleteId)
    res.redirect('/gautam')
}

exports.UpdateData = async (req, res) => {
    const editId = req.params.id
    const editData = await USER.findById(editId)
    const data = await USER.find()

    res.render('index', { editData, data })
}