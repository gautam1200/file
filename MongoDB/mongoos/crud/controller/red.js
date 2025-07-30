let USER = require('../model/models')

exports.viewsPage = async (req, res) => {

    const data = await USER.find()

    res.render('crud', { data, editData: null })
}

exports.Datashow = async (req, res) => {
    const data = req.query
    if (data.id != "") {
        await USER.findByIdAndUpdate(data.id, data)
    } else {
        await USER.create(data)
    }
    res.redirect('/')
}

exports.Datadelete = async (req, res) => {
    const deleteId = req.params.id
    await USER.findByIdAndDelete(deleteId)
    res.redirect('/')
}

exports.UpdateData = async (req, res) => {
    const editId = req.params.id
    const editData = await USER.findById(editId)
    const data = await USER.find()

    res.render('crud', { editData, data })
}