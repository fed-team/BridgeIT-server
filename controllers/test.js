import { Test } from '@models'

const index = async (req, res) => {
    res.status(200).json(process.env)
}

const add = async (req, res) => {
    const newTest = new Test(req.value.body)
    const test = await newTest.save()
    res.status(201).json(test)
}

const get = async (req, res) => {
    const { testId } = req.value.params
    const test = await Test.findById(testId)
    res.status(200).json(test)
}

const replace = async (req, res) => {
    const { testId } = req.value.params
    const newTest = req.value.body
    await Test.findByIdAndUpdate(testId, newTest)
    res.status(200).json({ success: true })
}

const update = async (req, res) => {
    const { testId } = req.value.params
    const newTest = req.value.body
    await Test.findByIdAndUpdate(testId, newTest)
    res.status(200).json({ success: true })
}

export default { index, get, update, add, replace }