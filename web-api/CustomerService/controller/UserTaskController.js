const UserTasksSchema = require('../model/UserTaskDTO')


const saveTask = async(req, res, next) => {
    console.log(req.body)
    await UserTasksSchema.findOne({ taskId: req.body.taskId }).then(result => {
        if (result == null) {
            const task = new UserTasksSchema(req.body);

            task.save().then(result => {

                res.status(200).json({ isSaved: true, data: result })
            }).catch(error => {
                res.status(500).json(error);
            })
        } else {
            res.status(200).json({ isSaved: false, data: result });
        }
    }).catch(er => {
        res.status(500).json(er);
    });
}

const getAllTasksAssigned = async(req, resp, next) => {

    if (req.query.userRole == "Supervisor") {
        await UserTasksSchema.find({ userNic: req.query.userNic }).sort({ date: -1 })
            .then((result) => {
                resp.status(200).json(result);
            })
            .catch((error) => {
                resp.status(500).json(error);
            });
    } else if (req.query.userRole == "Service Manager") {
        await UserTasksSchema.find({ userNic: req.query.userNic })
            .then((result) => {
                resp.status(200).json(result);
            })
            .catch((error) => {
                resp.status(500).json(error);
            });
    } else if (req.query.userRole == "Chief Engineer") {
        await UserTasksSchema.find({ userNic: req.query.userNic })
            .then((result) => {
                resp.status(200).json(result);
            })
            .catch((error) => {
                resp.status(500).json(error);
            });
    } else if (req.query.userRole == "Clerk") {
        await UserTasksSchema.find({ userNic: req.query.userNic })
            .then((result) => {
                resp.status(200).json(result);
            })
            .catch((error) => {
                resp.status(500).json(error);
            });
    }

};




module.exports = {
    saveTask,
    getAllTasksAssigned
}